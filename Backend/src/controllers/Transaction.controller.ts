import { TransactionModel, paymentStatus } from "../models/Transaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";
import crypto from "crypto";
import Razorpay from "razorpay";
import { CreatePaymentOrderSchema, VerifyPaymentSchema } from "../validators/transaction.schema.js";

// Lazily created + cached so a missing env var fails clearly the first time
// a payment endpoint is actually hit, rather than crashing the whole server
// on startup before you've even configured Razorpay.
let razorpayClient: Razorpay | null = null;

const getRazorpayClient = () => {
    if (razorpayClient) return razorpayClient;

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        throw new ApiError(500, "Razorpay is not configured (missing RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET)", [], "")
    }

    razorpayClient = new Razorpay({ key_id: keyId, key_secret: keySecret })
    return razorpayClient
}

// POST /payments/order — client requests a Razorpay order for an amount
const createOrder = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Please login to make a payment", [], "")
    }

    const parsed = CreatePaymentOrderSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const { amount, currency } = parsed.data

    // Razorpay expects the amount in the smallest currency unit — paise for
    // INR, i.e. amount * 100. `amount` here is assumed to be in whole rupees
    // (matches how you'd store it on an Invoice). Adjust if your frontend
    // is already sending paise.
    const razorpayOrder = await getRazorpayClient().orders.create({
        amount: Math.round(amount * 100),
        currency: currency.toUpperCase(),
        receipt: `receipt_${req.user._id}_${Date.now()}`,
    })

    const transaction = await TransactionModel.create({
        user: req.user._id,
        amount,
        currency,
        razorpayOrderId: razorpayOrder.id,
        paymentStatus: paymentStatus.PENDING,
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    orderId: razorpayOrder.id,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    // The checkout widget on the frontend needs the public
                    // key ID (never the secret) to open the payment sheet.
                    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
                    transactionId: transaction._id,
                },
                "Order created successfully"
            )
        )
})

// POST /payments/verify — client calls this right after Razorpay checkout
// returns a success response in the browser
const verifyPayment = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const parsed = VerifyPaymentSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data

    const transaction = await TransactionModel.findOne({ razorpayOrderId })

    if (!transaction) {
        throw new ApiError(404, "Transaction not found", [], "")
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    // Already processed (e.g. the webhook beat this request to it, or the
    // client retried) — don't verify or update twice.
    if (transaction.paymentStatus === paymentStatus.SUCCESS) {
        return res
            .status(200)
            .json(new ApiResponse(200, transaction, "Payment already verified"))
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
        throw new ApiError(500, "Razorpay is not configured (missing RAZORPAY_KEY_SECRET)", [], "")
    }

    const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex")

    const expectedBuffer = Buffer.from(expectedSignature, "utf-8")
    const providedBuffer = Buffer.from(razorpaySignature, "utf-8")

    // timingSafeEqual throws if buffer lengths differ, so guard that first
    // rather than letting it throw straight through as an unhandled error.
    const isSignatureValid =
        expectedBuffer.length === providedBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, providedBuffer)

    if (!isSignatureValid) {
        transaction.paymentStatus = paymentStatus.FAILED
        await transaction.save({ validateBeforeSave: false })

        throw new ApiError(400, "Payment verification failed", [], "")
    }

    transaction.razorpayPaymentId = razorpayPaymentId
    transaction.razorpaySignature = razorpaySignature
    transaction.paymentStatus = paymentStatus.SUCCESS
    transaction.paidAt = new Date()
    await transaction.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, transaction, "Payment verified successfully"))
})

// POST /payments/webhook — Razorpay calls this directly, independent of the
// browser. This is the durable source of truth: verifyPayment above can be
// skipped entirely if the user closes the tab mid-flow, but Razorpay will
// still hit this endpoint.
//
// IMPORTANT — wire this route with a raw body parser, not express.json():
//   router.post("/payments/webhook", express.raw({ type: "application/json" }), razorpayWebhook)
// HMAC verification needs the exact bytes Razorpay signed; re-serializing an
// already-parsed JS object is not guaranteed to match byte-for-byte.
const razorpayWebhook = asyncHandler(async (req, res) => {

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!webhookSecret) {
        throw new ApiError(500, "Razorpay webhook secret is not configured", [], "")
    }

    const signature = req.headers["x-razorpay-signature"] as string | undefined
    if (!signature) {
        throw new ApiError(400, "Missing webhook signature", [], "")
    }

    // req.body is expected to be a raw Buffer here — see the routing note above
    const rawBody = req.body as Buffer

    const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex")

    const expectedBuffer = Buffer.from(expectedSignature, "utf-8")
    const providedBuffer = Buffer.from(signature, "utf-8")

    const isSignatureValid =
        expectedBuffer.length === providedBuffer.length &&
        crypto.timingSafeEqual(expectedBuffer, providedBuffer)

    if (!isSignatureValid) {
        throw new ApiError(400, "Invalid webhook signature", [], "")
    }

    const event = JSON.parse(rawBody.toString("utf-8"))
    const razorpayOrderId = event?.payload?.payment?.entity?.order_id
    const razorpayPaymentId = event?.payload?.payment?.entity?.id

    if (!razorpayOrderId) {
        // Not a payment event we care about — ack anyway so Razorpay
        // doesn't keep retrying it.
        return res.status(200).json(new ApiResponse(200, {}, "Webhook received"))
    }

    const transaction = await TransactionModel.findOne({ razorpayOrderId })

    if (!transaction) {
        // Don't 404 a webhook — Razorpay will just keep retrying an event
        // for a transaction that legitimately doesn't exist on our side.
        return res.status(200).json(new ApiResponse(200, {}, "Webhook received"))
    }

    // Idempotent — a webhook can legitimately be delivered more than once
    if (transaction.paymentStatus !== paymentStatus.SUCCESS && event.event === "payment.captured") {
        transaction.paymentStatus = paymentStatus.SUCCESS
        transaction.razorpayPaymentId = razorpayPaymentId
        transaction.paidAt = new Date()
        await transaction.save({ validateBeforeSave: false })
    } else if (event.event === "payment.failed") {
        transaction.paymentStatus = paymentStatus.FAILED
        await transaction.save({ validateBeforeSave: false })
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Webhook processed"))
})

// GET /payments/me — the logged-in client's own transactions
const getMyPayments = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const transactions = await TransactionModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, transactions, "Fetched your transactions"))
})

// GET /payments — admin only, every transaction
const getPayments = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can view all transactions", [], "")
    }

    const transactions = await TransactionModel
        .find({})
        .populate("user", "fullname email")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(new ApiResponse(200, transactions, "Fetched all transactions"))
})

// GET /payments/:id — owner or admin
const getPaymentById = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid transaction ID", [], "")
    }

    const transaction = await TransactionModel.findById(id)

    if (!transaction) {
        throw new ApiError(404, "Transaction not found", [], "")
    }

    if (req.user?.role !== "admin" && transaction.user.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, transaction, "Transaction fetched successfully"))
})

export {
    createOrder,
    verifyPayment,
    razorpayWebhook,
    getMyPayments,
    getPayments,
    getPaymentById,
}