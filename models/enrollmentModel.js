import mongoose from "mongoose";
const enrollmentSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    progress: { type: Number, default: 0 },
},
    { timestamps: true }
);
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);

export default enrollmentModel;