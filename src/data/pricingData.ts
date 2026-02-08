export interface PricingTier {
  id: string;
  nameKey: string;
  price: number;
  currencyKey: string;
  periodKey: string;
  descriptionKey: string;
  includesEverythingFromKey?: string;
  featureKeys: string[];
  bestForKey: string;
  highlighted: boolean;
  badgeKey?: string;
}

export interface ComparisonFeature {
  featureKey: string;
  basicKey: string;
  proKey: string;
  investorKey: string;
  basicBool?: boolean;
  proBool?: boolean;
  investorBool?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    nameKey: 'plans.basic.name',
    price: 49,
    currencyKey: 'plans.basic.currency',
    periodKey: 'plans.basic.period',
    descriptionKey: 'plans.basic.description',
    featureKeys: [0, 1, 2, 3, 4, 5].map(i => `plans.basic.features.${i}`),
    bestForKey: 'plans.basic.bestFor',
    highlighted: false,
  },
  {
    id: 'pro',
    nameKey: 'plans.pro.name',
    price: 89,
    currencyKey: 'plans.pro.currency',
    periodKey: 'plans.pro.period',
    descriptionKey: 'plans.pro.description',
    includesEverythingFromKey: 'plans.basic.name',
    featureKeys: [0, 1, 2, 3, 4, 5].map(i => `plans.pro.features.${i}`),
    bestForKey: 'plans.pro.bestFor',
    highlighted: true,
    badgeKey: 'plans.pro.badge',
  },
  {
    id: 'investor',
    nameKey: 'plans.investor.name',
    price: 149,
    currencyKey: 'plans.investor.currency',
    periodKey: 'plans.investor.period',
    descriptionKey: 'plans.investor.description',
    includesEverythingFromKey: 'plans.pro.name',
    featureKeys: [0, 1, 2, 3, 4, 5, 6].map(i => `plans.investor.features.${i}`),
    bestForKey: 'plans.investor.bestFor',
    highlighted: false,
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  { featureKey: 'comparison.features.price', basicKey: '49 zł', proKey: '89 zł', investorKey: '149 zł' },
  { featureKey: 'comparison.features.alerts', basicKey: '1', proKey: '7', investorKey: '30' },
  { featureKey: 'comparison.features.overview', basicKey: '', proKey: '', investorKey: '', basicBool: true, proBool: true, investorBool: true },
  { featureKey: 'comparison.features.historical', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: true, investorBool: true },
  { featureKey: 'comparison.features.advanced', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: true, investorBool: true },
  { featureKey: 'comparison.features.scoring', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: true, investorBool: true },
  { featureKey: 'comparison.features.roi', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: false, investorBool: true },
  { featureKey: 'comparison.features.yield', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: false, investorBool: true },
  { featureKey: 'comparison.features.district', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: false, investorBool: true },
  { featureKey: 'comparison.features.csv', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: false, investorBool: true },
  { featureKey: 'comparison.features.api', basicKey: '', proKey: '', investorKey: '', basicBool: false, proBool: false, investorBool: true },
];
