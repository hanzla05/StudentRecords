import express from 'express';
import Enrollment from '../models/Enrollment.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await Enrollment.create(req.body);
        res.status(200).json({ message: "Enrollment Added Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
