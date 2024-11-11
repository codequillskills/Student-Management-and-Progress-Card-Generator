import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

function Hero() {
  return (
    <section id="home" className="hero bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="block">Report</span>
              <span className="block mt-2 ml-8">Generation</span>
              <span className="block mt-2">System</span>
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 max-w-lg">
              Empowering Education Through Efficient Management
            </p>
            <Link 
              to="/" 
              className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition duration-300 inline-block"
            >
              Learn More
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center items-center relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center z-10 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100"></div>
              <div className="relative z-10 text-center">
                <FaGraduationCap className="text-5xl text-indigo-600 mx-auto mb-4" />
                <h3 className="text-indigo-600 font-bold text-2xl mb-2">Streamline</h3>
                <p className="text-indigo-800 font-semibold text-lg px-4">
                  Your Education Process
                </p>
              </div>
            </div>
            <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-indigo-400 rounded-full -top-4 -right-4 opacity-50"></div>
            <div className="absolute w-48 h-48 md:w-64 md:h-64 bg-blue-300 rounded-full -bottom-4 -left-4 opacity-50"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-10 transform rotate-12 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-indigo-400 opacity-10 transform -rotate-12 -translate-x-1/4"></div>
    </section>
  );
}

export default Hero;