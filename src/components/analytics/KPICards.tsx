import React from 'react';
import { LISTINGS } from '@/data/mockData';
import { TrendingUp, Home, DollarSign, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const KPICards: React.FC = () => {
  const { t } = useTranslation('analytics');
  const activeListings = LISTINGS.filter(l => l.status === 'active').length;
  const totalListings = LISTINGS.length;
  const prices = LISTINGS.map(l => l.pricePerM2);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const sorted = [...prices].sort((a, b) => a - b);
  const medianPrice = sorted[Math.floor(sorted.length / 2)];
  const soldCount = LISTINGS.filter(l => l.status === 'sold').length;
  const soldRate = Math.round((soldCount / totalListings) * 100);

  const cards = [
    {
      title: t('kpi.activeListings'),
      value: activeListings.toLocaleString(),
      change: '+12.5%',
      positive: true,
      icon: Home,
    },
    {
      title: t('kpi.avgPrice'),
      value: `${avgPrice.toLocaleString()} PLN`,
      change: '+8.3%',
      positive: true,
      icon: DollarSign,
    },
    {
      title: t('kpi.medianPrice'),
      value: `${medianPrice.toLocaleString()} PLN`,
      change: '+5.7%',
      positive: true,
      icon: BarChart3,
    },
    {
      title: t('kpi.soldRate'),
      value: `${soldRate}%`,
      change: '+2.1%',
      positive: true,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              {card.title}
            </span>
            <card.icon size={16} className="text-muted-foreground/50" />
          </div>
          <div className="text-2xl font-bold text-foreground">{card.value}</div>
          <div
            className={`text-xs font-medium mt-1 ${
              card.positive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {card.change} {t('kpi.vsLastYear')}
          </div>
        </div>
      ))}
    </div>
  );
};
