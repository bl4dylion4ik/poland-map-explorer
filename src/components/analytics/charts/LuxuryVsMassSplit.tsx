import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getLuxuryVsMassSplit } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface LuxuryVsMassSplitProps {
  days: number;
}

export const LuxuryVsMassSplit: React.FC<LuxuryVsMassSplitProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const data = getLuxuryVsMassSplit(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.luxuryMass')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.luxuryMassSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} stackOffset="expand">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(value) => `${value * 100}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value}%`]}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="luxury" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.8} />
          <Area type="monotone" dataKey="mass" stackId="1" stroke="hsl(var(--muted))" fill="hsl(var(--muted))" fillOpacity={0.8} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
