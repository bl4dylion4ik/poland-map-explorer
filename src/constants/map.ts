export const MAP_CENTER_POLAND: [number, number] = [19.1451, 51.9194];
export const DEFAULT_SCALE = 2800;

export const GEOJSON_URLS = {
  voivodeships: 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-min.geojson',
  counties: 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-min.geojson',
};

export const COLORS = {
  supply: {
    low: '#dbeafe',
    high: '#1e40af',
  },
  price: {
    low: '#dcfce7',
    high: '#166534',
  },
  growth: {
    low: '#fef2f2',
    high: '#991b1b',
  },
  borders: '#64748b',
  bordersHover: '#cbd5e1',
  background: '#0f172a',
};

export const METRICS = [
  { id: 'supply', label: 'Market Supply', unit: 'listings' },
  { id: 'price', label: 'Median Price', unit: 'PLN/m²' },
  { id: 'growth', label: 'YoY Growth', unit: '%' },
] as const;
