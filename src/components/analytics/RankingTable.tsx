import React, { useState } from 'react';
import { getTopCities } from '@/data/mockData';
import { ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

type SortMetric = 'price' | 'supply' | 'growth';

export const RankingTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortMetric>('price');
  const data = getTopCities(sortBy, 10);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">City Rankings</h3>
        <div className="flex gap-1">
          {(['price', 'supply', 'growth'] as SortMetric[]).map((m) => (
            <button
              key={m}
              onClick={() => setSortBy(m)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                sortBy === m
                  ? 'bg-primary/20 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {m === 'price' ? 'Price' : m === 'supply' ? 'Supply' : 'Growth'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left py-2 font-medium">#</th>
              <th className="text-left py-2 font-medium">City</th>
              <th className="text-left py-2 font-medium">Voivodeship</th>
              <th className="text-right py-2 font-medium">
                <span className="flex items-center justify-end gap-1">
                  {sortBy === 'price' ? 'Avg PLN/m²' : sortBy === 'supply' ? 'Active' : 'YoY'}
                  <ArrowUpDown size={10} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.city} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="py-2 text-muted-foreground font-mono">{i + 1}</td>
                <td className="py-2 text-foreground font-medium">{row.city}</td>
                <td className="py-2 text-muted-foreground capitalize">{row.voivodeship}</td>
                <td className="py-2 text-right font-mono">
                  {sortBy === 'price' && (
                    <span className="text-foreground">{row.avgPrice.toLocaleString()}</span>
                  )}
                  {sortBy === 'supply' && (
                    <span className="text-foreground">{row.supply}</span>
                  )}
                  {sortBy === 'growth' && (
                    <span className={`flex items-center justify-end gap-1 ${row.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {row.growth >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                      {row.growth > 0 ? '+' : ''}{row.growth}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
