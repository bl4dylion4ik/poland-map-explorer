import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PricingTier } from '@/data/pricingData';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

interface PricingCardProps extends PricingTier {}

export const PricingCard: React.FC<PricingCardProps> = ({
  nameKey,
  price,
  currencyKey,
  periodKey,
  descriptionKey,
  includesEverythingFromKey,
  featureKeys,
  bestForKey,
  highlighted,
  badgeKey,
}) => {
  const { t } = useTranslation('pricing');
  const { user } = useAuth();
  
  // Note: CTA translation uses common namespace
  const { t: tCommon } = useTranslation('common');

  return (
    <Card
      className={`relative flex flex-col p-8 transition-all ${
        highlighted
          ? 'border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg shadow-primary/10 md:scale-105'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-lg'
      }`}
    >
      {/* Badge */}
      {badgeKey && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs font-semibold">
            {t(badgeKey)}
          </Badge>
        </div>
      )}

      {/* Plan Name */}
      <h3 className="mb-2 text-2xl font-bold text-foreground">{t(nameKey)}</h3>

      {/* Description */}
      <p className="mb-6 text-sm text-muted-foreground">{t(descriptionKey)}</p>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold text-foreground">{price}</span>
          <span className="text-base text-muted-foreground">
            {t(currencyKey)} / {t(periodKey)}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <Link to={user ? "/analytics" : "/auth"} className="mb-8">
        <Button
          size="lg"
          className={`w-full ${
            highlighted
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {user ? t('plans.current') : tCommon('cta.chooseplan', { plan: t(nameKey) })}
        </Button>
      </Link>

      {/* Includes Everything From */}
      {includesEverythingFromKey && (
        <div className="mb-4 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
          {t('common.everythingFrom')} <span className="font-semibold text-foreground">{t(includesEverythingFromKey)}</span>, {t('common.plus')}
        </div>
      )}

      {/* Features List */}
      <ul className="mb-6 flex-1 space-y-3">
        {featureKeys.map((featureKey, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              size={18}
              className={`mt-0.5 shrink-0 ${highlighted ? 'text-primary' : 'text-muted-foreground'}`}
            />
            <span className="text-sm text-foreground">{t(featureKey)}</span>
          </li>
        ))}
      </ul>

      {/* Best For Callout */}
      <div className={`rounded-lg p-4 ${highlighted ? 'bg-primary/10' : 'bg-muted/50'}`}>
        <p className="text-sm italic text-muted-foreground">
          <span className="font-semibold text-foreground">{t('common.bestFor')}</span> {t(bestForKey)}
        </p>
      </div>
    </Card>
  );
};
