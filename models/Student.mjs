import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentId: { type: Number, required: true, unique: true },
    studentName: { type: String, required: true },
    email: { type: String, required: true },
    major: { type: String, required: true },
    graduationYear: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
