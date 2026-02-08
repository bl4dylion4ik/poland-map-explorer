import React from 'react';
import { getCorrelations } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const CorrelationMatrix: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getCorrelations();
  const metrics = Array.from(new Set(data.map(d => d.x)));

  const getColor = (val: number) => {
    if (val === 1) return 'hsl(var(--secondary))'; // Diagonal
    if (val > 0) return `rgba(59, 130, 246, ${val})`; // Blue positive
    return `rgba(239, 68, 68, ${Math.abs(val)})`; // Red negative
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.correlation')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.correlationSub')}</p>
      </div>
      
      <div className="flex-1 grid gap-1" style={{ 
        gridTemplateColumns: `auto repeat(${metrics.length}, 1fr)`,
        gridTemplateRows: `auto repeat(${metrics.length}, 1fr)`
      }}>
        {/* Header Row */}
        <div /> 
        {metrics.map(label => (
          <div key={label} className="text-[10px] text-muted-foreground text-center self-end pb-2 font-medium">
            {label}
          </div>
        ))}

        {/* Rows */}
        {metrics.map(y => (
          <React.Fragment key={y}>
            <div className="text-[10px] text-muted-foreground self-center pr-2 text-right font-medium">
              {y}
            </div>
            {metrics.map(x => {
              const cell = data.find(d => d.x === x && d.y === y);
              const value = cell ? cell.value : 0;
              
              return (
                <div 
                  key={`${x}-${y}`}
                  className="rounded-sm flex items-center justify-center border border-border/50 h-10 w-full"
                  style={{ backgroundColor: getColor(value) }}
                >
                  <span className="text-[10px] font-bold text-foreground drop-shadow-sm">
                    {value > 0 ? '+' : ''}{value}
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
