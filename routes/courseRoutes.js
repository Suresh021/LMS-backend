import express from "express";
import {
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    updateCourse
} from "../controllers/courseController.js";
import { checkRole, verifyToken } from "../middleware/authMiddleware.js";

const courseRoutes = express.Router();

courseRoutes.post("/", verifyToken, checkRole("instructor", "admin"), createCourse);
courseRoutes.get("/", getAllCourses);
courseRoutes.get("/:id", getCourseById);
courseRoutes.put("/:id", verifyToken, checkRole("instructor", "admin"), updateCourse);
courseRoutes.delete("/:id", verifyToken, checkRole("instructor", "admin"), deleteCourse);

export default courseRoutes;