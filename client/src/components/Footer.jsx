import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaFileAlt, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-2xl font-bold text-indigo-400">Report Generation System</h3>
            <p className="text-gray-300 text-sm">
              Our Report Generation System streamlines educational processes, enhancing communication between students, teachers, and administrators. We're committed to improving the learning experience through innovative technology, providing comprehensive and timely reports to support academic progress and institutional management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-400">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/" onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                  <FaHome className="mr-2" /> Home
                </Link>
                <Link to="/" onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                  <FaInfoCircle className="mr-2" /> About
                </Link>
                <Link to="/" onClick={() => scrollToSection('notices')} className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                  <FaFileAlt className="mr-2" /> Notices
                </Link>
                <Link to="/" onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-indigo-400 transition duration-300 flex items-center">
                  <FaEnvelope className="mr-2" /> Contact
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-400">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-indigo-400" /> 890, Sector 62, Gyan Sarovar, GAIL Noida (Delhi/NCR)
                </p>
                <p className="flex items-center">
                  <FaPhone className="mr-2 text-indigo-400" /> +91 1234567890
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-400" /> info@reportgen.edu
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-between items-center flex-col sm:flex-row">
            <p className="text-xs text-gray-400">© 2023 Report Generation System. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="#" className="text-indigo-400 hover:text-indigo-300 transition duration-300">
                <FaFacebookF size={20} />
              </Link>
              <Link to="#" className="text-indigo-400 hover:text-indigo-300 transition duration-300">
                <FaTwitter size={20} />
              </Link>
              <Link to="#" className="text-indigo-400 hover:text-indigo-300 transition duration-300">
                <FaLinkedinIn size={20} />
              </Link>
              <Link to="#" className="text-indigo-400 hover:text-indigo-300 transition duration-300">
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;