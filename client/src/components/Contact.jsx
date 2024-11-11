import React, { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCommentAlt } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowAlert(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <section id="contact" className="contact py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center text-indigo-800">Contact Us</h2>
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white">
              <h3 className="text-3xl font-semibold mb-6">Get in Touch</h3>
              <p className="mb-8 text-indigo-100">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaEnvelope className="mr-4 text-2xl text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-indigo-100">contact@example.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-4 text-2xl text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-indigo-100">+1 (123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-4 text-2xl text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-indigo-100">123 Report St, Education City, 12345</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-4 text-2xl text-indigo-300" />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-indigo-100">Mon - Fri: 9AM - 5PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaPaperPlane className="mr-2" /> Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <FaCommentAlt className="mr-2" />
          <p className="font-semibold">Message sent successfully!</p>
        </div>
      )}
    </section>
  );
}

export default Contact;