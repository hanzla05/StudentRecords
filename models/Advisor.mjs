import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema({
    advisorId: { type: Number, required: true, unique: true },
    advisorName: { type: String, required: true },
    advisorPhone: { type: String, required: true }
});

const Advisor = mongoose.model('Advisor', advisorSchema);
export default Advisor;
