import React, { useState } from 'react';
import { getTopCities } from '@/data/mockData';
import { ArrowUpDown, TrendingUp, TrendingDown, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type SortMetric = 'price' | 'supply' | 'growth';

interface RankingTableProps {
  isFullAccess?: boolean;
}

export const RankingTable: React.FC<RankingTableProps> = ({ isFullAccess = true }) => {
  const { t } = useTranslation('analytics');
  const [sortBy, setSortBy] = useState<SortMetric>('price');
  const data = getTopCities(sortBy, 10);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-foreground">{t('ranking.title')}</h3>
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
              {t(`ranking.${m}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden relative flex-1">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-muted-foreground border-b border-border">
              <th className="text-left py-2 font-medium">#</th>
              <th className="text-left py-2 font-medium">{t('ranking.city')}</th>
              <th className="text-left py-2 font-medium">{t('ranking.voivodeship')}</th>
              <th className="text-right py-2 font-medium">
                <span className="flex items-center justify-end gap-1">
                  {sortBy === 'price' ? t('ranking.avgPrice') : sortBy === 'supply' ? t('ranking.active') : t('ranking.yoy')}
                  <ArrowUpDown size={10} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const isLocked = !isFullAccess && i >= 3;
              return (
                <tr 
                  key={row.city} 
                  className={`border-b border-border/50 transition-colors ${
                    isLocked ? 'blur-[3px] opacity-40 select-none pointer-events-none' : 'hover:bg-secondary/30'
                  }`}
                >
                  <td className="py-2.5 text-muted-foreground font-mono">{i + 1}</td>
                  <td className="py-2.5 text-foreground font-medium">{row.city}</td>
                  <td className="py-2.5 text-muted-foreground capitalize">{row.voivodeship}</td>
                  <td className="py-2.5 text-right font-mono">
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
              );
            })}
          </tbody>
        </table>

        {!isFullAccess && (
          <div className="absolute inset-0 top-[120px] flex flex-col items-center justify-center bg-gradient-to-t from-background via-background/80 to-transparent p-6 text-center z-10">
            <div className="bg-primary/10 p-2 rounded-full mb-3">
              <Lock className="text-primary" size={16} />
            </div>
            <p className="text-[11px] font-medium text-foreground max-w-[240px] mb-4 leading-relaxed">
              Get full access to market insights, city-level drill-downs, and advanced volatility metrics.
            </p>
            <Link to="/auth">
              <Button size="sm" className="h-8 text-[10px] px-4 shadow-lg">
                Unlock 380+ Cities
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
