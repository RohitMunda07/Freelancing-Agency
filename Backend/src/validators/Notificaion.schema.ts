import z from "zod"
import { NotificationStatus } from "../models/Notification.model.js"
import { NotificationDocument } from "../models/Notification.model.js"

export const SendNotificationZodSchema = z.object({
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
        .min(10, "Message should be at least 10 characters")
        .max(2000),
    status: z
        .string()
        .default(NotificationStatus.PENDING)
})