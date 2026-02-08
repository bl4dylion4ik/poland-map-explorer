export interface GeoFeature {
  type: 'Feature';
  properties: {
    nazwa: string;
    id: number | string;
    kod?: string;
    [key: string]: any;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: any[];
  };
}

export interface GeoJSONCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export type MapViewLevel = 'country' | 'voivodeship' | 'city';

export type MetricType = 'supply' | 'price' | 'growth';

export interface MarketStats {
  regionId: string | number;
  name: string;
  supply: number;
  price: number;
  growth: number;
  listings: number;
}

export interface BreadcrumbItem {
  id: string | number | null;
  name: string;
  level: MapViewLevel;
}
