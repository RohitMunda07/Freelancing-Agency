import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    createFeedBack,
    getPublicReviews,
    getMyReviews,
    getReviewById,
    moderateReview,
    deleteReview,
} from "../controllers/Feedback.controller.js"

const router = Router()

router.route("/reviews").post(verifyJWT, createFeedBack)
router.route("/reviews/me").get(verifyJWT, getMyReviews)
router.route("/reviews/:id").get(verifyJWT, getReviewById)
router.route("/reviews/:id/moderate").get(verifyJWT, moderateReview)
router.route("/reviews/:id").delete(verifyJWT, deleteReview)
// this is visible for status = true
router.route("/reviews").get(verifyJWT, getPublicReviews)

export default router;