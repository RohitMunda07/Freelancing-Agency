import { transporter } from "../../config/mail.js";
import { UserModel } from "../../models/User.model.js";
import ApiError from "../../utils/apiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js"
import { generateOTP, saveOTP } from "../Resend/resend.resetPassword.js";

async function sendEmail(
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

export {
    sendEmail,
}