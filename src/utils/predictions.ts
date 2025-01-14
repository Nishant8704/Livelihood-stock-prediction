import { LivestockData, PredictionResult } from '../types';
import { linearRegression, DataPoint } from './regression';

const prepareRegressionData = (
  data: LivestockData[],
  type: LivestockData['type']
): DataPoint[] => {
  return data
    .filter(item => item.type === type)
    .map(item => ({
      x: item.weight * Math.pow(0.9, item.age), // Adjust weight based on age
      y: item.price
    }))
    .sort((a, b) => a.x - b.x);
};

const getConditionMultiplier = (condition: LivestockData['condition']): number => {
  const multipliers = {
    excellent: 1.2,
    good: 1.0,
    fair: 0.8,
    poor: 0.6
  };
  return multipliers[condition];
};

export const calculatePrediction = (
  data: LivestockData[],
  type: LivestockData['type'],
  weight: number,
  age: number,
  condition: LivestockData['condition']
): PredictionResult => {
  const regressionData = prepareRegressionData(data, type);
  const { slope, intercept, r2 } = linearRegression(regressionData);
  
  // Calculate base price using regression
  const adjustedWeight = weight * Math.pow(0.9, age);
  const basePrice = slope * adjustedWeight + intercept;
  
  // Apply condition adjustment
  const conditionMultiplier = getConditionMultiplier(condition);
  const predictedPrice = basePrice * conditionMultiplier;
  
  // Calculate confidence based on R-squared and sample size
  const confidence = Math.min(r2 * (regressionData.length / 20), 1);
  
  // Determine trend
  const recentData = [...regressionData].slice(-10);
  const recentSlope = linearRegression(recentData).slope;
  const trend = recentSlope > 0.1 ? 'up' : recentSlope < -0.1 ? 'down' : 'stable';
  
  // Assess risk level
  const riskLevel = confidence > 0.7 ? 'low' : confidence > 0.4 ? 'medium' : 'high';

  return {
    predictedPrice: Math.round(predictedPrice),
    confidence,
    trend,
    riskLevel
  };
};