import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGN,
    credentials: true
}))
app.use(express.urlencoded({ limit: "20kb", extended: true }))
app.use(express.static("public"))
app.use(express.json({ limit: "20kb"}))
app.use(cookieParser())

// ------- routes import -------
import {
    userRoute,
    paymentRoute,
    projectRoute,
    mailRouter,
    invoiceRouter,
    feedbackRouter
} from "./routes/routes.js"

app.use("/api/v1/user", userRoute)
app.use("/api/v1/project", projectRoute)
app.use("/api/v1/payment", paymentRoute)
app.use("/api/v1/mail", mailRouter)
app.use("/api/v1/invoice", invoiceRouter)
app.use("/api/v1/review", feedbackRouter)



export default app;