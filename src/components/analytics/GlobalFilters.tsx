import React from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { VOIVODESHIPS, CITIES, PROPERTY_TYPES } from '@/data/mockData';
import { Filter, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const GlobalFilters: React.FC = () => {
  const { t } = useTranslation('analytics');
  const { filters, setVoivodeship, setCity, setPropertyType, resetFilters } = useFilters();

  const filteredCities = filters.voivodeship
    ? CITIES.filter(c => c.voivodeship === filters.voivodeship)
    : CITIES;

  const hasFilters = filters.voivodeship || filters.city || filters.propertyType;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Filter size={14} />
        <span className="text-xs font-medium uppercase tracking-wider">{t('filters.label')}</span>
      </div>

      <select
        value={filters.voivodeship || ''}
        onChange={(e) => setVoivodeship(e.target.value || null)}
        className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary capitalize"
      >
        <option value="">{t('filters.voivodeships')}</option>
        {VOIVODESHIPS.map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>

      <select
        value={filters.city || ''}
        onChange={(e) => setCity(e.target.value || null)}
        className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">{t('filters.cities')}</option>
        {filteredCities.map(c => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <select
        value={filters.propertyType || ''}
        onChange={(e) => setPropertyType(e.target.value || null)}
        className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary capitalize"
      >
        <option value="">{t('filters.types')}</option>
        {PROPERTY_TYPES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={12} />
          {t('filters.clear')}
        </button>
      )}
    </div>
  );
};
