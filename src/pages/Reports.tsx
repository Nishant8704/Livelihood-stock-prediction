import React from 'react';
import { historicalData } from '../data/mockData';

const Reports = () => {
  const reports = [
    {
      title: 'Monthly Performance',
      description: 'Overview of livestock performance and market trends',
      date: '2024-03-01',
      type: 'Performance'
    },
    {
      title: 'Health Status Report',
      description: 'Health conditions and vaccination records',
      date: '2024-03-05',
      type: 'Health'
    },
    {
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      date: '2024-03-10',
      type: 'Financial'
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {report.type}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{report.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{report.date}</span>
              <button className="text-indigo-600 hover:text-indigo-800">
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;