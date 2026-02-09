import React, { useMemo, useState } from 'react';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { Map as MapGL, Layer } from 'react-map-gl/mapbox';
import { GeoJSONCollection, MetricType, MapViewLevel, GeoFeature, MarketStats, City } from '@/types/map';
import { COLORS, MAPBOX_TOKEN } from '@/constants/map';
import { generateMarketStats, getMetricValue } from '@/services/mockDataService';
import * as d3 from 'd3';
import { MapTooltip } from './MapTooltip';
import { useFilters } from '@/contexts/FilterContext';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DeckGLMapProps {
  geoData: GeoJSONCollection | null;
  baseGeo: GeoJSONCollection | null; // Always-visible voivodeships for context
  maskGeo?: GeoJSONCollection | null; // World mask
  metric: MetricType;
  cities: City[];
  viewState: any;
  onViewStateChange: (params: any) => void;
  onRegionClick: (feature: GeoFeature) => void;
  onCityClick: (city: City) => void;
  currentLevel: MapViewLevel;
  bounds?: [number, number, number, number];
  selectedRegionFeature?: GeoFeature | null;
  isFullAccess?: boolean;
}

export const DeckGLMap: React.FC<DeckGLMapProps> = ({
  geoData,
  baseGeo,
  maskGeo,
  metric,
  cities,
  viewState,
  onViewStateChange,
  onRegionClick,
  onCityClick,
  currentLevel,
  bounds,
  selectedRegionFeature,
  isFullAccess = true,
}) => {
  const { setCity } = useFilters();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    data: MarketStats | null;
    visible: boolean;
  }>({ x: 0, y: 0, data: null, visible: false });

  // Calculate basemap opacity based on zoom level
  const basemapOpacity = useMemo(() => {
    const zoom = viewState?.zoom || 5.5;
    if (zoom < 8) return 0; // Pure void at country level
    if (zoom > 10) return 1; // Full streets at higher zoom
    // Fade in between 8-10
    return (zoom - 8) / 2;
  }, [viewState?.zoom]);

  // Memoize stats map for performance
  const statsMap = useMemo<Map<string | number, MarketStats>>(() => {
    const map = new Map<string | number, MarketStats>();
    if (geoData) {
      geoData.features.forEach((f) => {
        const id = (f.properties.id || f.properties.kod || f.properties.nazwa) as string | number;
        map.set(id, generateMarketStats(f.properties.nazwa, id));
      });
    }
    return map;
  }, [geoData]);

  // Memoize color scale based on metric
  const colorScale = useMemo(() => {
    const values = Array.from(statsMap.values()).map((s) => getMetricValue(s as MarketStats, metric));
    const min = d3.min(values) || 0;
    const max = d3.max(values) || 100;
    return d3.scaleLinear<string>()
      .domain([min, max])
      .range([COLORS[metric].low, COLORS[metric].high]);
  }, [statsMap, metric]);

  const handleViewStateChangeInternal = (params: any) => {
    if (!isFullAccess) return;
    onViewStateChange(params.viewState);
  };

  const layers = [
    // 0. World Mask - Hides everything outside Poland
    // In DeckGL, we render this ABOVE Mapbox but BELOW data layers
    maskGeo && new GeoJsonLayer({
      id: 'world-mask',
      data: maskGeo,
      pickable: false,
      stroked: false,
      filled: true,
      getFillColor: [248, 250, 252, 255], // #f8fafc - Matches page background
    }),

    // 1. Context Layer - Always-visible Voivodeships
    baseGeo && new GeoJsonLayer({
      id: 'context-voivodeships',
      data: baseGeo,
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: 1,
      getLineColor: [148, 163, 184, 150],
      getFillColor: [0, 0, 0, 0],
      onClick: (info) => {
        if (!isFullAccess) return;
        info.object && onRegionClick(info.object);
      },
    }),

    // 2. Active Data Layer
    geoData && new GeoJsonLayer({
      id: 'admin-boundaries',
      data: geoData,
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthMinPixels: currentLevel === 'city' ? 1.5 : 1,
      getLineColor: [100, 116, 139],
      getFillColor: (f: any) => {
        const id = f.properties.id || f.properties.kod || f.properties.nazwa;
        const stat = statsMap.get(id);
        const colorHex = stat ? colorScale(getMetricValue(stat, metric)) : '#e2e8f0';
        const rgb = d3.color(colorHex)?.rgb();
        // Lower opacity for data layer to see streets underneath when zoomed in
        return rgb ? [rgb.r, rgb.g, rgb.b, 140] : [226, 232, 240, 140];
      },
      autoHighlight: true,
      highlightColor: [0, 0, 0, 20],
      onClick: (info) => {
        if (!isFullAccess) return;
        info.object && onRegionClick(info.object);
      },
      onHover: (info: any) => {
        if (info.object) {
          const id = info.object.properties.id || info.object.properties.kod || info.object.properties.nazwa;
          const data = statsMap.get(id) || null;
          setTooltip({
            x: info.x,
            y: info.y,
            data,
            visible: true
          });
        } else {
          setTooltip((prev) => ({ ...prev, visible: false }));
        }
      }
    }),

    // 3. Selected Region Outline
    selectedRegionFeature && new GeoJsonLayer({
      id: 'selected-region-outline',
      data: selectedRegionFeature,
      pickable: false,
      stroked: true,
      filled: false,
      lineWidthMinPixels: 2,
      getLineColor: [30, 41, 59, 200],
    }),

    // 4. Major Cities
    new ScatterplotLayer({
      id: 'major-cities',
      data: cities,
      visible: isFullAccess && (viewState?.zoom || 0) > 8,
      pickable: true,
      opacity: 1,
      stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 4,
      radiusMaxPixels: 15,
      lineWidthMinPixels: 2,
      getPosition: (d: City) => [d.lng, d.lat],
      getRadius: 2000,
      getFillColor: [255, 255, 255],
      getLineColor: [15, 23, 42],
      onClick: (info) => {
        if (!isFullAccess) return;
        if (info.object) {
          setCity(info.object.name);
          onCityClick(info.object);
        }
      },
      onHover: (info: any) => {
        if (info.object) {
           const stats: MarketStats = { 
               name: info.object.name, 
               price: 13900, 
               listings: 8420, 
               regionId: info.object.id, 
               supply: 8420, 
               growth: 5 
           };
           setTooltip({
             x: info.x,
             y: info.y,
             data: stats,
             visible: true
           });
        } else {
           setTooltip((prev) => ({ ...prev, visible: false }));
        }
      }
    }),

    // 5. Text Labels for Cities
    new TextLayer({
      id: 'city-labels',
      data: cities,
      visible: isFullAccess && (viewState?.zoom || 0) > 9,
      pickable: false,
      getPosition: (d: City) => [d.lng, d.lat],
      getText: (d: City) => d.name,
      getSize: 13,
      getColor: [15, 23, 42],
      getAngle: 0,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      getPixelOffset: [0, -18],
      fontWeight: 600,
      fontFamily: 'Inter, system-ui, sans-serif',
      outlineWidth: 2,
      outlineColor: [255, 255, 255, 200],
      characterSet: 'auto'
    }),
  ].filter(Boolean);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden cursor-crosshair bg-slate-50">
      <DeckGL
        viewState={viewState}
        onViewStateChange={handleViewStateChangeInternal}
        controller={isFullAccess}
        layers={layers}
        getCursor={() => 'default'}
      >
        <MapGL
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/light-v11"
          reuseMaps
          attributionControl={false}
          maxBounds={bounds}
          minZoom={5.5}
          maxZoom={isFullAccess ? 18 : 7.5}
          style={{ opacity: basemapOpacity }}
        >
          {/* 3D Buildings Layer */}
          <Layer
            id="3d-buildings"
            source="composite"
            source-layer="building"
            type="fill-extrusion"
            minzoom={13}
            paint={{
              'fill-extrusion-color': '#e2e8f0',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                13.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }}
          />
        </MapGL>
      </DeckGL>
      
      <MapTooltip
        x={tooltip.x}
        y={tooltip.y}
        data={tooltip.data}
        visible={tooltip.visible}
      />
    </div>
  );
};
