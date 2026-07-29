import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config()
console.log("0");

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("1");

const from = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";

// ============================ Verification Email ================================================
const { data, error } = await resend.emails.send({
  from,
  to: ["rohitkumar14818@gmail.com"],
  subject: "Hello from Resend!",
  html: "<h1>Welcome!</h1><p>This email was sent using Resend's Node.js SDK.</p>",
  text: "Welcome! This email was sent using Resend's Node.js SDK.",
});

if (error) {
  console.error("Error sending email:", error);
  process.exit(1);
}

console.log("Email sent successfully!");
console.log("Email ID:", data?.id);
