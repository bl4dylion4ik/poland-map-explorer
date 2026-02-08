import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getPriceDropFrequency } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface PriceDropFrequencyProps {
  days: number;
}

export const PriceDropFrequency: React.FC<PriceDropFrequencyProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const data = getPriceDropFrequency(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.priceDropFreq')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.priceDropFreqSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
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
            unit="%"
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
            dataKey="value" 
            fill="#f59e0b" 
            radius={[4, 4, 0, 0]}
            activeBar={(props: any) => (
              <Rectangle 
                {...props} 
                fill="#fbbf24"
                stroke="#f59e0b"
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
