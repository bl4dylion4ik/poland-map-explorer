import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { MapLegend } from '@/components/map/MapLegend';
import { MapBreadcrumbs } from '@/components/map/MapBreadcrumbs';
import { KPICards } from '@/components/analytics/KPICards';
import { PriceTrendChart } from '@/components/analytics/PriceTrendChart';
import { PriceDistributionChart } from '@/components/analytics/PriceDistributionChart';
import { SupplyChart } from '@/components/analytics/SupplyChart';
import { RankingTable } from '@/components/analytics/RankingTable';
import { GlobalFilters } from '@/components/analytics/GlobalFilters';
import { FilterProvider } from '@/contexts/FilterContext';
import { fetchVoivodeships, fetchCounties } from '@/services/geoService';
import { GeoFeature, GeoJSONCollection, MetricType, MapViewLevel, BreadcrumbItem } from '@/types/map';
import { Loader2, Map as MapIcon, Layers, DollarSign, TrendingUp, BarChart3, LayoutDashboard } from 'lucide-react';
import { METRICS } from '@/constants/map';
import { useTranslation } from 'react-i18next';

type ViewTab = 'dashboard' | 'map';

const Index: React.FC = () => {
  const { t } = useTranslation('analytics');
  const [metric, setMetric] = useState<MetricType>('supply');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');

  const [allVoivodeships, setAllVoivodeships] = useState<GeoJSONCollection | null>(null);
  const [allCounties, setAllCounties] = useState<GeoJSONCollection | null>(null);
  const [currentViewGeo, setCurrentViewGeo] = useState<GeoJSONCollection | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: 'Poland', level: 'country' },
  ]);

  const [mapDimensions, setMapDimensions] = useState({ width: 600, height: 420 });
  const [fullMapDimensions, setFullMapDimensions] = useState({ width: 800, height: 600 });
  const dashMapRef = useRef<HTMLDivElement>(null);
  const fullMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initData = async () => {
      try {
        const [voivodeships, counties] = await Promise.all([fetchVoivodeships(), fetchCounties()]);
        setAllVoivodeships(voivodeships);
        setAllCounties(counties);
        setCurrentViewGeo(voivodeships);
      } catch (err) {
        console.error('Failed to load map data', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    if (dashMapRef.current) {
      const obs = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setMapDimensions({
            width: Math.floor(entry.contentRect.width),
            height: Math.floor(entry.contentRect.height),
          });
        }
      });
      obs.observe(dashMapRef.current);
      observers.push(obs);
    }

    if (fullMapRef.current) {
      const obs = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setFullMapDimensions({
            width: Math.floor(entry.contentRect.width),
            height: Math.floor(entry.contentRect.height),
          });
        }
      });
      obs.observe(fullMapRef.current);
      observers.push(obs);
    }

    return () => observers.forEach(o => o.disconnect());
  }, [activeTab, loading]);

  const handleRegionClick = useCallback((feature: GeoFeature) => {
    const currentLevel = breadcrumbs[breadcrumbs.length - 1].level;
    const regionName = feature.properties.nazwa;
    const regionId = feature.properties.id || feature.properties.kod;

    if (currentLevel === 'country') {
      if (!allCounties) return;
      let relevantFeatures = allCounties.features;
      if (feature.properties.kod) {
        const prefix = feature.properties.kod.toString().substring(0, 2);
        const filtered = allCounties.features.filter(
          (f) => f.properties.kod && f.properties.kod.toString().startsWith(prefix)
        );
        if (filtered.length > 0) relevantFeatures = filtered;
      }
      setCurrentViewGeo({ type: 'FeatureCollection', features: relevantFeatures });
      setBreadcrumbs((prev) => [...prev, { id: regionId, name: regionName, level: 'voivodeship' }]);
    } else if (currentLevel === 'voivodeship') {
      setBreadcrumbs((prev) => [...prev, { id: regionId, name: regionName, level: 'city' }]);
      setCurrentViewGeo({ type: 'FeatureCollection', features: [feature] });
    }
  }, [breadcrumbs, allCounties]);

  const handleNavigate = useCallback((index: number) => {
    const targetItem = breadcrumbs[index];
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    if (targetItem.level === 'country') {
      setCurrentViewGeo(allVoivodeships);
    } else if (targetItem.level === 'voivodeship' && allCounties) {
      const voivodeshipId = newBreadcrumbs[1]?.id;
      let relevantFeatures = allCounties.features;
      if (voivodeshipId) {
        const prefix = voivodeshipId.toString().substring(0, 2);
        const filtered = allCounties.features.filter(
          (f) => f.properties.kod && f.properties.kod.toString().startsWith(prefix)
        );
        if (filtered.length > 0) relevantFeatures = filtered;
      }
      setCurrentViewGeo({ type: 'FeatureCollection', features: relevantFeatures });
    }
  }, [breadcrumbs, allVoivodeships, allCounties]);

  const getCurrentLevel = (): MapViewLevel => {
    return breadcrumbs[breadcrumbs.length - 1].level;
  };

  return (
    <FilterProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-[calc(100vh-4rem)] z-20 shrink-0">
          <div className="p-4 flex-1 overflow-y-auto">
            {/* View Toggle */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                {t('sidebar.view')}
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <LayoutDashboard size={16} className={activeTab === 'dashboard' ? 'text-primary' : ''} />
                  {t('sidebar.dashboard')}
                </button>
                <button
                  onClick={() => setActiveTab('map')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'map'
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <MapIcon size={16} className={activeTab === 'map' ? 'text-primary' : ''} />
                  {t('sidebar.fullMap')}
                </button>
              </div>
            </div>

            {/* Data Layers */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                {t('sidebar.dataLayers')}
              </h3>
              <div className="space-y-1">
                {METRICS.map((m) => {
                  const isActive = metric === m.id;
                  const Icon = m.id === 'supply' ? Layers : m.id === 'price' ? DollarSign : TrendingUp;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMetric(m.id as MetricType)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground border border-primary/20'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-primary' : ''} />
                      {t(`sidebar.metrics.${m.id}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Map Settings */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                {t('sidebar.mapSettings')}
              </h3>
              <div className="px-3 py-3 bg-secondary rounded-lg border border-border space-y-2.5">
                {[
                  [t('sidebar.boundaries'), 'Official'],
                  [t('sidebar.projection'), 'Mercator'],
                  [t('sidebar.dataSource'), 'GUS / Gov'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{label}</span>
                    <span className="bg-card px-2 py-0.5 rounded text-foreground/80">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto h-[calc(100vh-4rem)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-primary mb-4" size={48} />
              <h2 className="text-xl font-semibold text-foreground">{t('map.loading')}</h2>
              <p className="text-muted-foreground mt-2">{t('map.loadingSub')}</p>
            </div>
          ) : activeTab === 'map' ? (
            /* Full Map View */
            <div className="relative h-full" ref={fullMapRef}>
              <MapBreadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
              <InteractiveMap
                geoData={currentViewGeo}
                subGeoData={allCounties}
                currentLevel={getCurrentLevel()}
                selectedRegionId={breadcrumbs[breadcrumbs.length - 1].id}
                metric={metric}
                onRegionClick={handleRegionClick}
                width={fullMapDimensions.width}
                height={fullMapDimensions.height}
              />
              <MapLegend metric={metric} />
            </div>
          ) : (
            /* Dashboard View */
            <div className="p-6 space-y-6 min-h-full">
              {/* Header + Filters */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <BarChart3 size={20} className="text-primary" />
                    {t('header.title')}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t('header.subtitle')}
                  </p>
                </div>
                <GlobalFilters />
              </div>

              {/* KPI Cards */}
              <KPICards />

              {/* Map + Ranking */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden relative" style={{ height: 420 }}>
                  <div className="absolute top-3 left-3 z-10">
                    <MapBreadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
                  </div>
                  <div className="w-full h-full" ref={dashMapRef}>
                    <InteractiveMap
                      geoData={currentViewGeo}
                      subGeoData={allCounties}
                      currentLevel={getCurrentLevel()}
                      selectedRegionId={breadcrumbs[breadcrumbs.length - 1].id}
                      metric={metric}
                      onRegionClick={handleRegionClick}
                      width={mapDimensions.width || 600}
                      height={mapDimensions.height || 420}
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 z-10">
                    <MapLegend metric={metric} />
                  </div>
                </div>
                <RankingTable />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <PriceTrendChart />
                <PriceDistributionChart />
                <SupplyChart />
              </div>
            </div>
          )}
        </main>
      </div>
    </FilterProvider>
  );
};

export default Index;
