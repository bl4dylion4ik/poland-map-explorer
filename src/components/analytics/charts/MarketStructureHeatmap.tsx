import React from 'react';
import { getMarketStructureStats } from '@/data/mockData';

export const MarketStructureHeatmap: React.FC = () => {
  const data = getMarketStructureStats();
  
  // Pivot data for grid render
  const xLabels = Array.from(new Set(data.map(d => d.x)));
  const yLabels = Array.from(new Set(data.map(d => d.y)));
  
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Supply by Rooms vs Price</h3>
        <p className="text-xs text-muted-foreground">Market concentration heatmap</p>
      </div>
      
      <div className="flex-1 grid gap-1" style={{ 
        gridTemplateColumns: `auto repeat(${xLabels.length}, 1fr)`,
        gridTemplateRows: `auto repeat(${yLabels.length}, 1fr)`
      }}>
        {/* Header Row */}
        <div /> {/* Top-left empty */}
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
              const intensity = value / maxValue;
              
              return (
                <div 
                  key={`${x}-${y}`}
                  className="rounded-sm relative group cursor-default"
                  style={{
                    backgroundColor: `hsl(var(--primary))`,
                    opacity: 0.1 + (intensity * 0.9)
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-bold text-primary-foreground drop-shadow-md">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
