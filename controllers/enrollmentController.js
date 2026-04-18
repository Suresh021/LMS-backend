import courseModel from "../models/courseModel.js";
import Enrollment from "../models/enrollmentModel.js";
import userModel from "../models/userModel.js";

export const enrollCourse = async (req, res) => {
    try {
        const studentId = req.user.id;
        const courseId = req.params.courseId;

        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Only students can enroll" });
        }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existing = await Enrollment.findOne({
            student: studentId,
            course: courseId
        });

        if (existing) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId
        });

        await userModel.findByIdAndUpdate(studentId, {
            $addToSet: { enrolledCourses: courseId }
        });

        await courseModel.findByIdAndUpdate(courseId, {
            $addToSet: { studentsEnrolled: studentId }
        });

        res.status(201).json({
            message: "Enrolled successfully",
            enrollment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyCourses = async (req, res) => {
    try {
        const studentId = req.user.id;

        const enrollments = await Enrollment.find({ student: studentId })
            .populate({
                path: "course",
                populate: [
                    { path: "instructor", select: "name email" },
                    { path: "lessons" }
                ]
            });

        const courses = enrollments.map(e => e.course);

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};