import { ProjectModel } from "../models/Project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";
import { ProjectZodSchema, ProjectUpdateSchema } from "../validators/project.schema.js";

// Projects are created and managed by the agency (admin) on behalf of a
// client. A client can only ever read their own projects — never create,
// edit, or delete one themselves.

// POST /projects — admin only
const createProject = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can create a project", [], "")
    }

    const parsed = ProjectZodSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    // Confirm the client this project is being assigned to actually exists,
    // rather than letting a bad ObjectId silently create an orphaned project
    const existingUser = await mongoose.model("UserModel").findById(parsed.data.user)
    if (!existingUser) {
        throw new ApiError(404, "Client (user) not found", [], "")
    }

    const project = await ProjectModel.create(parsed.data)

    return res
        .status(201)
        .json(
            new ApiResponse(201, project, "Project created successfully")
        )
})

// GET /projects — admin sees every project, a client sees only their own
const getProjects = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const filter = req.user.role === "admin" ? {} : { user: req.user._id }

    const projects = await ProjectModel
        .find(filter)
        .populate("user", "fullname email avatar company")
        .sort({ createdAt: -1 })

    return res
        .status(200)
        .json(
            new ApiResponse(200, projects, "Projects fetched successfully")
        )
})

// GET /projects/:id — owner or admin
const getProjectById = asyncHandler(async (req, res) => {

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid project ID", [], "")
    }

    const project = await ProjectModel.findById(id).populate("user", "fullname email avatar company")

    if (!project) {
        throw new ApiError(404, "Project not found", [], "")
    }

    // A client can only view their own project — not just any ID they guess
    if (req.user?.role !== "admin" && project.user._id.toString() !== req.user?._id?.toString()) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, project, "Project fetched successfully")
        )
})

// PATCH /projects/:id — admin only (status, progress, dueDate, etc.)
const updateProject = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can update a project", [], "")
    }

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid project ID", [], "")
    }

    const parsed = ProjectUpdateSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const project = await ProjectModel.findByIdAndUpdate(
        id,
        { $set: parsed.data },
        { new: true, runValidators: true }
    )

    if (!project) {
        throw new ApiError(404, "Project not found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, project, "Project updated successfully")
        )
})

// DELETE /projects/:id — admin only
const deleteProject = asyncHandler(async (req, res) => {

    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Only an admin can delete a project", [], "")
    }

    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid project ID", [], "")
    }

    const project = await ProjectModel.findByIdAndDelete(id)

    if (!project) {
        throw new ApiError(404, "Project not found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Project deleted successfully")
        )
})

export {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
}