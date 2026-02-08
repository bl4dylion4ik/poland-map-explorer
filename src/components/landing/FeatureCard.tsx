import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, details }) => {
  return (
    <Card className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      {/* Icon */}
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
        <Icon size={24} />
      </div>
      
      {/* Title */}
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      
      {/* Description */}
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      
      {/* Details List */}
      <ul className="space-y-2">
        {details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      
      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
    </Card>
  );
};
