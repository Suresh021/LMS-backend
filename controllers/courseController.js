import courseModel from "../models/courseModel.js";
import "../models/lessonModel.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, price } = req.body;

        if (req.user.role !== "instructor" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Only instructors and admins can create courses" });
        }

        const course = new courseModel({
            title,
            description,
            price,
            instructor: req.user.id
        });

        await course.save();

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.find()
            .populate("instructor", "name email")
            .populate("lessons");

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id)
            .populate("instructor", "name email")
            .populate("lessons");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (
            req.user.role !== "admin" &&
            course.instructor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Course updated successfully",
            updatedCourse
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const course = await courseModel.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (
            req.user.role !== "admin" &&
            course.instructor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await course.deleteOne();

        res.status(200).json({ message: "Course deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};