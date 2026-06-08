import DashboardLayout from "@/components/dashboard-layout"
import WorkInProgressPage from "@/components/work-in-progress-page"

export default function PerformanceTrackingPage() {
  return (
    <DashboardLayout>
      <WorkInProgressPage title="Performance Tracking" description="This performance tracking workspace is being prepared and will be available soon." />
    </DashboardLayout>
  )
}
