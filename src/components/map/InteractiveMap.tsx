import React, { useRef, useState, useMemo, useCallback } from 'react';
import * as d3 from 'd3';
import { GeoFeature, GeoJSONCollection, MapViewLevel, MetricType, MarketStats } from '@/types/map';
import { COLORS } from '@/constants/map';
import { generateMarketStats, getMetricValue } from '@/services/mockDataService';
import { MapTooltip } from './MapTooltip';

interface InteractiveMapProps {
  geoData: GeoJSONCollection | null;
  subGeoData: GeoJSONCollection | null;
  currentLevel: MapViewLevel;
  selectedRegionId: string | number | null;
  metric: MetricType;
  onRegionClick: (feature: GeoFeature) => void;
  width: number;
  height: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  geoData,
  currentLevel,
  metric,
  onRegionClick,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    data: MarketStats | null;
    visible: boolean;
  }>({ x: 0, y: 0, data: null, visible: false });

  const statsMap = useMemo<Map<string | number, MarketStats>>(() => {
    const map = new Map<string | number, MarketStats>();
    if (geoData) {
      geoData.features.forEach((f) => {
        const id = f.properties.id || f.properties.kod || f.properties.nazwa;
        map.set(id, generateMarketStats(f.properties.nazwa, id));
      });
    }
    return map;
  }, [geoData]);

  const colorScale = useMemo(() => {
    const values = Array.from(statsMap.values()).map((s) => getMetricValue(s, metric));
    const min = d3.min(values) || 0;
    const max = d3.max(values) || 100;
    return d3.scaleLinear<string>().domain([min, max]).range([COLORS[metric].low, COLORS[metric].high]);
  }, [statsMap, metric]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent, feature: GeoFeature) => {
      const id = feature.properties.id || feature.properties.kod || feature.properties.nazwa;
      const data = statsMap.get(id) || null;
      setTooltip({ x: event.clientX, y: event.clientY, data, visible: true });
    },
    [statsMap]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const paths = useMemo(() => {
    if (!geoData) return [];
    const projection = d3.geoMercator();
    projection.fitExtent(
      [
        [40, 40],
        [width - 40, height - 40],
      ],
      geoData as any
    );
    const pathGenerator = d3.geoPath().projection(projection);

    return geoData.features.map((feature, i) => {
      const d = pathGenerator(feature as any);
      const id = feature.properties.id || feature.properties.kod || feature.properties.nazwa;
      const stat = statsMap.get(id);
      const fill = stat ? colorScale(getMetricValue(stat, metric)) : '#334155';

      // Calculate centroid for labels
      const centroid = pathGenerator.centroid(feature as any);

      return { id, d, feature, fill, stat, centroid };
    });
  }, [geoData, width, height, statsMap, metric, colorScale]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ backgroundColor: 'hsl(var(--map-bg))' }}>
      <svg width={width} height={height} className="block">
        <g>
          {paths.map((p, i) => (
            <path
              key={`${p.id}-${i}`}
              d={p.d || ''}
              fill={p.fill}
              stroke={COLORS.borders}
              strokeWidth={currentLevel === 'country' ? 1 : 0.5}
              className="cursor-pointer transition-all duration-200 outline-none"
              style={{ filter: 'none' }}
              onClick={() => onRegionClick(p.feature)}
              onMouseMove={(e) => handleMouseMove(e, p.feature)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.setAttribute('stroke', '#ffffff');
                el.setAttribute('stroke-width', '2');
                el.style.filter = 'drop-shadow(0 0 6px rgba(99,102,241,0.4))';
              }}
              onMouseOut={(e) => {
                const el = e.currentTarget;
                el.setAttribute('stroke', COLORS.borders);
                el.setAttribute('stroke-width', currentLevel === 'country' ? '1' : '0.5');
                el.style.filter = 'none';
              }}
            />
          ))}
          {/* Region labels */}
          {currentLevel === 'country' &&
            paths.map((p, i) => {
              if (!p.centroid || isNaN(p.centroid[0])) return null;
              return (
                <text
                  key={`label-${p.id}-${i}`}
                  x={p.centroid[0]}
                  y={p.centroid[1]}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="hsl(var(--foreground))"
                  fontSize={10}
                  fontWeight={600}
                  opacity={0.7}
                >
                  {p.feature.properties.nazwa}
                </text>
              );
            })}
          {currentLevel === 'voivodeship' &&
            paths.map((p, i) => {
              if (!p.centroid || isNaN(p.centroid[0])) return null;
              const name = p.feature.properties.nazwa;
              if (name.length > 20) return null; // Skip very long names
              return (
                <text
                  key={`label-${p.id}-${i}`}
                  x={p.centroid[0]}
                  y={p.centroid[1]}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="hsl(var(--foreground))"
                  fontSize={8}
                  fontWeight={500}
                  opacity={0.5}
                >
                  {name}
                </text>
              );
            })}
        </g>
      </svg>

      <MapTooltip
        x={tooltip.x}
        y={tooltip.y}
        data={tooltip.data}
        metric={metric}
        visible={tooltip.visible}
      />
    </div>
  );
};
