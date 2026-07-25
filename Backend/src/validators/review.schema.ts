// ============================= Used to validate review/feedback details =============================

import z from "zod"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const ReviewStatusEnum = z.enum(["pending", "approved", "rejected"])

const ReviewZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    project: z
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

    status: ReviewStatusEnum.default("pending"),

    isVisible: z.boolean().default(false),
})

// A client submitting their own review shouldn't be able to set `status` or
// `isVisible` themselves — those are moderation fields an admin controls.
// Validating the client request with the full schema above would let a
// malicious request mark its own review pre-approved and visible.
const CreateReviewSchema = ReviewZodSchema.omit({ status: true, isVisible: true })

export { ReviewZodSchema, CreateReviewSchema, ReviewStatusEnum }

export type ReviewInput = z.infer<typeof ReviewZodSchema>;
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>;
