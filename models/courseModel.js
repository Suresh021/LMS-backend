import mongoose from "mongoose";
const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
},
    { timestamps: true }
);
const courseModel = mongoose.model("Courses", courseSchema)
export default courseModel