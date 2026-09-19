import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    // origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))
app.use(express.urlencoded({ limit: "20kb", extended: true }))
app.use(express.static("public"))
app.use(express.json({ limit: "20kb" }))
app.use(cookieParser())

// ------- routes import -------
import {
    userRoute,
    paymentRoute,
    projectRoute,
    mailRouter,
    invoiceRouter,
    feedbackRouter,
    chatMessageRouter
} from "./routes/routes.js"

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Backend is healthy",
        timestamp: new Date().toISOString(),
    });
});

app.use("/api/v1/user", userRoute)
app.use("/api/v1/project", projectRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/mail", mailRouter)
app.use("/api/v1/invoice", invoiceRouter)
app.use("/api/v1/review", feedbackRouter)
app.use("/api/v1/chat", chatMessageRouter)



export default app;