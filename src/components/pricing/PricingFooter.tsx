import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PricingFooter: React.FC = () => {
  const { t } = useTranslation('pricing');

  return (
    <div className="mx-auto max-w-4xl text-center">
      {/* No Noise Section */}
      <div className="mb-12 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-12">
        <div className="mb-4 inline-flex items-center gap-2 text-primary">
          <Shield size={24} />
        </div>
        <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          {t('footer.noNoise.title')}
        </h3>
        <p className="mb-2 text-lg text-muted-foreground">
          {t('footer.noNoise.description')}
        </p>
        <p className="text-xl font-semibold text-primary">
          {t('footer.noNoise.value')}
        </p>
      </div>

      {/* CTA Section */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-xl font-bold text-foreground">
            {t('footer.cta.title')}
          </h3>
          <p className="text-base text-muted-foreground">
            {t('footer.cta.description')} <span className="font-semibold text-foreground">{t('footer.cta.plan')}</span> {t('footer.cta.suffix')}
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/analytics">
            <Button size="lg" className="gap-2 px-8 shadow-lg hover:shadow-primary/20">
              {t('footer.cta.button')}
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <p>{t('footer.info.monthly')}</p>
          <p>{t('footer.info.cancel')}</p>
        </div>
      </div>
    </div>
  );
};
