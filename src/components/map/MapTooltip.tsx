import React from 'react';
import { formatMetric } from '@/services/mockDataService';
import { MarketStats, MetricType } from '@/types/map';

interface MapTooltipProps {
  x: number;
  y: number;
  data: MarketStats | null;
  metric: MetricType;
  visible: boolean;
}

export const MapTooltip: React.FC<MapTooltipProps> = ({ x, y, data, metric, visible }) => {
  if (!visible || !data) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none rounded-lg shadow-xl p-3 text-sm min-w-[180px] border"
      style={{
        left: x + 16,
        top: y + 16,
        backgroundColor: 'hsl(var(--map-tooltip-bg))',
        borderColor: 'hsl(var(--map-tooltip-border))',
      }}
    >
      <div className="font-bold text-foreground mb-1.5 border-b border-border pb-1.5">
        {data.name}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="capitalize">{metric}:</span>
          <span className="font-mono text-foreground font-medium ml-3">
            {formatMetric(data[metric] as number, metric)}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Listings:</span>
          <span className="font-mono text-foreground font-medium ml-3">
            {data.listings.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground/60">
        Click to zoom in
      </div>
    </div>
  );
};
