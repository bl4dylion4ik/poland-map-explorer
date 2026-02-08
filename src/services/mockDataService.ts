import { MarketStats, MetricType } from '../types/map';

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateMarketStats = (regionName: string, id: number | string): MarketStats => {
  const seed = (typeof id === 'number' ? id : regionName.length) + regionName.charCodeAt(0);
  const isMajorCity = ['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk'].some(city => regionName.includes(city));

  const basePrice = isMajorCity ? 12000 : 6000;
  const priceVariance = seededRandom(seed) * 4000;
  const baseSupply = isMajorCity ? 5000 : 500;
  const supplyVariance = seededRandom(seed + 1) * 1000;
  const baseGrowth = 5;
  const growthVariance = seededRandom(seed + 2) * 10;

  return {
    regionId: id,
    name: regionName,
    price: Math.round(basePrice + priceVariance),
    supply: Math.round(baseSupply + supplyVariance),
    growth: Number((baseGrowth + growthVariance - 5).toFixed(1)),
    listings: Math.round(baseSupply + supplyVariance),
  };
};

export const getMetricValue = (stats: MarketStats, metric: MetricType): number => {
  switch (metric) {
    case 'price': return stats.price;
    case 'supply': return stats.supply;
    case 'growth': return stats.growth;
    default: return 0;
  }
};

export const formatMetric = (value: number, metric: MetricType): string => {
  switch (metric) {
    case 'price': return `${value.toLocaleString()} PLN/m²`;
    case 'supply': return value.toLocaleString();
    case 'growth': return `${value > 0 ? '+' : ''}${value}%`;
    default: return value.toString();
  }
};
