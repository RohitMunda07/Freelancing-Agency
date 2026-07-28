// ============================= Used to validate outbound mail records =============================

import z from "zod"
import { mailStatus } from "../models/Mail.model.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Derived from the model's actual TS enum — see project.schema.ts for why.
const MailStatusEnum = z.nativeEnum(mailStatus)

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

    status: MailStatusEnum.default(mailStatus.PENDING),

    sentAt: z.coerce.date().nullable().optional(),
})

export { MailZodSchema, MailStatusEnum }

export type MailInput = z.infer<typeof MailZodSchema>;