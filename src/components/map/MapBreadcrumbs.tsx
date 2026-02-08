import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types/map';

interface MapBreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (index: number) => void;
}

export const MapBreadcrumbs: React.FC<MapBreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <div className="absolute top-6 left-6 flex items-center gap-2 bg-card/90 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-xl z-10">
      <button
        onClick={() => onNavigate(0)}
        className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
      >
        <Home size={16} />
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight size={14} className="text-muted-foreground/40" />
          <button
            onClick={() => onNavigate(index + 1)}
            disabled={index === items.length - 1}
            className={`text-sm font-medium transition-colors ${
              index === items.length - 1
                ? 'text-foreground cursor-default'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
