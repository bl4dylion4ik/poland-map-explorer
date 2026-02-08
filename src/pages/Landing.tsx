import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { AudienceSection } from '@/components/landing/AudienceSection';
import { CTASection } from '@/components/landing/CTASection';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      <div className="animate-fade-in-delay-1">
        <ProblemSection />
      </div>
      <div className="animate-fade-in-delay-2">
        <FeatureGrid />
      </div>
      <div className="animate-fade-in-delay-1">
        <ComparisonSection />
      </div>
      <div className="animate-fade-in-delay-2">
        <AudienceSection />
      </div>
      <div className="animate-fade-in-delay-1">
        <CTASection />
      </div>
    </div>
  );
};

export default Landing;
