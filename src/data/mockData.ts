export interface City {
  id: string;
  name: string;
  voivodeship: string;
  lat: number;
  lng: number;
  population: number;
}

export interface Listing {
  id: string;
  cityId: string;
  city: string;
  voivodeship: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  price: number;
  area: number;
  pricePerM2: number;
  rooms: number;
  date: string;
  status: 'active' | 'sold' | 'reserved';
  marketType: 'primary' | 'secondary';
  originalPrice: number;
  listedDate: string;
  soldDate?: string;
}

export interface MonthlyStats {
  month: string;
  avgPrice: number;
  medianPrice: number;
  listings: number;
  sold: number;
}

export interface VoivodeshipStats {
  name: string;
  avgPricePerM2: number;
  totalListings: number;
  avgArea: number;
  growth: number;
  supply: number;
}

export const VOIVODESHIPS = [
  'dolnośląskie', 'kujawsko-pomorskie', 'lubelskie', 'lubuskie',
  'łódzkie', 'małopolskie', 'mazowieckie', 'opolskie',
  'podkarpackie', 'podlaskie', 'pomorskie', 'śląskie',
  'świętokrzyskie', 'warmińsko-mazurskie', 'wielkopolskie', 'zachodniopomorskie'
];

export const PROPERTY_TYPES = ['apartment', 'house', 'commercial', 'land'] as const;

export const CITIES: City[] = [
  { id: 'WAW', name: 'Warszawa', voivodeship: 'mazowieckie', lat: 52.23, lng: 21.01, population: 1790658 },
  { id: 'KRK', name: 'Kraków', voivodeship: 'małopolskie', lat: 50.06, lng: 19.94, population: 779115 },
  { id: 'WRO', name: 'Wrocław', voivodeship: 'dolnośląskie', lat: 51.11, lng: 17.04, population: 641928 },
  { id: 'POZ', name: 'Poznań', voivodeship: 'wielkopolskie', lat: 52.41, lng: 16.93, population: 534813 },
  { id: 'GDA', name: 'Gdańsk', voivodeship: 'pomorskie', lat: 54.35, lng: 18.65, population: 470907 },
  { id: 'SZC', name: 'Szczecin', voivodeship: 'zachodniopomorskie', lat: 53.43, lng: 14.55, population: 398255 },
  { id: 'BYD', name: 'Bydgoszcz', voivodeship: 'kujawsko-pomorskie', lat: 53.12, lng: 18.01, population: 344091 },
  { id: 'LUB', name: 'Lublin', voivodeship: 'lubelskie', lat: 51.25, lng: 22.57, population: 339850 },
  { id: 'BIA', name: 'Białystok', voivodeship: 'podlaskie', lat: 53.13, lng: 23.16, population: 297459 },
  { id: 'KAT', name: 'Katowice', voivodeship: 'śląskie', lat: 50.26, lng: 19.02, population: 292774 },
  { id: 'GDY', name: 'Gdynia', voivodeship: 'pomorskie', lat: 54.52, lng: 18.53, population: 246306 },
  { id: 'CZE', name: 'Częstochowa', voivodeship: 'śląskie', lat: 50.81, lng: 19.12, population: 222292 },
  { id: 'RAD', name: 'Radom', voivodeship: 'mazowieckie', lat: 51.40, lng: 21.16, population: 213029 },
  { id: 'TOR', name: 'Toruń', voivodeship: 'kujawsko-pomorskie', lat: 53.01, lng: 18.60, population: 201447 },
  { id: 'KIE', name: 'Kielce', voivodeship: 'świętokrzyskie', lat: 50.87, lng: 20.63, population: 195774 },
  { id: 'RZE', name: 'Rzeszów', voivodeship: 'podkarpackie', lat: 50.04, lng: 22.00, population: 196208 },
  { id: 'OLS', name: 'Olsztyn', voivodeship: 'warmińsko-mazurskie', lat: 53.78, lng: 20.49, population: 172362 },
  { id: 'OPO', name: 'Opole', voivodeship: 'opolskie', lat: 50.67, lng: 17.93, population: 128035 },
  { id: 'ZIE', name: 'Zielona Góra', voivodeship: 'lubuskie', lat: 51.94, lng: 15.51, population: 141222 },
  { id: 'LOD', name: 'Łódź', voivodeship: 'łódzkie', lat: 51.77, lng: 19.46, population: 672185 },
];

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

function generateListings(): Listing[] {
  const listings: Listing[] = [];
  let idCounter = 1;

  // Use a fixed reference date for "today"
  const today = new Date('2024-12-31');

  CITIES.forEach((city, cityIdx) => {
    const popFactor = city.population / 200000;
    const listingCount = Math.max(20, Math.round(popFactor * 30));

    for (let i = 0; i < listingCount; i++) {
      const seed = cityIdx * 1000 + i;
      const typeIdx = Math.floor(seededRandom(seed) * 4);
      const type = PROPERTY_TYPES[typeIdx];

      const basePricePerM2 = city.name === 'Warszawa' ? 14000 :
        city.name === 'Kraków' ? 12500 :
        city.name === 'Gdańsk' ? 11500 :
        city.name === 'Wrocław' ? 10800 :
        city.name === 'Poznań' ? 9500 :
        city.population > 300000 ? 8000 :
        city.population > 150000 ? 6500 : 5000;

      const priceVariance = (seededRandom(seed + 1) - 0.5) * basePricePerM2 * 0.4;
      const pricePerM2 = Math.round(basePricePerM2 + priceVariance);

      const baseArea = type === 'apartment' ? 55 : type === 'house' ? 120 : type === 'commercial' ? 80 : 500;
      const areaVariance = seededRandom(seed + 2) * baseArea * 0.8;
      const area = Math.round(baseArea + areaVariance);

      const rooms = type === 'land' ? 0 : Math.max(1, Math.floor(area / 25));

      // Generate date logic
      const daysAgo = Math.floor(seededRandom(seed + 3) * 365);
      const listDateObj = new Date(today);
      listDateObj.setDate(today.getDate() - daysAgo);
      const date = listDateObj.toISOString().split('T')[0];

      const statusRand = seededRandom(seed + 5);
      const status = statusRand < 0.6 ? 'active' : statusRand < 0.85 ? 'sold' : 'reserved';

      // Market type
      const marketType = seededRandom(seed + 6) < 0.4 ? 'primary' : 'secondary';

      // Original price (volatility simulation)
      const changeVariance = (seededRandom(seed + 7) - 0.5) * 0.1; // +/- 5%
      const originalPrice = Math.round((pricePerM2 * area) * (1 + changeVariance));

      // Sold date (if applicable)
      let soldDate: string | undefined;
      if (status === 'sold') {
        const soldDaysAgo = Math.floor(seededRandom(seed + 8) * daysAgo); // Sold sometime after listing
        const soldDateObj = new Date(listDateObj);
        soldDateObj.setDate(listDateObj.getDate() + (daysAgo - soldDaysAgo));
        soldDate = soldDateObj.toISOString().split('T')[0];
      }

      listings.push({
        id: `L${String(idCounter++).padStart(5, '0')}`,
        cityId: city.id,
        city: city.name,
        voivodeship: city.voivodeship,
        type: type as Listing['type'],
        price: pricePerM2 * area,
        area,
        pricePerM2,
        rooms,
        date, // keeping for backward compatibility, same as listedDate
        status: status as Listing['status'],
        marketType,
        originalPrice,
        listedDate: date,
        soldDate,
      });
    }
  });

  return listings;
}

export const LISTINGS = generateListings();

export function getMonthlyStats(): MonthlyStats[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, i) => {
    const monthListings = LISTINGS.filter(l => {
      const m = parseInt(l.date.split('-')[1]);
      return m === i + 1;
    });
    const prices = monthListings.map(l => l.pricePerM2);
    const sorted = [...prices].sort((a, b) => a - b);
    return {
      month,
      avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
      medianPrice: sorted.length > 0 ? sorted[Math.floor(sorted.length / 2)] : 0,
      listings: monthListings.length,
      sold: monthListings.filter(l => l.status === 'sold').length,
    };
  });
}

export function getVoivodeshipStats(): VoivodeshipStats[] {
  return VOIVODESHIPS.map((v, i) => {
    const vListings = LISTINGS.filter(l => l.voivodeship === v);
    const prices = vListings.map(l => l.pricePerM2);
    const areas = vListings.map(l => l.area);
    return {
      name: v,
      avgPricePerM2: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
      totalListings: vListings.length,
      avgArea: areas.length > 0 ? Math.round(areas.reduce((a, b) => a + b, 0) / areas.length) : 0,
      growth: Number(((seededRandom(i + 100) - 0.3) * 15).toFixed(1)),
      supply: vListings.filter(l => l.status === 'active').length,
    };
  });
}

export function getPriceDistribution(): { range: string; count: number }[] {
  const ranges = [
    { min: 0, max: 4000, label: '<4k' },
    { min: 4000, max: 6000, label: '4-6k' },
    { min: 6000, max: 8000, label: '6-8k' },
    { min: 8000, max: 10000, label: '8-10k' },
    { min: 10000, max: 12000, label: '10-12k' },
    { min: 12000, max: 14000, label: '12-14k' },
    { min: 14000, max: 16000, label: '14-16k' },
    { min: 16000, max: Infinity, label: '16k+' },
  ];

  return ranges.map(r => ({
    range: r.label,
    count: LISTINGS.filter(l => l.pricePerM2 >= r.min && l.pricePerM2 < r.max).length,
  }));
}

export function getTopCities(metric: 'price' | 'supply' | 'growth', limit = 10) {
  const cityStats = CITIES.map(city => {
    const cityListings = LISTINGS.filter(l => l.cityId === city.id);
    const activeListings = cityListings.filter(l => l.status === 'active');
    const prices = cityListings.map(l => l.pricePerM2);
    const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    return {
      city: city.name,
      voivodeship: city.voivodeship,
      avgPrice,
      supply: activeListings.length,
      growth: Number(((seededRandom(city.id.charCodeAt(0)) - 0.3) * 15).toFixed(1)),
      totalListings: cityListings.length,
    };
  });

  return cityStats
    .sort((a, b) => {
      if (metric === 'price') return b.avgPrice - a.avgPrice;
      if (metric === 'supply') return b.supply - a.supply;
      return b.growth - a.growth;
    })
    .slice(0, limit);
}

export function getSupplyByType() {
  return PROPERTY_TYPES.map(type => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    active: LISTINGS.filter(l => l.type === type && l.status === 'active').length,
    sold: LISTINGS.filter(l => l.type === type && l.status === 'sold').length,
    reserved: LISTINGS.filter(l => l.type === type && l.status === 'reserved').length,
  }));
}

// --- NEW ANALYTICS AGGREGATORS ---

// 1. Time on Market Stats
export function getTimeOnMarketStats(days: number = 90) {
  // Mock trend data
  const data = [];
  const today = new Date('2024-12-31');
  
  for (let i = days; i >= 0; i -= 7) { // Weekly data points
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate trend
    const baseDays = 45;
    const noise = (seededRandom(i) - 0.5) * 10;
    const trend = Math.sin(i / 30) * 5; 
    
    data.push({
      date: dateStr,
      avgDays: Math.round(baseDays + noise + trend),
      p25: Math.round((baseDays + noise + trend) * 0.6),
      p75: Math.round((baseDays + noise + trend) * 1.4),
    });
  }
  return data;
}

// 2. Absorption Speed (New vs Removed)
export function getAbsorptionStats(days: number = 90) {
  const data = [];
  const today = new Date('2024-12-31');

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Mock data based on daily listings in our mock DB would be too sparse
    // So generating realistic daily trends
    const baseVol = 50;
    const noise = (seededRandom(i + 500) - 0.5) * 20;
    
    const newCount = Math.max(5, Math.round(baseVol + noise));
    const removedCount = Math.max(5, Math.round(baseVol + noise * 0.8 + Math.sin(i/10) * 10));
    
    data.push({
      date: dateStr,
      new: newCount,
      removed: removedCount,
      absorptionRate: Math.round((removedCount / (newCount || 1)) * 100),
    });
  }
  return data;
}

// 3. Volatility Matrix Data
export function getVolatilityMatrix() {
  return CITIES.map(city => {
    const seed = city.id.charCodeAt(0);
    // Mock metrics
    const priceChange = (seededRandom(seed) - 0.4) * 15; // -6% to +9%
    const volatility = seededRandom(seed + 1) * 10; // 0 to 10 score
    
    let category = 'Uncertain';
    if (priceChange > 2 && volatility < 4) category = 'Stable Growth';
    if (priceChange > 2 && volatility >= 4) category = 'Speculative';
    if (priceChange < -2) category = 'Declining';
    
    return {
      name: city.name,
      voivodeship: city.voivodeship,
      priceChange: Number(priceChange.toFixed(1)),
      volatility: Number(volatility.toFixed(1)),
      category,
      size: Math.sqrt(city.population) / 20 // Bubble size
    };
  });
}

// 4. Market Structure (Rooms vs Price Heatmap)
export function getMarketStructureStats() {
  // Aggregate real mock listings
  const matrix: Record<string, Record<string, number>> = {};
  const priceBuckets = ['<300k', '300-500k', '500-800k', '800k-1.2m', '>1.2m'];
  const rooms = [1, 2, 3, 4, '5+'];

  rooms.forEach(r => {
    const rKey = String(r);
    matrix[rKey] = {};
    priceBuckets.forEach(b => matrix[rKey][b] = 0);
  });

  LISTINGS.forEach(l => {
    if (l.type !== 'apartment') return;
    
    const roomKey = l.rooms >= 5 ? '5+' : String(l.rooms);
    if (!matrix[roomKey]) return; // listing with 0 rooms?

    let bucket = '';
    if (l.price < 300000) bucket = '<300k';
    else if (l.price < 500000) bucket = '300-500k';
    else if (l.price < 800000) bucket = '500-800k';
    else if (l.price < 1200000) bucket = '800k-1.2m';
    else bucket = '>1.2m';

    matrix[roomKey][bucket]++;
  });

  // Transform for Recharts heatmap (z-index)
  const data = [];
  rooms.forEach(r => {
    priceBuckets.forEach(b => {
      data.push({
        y: String(r) + (r === 1 ? ' room' : r === '5+' ? ' rooms' : ' rooms'),
        x: b,
        value: matrix[String(r)][b]
      });
    });
  });

  return data;
}

// 5. Supply by Area (Stacked Area)
export function getSupplyByAreaHistory(days: number = 180) {
  const data = [];
  const buckets = ['<35m²', '35-50m²', '50-75m²', '75-100m²', '>100m²'];
  
  for (let i = 0; i < 12; i++) { // Monthly data for last year
    const date = `2024-${String(i+1).padStart(2, '0')}`;
    const base = 100 + i * 5;
    
    data.push({
      date,
      '<35m²': Math.round(base * 0.15 + seededRandom(i)*10),
      '35-50m²': Math.round(base * 0.35 + seededRandom(i+1)*10),
      '50-75m²': Math.round(base * 0.30 + seededRandom(i+2)*10),
      '75-100m²': Math.round(base * 0.15 + seededRandom(i+3)*10),
      '>100m²': Math.round(base * 0.05 + seededRandom(i+4)*5),
    });
  }
  return data;
}
