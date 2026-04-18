import express from "express";
import {
    addLesson,
    deleteLesson,
    getLessonsByCourse,
    updateLesson
} from "../controllers/lessonController.js";

import { checkRole, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/:courseId", verifyToken, checkRole("instructor", "admin"), addLesson);

router.get("/:courseId", verifyToken, getLessonsByCourse);

router.put("/:id", verifyToken, checkRole("instructor", "admin"), updateLesson);

router.delete("/:id", verifyToken, checkRole("instructor", "admin"), deleteLesson);

export default router;