import express from 'express';
import Advisor from '../models/Advisor.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await Advisor.create(req.body);
        res.status(200).json({ message: "Advisor Added Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
