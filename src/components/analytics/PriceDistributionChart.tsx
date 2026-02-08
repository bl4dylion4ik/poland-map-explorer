import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getPriceDistribution } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const PriceDistributionChart: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getPriceDistribution();

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">{t('charts.priceDistribution')} (PLN/m²)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
          <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              backgroundColor: 'hsl(217, 33%, 12%)',
              border: '1px solid hsl(217, 33%, 20%)',
              borderRadius: '8px',
              fontSize: 12,
              color: '#e2e8f0',
            }}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(234, 89%, 74%)" 
            radius={[4, 4, 0, 0]}
            activeBar={(props: any) => (
              <Rectangle 
                {...props} 
                fill="hsl(234, 89%, 80%)"
                stroke="hsl(234, 89%, 74%)"
                strokeWidth={1}
                // Slightly expand the bar
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
