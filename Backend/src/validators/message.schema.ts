// ============================= Used to validate public contact-form submissions =============================

import z from "zod"
import { messageStatus } from "../models/ChatMessage.model.js"
import { messageType } from "../models/ChatMessage.model.js"

// Derived from the model's actual TS enum — see project.schema.ts for why.
const MessageStatusEnum = z.nativeEnum(messageStatus).default(messageStatus.NEW)

const ChatMessageZodSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name should have at least 2 characters")
        .max(80),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email"),

    phone: z
        .string()
        .regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Please enter a valid phone number"),

    subject: z
        .string()
        .trim()
        .min(2, "Subject is required")
        .max(150),

    service: z
        .string()
        .trim()
        .min(1, "Service is required"),

    budget: z
        .string()
        .trim()
        .optional()
        .default(""),

    message: z
        .string()
        .trim()
        .min(10, "Message should be at least 10 characters")
        .max(2000),

    status: messageStatus,
    type: z.nativeEnum(messageType).default(messageType.PROJECT)
})

const QuickContactSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name should have at least 2 characters")
        .max(80),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email"),

    message: z
        .string()
        .trim()
        .min(3, "Message should be at least 10 characters")
        .max(2000),
    status: MessageStatusEnum,

    type: z.nativeEnum(messageType).default(messageType.QUICK)
})

// The public contact form itself should never let the submitter set `status`
// directly — that's set by the system (defaults to "new") and moved along by
// an admin from there.
const SubmitContactFormSchema = ChatMessageZodSchema.omit({ status: true, })
const SubmitQuickFormSchema = QuickContactSchema.omit({ status: true, })

const UpdateMessageStatusSchema = z.object({
    status: MessageStatusEnum
});

export { ChatMessageZodSchema, SubmitContactFormSchema, MessageStatusEnum, QuickContactSchema, SubmitQuickFormSchema, UpdateMessageStatusSchema }

export type ChatMessageInput = z.infer<typeof ChatMessageZodSchema>;
export type MessageStatusInput = z.infer<typeof messageStatus>
export type QuickContactInput = z.infer<typeof QuickContactSchema>;
export type SubmitContactFormInput = z.infer<typeof SubmitContactFormSchema>;