interface Feature {
  name: string;
  label: string;
  type: 'number' | 'text';
}

export const categoryFeatures: Record<string, Feature[]> = {
  laptop: [
    { name: 'brand', label: 'Brand', type: 'text' },
    { name: 'ram', label: 'RAM (GB)', type: 'number' },
    { name: 'storage', label: 'Storage (GB)', type: 'number' },
    { name: 'processor', label: 'Processor', type: 'text' },
    { name: 'screenSize', label: 'Screen Size (inches)', type: 'number' }
  ],
  bike: [
    { name: 'brand', label: 'Brand', type: 'text' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'engineSize', label: 'Engine Size (cc)', type: 'number' },
    { name: 'year', label: 'Year', type: 'number' },
    { name: 'mileage', label: 'Mileage', type: 'number' }
  ],
  car: [
    { name: 'brand', label: 'Brand', type: 'text' },
    { name: 'model', label: 'Model', type: 'text' },
    { name: 'year', label: 'Year', type: 'number' },
    { name: 'mileage', label: 'Mileage', type: 'number' },
    { name: 'fuelType', label: 'Fuel Type', type: 'text' }
  ],
  property: [
    { name: 'type', label: 'Property Type', type: 'text' },
    { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
    { name: 'bathrooms', label: 'Bathrooms', type: 'number' },
    { name: 'squareFeet', label: 'Square Feet', type: 'number' },
    { name: 'location', label: 'Location', type: 'text' }
  ]
};