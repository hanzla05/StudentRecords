import express from 'express';
import Course from '../models/Course.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await Course.create(req.body);
        res.status(200).json({ message: "Course Added Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
