import React from 'react';
import { PricingHeader } from '@/components/pricing/PricingHeader';
import { PricingCard } from '@/components/pricing/PricingCard';
import { PricingComparison } from '@/components/pricing/PricingComparison';
import { PricingFooter } from '@/components/pricing/PricingFooter';
import { pricingTiers } from '@/data/pricingData';

const Pricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content Container */}
      <div className="container px-6 py-20 sm:py-24">
        {/* Header Section */}
        <div className="animate-fade-in">
          <PricingHeader />
        </div>

        {/* Pricing Cards Grid */}
        <div className="animate-fade-in-delay-1 mb-24">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.id} {...tier} />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="animate-fade-in-delay-2 mb-24">
          <PricingComparison />
        </div>

        {/* Footer CTA */}
        <div className="animate-fade-in-delay-1">
          <PricingFooter />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
