import express from 'express';
import Student from '../models/Student.mjs';
import Enrollment from '../models/Enrollment.mjs';
import Course from '../models/Course.mjs';
import Advisor from '../models/Advisor.mjs';
import StudentAdvisor from '../models/StudentAdvisor.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = await Student.create(req.body);
        res.status(200).json({ message: "Student Added Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        
        const data = await Student.aggregate([
            { $match: { studentId: studentId } },
            {
                $lookup: {
                    from: 'enrollments',
                    localField: 'studentId',
                    foreignField: 'studentId',
                    as: 'enrollments'
                }
            },
            { $unwind: '$enrollments' },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'enrollments.courseId',
                    foreignField: 'courseId',
                    as: 'courseDetails'
                }
            },
            { $unwind: '$courseDetails' },
            {
                $lookup: {
                    from: 'studentadvisors',
                    localField: 'studentId',
                    foreignField: 'studentId',
                    as: 'studentAdvisors'
                }
            },
            { $unwind: '$studentAdvisors' },
            {
                $lookup: {
                    from: 'advisors',
                    localField: 'studentAdvisors.advisorId',
                    foreignField: 'advisorId',
                    as: 'advisorDetails'
                }
            },
            { $unwind: '$advisorDetails' },
            {
                $group: {
                    _id: '$studentId',
                    studentId: { $first: '$studentId' },
                    studentName: { $first: '$studentName' },
                    email: { $first: '$email' },
                    major: { $first: '$major' },
                    graduationYear: { $first: '$graduationYear' },
                    courses: {
                        $push: {
                            courseId: '$courseDetails.courseId',
                            courseName: '$courseDetails.courseName',
                            grade: '$enrollments.grade'
                        }
                    },
                    advisors: {
                        $push: {
                            advisorId: '$advisorDetails.advisorId',
                            advisorName: '$advisorDetails.advisorName',
                            advisorPhone: '$advisorDetails.advisorPhone'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: 1,
                    studentName: 1,
                    email: 1,
                    major: 1,
                    graduationYear: 1,
                    courses: 1,
                    advisors: 1
                }
            }
        ]);

        res.status(200).json({ message: "Student Data Retrieved Successfully", data });
    } catch (error) {
        res.json({ message: error.message });
    }
});

export default router;
