// ============================= Used to validate invoice details =============================

import z from "zod"
import { invoiceStatus } from "../models/Invoice.model"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Derived from the model's actual TS enum — see project.schema.ts for why.
// Note: `invoiceStatus` lives in TransactionModel.ts, which is the file
// that actually defines your Invoice model (the naming mismatch flagged
// earlier — worth a rename pass whenever you touch this file next).
const InvoiceStatusEnum = z.nativeEnum(invoiceStatus)

// A single billable line — was being validated in the controller with
// manual isArray/typeof checks even though nothing in the model or schema
// actually stored it, so it was silently discarded on every create.
const InvoiceItemSchema = z.object({
    description: z.string().trim().min(1, "Item description is required"),
    quantity: z.number().positive().default(1),
    rate: z.number().nonnegative(),
    amount: z.number().nonnegative(),
})

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

    invoiceNumber: z
        .string()
        .trim()
        .min(1, "Invoice number is required"),

    items: z.array(InvoiceItemSchema).optional().default([]),

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

// What an admin actually types in when creating an invoice. Everything else
// is either derived server-side (`user` from the project's owner),
// generated (`invoiceNumber`), computed (`total`), or set later by a
// different process (`payment` once a Transaction succeeds, `pdfUrl` once a
// PDF is generated, `status` via the moderation-style update endpoint).
const CreateInvoiceSchema = InvoiceZodSchema.omit({
    user: true,
    invoiceNumber: true,
    total: true,
    payment: true,
    status: true,
    pdfUrl: true,
})

// PATCH /invoices/:id/status — admin only, the single place status changes
const UpdateInvoiceStatusSchema = z.object({
    status: InvoiceStatusEnum,
})

export {
    InvoiceZodSchema,
    CreateInvoiceSchema,
    UpdateInvoiceStatusSchema,
    InvoiceItemSchema,
    InvoiceStatusEnum,
}

export type InvoiceInput = z.infer<typeof InvoiceZodSchema>;
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>;
export type UpdateInvoiceStatusInput = z.infer<typeof UpdateInvoiceStatusSchema>;