import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaEye, FaEdit, FaUserGraduate } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Teacher = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [subjects, setSubjects] = useState([{ name: '', marks: '' }]);
  const [reportId, setReportId] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportError, setReportError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUserRole = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const res = await axios.get(`${API_URL}/api/user/getRole/${decodedToken.userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUserRole(res.data.role);
          if (res.data.role !== 'teacher') {
            setError('You are not authorized to access this page');
            // navigate('/');
          } else {
            fetchStudents();
          }
        } catch (error) {
          console.error('Error getting role:', error);
          setError('Error verifying user role');
          navigate('/');
        }
      } else {
        setError('No authentication token found');
        navigate('/');
      }
      setLoading(false);
    };

    getCurrentUserRole();
  }, [API_URL, navigate]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const usersResponse = await axios.get(`${API_URL}/api/user/allUsers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (usersResponse.status === 403) {
        setError('You are not authorized to access this information');
        return;
      }
      
      const students = usersResponse.data.users.filter(user => user.role === 'student');

      let reports = [];
      try {
        const reportsResponse = await axios.get(`${API_URL}/api/report/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        reports = reportsResponse.data;
      } catch (reportError) {
        console.error('Error fetching reports:', reportError);
      }

      const studentsWithReportStatus = students.map(student => ({
        ...student,
        id: student._id,
        hasReport: reports.some(report => report.studentId === student._id)
      }));

      setStudents(studentsWithReportStatus);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Error fetching students. Please try again later.');
    }
  };

  const handleAddReport = (student) => {
    setSelectedStudent(student);
    setShowReportForm(true);
    setSubjects([{ name: '', marks: '' }]);
    setReportId(null);
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', marks: '' }]);
  };

  const removeSubject = (index) => {
    if (subjects.length === 1) {
      console.warn("Cannot remove the last subject.");
      return;
    }
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const submitReport = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      let response;
      if (reportId) {
        // Calculate grades and overall grade
        const subjectsWithGrades = subjects.map(subject => ({
          name: subject.name,
          marks: parseInt(subject.marks),
          grade: calculateGrade(parseInt(subject.marks))
        }));
        const totalMarks = subjectsWithGrades.reduce((sum, subject) => sum + subject.marks, 0);
        const averageMarks = subjectsWithGrades.length > 0 ? totalMarks / subjectsWithGrades.length : 0;
        const overallGrade = calculateGrade(averageMarks);
        const remarks = calculateRemarks(overallGrade);

        response = await axios.put(`${API_URL}/api/report/update/${reportId}`, {
          subjects: subjectsWithGrades,
          overallGrade,
          remarks
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Calculate grades and overall grade
        const subjectsWithGrades = subjects.map(subject => ({
          name: subject.name,
          marks: parseInt(subject.marks),
          grade: calculateGrade(parseInt(subject.marks))
        }));
        const totalMarks = subjectsWithGrades.reduce((sum, subject) => sum + subject.marks, 0);
        const averageMarks = subjectsWithGrades.length > 0 ? totalMarks / subjectsWithGrades.length : 0;
        const overallGrade = calculateGrade(averageMarks);
        const remarks = calculateRemarks(overallGrade);

        response = await axios.post(`${API_URL}/api/report/create`, {
          studentId: selectedStudent._id,
          studentName: selectedStudent.name, 
          studentEmail: selectedStudent.email,
          subjects: subjectsWithGrades,
          overallGrade,
          remarks
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      console.log('Report submitted successfully:', response.data);
      setShowReportForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Error submitting report:', error.response?.data || error.message);
      setReportError(error.response?.data?.message || 'An error occurred while submitting the report');
    }
  };

  // Helper functions to calculate grade and remarks
  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    if (marks >= 50) return 'D';
    return 'F';
  };

  const calculateRemarks = (overallGrade) => {
    switch (overallGrade) {
      case 'A+': return 'Outstanding Performance';
      case 'A': return 'Excellent Performance';
      case 'B': return 'Very Good Performance';
      case 'C': return 'Good Performance';
      case 'D': return 'Satisfactory Performance';
      default: return 'Needs Improvement';
    }
  };

  const deleteReport = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      // First, fetch the report ID for the given student
      const reportResponse = await axios.get(`${API_URL}/api/report/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!reportResponse.data || !reportResponse.data._id) {
        console.error('No report found for this student');
        return;
      }
      
      const reportId = reportResponse.data._id;
      
      // Now delete the report using the report ID
      await axios.delete(`${API_URL}/api/report/delete/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Report deleted successfully');
      fetchStudents(); 
    } catch (error) {
      console.error('Error deleting report:', error.response?.data || error.message);
      // You might want to show an error message to the user here
    }
  };

  const viewReport = (student) => {
    navigate(`/report/${student._id}`);
  };

  const updateReport = async (student) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/report/${student._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedStudent(student);
      setSubjects(response.data.subjects);
      setReportId(response.data._id);
      setShowReportForm(true);
    } catch (error) {
      console.error('Error fetching report for update:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
          <FaUserGraduate className="mr-3 text-blue-600" />
          Student Management Dashboard
        </h1>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student._id} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{student.name}</h2>
                    <p className="text-gray-600 mb-1">{student.email}</p>
                    <p className="text-gray-600">{student.phone || 'No phone number'}</p>
                  </div>
                  <div className="bg-gray-50 px-6 py-4">
                    {student.hasReport ? (
                      <div className="flex justify-between items-center">
                        <button onClick={() => viewReport(student)} className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out">
                          <FaEye className="inline mr-2" /> View
                        </button>
                        <button onClick={() => updateReport(student)} className="text-green-500 hover:text-green-700 transition duration-300 ease-in-out">
                          <FaEdit className="inline mr-2" /> Edit
                        </button>
                        <button onClick={() => deleteReport(student._id)} className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out">
                          <FaTrash className="inline mr-2" /> Delete
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddReport(student)} 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        <FaPlus className="inline mr-2" /> Add Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {students.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <FaUserGraduate className="mx-auto text-6xl text-gray-400 mb-4" />
            <p className="text-2xl text-gray-600 mb-2">No students found</p>
            <p className="text-gray-500">There are currently no students in the system.</p>
          </div>
        )}
      </div>

      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md flex flex-col max-h-[90vh]">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{reportId ? 'Update' : 'Add'} Report for {selectedStudent.name}</h2>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <form onSubmit={submitReport} id="reportForm">
                {reportError && (
                  <div className="text-red-500 mb-4">{reportError}</div>
                )}
                {subjects.map((subject, index) => (
                  <div key={index} className="mb-6">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      value={subject.name}
                      onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Marks"
                      value={subject.marks}
                      onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {subjects.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeSubject(index)} 
                        className="mt-2 text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                      >
                        Remove Subject
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addSubject} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4 transition duration-300 ease-in-out"
                >
                  Add Subject
                </button>
              </form>
            </div>
            <div className="p-6 border-t">
              <button 
                type="submit" 
                form="reportForm"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out mb-4"
              >
                {reportId ? 'Update' : 'Submit'} Report
              </button>
              <button 
                onClick={() => setShowReportForm(false)} 
                className="w-full text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;