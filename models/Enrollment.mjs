import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    studentId: { type: Number, required: true },
    courseId: { type: Number, required: true },
    grade: { type: String, required: true }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
