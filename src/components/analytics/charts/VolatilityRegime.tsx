import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getVolatilityRegimes } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface VolatilityRegimeProps {
  days: number;
}

export const VolatilityRegime: React.FC<VolatilityRegimeProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const data = getVolatilityRegimes(days);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.volatilityRegime')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.volatilityRegimeSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
            type="step" 
            dataKey="volatility" 
            stroke="#f59e0b" 
            fill="url(#volGradient)" 
            strokeWidth={2} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
