import Report from '../models/report.Model.js';

export const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports found' });
        }
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReport = async (req, res) => {
    const report = new Report(req.body);
    try {
        const newReport = await report.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getReportByStudentId = async (req, res) => {
    try {
        const report = await Report.findOne({ studentId: req.params.studentId });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateReport = async (req, res) => {
    try {
        const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
