import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimeFilter, TimeRange } from './TimeFilter';
import { AbsorptionChart } from './charts/AbsorptionChart';
import { TimeOnMarketChart } from './charts/TimeOnMarketChart';
import { PriceDivergenceChart } from './charts/PriceDivergenceChart';
import { VolatilityMatrix } from './charts/VolatilityMatrix';
import { MarketStructureHeatmap } from './charts/MarketStructureHeatmap';
import { MarketShareChart } from './charts/MarketShareChart';
import { RankingTable } from './RankingTable';

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
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {overviewContent}
        </TabsContent>

        <TabsContent value="supply" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AbsorptionChart days={timeRange} />
            <TimeOnMarketChart days={timeRange} />
          </div>
        </TabsContent>

        <TabsContent value="prices" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PriceDivergenceChart />
            <VolatilityMatrix />
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketShareChart />
            <MarketStructureHeatmap />
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-4 animate-fade-in-up">
          <RankingTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
