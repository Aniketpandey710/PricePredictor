import React from 'react';
import { useQuery } from 'react-query';
import { DollarSign } from 'lucide-react';
import { PredictionRequest } from '../types';
import { categoryFeatures } from '../utils/features';

interface Props {
  category: PredictionRequest['category'];
}

export function PredictionForm({ category }: Props) {
  const [features, setFeatures] = React.useState<Record<string, string>>({});

  const { data, isLoading, error, refetch } = useQuery(
    ['prediction', category, features],
    async () => {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, features }),
      });
      return response.json();
    },
    { enabled: false }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const handleChange = (name: string, value: string) => {
    setFeatures(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {categoryFeatures[category].map(feature => (
          <div key={feature.name}>
            <label className="block text-sm font-medium text-gray-700">
              {feature.label}
            </label>
            <input
              type={feature.type}
              value={features[feature.name] || ''}
              onChange={(e) => handleChange(feature.name, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Predict Price
        </button>
      </form>

      {isLoading && <p className="mt-4 text-center">Calculating...</p>}
      
      {error && (
        <p className="mt-4 text-red-600 text-center">
          Error calculating prediction
        </p>
      )}
      
      {data && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(data.predictedPrice)}
            </span>
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Confidence: {(data.confidence * 100).toFixed(1)}%
          </p>
        </div>
      )}
    </div>
  );
}