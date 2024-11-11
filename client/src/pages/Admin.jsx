import React, { useState, useEffect } from "react";
import { FaChalkboardTeacher, FaUserGraduate, FaUserCog, FaEdit, FaSave, FaTimes, FaTrash, FaSort, FaFilePdf } from "react-icons/fa";
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RoleSelector = ({ currentRole, onChange }) => (
  <select 
    value={currentRole} 
    onChange={(e) => onChange(e.target.value)}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="student">Student</option>
    <option value="teacher">Teacher</option>
    <option value="admin">Admin</option>
  </select>
);

const UserCard = ({ user, onUserUpdate, onUserDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const navigate = useNavigate();

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    onUserUpdate(editedUser);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };
  const handleReport = () => {
    navigate(`/report/${user._id}`);
  };
  const handleChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  const handleDelete = () => onUserDelete(user._id);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center mb-4">
        <div className="text-2xl sm:text-3xl mr-3 sm:mr-4 text-indigo-500 flex-shrink-0">
          {user.role === 'teacher' ? <FaChalkboardTeacher /> : 
           user.role === 'admin' ? <FaUserCog /> : <FaUserGraduate />}
        </div>
        <div className="w-full min-w-0">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="text-lg sm:text-xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-indigo-500 w-full truncate"
            />
          ) : (
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{user.name}</h3>
          )}
        </div>
      </div>
      {isEditing ? (
        <>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <RoleSelector currentRole={editedUser.role} onChange={(role) => setEditedUser({ ...editedUser, role })} />
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
              <FaSave />
            </button>
            <button onClick={handleCancel} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
              <FaTimes />
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600 truncate">{user.email}</p>
          <p className="text-gray-600 truncate">Phone: {user.phone}</p>
          <p className="text-gray-600 capitalize truncate">Role: {user.role}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={handleEdit} className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600">
              <FaEdit />
            </button>
            <button onClick={handleReport} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
              <FaFilePdf />
            </button>
            <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600">
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const AddUserModal = ({ isOpen, onClose, onSave }) => {
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'student' });

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Name"
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email"
            className="mb-2 w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="mb-2 w-full p-2 border rounded"
          />
          <RoleSelector currentRole={newUser.role} onChange={(role) => setNewUser({ ...newUser, role })} />
          <div className="mt-4 flex justify-end space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
    getCurrentUserRole();
  }, []);

  const getCurrentUserRole = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const res = await axios.get(`${API_URL}/api/user/getRole/${decodedToken.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUserRole(res.data.role);
        if(res.data.role === 'teacher'){
          navigate('/teacher');
        }
        else if(res.data.role === 'student'){
          navigate('/student');
        }
      } catch (error) {
        console.error('Error getting role:', error.response ? error.response.data : error.message);
        setCurrentUserRole('student');
        navigate('/student');
      }
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get(`${API_URL}/api/user/allUsers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
    } catch (err) {
      console.error('Error fetching users:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in.');
        navigate('/login');
      } else {
        setError('Failed to fetch users. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserUpdate = async (updatedUser) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/user/updateuser/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(user => 
        user._id === updatedUser._id ? updatedUser : user
      ));
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again later.');
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again later.');
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/api/user/register`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers([...users, response.data.user]);
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again later.');
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const filteredUsers = filter === 'all' ? sortedUsers : sortedUsers.filter(user => user.role === filter);

  if (isLoading) {
    return <div className="text-center mt-8">Loading users...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500 mb-4">
          <span role="img" aria-label="Error">❗️</span> {error}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.header 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-2 sm:mb-4">Admin Dashboard</h1>
          <p className="text-lg sm:text-xl text-gray-600">Manage users and their roles</p>
        </motion.header>

        <motion.div 
          className="mb-6 sm:mb-8 flex flex-wrap justify-center items-center gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex rounded-md shadow-sm" role="group">
            {['all', 'student', 'teacher', 'admin'].map((filterOption) => (
              <motion.button 
                key={filterOption}
                onClick={() => setFilter(filterOption)} 
                className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium ${filter === filterOption ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500 hover:bg-indigo-50'} ${filterOption === 'all' ? 'rounded-l-lg' : filterOption === 'admin' ? 'rounded-r-lg' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}s
              </motion.button>
            ))}
          </div>
          <motion.button
            onClick={toggleSortOrder}
            className="px-3 sm:px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sort by Name <FaSort className="ml-2" />
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 p-4 bg-white bg-opacity-50 rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-250px)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredUsers.map(user => (
              <motion.div
                key={user._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard 
                  user={user} 
                  onUserUpdate={handleUserUpdate}
                  onUserDelete={handleUserDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;