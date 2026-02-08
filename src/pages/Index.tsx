import React, { useState, useEffect } from 'react';
import { MapSidebar } from '@/components/map/MapSidebar';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import { MapLegend } from '@/components/map/MapLegend';
import { MapBreadcrumbs } from '@/components/map/MapBreadcrumbs';
import { fetchVoivodeships, fetchCounties } from '@/services/geoService';
import { GeoFeature, GeoJSONCollection, MetricType, MapViewLevel, BreadcrumbItem } from '@/types/map';
import { Loader2 } from 'lucide-react';

const Index: React.FC = () => {
  const [metric, setMetric] = useState<MetricType>('supply');
  const [loading, setLoading] = useState(true);

  const [allVoivodeships, setAllVoivodeships] = useState<GeoJSONCollection | null>(null);
  const [allCounties, setAllCounties] = useState<GeoJSONCollection | null>(null);

  const [currentViewGeo, setCurrentViewGeo] = useState<GeoJSONCollection | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: null, name: 'Poland', level: 'country' },
  ]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 256,
    height: window.innerHeight,
  });

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
    const handleResize = () => {
      setDimensions({ width: window.innerWidth - 256, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRegionClick = (feature: GeoFeature) => {
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
      setBreadcrumbs((prev) => [
        ...prev,
        { id: regionId, name: regionName, level: 'voivodeship' },
      ]);
    } else if (currentLevel === 'voivodeship') {
      setBreadcrumbs((prev) => [...prev, { id: regionId, name: regionName, level: 'city' }]);
      setCurrentViewGeo({ type: 'FeatureCollection', features: [feature] });
    }
  };

  const handleNavigate = (index: number) => {
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
  };

  const getCurrentLevel = (): MapViewLevel => {
    return breadcrumbs[breadcrumbs.length - 1].level;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <MapSidebar activeMetric={metric} onMetricChange={setMetric} />

      <main className="flex-1 relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-50">
            <Loader2 className="animate-spin text-primary mb-4" size={48} />
            <h2 className="text-xl font-semibold text-foreground">Initializing Map Data...</h2>
            <p className="text-muted-foreground mt-2">Loading official administrative boundaries</p>
          </div>
        ) : (
          <>
            <MapBreadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
            <InteractiveMap
              geoData={currentViewGeo}
              subGeoData={allCounties}
              currentLevel={getCurrentLevel()}
              selectedRegionId={breadcrumbs[breadcrumbs.length - 1].id}
              metric={metric}
              onRegionClick={handleRegionClick}
              width={dimensions.width}
              height={dimensions.height}
            />
            <MapLegend metric={metric} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
