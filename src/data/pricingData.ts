export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  includesEverythingFrom?: string;
  features: string[];
  bestFor: string;
  highlighted: boolean;
  badge?: string;
}

export interface ComparisonFeature {
  feature: string;
  basic: boolean | string;
  pro: boolean | string;
  investor: boolean | string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    currency: 'zł',
    period: 'month',
    description: 'For tracking the market and monitoring opportunities',
    features: [
      '1 active alert',
      'Core market analytics',
      'Market overview by region',
      'Price per m² (average & median)',
      'Basic charts and trends',
      'Map-based exploration (limited depth)',
    ],
    bestFor: 'Individuals who want situational awareness without deep analysis',
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 89,
    currency: 'zł',
    period: 'month',
    description: 'For data-driven decision making',
    includesEverythingFrom: 'Basic',
    features: [
      'Up to 7 active alerts',
      'Price scoring & market ranking',
      'Full historical data access',
      'Advanced charts and time-series analysis',
      'Price distributions & trend comparisons',
      'City and district-level analytics',
    ],
    bestFor: 'Buyers, analysts, and professionals who want context and history, not just current prices',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'investor',
    name: 'Investor / Pro+',
    price: 149,
    currency: 'zł',
    period: 'month',
    description: 'For investors and professionals allocating capital',
    includesEverythingFrom: 'Pro',
    features: [
      'Up to 30 active alerts',
      'ROI and investment performance metrics',
      'Rental yield analysis',
      'District-to-district comparisons',
      'Volatility & risk indicators',
      'CSV exports',
      'API access for integrations and custom models',
    ],
    bestFor: 'Investors who treat real estate as an asset class, not a one-off purchase',
    highlighted: false,
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  { feature: 'Monthly Price', basic: '49 zł', pro: '89 zł', investor: '149 zł' },
  { feature: 'Active Alerts', basic: '1', pro: '7', investor: '30' },
  { feature: 'Market Overview', basic: true, pro: true, investor: true },
  { feature: 'Historical Data', basic: false, pro: true, investor: true },
  { feature: 'Advanced Charts', basic: false, pro: true, investor: true },
  { feature: 'Price Scoring', basic: false, pro: true, investor: true },
  { feature: 'ROI Metrics', basic: false, pro: false, investor: true },
  { feature: 'Rental Yield', basic: false, pro: false, investor: true },
  { feature: 'District Comparison', basic: false, pro: false, investor: true },
  { feature: 'CSV Export', basic: false, pro: false, investor: true },
  { feature: 'API Access', basic: false, pro: false, investor: true },
];
