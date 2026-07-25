// ============================= Used to validate transaction/payment details =============================

import z from "zod"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Client -> server: "create a Razorpay order for this amount"
// This is the actual shape of the first request in a Razorpay flow —
// nothing else (order ID, payment ID, signature) exists yet at this point.
const CreatePaymentOrderSchema = z.object({
    amount: z.number().positive({ message: "Amount must be greater than 0" }),
    currency: z.enum(["inr", "others"]).default("inr"),
})

// Client -> server: after Razorpay checkout completes, verify the payment.
// Loose but non-empty checks — these are opaque Razorpay-issued IDs, not
// Mongo ObjectIds, so they shouldn't be validated with an ObjectId regex.
const VerifyPaymentSchema = z.object({
    razorpayOrderId: z.string().trim().min(1, "Razorpay order ID is required"),
    razorpayPaymentId: z.string().trim().min(1, "Razorpay payment ID is required"),
    razorpaySignature: z.string().trim().min(1, "Razorpay signature is required"),
})

// Full record shape — matches Payment.model.ts exactly (field names + enum values).
// paymentMethod was ["COD","Razorpay","Stripe"] and paymentStatus was
// ["Pending","Success","Failed"] — neither matched the Mongoose enums, and
// paymentOrderId/paymentUserId didn't match the model's actual field names
// (razorpayOrderId / user).
const TransactionZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    amount: z
        .number()
        .positive({ message: "Amount must be greater than 0" }),

    currency: z
        .enum(["inr", "others"])
        .default("inr"),

    paymentMethod: z
        .enum(["card", "upi", "account_payment"])
        .optional(),

    paymentStatus: z
        .enum(["pending", "success", "failed"])
        .default("pending"),

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
