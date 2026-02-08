import React from 'react';
import { Check, X } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const comparisons = [
    { aspect: 'Focus', typical: 'Listings-first', marketnav: 'Market-first' },
    { aspect: 'Time Horizon', typical: 'Point-in-time', marketnav: 'Historical + temporal' },
    { aspect: 'Metrics', typical: 'Averages only', marketnav: 'Distributions & volatility' },
    { aspect: 'Analysis', typical: 'Static dashboards', marketnav: 'Exploratory analytics' },
    { aspect: 'Risk Context', typical: 'No risk insights', marketnav: 'Risk-aware signals' },
    { aspect: 'Business Model', typical: 'Ads & promoted listings', marketnav: 'Subscription-based' },
  ];

  return (
    <section className="border-b border-border bg-card/50">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Check size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">Differentiation</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Makes MarketNav Different
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Built for serious decisions, not casual browsing
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border bg-background">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 border-b border-border bg-card p-4 font-semibold">
              <div className="text-sm text-muted-foreground"></div>
              <div className="text-center text-sm text-muted-foreground">Typical Portals</div>
              <div className="text-center text-sm text-primary">MarketNav</div>
            </div>
            
            {/* Table Rows */}
            {comparisons.map((comparison, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 border-b border-border p-4 last:border-b-0 transition-colors hover:bg-card/50"
              >
                <div className="flex items-center font-medium text-foreground text-sm sm:text-base">
                  {comparison.aspect}
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <X size={16} className="shrink-0 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground sm:text-sm">{comparison.typical}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <Check size={16} className="shrink-0 text-primary" />
                  <span className="text-xs font-medium text-primary sm:text-sm">{comparison.marketnav}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Note */}
          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-base text-foreground sm:text-lg">
              MarketNav feels closer to a{' '}
              <span className="font-bold text-primary">financial market terminal</span>{' '}
              than a real-estate website
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
