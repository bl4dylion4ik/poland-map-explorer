import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine } from 'recharts';
import { getVolatilityMatrix } from '@/data/mockData';

export const VolatilityMatrix: React.FC = () => {
  const data = getVolatilityMatrix();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Price Momentum vs Volatility</h3>
        <p className="text-xs text-muted-foreground">Identify stable vs speculative markets</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            type="number" 
            dataKey="priceChange" 
            name="30d Price Change" 
            unit="%" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Price Momentum (%)', position: 'bottom', offset: 0, fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            type="number" 
            dataKey="volatility" 
            name="Volatility Score" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            label={{ value: 'Volatility', angle: -90, position: 'left', fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
          />
          <ZAxis type="number" dataKey="size" range={[50, 400]} />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }} 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-card border border-border p-2 rounded shadow text-xs">
                    <p className="font-bold">{data.name}</p>
                    <p>Change: {data.priceChange}%</p>
                    <p>Vol: {data.volatility}</p>
                    <p className="text-primary mt-1">{data.category}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <ReferenceLine x={0} stroke="hsl(var(--border))" />
          <ReferenceLine y={5} stroke="hsl(var(--border))" label={{ value: 'High Risk', position: 'insideTopLeft', fontSize: 10 }} />
          <Scatter name="Cities" data={data} fill="hsl(var(--primary))" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
