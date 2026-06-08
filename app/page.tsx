import DashboardLayout from "@/components/dashboard-layout"
import ProcessOrchestrationView from "@/components/process-orchestration-view"

export default function Page() {
  return (
    <DashboardLayout>
      <ProcessOrchestrationView />
    </DashboardLayout>
  )
}
