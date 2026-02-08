import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { getScenarioSensitivity } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const ScenarioSensitivity: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getScenarioSensitivity();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.scenario')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.scenarioSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} 
            width={80}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.2 }}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
          />
          <Legend />
          <ReferenceLine x={0} stroke="hsl(var(--foreground))" />
          <Bar dataKey="price" name={t('charts.priceImpact')} fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={10} />
          <Bar dataKey="supply" name={t('charts.supplyImpact')} fill="#10b981" radius={[0, 4, 4, 0]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
