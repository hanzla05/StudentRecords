import express from 'express';
import mongoose from 'mongoose';
import StudentRouter from './routes/Students.mjs';
import CourseRouter from './routes/Courses.mjs';
import EnrollmentRouter from './routes/Enrollments.mjs';
import AdvisorRouter from './routes/Advisors.mjs';
import StudentAdvisorRouter from './routes/StudentAdvisors.mjs';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/StudentRecords", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('connected', () => console.log('Database Connected'));
connection.on('error', (error) => console.log('Database connection error', error));

app.use('/students', StudentRouter);
app.use('/courses', CourseRouter);
app.use('/enrollments', EnrollmentRouter);
app.use('/advisors', AdvisorRouter);
app.use('/studentAdvisors', StudentAdvisorRouter);

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
