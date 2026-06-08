import DashboardLayout from "@/components/dashboard-layout"
import KPICards from "@/components/kpi-cards"
import NextBestActions from "@/components/next-best-actions"
import FunctionalPlanningViews from "@/components/functional-planning-views"
import CostPerformance from "@/components/cost-performance"
import DeepDives from "@/components/deep-dives"
import AdvancedAnalytics from "@/components/advanced-analytics"
import InvestmentPipeline from "@/components/investment-pipeline"

export default function BaselineSCPlanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <KPICards />
        <NextBestActions />
        <FunctionalPlanningViews />
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Planning Analytics</h2>
        </div>
        <CostPerformance />
        <DeepDives />
        <AdvancedAnalytics />
        <InvestmentPipeline />
      </div>
    </DashboardLayout>
  )
}
