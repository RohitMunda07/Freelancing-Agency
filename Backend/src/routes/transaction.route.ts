import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import express from "express"
import {
    createOrder,
    verifyPayment,
    razorpayWebhook,
    getMyPayments,
    getPayments,
    getPaymentById,
} from "../controllers/Transaction.controller.js"

const router = Router()

router.route("/payments/order").post(verifyJWT, createOrder)
router.route("/payments/verify").post(verifyJWT, verifyPayment)
router.post("/payments/webhook", express.raw({ type: "application/json" }), razorpayWebhook)

router.route("/payments/me").get(verifyJWT, getMyPayments)
router.route("/payments").get(verifyJWT, getPayments)
router.route("/payments/:id").get(verifyJWT, getPaymentById)

export default router