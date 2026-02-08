import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getRankChanges } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const RankChangeTracker: React.FC = () => {
  const { t } = useTranslation('analytics');
  const rawData = getRankChanges();
  
  // Pivot data: { month: 'Oct', Warszawa: 1, Kraków: 2 ... }
  const months = Array.from(new Set(rawData.map(d => d.month)));
  const cities = Array.from(new Set(rawData.map(d => d.city)));
  
  const data = months.map(m => {
    const entry: any = { month: m };
    rawData.filter(d => d.month === m).forEach(d => {
      entry[d.city] = d.rank;
    });
    return entry;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7'];

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.rankChange')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.rankChangeSub')}</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <YAxis reversed hide domain={[1, 5]} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
          />
          <Legend />
          {cities.map((city, i) => (
            <Line 
              key={city} 
              type="monotone" 
              dataKey={city} 
              stroke={colors[i % colors.length]} 
              strokeWidth={3} 
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
