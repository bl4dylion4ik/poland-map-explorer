import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterState {
  voivodeship: string | null;
  city: string | null;
  propertyType: string | null;
  dateRange: { from: string; to: string } | null;
}

interface FilterContextType {
  filters: FilterState;
  setVoivodeship: (v: string | null) => void;
  setCity: (c: string | null) => void;
  setPropertyType: (t: string | null) => void;
  setDateRange: (r: { from: string; to: string } | null) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  voivodeship: null,
  city: null,
  propertyType: null,
  dateRange: null,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const setVoivodeship = (v: string | null) => setFilters(prev => ({ ...prev, voivodeship: v, city: null }));
  const setCity = (c: string | null) => setFilters(prev => ({ ...prev, city: c }));
  const setPropertyType = (t: string | null) => setFilters(prev => ({ ...prev, propertyType: t }));
  const setDateRange = (r: { from: string; to: string } | null) => setFilters(prev => ({ ...prev, dateRange: r }));
  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setVoivodeship, setCity, setPropertyType, setDateRange, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilters must be used within FilterProvider');
  return context;
};
