// ============================= Used to validate invoice details =============================

import z from "zod"
import { invoiceStatus } from "../models/Invoice.model.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const InvoiceStatusEnum = z.nativeEnum(invoiceStatus)

const InvoiceItemSchema = z.object({
    description: z.string().trim().min(1, "Item description is required"),
    quantity: z.number().positive().default(1),
    rate: z.number().nonnegative(),
    amount: z.number().nonnegative(),
})

// The plain object shape, with NO .refine() on it — kept separate so
// .omit() can still be used on it. Zod v4 throws
// ".omit() cannot be used on object schemas containing refinements"
// if you try to omit fields from a schema that already has .refine()
// attached, since the refinement wraps the object shape rather than
// living on it.
const InvoiceObjectSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    project: z
        .string()
        .regex(objectIdRegex, "Invalid Project ID"),

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
})

// The full record shape, refinement applied here — used wherever `total`
// is actually present and needs to be checked against subtotal + tax.
const InvoiceZodSchema = InvoiceObjectSchema.refine(
    (data) => Math.round((data.subtotal + data.tax) * 100) === Math.round(data.total * 100),
    { message: "total must equal subtotal + tax", path: ["total"] }
)

// What an admin actually types in when creating an invoice. Omits from
// InvoiceObjectSchema (the unrefined version) — and since `total` is one of
// the omitted fields, the subtotal+tax=total refinement was never relevant
// to this schema in the first place; the controller computes `total`
// server-side instead of trusting client math.
const CreateInvoiceSchema = InvoiceObjectSchema.omit({
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
