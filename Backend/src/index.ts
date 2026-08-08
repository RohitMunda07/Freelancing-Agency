import "./env";
// import dotenv from "dotenv"
// dotenv.config(
//     { path: './.env' }
// )

import app from "./app.js"
import connectDB from "./DB/connectdb.js"
import ApiError from "./utils/apiError.js"
import { transporter } from "./config/mail.js"
import { sendEmail } from "./emails/Nodemailer/nodemailer.service.js";

const data = {
message: 'Hello, this is a JSON response!',
status: 'success',
timestamp: new Date()
};

const startServer = async () => {
    try {
        await connectDB();
        app.get("/", (req, res) => {
            res.send("Alright!!").json({
                status: 200,
                message: "Every thing is fine",
                data
            })
        })

        console.log();


        const port = process.env.PORT
        if (!port) {
            throw new ApiError(404, "Port not found")
        }

        // await transporter.verify();

        // console.log("SMTP Connected");

        // await sendEmail("rohit.dev14818@gmail.com", "SMTP Test",
        //     `
        //     <h1>Hello Rohit 👋</h1>
        // <p>Your Nodemailer setup is working successfully.</p>
        //     `
        // );

        // console.log("Test email sent");

        app.listen(port, () => {
            console.log("Server is running on", port);
        })
    } catch (error) {
        console.log("Failed to start the server", error);
        process.exit(1);
    }
}

startServer();