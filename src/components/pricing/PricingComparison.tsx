import React from 'react';
import { Check, X } from 'lucide-react';
import { comparisonFeatures } from '@/data/pricingData';

export const PricingComparison: React.FC = () => {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={20} className="mx-auto text-primary" />
      ) : (
        <X size={20} className="mx-auto text-muted-foreground/50" />
      );
    }
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Compare Plans
        </h2>
        <p className="text-lg text-muted-foreground">
          Detailed feature comparison across all tiers
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full">
          {/* Table Header */}
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                Feature
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                Basic
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-primary">
                Pro
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                Investor / Pro+
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
                  {item.feature}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(item.basic)}
                </td>
                <td className="px-6 py-4 text-center bg-primary/5">
                  {renderCell(item.pro)}
                </td>
                <td className="px-6 py-4 text-center">
                  {renderCell(item.investor)}
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
