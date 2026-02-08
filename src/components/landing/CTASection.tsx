import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Map, Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CTASection: React.FC = () => {
  const { t } = useTranslation('landing');

  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t('cta.title')}{' '}
            <span className="text-primary">{t('cta.titleHighlight')}</span>
          </h2>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            {t('cta.subtitle')} <span className="text-foreground font-medium">{t('cta.subtitleWhere')}</span> — {t('cta.subtitleBut')} <span className="text-primary font-semibold">{t('cta.subtitleGoing')}</span>
          </p>
          
          {/* Primary CTA */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/analytics">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg hover:shadow-primary/20">
                <BarChart3 size={20} />
                {t('cta.button')}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-6">
            <Link to="/analytics" className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <Map size={16} />
              <span className="group-hover:underline">{t('cta.links.map')}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/analytics" className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <BarChart3 size={16} />
              <span className="group-hover:underline">{t('cta.links.overview')}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/analytics" className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
              <Bell size={16} />
              <span className="group-hover:underline">{t('cta.links.alerts')}</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Bottom Tagline */}
          <div className="mt-16 border-t border-border pt-8">
            <p className="text-base italic text-muted-foreground">
              {t('cta.tagline')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-64 w-64 bg-accent/20 blur-3xl" />
    </section>
  );
};
