import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LockedOverlayProps {
  title?: string;
  description?: string;
}

export const LockedOverlay: React.FC<LockedOverlayProps> = ({ 
  title = "Unlock Pro Analytics", 
  description = "Get full access to market insights, city-level drill-downs, and advanced volatility metrics."
}) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/50 backdrop-blur-md p-6 text-center animate-in fade-in duration-500">
      <div className="bg-primary/10 p-3 rounded-full mb-4">
        <Lock className="text-primary" size={24} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[280px] mb-6">
        {description}
      </p>
      <Link to="/auth">
        <Button size="sm" className="shadow-lg">
          Sign In to Unlock
        </Button>
      </Link>
    </div>
  );
};
