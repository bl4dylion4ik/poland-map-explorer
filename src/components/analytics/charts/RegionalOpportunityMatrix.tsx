import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getRegionalOpportunityMatrix } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const RegionalOpportunityMatrix: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getRegionalOpportunityMatrix();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.regionalOpp')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.regionalOppSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Price Growth" 
            unit="%" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Price Growth', position: 'bottom', offset: 0, fontSize: 10 }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Absorption" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Absorption Speed', angle: -90, position: 'left', fontSize: 10 }}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border p-2 rounded shadow text-xs">
                    <p className="font-bold">{d.name}</p>
                    <p>Growth: {d.x}%</p>
                    <p>Absorb: {d.y}</p>
                    <p className="text-primary mt-1">{d.category}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine x={0} stroke="hsl(var(--border))" />
          <ReferenceLine y={50} stroke="hsl(var(--border))" />
          
          <Scatter name="Cities" data={data} fill="hsl(var(--primary))">
            {/* Can add custom shape here if needed */}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
