export interface PredictionRequest {
  category: 'laptop' | 'bike' | 'car' | 'property';
  features: Record<string, number | string>;
}

export interface PredictionResponse {
  predictedPrice: number;
  confidence: number;
}