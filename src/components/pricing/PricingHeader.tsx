import React from 'react';
import { CreditCard } from 'lucide-react';

export const PricingHeader: React.FC = () => {
  return (
    <div className="mb-16 text-center">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 text-primary">
        <CreditCard size={24} />
        <span className="text-sm font-semibold uppercase tracking-wider">Pricing Plans</span>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Choose Your Plan
      </h1>

      {/* Subtitle */}
      <p className="mx-auto mb-3 max-w-2xl text-lg text-muted-foreground sm:text-xl">
        Choose the level of market insight that matches how seriously you invest
      </p>

      {/* Subtext */}
      <p className="text-base text-muted-foreground">
        All plans include daily data updates and access to the MarketNav platform
      </p>
    </div>
  );
};
