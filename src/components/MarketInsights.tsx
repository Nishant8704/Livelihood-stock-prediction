import React from 'react';
import { LivestockData } from '../types';

interface MarketInsightsProps {
  data: LivestockData[];
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ data }) => {
  const getAveragePrice = (type: LivestockData['type']) => {
    const typeData = data.filter(item => item.type === type);
    return typeData.reduce((sum, item) => sum + item.price, 0) / typeData.length;
  };

  const getPriceChange = (type: LivestockData['type']) => {
    const typeData = [...data]
      .filter(item => item.type === type)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (typeData.length < 2) return 0;
    
    const recent = typeData[0].price;
    const old = typeData[typeData.length - 1].price;
    return ((recent - old) / old) * 100;
  };

  const insights = ['cattle', 'sheep', 'goat', 'pig'].map(type => ({
    type,
    avgPrice: getAveragePrice(type as LivestockData['type']),
    priceChange: getPriceChange(type as LivestockData['type'])
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(({ type, avgPrice, priceChange }) => (
          <div key={type} className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium capitalize">{type}</h3>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">
                Average Price: <span className="font-semibold">${Math.round(avgPrice)}</span>
              </p>
              <p className={`${priceChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange > 0 ? '↑' : '↓'} {Math.abs(Math.round(priceChange))}% in 90 days
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketInsights;