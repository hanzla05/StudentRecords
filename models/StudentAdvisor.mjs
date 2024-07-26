import mongoose from "mongoose";

const studentAdvisorSchema = new mongoose.Schema({
    studentId: { type: Number, required: true },
    advisorId: { type: Number, required: true }
});

const StudentAdvisor = mongoose.model('StudentAdvisor', studentAdvisorSchema);
export default StudentAdvisor;
