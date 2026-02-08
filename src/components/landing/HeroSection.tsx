import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation('landing');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-card">
      <div className="container px-6 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BarChart3 size={16} />
            {t('hero.badge')}
          </div>
          
          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('hero.headline')}{' '}
            <span className="text-primary">{t('hero.headlineHighlight')}</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            {t('hero.subheadline')} <span className="text-foreground font-medium">{t('hero.subheadlineWhere')}</span> — {t('hero.subheadlineBut')} <span className="text-primary font-semibold">{t('hero.subheadlineGoing')}</span>.
          </p>
          
          {/* Description */}
          <p className="mb-12 text-base text-muted-foreground max-w-2xl mx-auto">
            {t('hero.description')} <strong className="text-foreground">{t('hero.descriptionBold')}</strong> {t('hero.descriptionFor')}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/analytics">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg hover:shadow-primary/20">
                <BarChart3 size={20} />
                {t('cta.explore', { ns: 'common' })}
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 px-8 text-base border-primary/30 hover:bg-primary/10"
              >
                <Map size={20} />
                {t('cta.viewMap', { ns: 'common' })}
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div className="border-l border-border first:border-l-0 px-4">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-sm text-muted-foreground mt-1">{t('hero.stats.voivodeships')}</div>
            </div>
            <div className="border-l border-border px-4">
              <div className="text-2xl font-bold text-primary">380+</div>
              <div className="text-sm text-muted-foreground mt-1">{t('hero.stats.counties')}</div>
            </div>
            <div className="border-l border-border px-4">
              <div className="text-2xl font-bold text-primary">{t('hero.stats.updates')}</div>
              <div className="text-sm text-muted-foreground mt-1">{t('hero.stats.updatesLabel')}</div>
            </div>
            <div className="border-l border-border px-4">
              <div className="text-2xl font-bold text-primary">{t('hero.stats.tracking')}</div>
              <div className="text-sm text-muted-foreground mt-1">{t('hero.stats.trackingLabel')}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_30%,hsl(var(--primary)/0.1),transparent)]" />
    </section>
  );
};
