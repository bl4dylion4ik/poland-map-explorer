import React from 'react';
import { Building2, Users, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const AudienceSection: React.FC = () => {
  const audiences = [
    {
      icon: Building2,
      title: 'Investors',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      useCases: [
        'Identify undervalued markets',
        'Track yield proxies and volatility',
        'Detect overheating early',
        'Allocate capital with data, not intuition',
      ],
    },
    {
      icon: Users,
      title: 'Developers & Professionals',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      useCases: [
        'Understand demand and pricing power',
        'Monitor competitor supply',
        'Analyze sub-market dynamics',
        'Support feasibility and pricing decisions',
      ],
    },
    {
      icon: Brain,
      title: 'Data-Driven Buyers',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      useCases: [
        'Avoid overpaying',
        'Understand local market structure',
        'See past, not just current prices',
        'Reduce downside risk',
      ],
    },
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Users size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">Who It's For</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Serious Decisions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Investor-grade analytics for those who need to understand markets, not just listings
          </p>
        </div>

        {/* Audience Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <Card
                key={index}
                className="group border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl ${audience.bgColor} transition-transform group-hover:scale-110`}>
                  <Icon size={32} className={audience.color} />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-bold text-foreground">{audience.title}</h3>

                {/* Use Cases */}
                <ul className="space-y-3">
                  {audience.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${audience.color}`} />
                      <span className="text-sm text-muted-foreground">{useCase}</span>
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
              <span className="font-semibold text-foreground">Transparent methodology.</span>{' '}
              <span className="font-semibold text-foreground">No black-box scores.</span>{' '}
              <span className="font-semibold text-foreground">No ads, no promoted listings.</span>
            </p>
            <p className="text-base text-muted-foreground">
              Subscription-based and aligned with your success
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
