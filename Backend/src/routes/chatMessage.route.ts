import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import {
    sendQuickMessage,
    sendProjectMessage,
    updateStatus,
    deleteMessage,
    getAllMessage
} from "../controllers/ChatMessage.controller.js"

const router = Router()

router.route("/messages").get(verifyJWT, getAllMessage)
router.route("/messages/quick-message").post(sendQuickMessage)
router.route("/messages/project-message").post(verifyJWT, sendProjectMessage)
router.route("/messages/:messageId").patch(verifyJWT, updateStatus)
router.route("/messages/:messageId").delete(verifyJWT, deleteMessage)

export default router;