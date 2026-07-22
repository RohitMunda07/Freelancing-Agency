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
app.use(express.json({ limit: "20kb" }))
app.use(cookieParser())

// ------- routes import -------


export default app;