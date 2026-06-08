"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Package, Factory, Settings, Truck, DollarSign, ArrowRight } from "lucide-react"

const planningViews = [
  {
    title: "Demand Planning",
    icon: TrendingUp,
    status: "On Track",
    statusType: "success" as const,
    metrics: [
      { label: "Forecast Accuracy", value: "94.2%" },
      { label: "Bias", value: "-1.2%" },
      { label: "SKUs in Review", value: "47" },
    ],
    description: "Statistical + ML forecast with consensus adjustments",
  },
  {
    title: "Supply Planning",
    icon: Package,
    status: "3 Alerts",
    statusType: "warning" as const,
    metrics: [
      { label: "Coverage", value: "98.5%" },
      { label: "At Risk SKUs", value: "12" },
      { label: "Expedites Pending", value: "3" },
    ],
    description: "Multi-echelon inventory optimization",
  },
  {
    title: "Capacity Planning",
    icon: Factory,
    status: "Constrained",
    statusType: "warning" as const,
    metrics: [
      { label: "Utilization", value: "87.5%" },
      { label: "Bottlenecks", value: "2" },
      { label: "Shift Changes", value: "4" },
    ],
    description: "Production capacity and resource balancing",
  },
  {
    title: "Production Scheduling",
    icon: Settings,
    status: "On Track",
    statusType: "success" as const,
    metrics: [
      { label: "Schedule Adherence", value: "96.8%" },
      { label: "Changeovers Today", value: "8" },
      { label: "OEE", value: "84.2%" },
    ],
    description: "Detailed sequencing and work order management",
  },
  {
    title: "Logistics Planning",
    icon: Truck,
    status: "1 Delay",
    statusType: "warning" as const,
    metrics: [
      { label: "On-Time Shipment", value: "97.1%" },
      { label: "Transit Alerts", value: "1" },
      { label: "Cost vs Budget", value: "-2.3%" },
    ],
    description: "Transportation and distribution optimization",
  },
  {
    title: "Financial Planning",
    icon: DollarSign,
    status: "On Track",
    statusType: "success" as const,
    metrics: [
      { label: "Revenue vs Plan", value: "+3.2%" },
      { label: "Cost Variance", value: "-1.8%" },
      { label: "Working Capital", value: "$124M" },
    ],
    description: "S&OP financial integration and reporting",
  },
]

const statusStyles = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-600 border-red-200",
}

export default function FunctionalPlanningViews() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Functional Planning Views</h3>
      <div className="grid grid-cols-3 gap-4">
        {planningViews.map((view, index) => {
          const Icon = view.icon
          return (
            <Card key={index} className="p-5 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E6F4FF] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#1677FF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{view.title}</h4>
                    <p className="text-xs text-muted-foreground">{view.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium border ${statusStyles[view.statusType]}`}>
                  {view.status}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {view.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-2 bg-muted/30 rounded-md">
                    <div className="text-lg font-bold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end text-sm text-[#1677FF] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Open View
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
