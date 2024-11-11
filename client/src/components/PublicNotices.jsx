import React from 'react';
import { FaClipboardCheck, FaChartLine } from 'react-icons/fa';

function PublicNotices() {
  return (
    <section id="notices" className="public-notices py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-indigo-800">Public Notices</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <NoticeCard
            icon={<FaClipboardCheck className="text-4xl text-indigo-600" />}
            title="Progress Card Generator"
            content="The Progress Card Generator is a web application designed to automate the creation and management of progress reports for students, employees, or any use case that requires consistent progress tracking. This tool allows users to input relevant data, such as grades, performance metrics, or milestones, and generate dynamic, customizable progress cards or reports."
          />
          <NoticeCard
            icon={<FaChartLine className="text-4xl text-indigo-600" />}
            title="Perfect for Organizations"
            content="The Progress Card Generator is perfect for schools, organizations, and companies that need a reliable way to track and report on the performance of students, employees, or team members. It simplifies the process of generating progress reports and ensures that data is presented clearly and professionally."
          />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">Latest Notice</h3>
          <p className="text-gray-700">
            Test Public Notice (2022-02-03 00:34:10)
          </p>
        </div>
      </div>
    </section>
  );
}

function NoticeCard({ icon, title, content }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-2xl font-semibold ml-4 text-indigo-800">{title}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{content}</p>
    </div>
  );
}

export default PublicNotices;