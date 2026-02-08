import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Map } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-card">
      <div className="container px-6 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <BarChart3 size={16} />
            Real-Estate Market Intelligence
          </div>
          
          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Understand the Polish Real-Estate Market{' '}
            <span className="text-primary">Before You Enter It</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            MarketNav turns raw listings into actionable market insights. 
            See not just <span className="text-foreground font-medium">where prices are</span> — 
            but <span className="text-primary font-semibold">where they're going</span>.
          </p>
          
          {/* Description */}
          <p className="mb-12 text-base text-muted-foreground max-w-2xl mx-auto">
            This is not a listings portal. It's a <strong className="text-foreground">market intelligence system</strong> for 
            investors, developers, and data-driven buyers who need to understand volatility, risk, and opportunity.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/analytics">
              <Button size="lg" className="gap-2 px-8 text-base font-semibold shadow-lg hover:shadow-primary/20">
                <BarChart3 size={20} />
                Explore Market Overview
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
                View Interactive Map
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {[
              { value: '16', label: 'Voivodeships' },
              { value: '380+', label: 'Counties' },
              { value: 'Daily', label: 'Updates' },
              { value: 'Historical', label: 'Tracking' },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-border first:border-l-0 px-4">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_30%,hsl(var(--primary)/0.1),transparent)]" />
    </section>
  );
};
