"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react"

interface KPIMetric {
  label: string
  value: string
  target?: string
  delta: string
  deltaLabel: string
  status: "good" | "warning" | "critical"
  icon: React.ReactNode
  tooltip?: string
}

const kpiMetrics: KPIMetric[] = [
  {
    label: "WMAPE",
    value: "18.2%",
    target: "15%",
    delta: "+3.2pts",
    deltaLabel: "vs target",
    status: "warning",
    icon: <Target className="h-4 w-4" />,
    tooltip: "Weighted Mean Absolute Percentage Error"
  },
  {
    label: "Forecast Bias",
    value: "-2.1%",
    target: "0%",
    delta: "-2.1pts",
    deltaLabel: "under-forecasting",
    status: "warning",
    icon: <Activity className="h-4 w-4" />,
    tooltip: "Systematic over/under forecasting tendency"
  },
  {
    label: "Revenue at Risk",
    value: "$24.5M",
    target: "$0",
    delta: "12 SKUs",
    deltaLabel: "flagged",
    status: "critical",
    icon: <AlertTriangle className="h-4 w-4" />,
    tooltip: "Revenue exposed due to demand-supply gaps"
  },
  {
    label: "Demand-Revenue Alignment",
    value: "94.2%",
    target: "98%",
    delta: "-3.8pts",
    deltaLabel: "vs target",
    status: "warning",
    icon: <DollarSign className="h-4 w-4" />,
    tooltip: "How well demand forecast aligns with revenue plan"
  },
  {
    label: "Fill Rate (OTIF)",
    value: "96.8%",
    target: "95%",
    delta: "+1.8pts",
    deltaLabel: "vs target",
    status: "good",
    icon: <CheckCircle className="h-4 w-4" />,
    tooltip: "On-Time In-Full delivery rate"
  },
]

const statusColors = {
  good: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-700",
    value: "text-green-700"
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    value: "text-amber-700"
  },
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
    value: "text-red-700"
  }
}

export default function ExecutiveKPIBanner() {
  const criticalCount = kpiMetrics.filter(k => k.status === "critical").length
  const warningCount = kpiMetrics.filter(k => k.status === "warning").length

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Forecast Health Dashboard</h2>
          <p className="text-sm text-muted-foreground">Key demand planning metrics requiring attention</p>
        </div>
        <div className="flex items-center gap-3">
          {criticalCount > 0 && (
            <Badge className="bg-red-100 text-red-700 border border-red-200">
              {criticalCount} Critical
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
              {warningCount} Warnings
            </Badge>
          )}
          <Badge className="bg-muted text-muted-foreground">
            Updated 15 min ago
          </Badge>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-5 gap-4">
        {kpiMetrics.map((kpi, idx) => {
          const colors = statusColors[kpi.status]
          return (
            <Card 
              key={idx} 
              className={`p-4 ${colors.bg} border ${colors.border} hover:shadow-md transition-all cursor-pointer`}
            >
              {/* Header with icon and status */}
              <div className="flex items-center justify-between mb-3">
                <div className={`p-1.5 rounded-md ${colors.bg} border ${colors.border}`}>
                  <div className={colors.icon}>{kpi.icon}</div>
                </div>
                {kpi.status === "critical" && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-xs font-medium text-muted-foreground mb-1">
                {kpi.label}
              </div>

              {/* Value */}
              <div className={`text-2xl font-bold mb-2 ${colors.value}`}>
                {kpi.value}
              </div>

              {/* Delta and Target */}
              <div className="flex items-center gap-1.5">
                {kpi.delta.startsWith("+") && !kpi.delta.includes("pts") ? (
                  <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                ) : kpi.delta.startsWith("-") ? (
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                ) : (
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                )}
                <span className="text-xs font-medium text-foreground">
                  {kpi.delta}
                </span>
                <span className="text-xs text-muted-foreground">
                  {kpi.deltaLabel}
                </span>
              </div>

              {/* Target reference */}
              {kpi.target && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="text-xs text-muted-foreground">
                    Target: <span className="font-medium text-foreground">{kpi.target}</span>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
