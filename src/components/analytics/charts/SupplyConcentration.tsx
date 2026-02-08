import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSupplyConcentration } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const SupplyConcentration: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getSupplyConcentration();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.supplyConc')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.supplyConcSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="segment" 
            type="category" 
            tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} 
            width={70}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="concentration" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
