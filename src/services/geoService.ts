import { GEOJSON_URLS } from '../constants/map';
import { GeoJSONCollection } from '../types/map';

const cache: Record<string, GeoJSONCollection> = {};

export const fetchVoivodeships = async (): Promise<GeoJSONCollection> => {
  if (cache.voivodeships) return cache.voivodeships;
  const response = await fetch(GEOJSON_URLS.voivodeships);
  if (!response.ok) throw new Error('Failed to fetch voivodeships');
  const data = await response.json();
  cache.voivodeships = data;
  return data;
};

export const fetchCounties = async (): Promise<GeoJSONCollection> => {
  if (cache.counties) return cache.counties;
  const response = await fetch(GEOJSON_URLS.counties);
  if (!response.ok) throw new Error('Failed to fetch counties');
  const data = await response.json();
  cache.counties = data;
  return data;
};
