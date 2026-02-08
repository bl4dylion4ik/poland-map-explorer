import React from 'react';
import { BarChart3, Map, TrendingUp, AlertTriangle, Bell, PieChart } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Market Analytics',
      description: 'Daily-updated metrics across all market levels',
      details: [
        'Prices per m² (average, median, percentiles)',
        'Supply and absorption dynamics',
        'New vs removed listings tracking',
        'Market growth and cooling signals',
      ],
    },
    {
      icon: Map,
      title: 'Map-First Exploration',
      description: 'Interactive geographic analysis tool',
      details: [
        'Official administrative boundaries',
        'Choropleth and density layers',
        'Drill-down from country to district',
        'Cross-filtering between map and charts',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Historical Intelligence',
      description: 'Track market evolution over time',
      details: [
        'Multi-year price and supply trends',
        'Structural vs short-term changes',
        'Market regime detection',
        'Distribution shifts, not just averages',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Risk Insights',
      description: 'Identify market risks and anomalies',
      details: [
        'Seller concentration analysis',
        'Pattern-based risk indicators',
        'Volatility and dispersion metrics',
        'Explainable, aggregated signals',
      ],
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Get notified when markets shift',
      details: [
        'New listings matching criteria',
        'Price drops and abnormal changes',
        'Emerging hotspots detection',
        'Market condition shifts',
      ],
    },
    {
      icon: PieChart,
      title: 'Distribution Analysis',
      description: 'Understand market dispersion',
      details: [
        'Price distribution histograms',
        'Percentile band tracking',
        'Property type segmentation',
        'Market concentration metrics',
      ],
    },
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="container px-6 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <BarChart3 size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">Core Capabilities</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What MarketNav Does
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive analytics across country, voivodeship, city, and district levels
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            The map is not decoration — it is an{' '}
            <span className="font-semibold text-primary">analytical instrument</span>
          </p>
        </div>
      </div>
    </section>
  );
};
