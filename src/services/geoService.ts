import { GEOJSON_URLS } from '../constants/map';
import { GeoJSONCollection, GeoFeature } from '../types/map';
import * as turf from '@turf/turf';

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

/**
 * Generate a world mask with a Poland-shaped hole
 * Optimized for performance
 */
export const generatePolandMask = (voivodeships: GeoJSONCollection): GeoJSONCollection => {
  if (cache.polandMask) return cache.polandMask;

  try {
    // Create a union of all voivodeships to get Poland's shape
    const polandShape = turf.union(voivodeships);

    if (!polandShape) {
      console.error('Failed to create Poland shape');
      return { type: 'FeatureCollection', features: [] };
    }

    // Create a world bounding box
    const worldBox = turf.bboxPolygon([-180, -85, 180, 85]);

    // Subtract Poland from the world
    const mask = turf.difference(
      turf.featureCollection([worldBox as any, polandShape as any])
    );

    if (!mask) {
      console.error('Failed to create Poland mask');
      return { type: 'FeatureCollection', features: [] };
    }

    const maskCollection: GeoJSONCollection = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: { 
          nazwa: 'World Mask',
          id: 'world_mask',
          kod: 'MASK'
        },
        geometry: mask.geometry
      } as GeoFeature]
    };

    cache.polandMask = maskCollection;
    return maskCollection;
  } catch (error) {
    console.error('Error generating Poland mask:', error);
    return { type: 'FeatureCollection', features: [] };
  }
};
