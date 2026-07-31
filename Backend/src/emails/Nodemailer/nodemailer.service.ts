import { transporter } from "../../config/mail.js";
import ApiError from "../../utils/apiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js"
export async function sendEmail(
    to: string,
    subject: string,
    html: string
) {

    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
    });
}

const verifyEmail = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized", [], "")
    }

})