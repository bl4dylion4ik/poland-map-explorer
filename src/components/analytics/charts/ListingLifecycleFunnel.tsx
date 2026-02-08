import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import { getListingLifecycle } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface ListingLifecycleFunnelProps {
  days: number;
}

export const ListingLifecycleFunnel: React.FC<ListingLifecycleFunnelProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const data = getListingLifecycle(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.lifecycle')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.lifecycleSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} 
            width={70}
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
            dataKey="value" 
            radius={[0, 4, 4, 0]} 
            barSize={30}
            activeBar={(props: any) => (
              <Rectangle 
                {...props} 
                height={props.height + 4}
                y={props.y - 2}
                width={props.width + 4}
                fillOpacity={0.8}
              />
            )}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
