import express from 'express';
import { createReport, getReportByStudentId, updateReport, deleteReport, getAllReports } from '../controllers/report.controller.js';
import { protect, adminOrTeacherOnly } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.use(protect);

router.get('/all', adminOrTeacherOnly, getAllReports);
router.post('/create', adminOrTeacherOnly, createReport);
router.get('/:studentId', getReportByStudentId);
router.put('/update/:id', adminOrTeacherOnly, updateReport);
router.delete('/delete/:id', adminOrTeacherOnly, deleteReport);

export default router;
