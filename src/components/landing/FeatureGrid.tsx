import React from 'react';
import { BarChart3, Map, TrendingUp, AlertTriangle, Bell, PieChart } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { useTranslation } from 'react-i18next';

export const FeatureGrid: React.FC = () => {
  const { t } = useTranslation('landing');

  const features = [
    {
      icon: BarChart3,
      titleKey: 'features.list.analytics.title',
      descriptionKey: 'features.list.analytics.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.analytics.features.${i}`),
    },
    {
      icon: Map,
      titleKey: 'features.list.map.title',
      descriptionKey: 'features.list.map.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.map.features.${i}`),
    },
    {
      icon: TrendingUp,
      titleKey: 'features.list.historical.title',
      descriptionKey: 'features.list.historical.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.historical.features.${i}`),
    },
    {
      icon: AlertTriangle,
      titleKey: 'features.list.risk.title',
      descriptionKey: 'features.list.risk.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.risk.features.${i}`),
    },
    {
      icon: Bell,
      titleKey: 'features.list.alerts.title',
      descriptionKey: 'features.list.alerts.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.alerts.features.${i}`),
    },
    {
      icon: PieChart,
      titleKey: 'features.list.distribution.title',
      descriptionKey: 'features.list.distribution.description',
      featureKeys: [0, 1, 2, 3].map(i => `features.list.distribution.features.${i}`),
    },
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <BarChart3 size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">{t('features.badge')}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
              details={feature.featureKeys.map(key => t(key))}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            {t('features.note')}{' '}
            <span className="font-semibold text-primary">{t('features.noteBold')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
