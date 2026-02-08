import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PricingTier } from '@/data/pricingData';

interface PricingCardProps extends PricingTier {}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  currency,
  period,
  description,
  includesEverythingFrom,
  features,
  bestFor,
  highlighted,
  badge,
}) => {
  return (
    <Card
      className={`relative flex flex-col p-8 transition-all ${
        highlighted
          ? 'border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10 scale-105'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-lg'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold">
            {badge}
          </Badge>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="mb-2 text-2xl font-bold text-foreground">{name}</h3>

      {/* Description */}
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-foreground">{price}</span>
          <span className="text-base text-muted-foreground">
            {currency} / {period}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Link to="/analytics" className="mb-8">
        <Button
          size="lg"
          className={`w-full ${
            highlighted
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Choose {name}
        </Button>
      </Link>

      {/* Includes Everything From */}
      {includesEverythingFrom && (
        <div className="mb-4 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          Everything in <span className="font-semibold text-foreground">{includesEverythingFrom}</span>, plus:
        </div>
      )}

      {/* Features List */}
      <ul className="mb-6 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              size={18}
              className={`mt-0.5 shrink-0 ${highlighted ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Best For Callout */}
      <div className={`rounded-lg p-4 ${highlighted ? 'bg-primary/10' : 'bg-muted/50'}`}>
        <p className="text-sm italic text-muted-foreground">
          <span className="font-semibold text-foreground">Best for:</span> {bestFor}
        </p>
      </div>
    </Card>
  );
};
