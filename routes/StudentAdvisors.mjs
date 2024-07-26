import express from 'express';
import StudentAdvisor from '../models/StudentAdvisor.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await StudentAdvisor.create(req.body);
        res.status(200).json({ message: "StudentAdvisor Added Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
