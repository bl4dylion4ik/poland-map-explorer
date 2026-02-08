import React from 'react';
import { Map as MapIcon, Layers, DollarSign, TrendingUp, Info } from 'lucide-react';
import { MetricType } from '@/types/map';
import { METRICS } from '@/constants/map';

interface MapSidebarProps {
  activeMetric: MetricType;
  onMetricChange: (m: MetricType) => void;
}

export const MapSidebar: React.FC<MapSidebarProps> = ({ activeMetric, onMetricChange }) => {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full z-20">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-1">
          <MapIcon size={24} className="text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">MarketNav</h1>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
          Poland Analytics
        </p>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Data Layers
          </h3>
          <div className="space-y-1">
            {METRICS.map((metric) => {
              const isActive = activeMetric === metric.id;
              const Icon =
                metric.id === 'supply' ? Layers : metric.id === 'price' ? DollarSign : TrendingUp;

              return (
                <button
                  key={metric.id}
                  onClick={() => onMetricChange(metric.id as MetricType)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20 shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span>{metric.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
            Map Settings
          </h3>
          <div className="px-3 py-4 bg-secondary rounded-lg border border-border space-y-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Boundaries</span>
              <span className="text-xs bg-card px-2 py-1 rounded text-foreground/80">Official</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Projection</span>
              <span className="text-xs bg-card px-2 py-1 rounded text-foreground/80">Mercator</span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Data Source</span>
              <span className="text-xs bg-card px-2 py-1 rounded text-foreground/80">GUS / Gov</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Info size={14} />
          <span>About Methodology</span>
        </button>
      </div>
    </div>
  );
};
