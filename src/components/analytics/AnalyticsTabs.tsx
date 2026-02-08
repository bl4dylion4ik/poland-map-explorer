import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeFilter, TimeRange } from './TimeFilter';

// Overview
import { MarketHealthIndex } from './charts/MarketHealthIndex';
import { SupplyPressureGauge } from './charts/SupplyPressureGauge';

// Supply
import { AbsorptionChart } from './charts/AbsorptionChart';
import { TimeOnMarketChart } from './charts/TimeOnMarketChart';
import { ListingLifecycleFunnel } from './charts/ListingLifecycleFunnel';
import { PriceDropFrequency } from './charts/PriceDropFrequency';
import { DaysOnMarketDist } from './charts/DaysOnMarketDist';

// Prices
import { PriceDivergenceChart } from './charts/PriceDivergenceChart';
import { VolatilityMatrix } from './charts/VolatilityMatrix';
import { PriceChangeDist } from './charts/PriceChangeDist';
import { VolatilityRegime } from './charts/VolatilityRegime';
import { PriceStickiness } from './charts/PriceStickiness';

// Structure
import { MarketStructureHeatmap } from './charts/MarketStructureHeatmap';
import { MarketShareChart } from './charts/MarketShareChart';
import { SupplyConcentration } from './charts/SupplyConcentration';
import { SegmentGrowthMatrix } from './charts/SegmentGrowthMatrix';
import { LuxuryVsMassSplit } from './charts/LuxuryVsMassSplit';

// Regional
import { RankingTable } from './RankingTable';
import { RegionalOpportunityMatrix } from './charts/RegionalOpportunityMatrix';
import { RegionalVolatilityTable } from './charts/RegionalVolatilityTable';
import { RankChangeTracker } from './charts/RankChangeTracker';

// Advanced
import { CorrelationMatrix } from './charts/CorrelationMatrix';
import { ScenarioSensitivity } from './charts/ScenarioSensitivity';

interface AnalyticsTabsProps {
  overviewContent: React.ReactNode;
}

export const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ overviewContent }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>(30);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center bg-card border border-border rounded-xl p-3 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground px-2">Dashboard View</h2>
        <TimeFilter 
          value={timeRange} 
          onChange={setTimeRange} 
          disabledRanges={timeRange === 1 ? [1] : []} // Example logic
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-border rounded-none h-auto p-0 mb-4 gap-6">
          <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Overview</TabsTrigger>
          <TabsTrigger value="supply" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Supply & Demand</TabsTrigger>
          <TabsTrigger value="prices" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Prices & Volatility</TabsTrigger>
          <TabsTrigger value="structure" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Market Structure</TabsTrigger>
          <TabsTrigger value="regional" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Regional</TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 px-1">Advanced</TabsTrigger>
        </TabsList>

        {/* 1. OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          {/* New Summary Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketHealthIndex days={timeRange} />
            <SupplyPressureGauge days={timeRange} />
          </div>
          {/* Original Content */}
          {overviewContent}
        </TabsContent>

        {/* 2. SUPPLY & DEMAND TAB */}
        <TabsContent value="supply" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AbsorptionChart days={timeRange} />
            <TimeOnMarketChart days={timeRange} />
            <ListingLifecycleFunnel days={timeRange} />
            <PriceDropFrequency days={timeRange} />
            <DaysOnMarketDist />
          </div>
        </TabsContent>

        {/* 3. PRICES & VOLATILITY TAB */}
        <TabsContent value="prices" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PriceDivergenceChart />
            <VolatilityMatrix />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <PriceChangeDist />
            <VolatilityRegime days={timeRange} />
            <PriceStickiness days={timeRange} />
          </div>
        </TabsContent>

        {/* 4. MARKET STRUCTURE TAB */}
        <TabsContent value="structure" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketShareChart />
            <MarketStructureHeatmap />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SupplyConcentration />
            <SegmentGrowthMatrix />
            <LuxuryVsMassSplit days={timeRange} />
          </div>
        </TabsContent>

        {/* 5. REGIONAL TAB */}
        <TabsContent value="regional" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RegionalOpportunityMatrix />
            </div>
            <div className="lg:col-span-1">
              <RegionalVolatilityTable />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RankingTable />
            <RankChangeTracker />
          </div>
        </TabsContent>

        {/* 6. ADVANCED TAB */}
        <TabsContent value="advanced" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CorrelationMatrix />
            <ScenarioSensitivity />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
