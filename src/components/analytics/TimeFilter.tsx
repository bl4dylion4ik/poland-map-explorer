import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

export type TimeRange = 1 | 7 | 30 | 60 | 90;

interface TimeFilterProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  disabledRanges?: TimeRange[];
}

const RANGES: { value: TimeRange; label: string }[] = [
  { value: 1, label: '1D' },
  { value: 7, label: '7D' },
  { value: 30, label: '30D' },
  { value: 60, label: '60D' },
  { value: 90, label: '90D' },
];

export const TimeFilter: React.FC<TimeFilterProps> = ({ value, onChange, disabledRanges = [] }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary/50 p-1 rounded-lg border border-border">
      <div className="px-2 text-muted-foreground">
        <Clock size={14} />
      </div>
      {RANGES.map((range) => {
        const isDisabled = disabledRanges.includes(range.value);
        return (
          <Button
            key={range.value}
            variant={value === range.value ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => !isDisabled && onChange(range.value)}
            disabled={isDisabled}
            className={`
              h-7 px-3 text-xs font-medium rounded-md transition-all
              ${value === range.value 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {range.label}
          </Button>
        );
      })}
    </div>
  );
};
