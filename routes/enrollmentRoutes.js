import express from "express";
import { enrollCourse, getMyCourses } from "../controllers/enrollmentController.js";

import { checkRole, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:courseId", verifyToken, checkRole("student"), enrollCourse);
router.get("/my-courses", verifyToken, checkRole("student"), getMyCourses);

export default router;