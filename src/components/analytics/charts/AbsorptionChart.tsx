import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAbsorptionStats } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface AbsorptionChartProps {
  days: number;
}

export const AbsorptionChart: React.FC<AbsorptionChartProps> = ({ days }) => {
  const { t } = useTranslation('analytics'); // Assuming we add translations later
  const data = getAbsorptionStats(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Listing Absorption Speed</h3>
        <p className="text-xs text-muted-foreground">New vs Removed listings & Absorption Rate</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
            minTickGap={30}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Bar yAxisId="left" dataKey="new" name="New Listings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
          <Line yAxisId="left" type="monotone" dataKey="removed" name="Removed" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="absorptionRate" name="Absorption Rate" stroke="hsl(var(--accent))" strokeDasharray="3 3" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
