"use client"

import ExecutiveKPIBanner from "@/components/demand-planning/executive-kpi-banner"
import ForecastPerformanceSection from "@/components/demand-planning/forecast-performance-section"
import RegionalHeatmap from "@/components/demand-planning/regional-heatmap"
import DemandRevenueAlignment from "@/components/demand-planning/demand-revenue-alignment"
import AIInsightsPanel from "@/components/demand-planning/ai-insights-panel"
import ExceptionManagementPanel from "@/components/demand-planning/exception-management-panel"
import DemandSignalsPanel from "@/components/demand-planning/demand-signals-panel"
import SupplyAlignmentPanel from "@/components/demand-planning/supply-alignment-panel"
import ScenarioPlanningPanel from "@/components/demand-planning/scenario-planning-panel"
import PlannerActionsFooter from "@/components/demand-planning/planner-actions-footer"

export default function DemandPlanningDashboard() {
  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">
          Demand Planner Decision Cockpit
        </h1>
        <p className="text-sm text-muted-foreground">
          AI-enabled planning environment focused on exceptions, revenue alignment, and actionable insights
        </p>
      </div>

      {/* Section 1: Executive KPI Banner */}
      <ExecutiveKPIBanner />

      {/* Section 2: Forecast Performance */}
      <ForecastPerformanceSection />

      {/* Section 3: Regional Heatmap */}
      <RegionalHeatmap />

      {/* Section 4: Demand to Revenue Alignment */}
      <DemandRevenueAlignment />

      {/* Section 5 & 6: AI Insights Panel (includes Anomalies) */}
      <AIInsightsPanel />

      {/* Section 7: Exception Management */}
      <ExceptionManagementPanel />

      {/* Section 8: Demand Signals */}
      <DemandSignalsPanel />

      {/* Section 9: Supply Alignment */}
      <SupplyAlignmentPanel />

      {/* Section 10: Scenario Planning */}
      <ScenarioPlanningPanel />

      {/* Section 11: Planner Actions Footer */}
      <PlannerActionsFooter />
    </div>
  )
}
