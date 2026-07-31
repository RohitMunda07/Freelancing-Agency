import "./env"; 
// import dotenv from "dotenv"
// dotenv.config(
//     { path: './.env' }
// )

import app from "./app"
import connectDB from "./DB/connectdb"
import ApiError from "./utils/apiError"
import { transporter } from "./config/mail"

const startServer = async () => {
    try {
        await connectDB();
        app.get("/", (req, res) => {
            res.send("Alright!!")
        })

        const port = process.env.PORT
        if (!port) {
            throw new ApiError(404, "Port not found")
        }

        await transporter.verify();

        console.log("SMTP Connected");

        app.listen(port, () => {
            console.log("Server is running on", port);
        })
    } catch (error) {
        console.log("Failed to start the server", error);
        process.exit(1);
    }
}

startServer();