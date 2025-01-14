export interface LivestockData {
  id: string;
  type: 'cattle' | 'sheep' | 'goat' | 'pig';
  weight: number;
  age: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  date: string;
  price: number;
}

export interface PredictionResult {
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}