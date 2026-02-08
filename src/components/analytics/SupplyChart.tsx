import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getSupplyByType } from '@/data/mockData';

export const SupplyChart: React.FC = () => {
  const data = getSupplyByType();

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Supply by Property Type</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
          <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(217, 33%, 12%)',
              border: '1px solid hsl(217, 33%, 20%)',
              borderRadius: '8px',
              fontSize: 12,
              color: '#e2e8f0',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
          <Bar dataKey="active" stackId="a" fill="hsl(234, 89%, 74%)" radius={[0, 0, 0, 0]} name="Active" />
          <Bar dataKey="sold" stackId="a" fill="#10b981" name="Sold" />
          <Bar dataKey="reserved" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Reserved" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
