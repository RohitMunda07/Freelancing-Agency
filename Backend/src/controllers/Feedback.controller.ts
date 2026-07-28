import { FeedbackModel } from "../models/Feedback.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";
import { ProjectModel } from "../models/Project.model.js";
import { CreateReviewSchema, ModerateReviewSchema } from "../validators/review.schema.js";

// POST /reviews — a client leaves a review on their own project
const createFeedBack = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Please login to leave a review", [], "")
    }

    const { projectId, rating, comment } = req.body;

    if (!projectId || !mongoose.isValidObjectId(projectId)) {
        throw new ApiError(400, "Invalid Project Id", [], "")
    }

    const existingProject = await ProjectModel.findById(projectId);
    if (!existingProject) {
        throw new ApiError(404, "Project not found", [], "")
    }

    // Only the project's own client can review it — otherwise any logged-in
    // user could leave a review on any project just by guessing its ID.
    if (existingProject.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only review your own projects", [], "")
    }

    const parsed = CreateReviewSchema.safeParse({
        user: req.user._id.toString(),
        projectId,
        rating,
        comment,
    })

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    // One review per user per project should also be enforced by a unique
    // index on { user, projectId } on the model — this pre-check just turns
    // a duplicate submission into a clean 409 instead of a raw MongoDB
    // E11000 error. If you renamed the field on the model, double check
    // that index definition was updated to `projectId` too, not just the
    // schema field itself.
    const existingReview = await FeedbackModel.findOne({
        user: req.user._id,
        projectId,
    })

    if (existingReview) {
        throw new ApiError(409, "You have already reviewed this project", [], "")
    }

    const newFeedback = await FeedbackModel.create(parsed.data)

    return res
        .status(201)
        .json(
            new ApiResponse(201, newFeedback, "Feedback added successfully")
        )
})

// GET /reviews/public?projectId=... (projectId is optional)
const getPublicReviews = asyncHandler(async (req, res) => {

    const { projectId } = req.query as { projectId?: string }

    const filter: Record<string, unknown> = {
        status: "approved",
        isVisible: true,
    }

    // Omit projectId to power a site-wide testimonials section; pass it to
    // scope reviews to a single project's page.
    if (projectId) {
        if (!mongoose.isValidObjectId(projectId)) {
            throw new ApiError(400, "Invalid Project Id", [], "")
        }

        const existingProject = await ProjectModel.findById(projectId)
        if (!existingProject) {
            throw new ApiError(404, "Project not found", [], "")
        }

        filter.projectId = projectId
    }

    const feedbacks = await FeedbackModel
        .find(filter)
        .populate("user", "fullname avatar company")
        .sort({ createdAt: -1 })

    // An empty result is valid data for a list endpoint, not an error — 200
    // with an empty array rather than 404ing on "no reviews yet".
    return res
        .status(200)
        .json(
            new ApiResponse(200, feedbacks, "Fetched public feedback")
        )
})

// GET /reviews/me — the logged-in client's own reviews, at any status
// (so they can see a review still sitting in "pending" too)
const getMyReviews = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const feedbacks = await FeedbackModel
        .find({ user: req.user._id })
        .populate("projectId", "name stack status")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(
            new ApiResponse(200, feedbacks, "Fetched your reviews")
        )
})

// GET /reviews/:id — the review's own author or an admin can view it
// regardless of status; anyone else only if it's already public
const getReviewById = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Review Id", [], "")
    }

    const feedback = await FeedbackModel.findById(id).populate("user", "fullname avatar company")

    if (!feedback) {
        throw new ApiError(404, "Review not found", [], "")
    }

    const isOwner = feedback.user.toString() === req.user?._id?.toString()
    const isAdmin = req.user?.role === "admin"
    const isPubliclyVisible = feedback.status === "approved" && feedback.isVisible

    if (!isOwner && !isAdmin && !isPubliclyVisible) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, feedback, "Review fetched successfully")
        )
})

// PATCH /reviews/:id/moderate — admin-only. The ONLY endpoint allowed to
// touch status/isVisible — createFeedBack deliberately can't set either.
const moderateReview = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can moderate a review", [], "")
    }

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Review Id", [], "")
    }

    const parsed = ModerateReviewSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const feedback = await FeedbackModel.findByIdAndUpdate(
        id,
        { $set: parsed.data },
        { new: true, runValidators: true }
    )

    if (!feedback) {
        throw new ApiError(404, "Review not found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, feedback, "Review moderated successfully")
        )
})

// DELETE /reviews/:id — admin-only cleanup (spam, client-requested retraction, etc.)
const deleteReview = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can delete a review", [], "")
    }

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Review Id", [], "")
    }

    const feedback = await FeedbackModel.findByIdAndDelete(id)

    if (!feedback) {
        throw new ApiError(404, "Review not found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Review deleted successfully")
        )
})

export {
    createFeedBack,
    getPublicReviews,
    getMyReviews,
    getReviewById,
    moderateReview,
    deleteReview,
}