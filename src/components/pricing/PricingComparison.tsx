import React from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { comparisonFeatures } from '@/data/pricingData';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const PricingComparison: React.FC = () => {
  const { t } = useTranslation('pricing');
  const isMobile = useIsMobile();

  const renderValue = (value: boolean | string | undefined) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={18} className="text-primary" />
      ) : (
        <X size={18} className="text-muted-foreground/30" />
      );
    }
    if (typeof value === 'string') {
      return <span className="text-xs font-medium text-foreground">{t(value)}</span>;
    }
    return null;
  };

  const MobileComparison = () => (
    <div className="space-y-8">
      {[
        { id: 'basic', name: t('plans.basic.name'), color: 'text-foreground' },
        { id: 'pro', name: t('plans.pro.name'), color: 'text-primary' },
        { id: 'investor', name: t('plans.investor.name'), color: 'text-foreground' }
      ].map((plan) => (
        <div key={plan.id} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="bg-muted/50 px-4 py-3 border-b border-border">
            <h3 className={`font-bold ${plan.color}`}>{plan.name}</h3>
          </div>
          <div className="divide-y divide-border">
            {comparisonFeatures.map((item, index) => {
              const val = plan.id === 'basic' 
                ? (item.basicBool !== undefined ? item.basicBool : item.basicKey)
                : plan.id === 'pro'
                  ? (item.proBool !== undefined ? item.proBool : item.proKey)
                  : (item.investorBool !== undefined ? item.investorBool : item.investorKey);
              
              return (
                <div key={index} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs text-muted-foreground">{t(item.featureKey)}</span>
                  <div className="flex items-center">
                    {renderValue(val)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      {/* Section Header */}
      <div className="mb-8 md:mb-12 text-center px-4">
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t('comparison.title')}
        </h2>
        <p className="text-base text-muted-foreground">
          {t('comparison.subtitle')}
        </p>
      </div>

      {isMobile ? (
        <MobileComparison />
      ) : (
        /* Desktop Comparison Table */
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
                    {renderValue(item.basicBool !== undefined ? item.basicBool : item.basicKey)}
                  </td>
                  <td className="px-6 py-4 text-center bg-primary/5">
                    {renderValue(item.proBool !== undefined ? item.proBool : item.proKey)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderValue(item.investorBool !== undefined ? item.investorBool : item.investorKey)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Note */}
      {!isMobile && (
        <div className="mt-4 text-center sm:hidden">
          <p className="text-xs text-muted-foreground">
            Scroll horizontally to view all features
          </p>
        </div>
      )}
    </div>
  );
};
