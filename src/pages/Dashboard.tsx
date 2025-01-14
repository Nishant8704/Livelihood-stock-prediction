import React from 'react';
import { historicalData } from '../data/mockData';
import DashboardHeader from '../components/DashboardHeader';
import Chart from '../components/Chart';
import QuickStats from '../components/QuickStats';
import MarketInsights from '../components/MarketInsights';

const Dashboard = () => {
  const [selectedType, setSelectedType] = React.useState('cattle');

  return (
    <div className="space-y-8">
      <DashboardHeader />
      <QuickStats data={historicalData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Price Trends</h2>
            <div className="flex space-x-2">
              {['cattle', 'sheep', 'goat', 'pig'].map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <Chart data={historicalData} type={selectedType} />
        </div>
        <MarketInsights data={historicalData} />
      </div>
    </div>
  );
};

export default Dashboard;