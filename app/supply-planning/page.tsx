import DashboardLayout from "@/components/dashboard-layout"
import WorkInProgressPage from "@/components/work-in-progress-page"

export default function SupplyPlanningPage() {
  return (
    <DashboardLayout>
      <WorkInProgressPage title="Supply Planning" description="This supply planning workspace is being prepared and will be available soon." />
    </DashboardLayout>
  )
}
