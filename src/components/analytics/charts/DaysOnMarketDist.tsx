import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getDaysOnMarketDistribution } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const DaysOnMarketDist: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getDaysOnMarketDistribution();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.domDist')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.domDistSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="range" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            activeBar={(props: any) => (
              <Rectangle 
                {...props} 
                fill="hsl(var(--primary))"
                fillOpacity={0.8}
                stroke="hsl(var(--primary))"
                strokeWidth={1}
                width={props.width + 4}
                x={props.x - 2}
                height={props.height + 4}
                y={props.y - 4}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
