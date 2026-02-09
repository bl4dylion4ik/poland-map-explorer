import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DeckGLMap } from '@/components/map/DeckGLMap';
import { MapLegend } from '@/components/map/MapLegend';
import { MapBreadcrumbs } from '@/components/map/MapBreadcrumbs';
import { KPICards } from '@/components/analytics/KPICards';
import { PriceTrendChart } from '@/components/analytics/PriceTrendChart';
import { PriceDistributionChart } from '@/components/analytics/PriceDistributionChart';
import { SupplyChart } from '@/components/analytics/SupplyChart';
import { RankingTable } from '@/components/analytics/RankingTable';
import { GlobalFilters } from '@/components/analytics/GlobalFilters';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { FilterProvider } from '@/contexts/FilterContext';
import { fetchVoivodeships, fetchCounties, generatePolandMask } from '@/services/geoService';
import { CITIES } from '@/data/mockData';
import { GeoFeature, GeoJSONCollection, MetricType, MapViewLevel, BreadcrumbItem, City } from '@/types/map';
import { Loader2, Map as MapIcon, Layers, DollarSign, TrendingUp, BarChart3, LayoutDashboard, Settings2 } from 'lucide-react';
import { METRICS, MAP_CENTER_POLAND, POLAND_BOUNDS } from '@/constants/map';
import { useTranslation } from 'react-i18next';
import bbox from '@turf/bbox';
import { WebMercatorViewport, FlyToInterpolator } from '@deck.gl/core';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type ViewTab = 'dashboard' | 'map';

interface IndexProps {
  devForceFull?: boolean;
}

const Index: React.FC<IndexProps> = ({ devForceFull = false }) => {
  const { t } = useTranslation('analytics');
  const isMobile = useIsMobile();
  const { user } = useAuth();
  
  const isFullAccess = useMemo(() => {
    return devForceFull || (user && (user.plan === 'pro' || user.plan === 'investor'));
  }, [devForceFull, user]);

  const [metric, setMetric] = useState<MetricType>('supply');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ViewTab>('dashboard');

  const [allVoivodeships, setAllVoivodeships] = useState<GeoJSONCollection | null>(null);
  const [allCounties, setAllCounties] = useState<GeoJSONCollection | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: 'Poland', level: 'country' },
  ]);
  const [selectedFeature, setSelectedFeature] = useState<GeoFeature | null>(null);
  const [polandMask, setPolandMask] = useState<GeoJSONCollection | null>(null);

  // Map View State
  const [viewState, setViewState] = useState({
    longitude: MAP_CENTER_POLAND[0],
    latitude: MAP_CENTER_POLAND[1],
    zoom: 5.5,
    pitch: 0,
    bearing: 0,
    transitionDuration: 0,
    transitionInterpolator: null as any
  });

  // Sync state with zoom level
  const handleViewStateChange = useCallback((newViewState: any) => {
    setViewState(newViewState);

    // Zooming out automatically resets context
    if (newViewState.zoom < 7.0 && breadcrumbs.length > 1) {
        setBreadcrumbs([{ id: null, name: 'Poland', level: 'country' }]);
        setSelectedFeature(null);
    } else if (newViewState.zoom < 10.0 && breadcrumbs.length > 2) {
        setBreadcrumbs(prev => prev.slice(0, 2));
    }
  }, [breadcrumbs]);

  useEffect(() => {
    const initData = async () => {
      try {
        const [voivodeships, counties] = await Promise.all([fetchVoivodeships(), fetchCounties()]);
        setAllVoivodeships(voivodeships);
        setAllCounties(counties);
        setPolandMask(generatePolandMask(voivodeships));
      } catch (err) {
        console.error('Failed to load map data', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const zoomToFeature = useCallback((feature: GeoFeature) => {
    const featureBbox = bbox(feature);
    const viewport = new WebMercatorViewport({ width: 800, height: 600 });
    const { longitude, latitude, zoom } = viewport.fitBounds(
      [[featureBbox[0], featureBbox[1]], [featureBbox[2], featureBbox[3]]],
      { padding: 40 }
    );

    setViewState({
      longitude,
      latitude,
      zoom,
      pitch: 0,
      bearing: 0,
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator()
    });
  }, []);

  const handleRegionClick = useCallback((feature: GeoFeature) => {
    const regionName = feature.properties.nazwa;
    const regionId = feature.properties.id || feature.properties.kod;

    zoomToFeature(feature);
    setSelectedFeature(feature);
    
    if (breadcrumbs[breadcrumbs.length - 1].id !== regionId) {
        setBreadcrumbs((prev) => {
            const base = prev[0];
            return [base, { id: regionId, name: regionName, level: 'voivodeship' }];
        });
    }
  }, [zoomToFeature, breadcrumbs]);

  const handleCityClick = useCallback((city: City) => {
    setViewState({
      longitude: city.lng,
      latitude: city.lat,
      zoom: 12,
      pitch: 0,
      bearing: 0,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    });
    
    setBreadcrumbs((prev) => {
        const voivodeship = allVoivodeships?.features.find(f => f.properties.nazwa === city.voivodeship);
        const base = prev[0];
        const crumbs: BreadcrumbItem[] = [base];
        
        if (voivodeship) {
            crumbs.push({ 
                id: voivodeship.properties.id || voivodeship.properties.kod, 
                name: city.voivodeship, 
                level: 'voivodeship' 
            });
        }
        crumbs.push({ id: city.id, name: city.name, level: 'city' });
        return crumbs;
    });
  }, [allVoivodeships]);

  const handleNavigate = useCallback((index: number) => {
    const targetItem = breadcrumbs[index];
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    if (targetItem.level === 'country') {
      setSelectedFeature(null);
      setViewState({
        longitude: MAP_CENTER_POLAND[0],
        latitude: MAP_CENTER_POLAND[1],
        zoom: 5.5,
        pitch: 0,
        bearing: 0,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
      });
    } else if (targetItem.level === 'voivodeship') {
        const feature = allVoivodeships?.features.find(f => 
            (f.properties.id || f.properties.kod) === targetItem.id
        );
        if (feature) {
            zoomToFeature(feature);
            setSelectedFeature(feature);
        }
    }
  }, [breadcrumbs, allVoivodeships, zoomToFeature]);

  const mapLevel = useMemo(() => {
      if (viewState.zoom < 7.5) return 'country';
      if (viewState.zoom < 10.5) return 'voivodeship';
      return 'city';
  }, [viewState.zoom]);

  const activeGeoData = useMemo(() => {
      if (viewState.zoom < 7.5) return allVoivodeships;
      return allCounties;
  }, [viewState.zoom, allVoivodeships, allCounties]);

  const SidebarContent = (
    <div className="flex-1 overflow-y-auto">
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
  );

  const OverviewContent = (
    <>
      <KPICards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 h-[500px] md:h-[850px] relative rounded-xl overflow-hidden border border-border bg-slate-50">
          <div className="absolute top-3 left-3 z-10">
            <MapBreadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
          </div>
          <DeckGLMap
            geoData={activeGeoData}
            baseGeo={allVoivodeships}
            maskGeo={polandMask}
            metric={metric}
            cities={CITIES}
            viewState={viewState}
            onViewStateChange={handleViewStateChange}
            onRegionClick={handleRegionClick}
            onCityClick={handleCityClick}
            currentLevel={mapLevel as MapViewLevel}
            bounds={POLAND_BOUNDS}
            selectedRegionFeature={selectedFeature}
            isFullAccess={isFullAccess}
          />
          <div className="absolute bottom-3 right-3 z-10">
            <MapLegend metric={metric} />
          </div>
        </div>
        <div className="h-[500px] md:h-[850px] overflow-hidden">
             <RankingTable />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <PriceTrendChart />
        <PriceDistributionChart />
        <SupplyChart />
      </div>
    </>
  );

  return (
    <FilterProvider>
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] w-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col h-[calc(100vh-4rem)] z-20 shrink-0 p-4">
          {SidebarContent}
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto h-[calc(100vh-4rem)] relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="animate-spin text-primary mb-4" size={48} />
              <h2 className="text-xl font-semibold text-foreground">{t('map.loading')}</h2>
              <p className="text-muted-foreground mt-2">{t('map.loadingSub')}</p>
            </div>
          ) : activeTab === 'map' ? (
            /* Full Map View */
            <div className="relative h-full bg-slate-50">
              {/* Mobile Sidebar Trigger */}
              <div className="absolute top-3 right-3 z-20 md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary" size="icon" className="shadow-md">
                      <Settings2 size={18} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader className="text-left mb-6">
                      <SheetTitle className="flex items-center gap-2">
                        <Settings2 size={20} className="text-primary" />
                        {t('sidebar.mapSettings')}
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      {SidebarContent}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="absolute top-3 left-3 z-10">
                <MapBreadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
              </div>
              <DeckGLMap
                geoData={activeGeoData}
                baseGeo={allVoivodeships}
                maskGeo={polandMask}
                metric={metric}
                cities={CITIES}
                viewState={viewState}
                onViewStateChange={handleViewStateChange}
                onRegionClick={handleRegionClick}
                onCityClick={handleCityClick}
                currentLevel={mapLevel as MapViewLevel}
                bounds={POLAND_BOUNDS}
                selectedRegionFeature={selectedFeature}
              />
              <div className="absolute bottom-3 right-3 z-10">
                <MapLegend metric={metric} />
              </div>
            </div>
          ) : (
            /* Dashboard View */
            <div className="p-4 md:p-6 space-y-6 min-h-full">
              {/* Header + Filters */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <BarChart3 size={20} className="text-primary" />
                      {t('header.title')}
                    </h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                      {t('header.subtitle')}
                    </p>
                  </div>
                  
                  {/* Mobile Sidebar Trigger for Dashboard */}
                  <div className="md:hidden">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Settings2 size={16} />
                          {t('sidebar.view')}
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right">
                        <SheetHeader className="text-left mb-6">
                          <SheetTitle>{t('sidebar.view')}</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                          {SidebarContent}
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
                <GlobalFilters />
              </div>

              <AnalyticsTabs overviewContent={OverviewContent} isFullAccess={isFullAccess} />
            </div>
          )}
        </main>
      </div>
    </FilterProvider>
  );
};

export default Index;
