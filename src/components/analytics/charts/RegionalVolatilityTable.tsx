import React from 'react';
import { getRegionalVolatility } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export const RegionalVolatilityTable: React.FC = () => {
  const { t } = useTranslation('analytics');
  const data = getRegionalVolatility();

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.regionalVol')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.regionalVolSub')}</p>
      </div>
      <div className="overflow-auto max-h-[250px]">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left py-2 font-medium">{t('charts.region')}</th>
              <th className="text-right py-2 font-medium">{t('charts.score')}</th>
              <th className="text-right py-2 font-medium">{t('charts.change')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="py-2 text-foreground">{row.city}</td>
                <td className="py-2 text-right">
                  <span className={`px-2 py-0.5 rounded-full ${
                    row.score > 7 ? 'bg-red-500/20 text-red-500' :
                    row.score > 4 ? 'bg-amber-500/20 text-amber-500' :
                    'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {row.score}
                  </span>
                </td>
                <td className={`py-2 text-right ${row.change > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {row.change > 0 ? '+' : ''}{row.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
