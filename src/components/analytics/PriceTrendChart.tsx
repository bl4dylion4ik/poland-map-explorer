import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMonthlyStats } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const PriceTrendChart: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getMonthlyStats();

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.priceTrend')} (2024)</h3>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" /> {t('charts.average')}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> {t('charts.median')}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(234, 89%, 74%)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(234, 89%, 74%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(217, 33%, 12%)',
              border: '1px solid hsl(217, 33%, 20%)',
              borderRadius: '8px',
              fontSize: 12,
              color: '#e2e8f0',
            }}
            formatter={(value: number) => [`${value.toLocaleString()} PLN/m²`]}
          />
          <Area type="monotone" dataKey="avgPrice" stroke="hsl(234, 89%, 74%)" fill="url(#avgGrad)" strokeWidth={2} name={t('charts.average')} />
          <Area type="monotone" dataKey="medianPrice" stroke="#10b981" fill="url(#medGrad)" strokeWidth={2} name={t('charts.median')} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
