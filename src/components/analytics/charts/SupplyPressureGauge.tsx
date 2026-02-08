import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getSupplyPressure } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

interface SupplyPressureGaugeProps {
  days: number;
}

export const SupplyPressureGauge: React.FC<SupplyPressureGaugeProps> = ({ days }) => {
  const { t } = useTranslation('analytics');
  const pressure = getSupplyPressure(days); // e.g., 0.8
  const percentage = Math.min(100, Math.max(0, pressure * 50)); // Normalize 2.0 -> 100%
  
  const data = [
    { name: t('charts.pressure'), value: percentage },
    { name: t('charts.remaining'), value: 100 - percentage },
  ];

  // 180 degree semi-circle
  const cx = '50%';
  const cy = '70%';
  const iR = 60;
  const oR = 80;

  const needleRotation = 180 * (percentage / 100);

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full flex flex-col items-center">
      <div className="w-full mb-2">
        <h3 className="text-sm font-semibold text-foreground">{t('charts.supplyPressure')}</h3>
        <p className="text-xs text-muted-foreground">{t('charts.supplyPressureSub')}</p>
      </div>
      
      <div className="relative w-full h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              stroke="none"
            >
              <Cell fill={pressure > 1.2 ? '#ef4444' : pressure < 0.8 ? '#10b981' : '#f59e0b'} />
              <Cell fill="hsl(var(--secondary))" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Needle Value */}
        <div className="absolute bottom-0 w-full text-center">
          <div className="text-2xl font-bold text-foreground">{pressure.toFixed(2)}x</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {pressure > 1.0 ? t('charts.oversupply') : t('charts.tight')}
          </div>
        </div>
      </div>
    </div>
  );
};
