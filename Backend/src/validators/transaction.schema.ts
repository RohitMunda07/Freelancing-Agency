// ============================= Used to validate transaction/payment details =============================

import z from "zod"
import { transactionPaymentMode, currencyType, paymentStatus } from "../models/Transaction.model.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Derived from the model's actual TS enums (same fix as project/review
// schemas) — these were plain z.enum([...]) string unions before, which
// don't type-check against TransactionDocument's enum-typed fields on create().

// Client -> server: "create a Razorpay order for this amount"
const CreatePaymentOrderSchema = z.object({
    amount: z.number().positive({ message: "Amount must be greater than 0" }),
    currency: z.nativeEnum(currencyType).default(currencyType.INR),
})

// Client -> server: after Razorpay checkout completes, verify the payment.
// Loose but non-empty checks — these are opaque Razorpay-issued IDs, not
// Mongo ObjectIds, so they shouldn't be validated with an ObjectId regex.
const VerifyPaymentSchema = z.object({
    razorpayOrderId: z.string().trim().min(1, "Razorpay order ID is required"),
    razorpayPaymentId: z.string().trim().min(1, "Razorpay payment ID is required"),
    razorpaySignature: z.string().trim().min(1, "Razorpay signature is required"),
})

// Full record shape — matches Payment.model.ts exactly (field names + enum types).
const TransactionZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    amount: z
        .number()
        .positive({ message: "Amount must be greater than 0" }),

    currency: z
        .nativeEnum(currencyType)
        .default(currencyType.INR),

    paymentMethod: z
        .nativeEnum(transactionPaymentMode)
        .optional(),

    paymentStatus: z
        .nativeEnum(paymentStatus)
        .default(paymentStatus.PENDING),

    razorpayOrderId: z
        .string()
        .trim()
        .min(1, "Razorpay order ID is required"),

    razorpayPaymentId: z
        .string()
        .trim()
        .optional(),

    razorpaySignature: z
        .string()
        .trim()
        .optional(),

    paymentGatewayId: z
        .string()
        .trim()
        .optional(),
})

export { TransactionZodSchema, CreatePaymentOrderSchema, VerifyPaymentSchema }

export type TransactionInput = z.infer<typeof TransactionZodSchema>;
export type CreatePaymentOrderInput = z.infer<typeof CreatePaymentOrderSchema>;
export type VerifyPaymentInput = z.infer<typeof VerifyPaymentSchema>;