import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getTimeOnMarketStats } from '@/data/mockData';

interface TimeOnMarketChartProps {
  days: number;
}

export const TimeOnMarketChart: React.FC<TimeOnMarketChartProps> = ({ days }) => {
  const data = getTimeOnMarketStats(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">Average Time on Market</h3>
        <p className="text-xs text-muted-foreground">Days active before removal (with p25-p75 bands)</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="tomGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
            minTickGap={30}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
            unit="d"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="avgDays" 
            name="Avg Days" 
            stroke="hsl(var(--primary))" 
            fill="url(#tomGradient)" 
            strokeWidth={2} 
          />
          <Area 
            type="monotone" 
            dataKey="p75" 
            stroke="transparent" 
            fill="hsl(var(--muted))" 
            fillOpacity={0.2} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
