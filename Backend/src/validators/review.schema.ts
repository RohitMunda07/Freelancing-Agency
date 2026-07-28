// ============================= Used to validate review/feedback details =============================

import z from "zod"
import { reviewStatus } from "../models/Feedback.model.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Same fix as project.schema.ts — derive from the model's actual TS enum
// instead of a hand-typed string union, so `parsed.data.status` type-checks
// against FeedbackDocument.status (used in moderateReview's $set).
const ReviewStatusEnum = z.nativeEnum(reviewStatus)

const ReviewZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    projectId: z
        .string()
        .regex(objectIdRegex, "Invalid Project ID"),

    rating: z
        .number()
        .int("Rating must be a whole number")
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot exceed 5"),

    comment: z
        .string()
        .trim()
        .max(1000)
        .optional(),

    status: ReviewStatusEnum.default(reviewStatus.PENDING),

    isVisible: z.boolean().default(false),
})

// A client submitting their own review shouldn't be able to set `status` or
// `isVisible` themselves — those are moderation fields an admin controls.
const CreateReviewSchema = ReviewZodSchema.omit({ status: true, isVisible: true })

// For the admin-only moderation endpoint — only status/isVisible, and at
// least one of them actually has to be present.
const ModerateReviewSchema = z.object({
    status: ReviewStatusEnum.optional(),
    isVisible: z.boolean().optional(),
}).refine(
    (data) => data.status !== undefined || data.isVisible !== undefined,
    { message: "At least one of status or isVisible is required" }
)

export { ReviewZodSchema, CreateReviewSchema, ModerateReviewSchema, ReviewStatusEnum }

export type ReviewInput = z.infer<typeof ReviewZodSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
export type ModerateReviewInput = z.infer<typeof ModerateReviewSchema>;