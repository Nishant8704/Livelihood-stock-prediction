export interface DataPoint {
  x: number;
  y: number;
}

export function linearRegression(data: DataPoint[]): {
  slope: number;
  intercept: number;
  r2: number;
} {
  const n = data.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (const point of data) {
    sumX += point.x;
    sumY += point.y;
    sumXY += point.x * point.y;
    sumXX += point.x * point.x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Calculate R-squared
  const yMean = sumY / n;
  let totalSS = 0;
  let residualSS = 0;
  
  for (const point of data) {
    const prediction = slope * point.x + intercept;
    residualSS += Math.pow(point.y - prediction, 2);
    totalSS += Math.pow(point.y - yMean, 2);
  }
  
  const r2 = 1 - (residualSS / totalSS);

  return { slope, intercept, r2 };
}