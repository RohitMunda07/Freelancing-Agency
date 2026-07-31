import { MailModel } from "../models/Mail.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import mongoose from "mongoose";

const getMails = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const filter = req.user?.role === 'admin' ? {} : { user: req.user?._id }

    const emails = await MailModel.find(filter).sort({ createdAt: -1 });

    if (emails.length === 0) {
        throw new ApiError(404, "No Emails found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, emails, "Emails fetched successfully")
        )
})

const getMailById = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

    const { mail } = req.params as { mail: string }
    if (!mongoose.isValidObjectId(mail)) {
        throw new ApiError(400, "invalid mail Id")
    }

    const existingMail = await MailModel.findById(mail);
    if (!existingMail) {
        throw new ApiError(404, "No mail found")
    }

    if (req.user?.role !== 'admin' && existingMail.user.toString() !== req.user?._id.toString()) {
        throw new ApiError(403, "Forbidden", [], "")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, existingMail, "Mail fetched successfully")
        )
})

export {
    getMails,
    getMailById
}