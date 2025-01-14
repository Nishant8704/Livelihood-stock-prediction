import React from 'react';
import { historicalData } from '../data/mockData';
import { calculatePrediction } from '../utils/predictions';
import PredictionForm from '../components/PredictionForm';
import Chart from '../components/Chart';

const MarketAnalysis = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Market Analysis</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Market Trends</h2>
          <Chart data={historicalData} type="cattle" />
        </div>
        
        <PredictionForm
          onPredict={(formData) => calculatePrediction(
            historicalData,
            formData.type,
            formData.weight,
            formData.age,
            formData.condition
          )}
        />
      </div>
    </div>
  );
};

export default MarketAnalysis;