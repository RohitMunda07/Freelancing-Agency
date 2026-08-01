import Router from "express"
import { verifyJWT } from "../middleware/auth.middleware.js"
import {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    toggleMilestone
} from "../controllers/Project.controller.js"

const router = Router()

router.route("/projects").post(verifyJWT, createProject)
router.route("/projects").get(verifyJWT, getProjects)
router.route("/projects/:id").get(verifyJWT, getProjectById)
router.route("/projects/:id").patch(verifyJWT, updateProject)
router.route("/projects/:id").delete(verifyJWT, deleteProject)
router.route("/projects/:id/milestones/:index").patch(verifyJWT, toggleMilestone)

export default router;