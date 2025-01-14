import { LivestockData } from '../types';

const generateMockData = (count: number): LivestockData[] => {
  const types = ['cattle', 'sheep', 'goat', 'pig'] as const;
  const conditions = ['excellent', 'good', 'fair', 'poor'] as const;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `ls-${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    weight: Math.floor(Math.random() * (1000 - 50) + 50),
    age: Math.floor(Math.random() * 8) + 1,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    price: Math.floor(Math.random() * (5000 - 500) + 500)
  }));
};

export const historicalData = generateMockData(100);