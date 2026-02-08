import React from 'react';
import { CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PricingHeader: React.FC = () => {
  const { t } = useTranslation('pricing');

  return (
    <div className="mb-16 text-center">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 text-primary">
        <CreditCard size={24} />
        <span className="text-sm font-semibold uppercase tracking-wider">{t('header.badge')}</span>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {t('header.title')}
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mb-3 max-w-2xl text-lg text-muted-foreground sm:text-xl">
        {t('header.subtitle')}
      </p>

      {/* Subtext */}
      <p className="text-base text-muted-foreground">
        {t('header.note')}
      </p>
    </div>
  );
};
