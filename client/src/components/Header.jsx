import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDashboardClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getRole/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userRole = response.data.role;

      switch (userRole) {
        case 'admin':
          navigate('/admin');
          break;
        case 'teacher':
          navigate('/teacher');
          break;
        case 'student':
          navigate(`/report/${userId}`);
          break;
        default:
          console.error('Unknown user role');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.div 
          className="text-xl md:text-2xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Report Generation System
        </motion.div>
        
        {/* Hamburger/Close menu for mobile and tablet */}
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </button>

        {/* Navigation for desktop */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6">
          {['home', 'about', 'notices', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-sm lg:text-base hover:text-pink-200 transition duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
          {isLoggedIn ? (
            <>
              <motion.button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base hover:bg-pink-100 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
              <motion.button
                onClick={handleDashboardClick}
                className="bg-white text-pink-600 px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base hover:bg-pink-100 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login" className="bg-white text-pink-600 px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base hover:bg-pink-100 transition duration-300">Login</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="bg-white text-pink-600 px-3 py-1 lg:px-4 lg:py-2 rounded-full text-sm lg:text-base hover:bg-pink-100 transition duration-300">Register</Link>
              </motion.div>
            </>
          )}
        </nav>
      </div>

      {/* Mobile and tablet menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden fixed inset-0 bg-pink-600 bg-opacity-95"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {['home', 'about', 'notices', 'contact'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-xl hover:text-pink-200 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
              {isLoggedIn ? (
                <>
                  <motion.button
                    onClick={handleLogout}
                    className="text-xl bg-white text-pink-600 px-5 py-2 rounded-full hover:bg-pink-100 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                  <motion.button
                    onClick={handleDashboardClick}
                    className="text-xl bg-white text-pink-600 px-5 py-2 rounded-full hover:bg-pink-100 transition duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Dashboard
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/login" className="text-xl bg-white text-pink-600 px-5 py-2 rounded-full hover:bg-pink-100 transition duration-300">Login</Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/register" className="text-xl bg-white text-pink-600 px-5 py-2 rounded-full hover:bg-pink-100 transition duration-300">Register</Link>
                  </motion.div>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;