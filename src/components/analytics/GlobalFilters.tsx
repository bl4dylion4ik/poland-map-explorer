import React from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { VOIVODESHIPS, CITIES, PROPERTY_TYPES } from '@/data/mockData';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const GlobalFilters: React.FC = () => {
  const { t } = useTranslation('analytics');
  const { filters, setVoivodeship, setCity, setPropertyType, resetFilters } = useFilters();

  const filteredCities = filters.voivodeship
    ? CITIES.filter(c => c.voivodeship === filters.voivodeship)
    : CITIES;

  const hasFilters = !!(filters.voivodeship || filters.city || filters.propertyType);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
      <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
        <Filter size={14} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">{t('filters.label')}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {/* Voivodeship Select */}
        <select
          value={filters.voivodeship || ''}
          onChange={(e) => setVoivodeship(e.target.value || null)}
          className="flex-1 sm:flex-none bg-secondary/50 border border-border rounded-lg px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary capitalize min-w-[100px]"
        >
          <option value="">{t('filters.voivodeships')}</option>
          {VOIVODESHIPS.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        {/* City Select */}
        <select
          value={filters.city || ''}
          onChange={(e) => setCity(e.target.value || null)}
          className="flex-1 sm:flex-none bg-secondary/50 border border-border rounded-lg px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-w-[100px]"
        >
          <option value="">{t('filters.cities')}</option>
          {filteredCities.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Property Type Select */}
        <select
          value={filters.propertyType || ''}
          onChange={(e) => setPropertyType(e.target.value || null)}
          className="flex-1 sm:flex-none bg-secondary/50 border border-border rounded-lg px-2 sm:px-3 py-1.5 text-[11px] sm:text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary capitalize min-w-[100px]"
        >
          <option value="">{t('filters.types')}</option>
          {PROPERTY_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 px-2 text-[11px] text-muted-foreground hover:text-foreground"
          >
            <X size={12} className="mr-1" />
            {t('filters.clear')}
          </Button>
        )}
      </div>
    </div>
  );
};
