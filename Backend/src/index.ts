import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import connectDB from "./DB/connectdb"
import ApiError from "./utils/apiError"

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

        app.listen(port, () => {
            console.log("Server is running on", port);
        })
    } catch (error) {
        console.log("Failed to start the server", error);
        process.exit(1);
    }
}

startServer();