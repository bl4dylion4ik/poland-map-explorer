import React from 'react';
import { Check, X } from 'lucide-react';
import { comparisonFeatures } from '@/data/pricingData';
import { useTranslation } from 'react-i18next';

export const PricingComparison: React.FC = () => {
  const { t } = useTranslation('pricing');

  const renderCell = (value: boolean | string | undefined) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="mx-auto text-primary" />
      ) : (
        <X size={20} className="mx-auto text-muted-foreground/50" />
      );
    }
    // If string is provided, assume it's a translation key or raw value
    if (typeof value === 'string') {
        // Simple check if it looks like a translation key, otherwise try to translate or return as is
        // But for this data structure, strings are keys or raw values like '1'.
        // Since '1', '7', '30' are not keys, t() will return them as is if key missing.
        // But better to be explicit. In our data, `basicKey`, `proKey` are used.
        return <span className="text-sm font-medium text-foreground">{t(value)}</span>;
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('comparison.title')}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t('comparison.subtitle')}
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full">
          {/* Table Header */}
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                {t('comparison.features.feature')}
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                {t('plans.basic.name')}
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                {t('plans.pro.name')}
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                {t('plans.investor.name')}
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {comparisonFeatures.map((item, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-b-0 transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {t(item.featureKey)}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(item.basicBool !== undefined ? item.basicBool : item.basicKey)}
                </td>
                <td className="px-6 py-4 text-center bg-primary/5">
                  {renderCell(item.proBool !== undefined ? item.proBool : item.proKey)}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(item.investorBool !== undefined ? item.investorBool : item.investorKey)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Note */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-xs text-muted-foreground">
          Scroll horizontally to view all features
        </p>
      </div>
    </div>
  );
};
