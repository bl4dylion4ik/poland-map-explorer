import React from 'react';
import { MetricType } from '@/types/map';
import { COLORS } from '@/constants/map';
import { useTranslation } from 'react-i18next';

interface MapLegendProps {
  metric: MetricType;
}

export const MapLegend: React.FC<MapLegendProps> = ({ metric }) => {
  const { t } = useTranslation('analytics');
  const colorStart = COLORS[metric].low;
  const colorEnd = COLORS[metric].high;

  return (
    <div className="absolute bottom-6 right-6 bg-card/90 backdrop-blur-md border border-border p-4 rounded-lg shadow-2xl max-w-xs z-10">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {t(`sidebar.metrics.${metric}`)}
      </h4>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-muted-foreground font-medium">{t('map.low')}</span>
        <div
          className="h-3 flex-1 rounded-full w-32"
          style={{
            background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
          }}
        />
        <span className="text-xs text-muted-foreground font-medium">{t('map.high')}</span>
      </div>
      <div className="text-[10px] text-muted-foreground/60 text-center mt-1">
        {t('map.intensity')}
      </div>
    </div>
  );
};
