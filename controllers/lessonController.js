import Course from "../models/courseModel.js";
import Lesson from "../models/lessonModel.js";

export const addLesson = async (req, res) => {
    try {
        const { title, content, videoUrl } = req.body;

        const course = await Course.findById(req.params.courseId);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (
            req.user.role !== "admin" &&
            course.instructor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const lesson = await Lesson.create({
            title,
            content,
            videoUrl,
            course: course._id
        });

        course.lessons.push(lesson._id);
        await course.save();

        res.status(201).json({ message: "Lesson added", lesson });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLessonsByCourse = async (req, res) => {
    try {
        const lessons = await Lesson.find({
            course: req.params.courseId
        });

        res.status(200).json(lessons);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        const course = await Course.findById(lesson.course);

        if (
            req.user.role !== "admin" &&
            course.instructor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Lesson updated",
            updatedLesson
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);

        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }

        const course = await Course.findById(lesson.course);

        if (
            req.user.role !== "admin" &&
            course.instructor.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Lesson.findByIdAndDelete(req.params.id);

        await Course.findByIdAndUpdate(lesson.course, {
            $pull: { lessons: lesson._id }
        });

        res.status(200).json({ message: "Lesson deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};