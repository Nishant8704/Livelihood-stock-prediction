import React, { useState } from 'react';
import { LivestockData, PredictionResult } from '../types';

interface PredictionFormProps {
  onPredict: (data: Omit<LivestockData, 'id' | 'date' | 'price'>) => PredictionResult;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    type: 'cattle' as LivestockData['type'],
    weight: 0,
    age: 0,
    condition: 'good' as LivestockData['condition']
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onPredict(formData);
    setPrediction(result);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Price Prediction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={formData.type}
            onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as LivestockData['type'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="cattle">Cattle</option>
            <option value="sheep">Sheep</option>
            <option value="goat">Goat</option>
            <option value="pig">Pig</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={e => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age (years)</label>
          <input
            type="number"
            value={formData.age}
            onChange={e => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition</label>
          <select
            value={formData.condition}
            onChange={e => setFormData(prev => ({ ...prev, condition: e.target.value as LivestockData['condition'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Calculate Prediction
        </button>
      </form>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-900">Prediction Results</h3>
          <dl className="mt-2 divide-y divide-gray-200">
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500">Predicted Price</dt>
              <dd className="text-lg font-semibold text-gray-900">${prediction.predictedPrice}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500">Confidence</dt>
              <dd className="text-sm text-gray-900">{Math.round(prediction.confidence * 100)}%</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500">Market Trend</dt>
              <dd className="text-sm text-gray-900 capitalize">{prediction.trend}</dd>
            </div>
            <div className="py-2">
              <dt className="text-sm font-medium text-gray-500">Risk Level</dt>
              <dd className={`text-sm font-medium capitalize ${
                prediction.riskLevel === 'high' ? 'text-red-600' :
                prediction.riskLevel === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {prediction.riskLevel}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;