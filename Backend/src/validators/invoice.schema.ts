// ============================= Used to validate invoice details =============================

import z from "zod"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const InvoiceStatusEnum = z.enum(["pending", "paid", "failed"])

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

    subtotal: z.number().nonnegative(),
    tax: z.number().nonnegative().default(0),
    total: z.number().nonnegative(),

    status: InvoiceStatusEnum.default("pending"),

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
