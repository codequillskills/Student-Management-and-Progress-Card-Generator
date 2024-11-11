import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    subjects: [{
        name: String,
        marks: Number,
        grade: String
    }],
    overallGrade: String,
    remarks: String
}, { timestamps: true });

// Function to calculate grade based on marks
function calculateGrade(marks) {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
}

// Function to calculate remarks based on overall grade
function calculateRemarks(overallGrade) {
    switch (overallGrade) {
        case 'A+': return 'Outstanding Performance';
        case 'A': return 'Excellent Performance';
        case 'B': return 'Very Good Performance';
        case 'C': return 'Good Performance';
        case 'D': return 'Satisfactory Performance';
        default: return 'Needs Improvement';
    }
}

// Pre-save middleware to calculate grades, overall grade, and remarks
reportSchema.pre('save', function(next) {
    try {
        // Calculate grade for each subject
        this.subjects.forEach(subject => {
            subject.grade = calculateGrade(subject.marks);
        });

        // Calculate overall grade
        const totalMarks = this.subjects.reduce((sum, subject) => sum + subject.marks, 0);
        const averageMarks = this.subjects.length > 0 ? totalMarks / this.subjects.length : 0;
        this.overallGrade = calculateGrade(averageMarks);

        // Set remarks based on overall grade
        this.remarks = calculateRemarks(this.overallGrade);

        next();
    } catch (error) {
        next(error);
    }
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
