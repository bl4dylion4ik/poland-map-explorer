export const MAP_CENTER_POLAND: [number, number] = [19.1451, 51.9194];
export const POLAND_BOUNDS: [number, number, number, number] = [14.11, 49.00, 24.15, 54.84];
export const DEFAULT_SCALE = 2800;

export const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWVyMTIzIiwiYSI6ImNtbGU3aWJrbjFhenMzZnF1NW51Mzh5ZXEifQ.6WP4HwtTVekxfa6x0PY5vQ';

export const GEOJSON_URLS = {
  voivodeships: 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-min.geojson',
  counties: 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-min.geojson',
};

export const COLORS = {
  supply: {
    low: '#bfdbfe',
    high: '#1e40af',
  },
  price: {
    low: '#bbf7d0',
    high: '#15803d',
  },
  growth: {
    low: '#fecaca',
    high: '#991b1b',
  },
  borders: '#64748b',
  bordersHover: '#94a3b8',
  background: '#f8fafc',
};

export const METRICS = [
  { id: 'supply', label: 'Market Supply', unit: 'listings' },
  { id: 'price', label: 'Median Price', unit: 'PLN/m²' },
  { id: 'growth', label: 'YoY Growth', unit: '%' },
] as const;
