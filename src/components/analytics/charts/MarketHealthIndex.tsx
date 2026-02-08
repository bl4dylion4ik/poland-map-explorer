import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketHealthIndex } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface MarketHealthIndexProps {
  days: number;
}

export const MarketHealthIndex: React.FC<MarketHealthIndexProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const data = getMarketHealthIndex(days);
  const currentScore = data[data.length - 1]?.score || 0;

  const getStatusColor = (score: number) => {
    if (score >= 70) return 'text-emerald-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{t('charts.healthIndex')}</h3>
          <p className="text-xs text-muted-foreground">{t('charts.healthIndexSub')}</p>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getStatusColor(currentScore)}`}>
            {currentScore}/100
          </div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
            {currentScore >= 70 ? t('charts.healthy') : currentScore >= 40 ? t('charts.stable') : t('charts.stressed')}
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
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
            domain={[0, 100]} 
            hide 
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
            dataKey="score" 
            stroke="hsl(var(--primary))" 
            fill="url(#healthGradient)" 
            strokeWidth={2} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
