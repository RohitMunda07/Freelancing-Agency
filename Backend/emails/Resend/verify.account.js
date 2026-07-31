import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({
  path: "./.env"
})

// console.log(__dirname)
console.log("0");
console.log("PORT", process.env.PORT);

// console.log("resend", process.env.RESEND_API_KEY);

// const resend = new Resend(process.env.RESEND_API_KEY);

// const from = "Acme <onboarding@resend.dev>";


// // ============================ Verification Email ================================================
// const { data, error } = await resend.emails.send({
//   from,
//   to: ["testrk1418@gmail.com"],
//   subject: "Testing email!",
//   html: "<h1>Welcome!</h1><p>This email was sent using Resend's Node.js SDK.</p>",
//   text: "Welcome! This email was sent using Resend's Node.js SDK.",
// });

// if (error) {
//   console.error("Error sending email:", error);
//   process.exit(1);
// }

// console.log("Email sent successfully!");
// console.log("Email ID:", data?.id);
