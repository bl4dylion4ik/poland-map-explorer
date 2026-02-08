import React from 'react';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ComparisonSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const comparisons = [
    { key: 'focus' },
    { key: 'time' },
    { key: 'metrics' },
    { key: 'analysis' },
    { key: 'risk' },
    { key: 'business' },
  ];

  return (
    <section className="border-b border-border bg-card/50">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Check size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">{t('comparison.badge')}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('comparison.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('comparison.subtitle')}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 border-b border-border bg-card p-4 font-semibold">
              <div className="text-sm text-muted-foreground"></div>
              <div className="text-center text-sm text-muted-foreground">{t('comparison.table.headers.typical')}</div>
              <div className="text-center text-sm text-primary">{t('comparison.table.headers.marketnav')}</div>
            </div>
            
            {/* Table Rows */}
            {comparisons.map((comparison) => (
              <div
                key={comparison.key}
                className="grid grid-cols-3 gap-4 border-b border-border p-4 last:border-b-0 transition-colors hover:bg-card/50"
              >
                <div className="flex items-center font-medium text-foreground text-sm sm:text-base">
                  {t(`comparison.table.rows.${comparison.key}.label`)}
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <X size={16} className="shrink-0 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {t(`comparison.table.rows.${comparison.key}.typical`)}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <Check size={16} className="shrink-0 text-primary" />
                  <span className="text-xs font-medium text-primary sm:text-sm">
                    {t(`comparison.table.rows.${comparison.key}.marketnav`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Note */}
          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-base text-foreground sm:text-lg">
              {t('comparison.note')}{' '}
              <span className="font-bold text-primary">{t('comparison.noteBold')}</span>{' '}
              {t('comparison.noteEnd')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
