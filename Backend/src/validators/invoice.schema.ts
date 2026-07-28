// ============================= Used to validate invoice details =============================

import z from "zod"
import { invoiceStatus } from "../models/Invoice.model.js"
import items from "razorpay/dist/types/items.js";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Derived from the model's actual TS enum — see project.schema.ts for why.
// Note: `invoiceStatus` lives in TransactionModel.ts, which is the file
// that actually defines your Invoice model (the naming mismatch flagged
// earlier — worth a rename pass whenever you touch this file next).
const InvoiceStatusEnum = z.nativeEnum(invoiceStatus)

const InvoiceZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    project: z
        .string()
        .regex(objectIdRegex, "Invalid Project ID"),

    // Not required — an invoice can exist (draft/sent) before it's paid
    payment: z
        .string()
        .regex(objectIdRegex, "Invalid Payment ID")
        .optional(),

    items: z
        .array(
            z.object({
                description: z
                    .string()
                    .trim()
                    .optional(),
                quantity: z
                    .number()
                    .nonnegative(),
                unitPrice: z
                    .number()
                    .nonnegative(),
                lineTotal: z
                    .number()
                    .nonnegative(),
            })
        ),
    invoiceNumber: z
        .string()
        .trim()
        .min(1, "Invoice number is required"),

    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative().default(0),
    total: z.number().nonnegative(),

    status: InvoiceStatusEnum.default(invoiceStatus.PENDING),

    pdfUrl: z.string().url().optional(),

    dueDate: z.coerce.date().nullable().optional(),
}).refine(
    // Money check: catches a subtotal/tax/total that don't actually add up,
    // rounded to paise/cents to avoid floating-point false positives.
    (data) => Math.round((data.subtotal + data.tax) * 100) === Math.round(data.total * 100),
    { message: "total must equal subtotal + tax", path: ["total"] }
)

export { InvoiceZodSchema, InvoiceStatusEnum }

export type InvoiceInput = z.infer<typeof InvoiceZodSchema>;