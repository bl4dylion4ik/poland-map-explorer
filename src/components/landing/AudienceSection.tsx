import React from 'react';
import { Building2, Users, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export const AudienceSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const audiences = [
    {
      icon: Building2,
      key: 'investors',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
    },
    {
      icon: Users,
      key: 'developers',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
    },
    {
      icon: Brain,
      key: 'buyers',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
    },
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Users size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">{t('audience.badge')}</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t('audience.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('audience.subtitle')}
          </p>
        </div>

        {/* Audience Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <Card
                key={audience.key}
                className="group border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl ${audience.bgColor} transition-transform group-hover:scale-110`}>
                  <Icon size={32} className={audience.color} />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold text-foreground">
                  {t(`audience.segments.${audience.key}.title`)}
                </h3>

                {/* Use Cases */}
                <ul className="space-y-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${audience.color}`} />
                      <span className="text-sm text-muted-foreground">
                        {t(`audience.segments.${audience.key}.useCases.${idx}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <p className="text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">{t('audience.values.transparent')}</span>{' '}
              <span className="font-semibold text-foreground">{t('audience.values.noBlackbox')}</span>{' '}
              <span className="font-semibold text-foreground">{t('audience.values.noAds')}</span>
            </p>
            <p className="text-base text-muted-foreground">
              {t('audience.values.subscription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
