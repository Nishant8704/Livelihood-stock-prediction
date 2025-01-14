import React from 'react';
import { LivestockData } from '../types';

interface ChartProps {
  data: LivestockData[];
  type: LivestockData['type'];
}

const Chart: React.FC<ChartProps> = ({ data, type }) => {
  const filteredData = data
    .filter(item => item.type === type)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const maxPrice = Math.max(...filteredData.map(d => d.price));
  const minPrice = Math.min(...filteredData.map(d => d.price));
  const range = maxPrice - minPrice;

  const points = filteredData.map((item, index) => {
    const x = (index / (filteredData.length - 1)) * 100;
    const y = ((item.price - minPrice) / range) * 100;
    return `${x},${100 - y}`;
  }).join(' ');

  return (
    <div className="w-full h-[300px]">
      <div className="relative h-full">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#f0f0f0"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Price line */}
          <polyline
            points={points}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Area under the line */}
          <polyline
            points={`0,100 ${points} 100,100`}
            fill="url(#areaGradient)"
            opacity="0.2"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-500">
          <span>${maxPrice}</span>
          <span>${Math.round((maxPrice + minPrice) / 2)}</span>
          <span>${minPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;