import React from 'react';
import { formatMetric } from '@/services/mockDataService';
import { MarketStats, MetricType } from '@/types/map';

interface MapTooltipProps {
  x: number;
  y: number;
  data: MarketStats | null;
  visible: boolean;
}

export const MapTooltip: React.FC<MapTooltipProps> = ({ x, y, data, visible }) => {
  if (!visible || !data) return null;

  return (
    <div
      className="absolute z-[1000] pointer-events-none rounded-lg shadow-2xl p-3 text-sm min-w-[200px] border backdrop-blur-md"
      style={{
        left: x + 10,
        top: y + 10,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        color: '#1e293b'
      }}
    >
      <div className="font-bold text-base mb-2 border-b border-slate-200 pb-1.5">
        {data.name}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Listings:</span>
          <span className="font-bold text-slate-900 ml-4">
            {data.listings.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Avg price:</span>
          <span className="font-bold text-slate-900 ml-4">
            {data.price.toLocaleString()} PLN/m²
          </span>
        </div>
      </div>
    </div>
  );
};
