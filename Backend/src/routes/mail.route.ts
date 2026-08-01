import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import {
    getMails,
    getMailById
} from "../controllers/Mail.controller.js"

const router = Router()

router.route("/mails").get(verifyJWT, getMails)
router.route("/mails/:id").get(verifyJWT, getMailById)

export default router;