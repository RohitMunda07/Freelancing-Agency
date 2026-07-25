// ============================= Used to validate outbound mail records =============================

import z from "zod"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const MailStatusEnum = z.enum(["pending", "sent", "failed"])

const MailZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    recipient: z
        .string()
        .trim()
        .email("Recipient must be a valid email"),

    subject: z
        .string()
        .trim()
        .min(1, "Subject is required"),

    template: z
        .string()
        .trim()
        .min(1, "Template is required")
        .optional(),

    status: MailStatusEnum.default("pending"),

    sentAt: z.coerce.date().nullable().optional(),
})

export { MailZodSchema, MailStatusEnum }

export type MailInput = z.infer<typeof MailZodSchema>;
