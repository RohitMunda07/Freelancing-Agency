import { MailModel } from "../models/Mail.model";
import { asyncHandler } from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";
import { MailZodSchema } from "../validators/mail.schema";

const getMails = asyncHandler(async (req, res) => {
    const { filter } = req.query as { filter?: string }

    const mails = await MailModel.find(filter)
})