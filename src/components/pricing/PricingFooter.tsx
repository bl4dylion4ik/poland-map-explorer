import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';

export const PricingFooter: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* No Noise Section */}
      <div className="mb-12 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
        <div className="mb-4 inline-flex items-center gap-2 text-primary">
          <Shield size={24} />
        </div>
        <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          No Noise. No Ads. No Promoted Listings.
        </h3>
        <p className="mb-2 text-lg text-muted-foreground">
          MarketNav is subscription-based so our incentives are aligned with yours:
        </p>
        <p className="text-xl font-semibold text-primary">
          better data → better decisions
        </p>
      </div>

      {/* CTA Section */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-xl font-bold text-foreground">
            Ready to explore the market?
          </h3>
          <p className="text-base text-muted-foreground">
            Start with <span className="font-semibold text-foreground">Basic</span> and upgrade anytime as your analysis needs grow
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/analytics">
            <Button size="lg" className="gap-2 px-8 shadow-lg hover:shadow-primary/20">
              Get Started with Basic
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>All plans are monthly subscriptions</p>
          <p>Cancel or upgrade anytime</p>
        </div>
      </div>
    </div>
  );
};
