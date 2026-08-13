import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import { ChatMessageModel } from "../models/ChatMessage.model.js";
import { SubmitContactFormSchema, SubmitQuickFormSchema, UpdateMessageStatusSchema } from "../validators/message.schema.js"
import mongoose from "mongoose";

// Send Quick Message
const sendQuickMessage = asyncHandler(async (req, res) => {
    const parsed = SubmitQuickFormSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const message = await ChatMessageModel.create(parsed.data)
    if (!message) {
        throw new ApiError(500, "Error creating message")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, message, "Quick Message Created Successfully")
        )
})

// Send Project Message
const sendProjectMessage = asyncHandler(async (req, res) => {
    const parsed = SubmitContactFormSchema.safeParse(req.body)

    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const message = await ChatMessageModel.create(parsed.data)
    if (!message) {
        throw new ApiError(500, "Error creating message")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, message, "Project Message Created Successfully")
        )
})

// Update Status
const updateStatus = asyncHandler(async (req, res) => {
    const { messageId } = req.params
    if (!mongoose.isValidObjectId(messageId)) {
        throw new ApiError(400, "Invalid Message Id", [], "")
    }
    console.log(req.params);
    console.log(req.body);

    const parsed = UpdateMessageStatusSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new ApiError(400, parsed.error.issues[0]?.message || "Validation failed", [], "")
    }

    const existingMessage = await ChatMessageModel.findByIdAndUpdate(
        messageId,
        { status: parsed.data.status },
        { returnDocument: "after", runValidators: true }
    )

    if (!existingMessage) {
        throw new ApiError(404, "No message found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, existingMessage, "Toggle Message Status Successfully")
        )
})

const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params
    if (!mongoose.isValidObjectId(messageId)) {
        throw new ApiError(400, "Invalide Message Id", [], "")
    }

    const deletedMessage = await ChatMessageModel.findByIdAndDelete(messageId)
    if (!deletedMessage) {
        throw new ApiError(500, "Error Deleting Message", [], "")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Message Deleted Succefully"))
})

const getAllMessage = asyncHandler(async (req, res) => {
    if (req.user?.role !== "admin") {
        throw new ApiError(403, "Unauthorized Request")
    }

    const messages = await ChatMessageModel.find().sort({ createdAt: -1 })
    if (messages.length === 0) {
        throw new ApiError(404, "No Messsages Found", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, messages, "Fetched All messages")
        )
})

export {
    sendQuickMessage,
    sendProjectMessage,
    updateStatus,
    deleteMessage,
    getAllMessage
}