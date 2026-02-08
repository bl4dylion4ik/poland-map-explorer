import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const ProblemSection: React.FC = () => {
  const { t } = useTranslation('landing');

  return (
    <section className="border-b border-border bg-card/50">
      <div className="container px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-primary">
              <AlertCircle size={24} />
              <span className="text-sm font-semibold uppercase tracking-wider">{t('problem.badge')}</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('problem.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('problem.subtitle')}
            </p>
          </div>

          {/* Problems Grid */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <Card 
                key={index} 
                className="border-border bg-background/50 p-6 transition-all hover:border-primary/30 hover:bg-background"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                  <p className="text-base text-foreground">{t(`problem.issues.${index}`)}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Quote Block */}
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 bg-primary/10 blur-3xl" />
            <div className="relative space-y-4">
              <p className="text-lg text-muted-foreground sm:text-xl">
                {t('problem.quote.typical')}
              </p>
              <p className="text-2xl font-medium italic text-foreground/70 sm:text-3xl">
                {t('problem.quote.typicalQuestion')}
              </p>
              
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <p className="text-lg text-muted-foreground sm:text-xl">
                {t('problem.quote.marketnav')}
              </p>
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                {t('problem.quote.marketnavAnswer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
