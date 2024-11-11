import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Report = () => {
    const [reportData, setReportData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const reportResponse = await axios.get(`${API_URL}/api/report/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReportData(reportResponse.data);

                if (reportResponse.data.studentId) {
                    const userResponse = await axios.get(`${API_URL}/api/user/getUser/${reportResponse.data.studentId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUserData(userResponse.data.user);
                } else {
                    console.warn('No studentId found in report data');
                }

                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || 'An error occurred while fetching data');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, API_URL]);

    const downloadReport = () => {
        const input = document.getElementById('printable-content');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('academic_report.pdf');
        });
    };

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!reportData) return <div className="text-center mt-8">No report data found</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div id="printable-content" className="p-8">
                    <div className="bg-blue-500 py-6 px-8 -mx-8 -mt-8 mb-8 relative overflow-hidden">
                        <h1 className="text-2xl font-bold text-white text-center relative z-10">Academic Report Card</h1>
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 transform -skew-y-6 origin-top-left -translate-y-1/2"></div>
                    </div>
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-blue-600">
                                {userData?.name || 'Student Name Not Available'}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {userData?.email || 'Student Email Not Available'}
                            </p>
                        </div>
                        
                        {/* Subject Grades */}
                        <div className="relative">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700 inline-block relative">
                                Subject Grades
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-blue-500">
                                            <th className="py-2 px-4 text-left font-semibold text-blue-600">Subject</th>
                                            <th className="py-2 px-4 text-left font-semibold text-blue-600">Marks</th>
                                            <th className="py-2 px-4 text-left font-semibold text-blue-600">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportData.subjects.map((subject, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-800">{subject.name}</td>
                                                <td className="py-3 px-4 text-gray-800">{subject.marks}</td>
                                                <td className="py-3 px-4 text-gray-800">{subject.grade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Overall Performance */}
                        <div className="relative">
                            <h3 className="text-xl font-semibold mb-3 text-gray-700 inline-block relative">
                                Overall Performance
                            </h3>
                            <p className="text-gray-800"><span className="font-semibold">Overall Grade:</span> {reportData.overallGrade}</p>
                            <p className="text-gray-800 mt-2"><span className="font-semibold">Remarks:</span> {reportData.remarks}</p>
                        </div>
                    </div>
                </div>
                
                {/* Download button outside of printable content */}
                <div className="bg-gray-100 p-4 text-center">
                    <button 
                        onClick={downloadReport}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Report;
