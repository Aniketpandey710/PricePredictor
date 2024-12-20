import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Car, Laptop, Bike, Home } from 'lucide-react';
import { PredictionForm } from './components/PredictionForm';
import type { PredictionRequest } from './types';

const queryClient = new QueryClient();

const categories: Array<{
  id: PredictionRequest['category'];
  label: string;
  icon: React.ComponentType<any>;
}> = [
  { id: 'laptop', label: 'Laptops', icon: Laptop },
  { id: 'bike', label: 'Bikes', icon: Bike },
  { id: 'car', label: 'Cars', icon: Car },
  { id: 'property', label: 'Properties', icon: Home }
];

function App() {
  const [selectedCategory, setSelectedCategory] = 
    React.useState<PredictionRequest['category']>('laptop');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Price Prediction System
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex space-x-4 mb-8 overflow-x-auto">
              {categories.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedCategory(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    selectedCategory === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <PredictionForm category={selectedCategory} />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;