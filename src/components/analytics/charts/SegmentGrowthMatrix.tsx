import React from 'react';
import { getSegmentGrowthMatrix } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const SegmentGrowthMatrix: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getSegmentGrowthMatrix();
  
  const xLabels = Array.from(new Set(data.map(d => d.x)));
  const yLabels = Array.from(new Set(data.map(d => d.y)));

  const getColor = (val: number) => {
    if (val > 5) return `rgba(16, 185, 129, ${Math.min(1, val/15)})`; // Green
    if (val < -5) return `rgba(239, 68, 68, ${Math.min(1, Math.abs(val)/15)})`; // Red
    return 'hsl(var(--muted))';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.segmentGrowth')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.segmentGrowthSub')}</p>
      </div>
      
      <div className="flex-1 grid gap-1" style={{ 
        gridTemplateColumns: `auto repeat(${xLabels.length}, 1fr)`,
        gridTemplateRows: `auto repeat(${yLabels.length}, 1fr)`
      }}>
        {/* Header Row */}
        <div /> 
        {xLabels.map(label => (
          <div key={label} className="text-[10px] text-muted-foreground text-center self-end pb-2">
            {label}
          </div>
        ))}

        {/* Rows */}
        {yLabels.map(y => (
          <React.Fragment key={y}>
            <div className="text-[10px] text-muted-foreground self-center pr-2 text-right">
              {y}
            </div>
            {xLabels.map(x => {
              const cell = data.find(d => d.x === x && d.y === y);
              const value = cell ? cell.value : 0;
              
              return (
                <div 
                  key={`${x}-${y}`}
                  className="rounded-sm relative group cursor-default h-12 flex items-center justify-center border border-border/50"
                  style={{ backgroundColor: getColor(value) }}
                >
                  <span className="text-xs font-bold text-foreground drop-shadow-md">
                    {value > 0 ? '+' : ''}{value}%
                  </span>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
