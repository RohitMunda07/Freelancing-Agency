import { transporter } from "../../src/config/mail";

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