import React from 'react';
import { FaGraduationCap, FaChartLine, FaUsers, FaQuoteLeft } from 'react-icons/fa';

function AboutUs() {
  return (
    <section id='about' className="about-us py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center text-indigo-800">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 relative">
            <div className="absolute top-0 left-0 text-indigo-200 opacity-50 transform -translate-x-1/2 -translate-y-1/2">
              <FaQuoteLeft size={80} />
            </div>
            <p className="text-gray-700 leading-relaxed text-lg pl-8 border-l-4 border-indigo-500">
              At Report Generation System, we're dedicated to revolutionizing educational management. Our cutting-edge platform empowers institutions to streamline their processes, enhance communication, and focus on what truly matters: nurturing the next generation of leaders.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              With years of experience in both education and technology, our team has developed a comprehensive solution that addresses the unique challenges faced by modern educational institutions.
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed text-lg italic">
                We're committed to continuous improvement and innovation, ensuring that our clients always have access to the best tools for their needs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard 
              icon={<FaGraduationCap />}
              title="Expert-Led"
              description="Developed by education and tech professionals"
            />
            <FeatureCard 
              icon={<FaChartLine />}
              title="Data-Driven"
              description="Make informed decisions with powerful analytics"
            />
            <FeatureCard 
              icon={<FaUsers />}
              title="Collaborative"
              description="Foster teamwork among staff and students"
            />
            <FeatureCard 
              icon={<FaGraduationCap />}
              title="Student-Centric"
              description="Designed to enhance the learning experience"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-3xl text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default AboutUs;