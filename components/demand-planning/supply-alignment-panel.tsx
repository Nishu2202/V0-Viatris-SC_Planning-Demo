"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  Factory,
  Truck,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Clock,
  BarChart3
} from "lucide-react"

interface SupplyGap {
  sku: string
  product: string
  region: string
  demand: number
  supply: number
  gap: number
  gapPercent: number
  revenueImpact: string
  rootCause: string
  status: "critical" | "warning" | "ok"
}

interface CapacityMetric {
  plant: string
  utilization: number
  trend: "up" | "down" | "flat"
  constraint: string | null
}

const supplyGaps: SupplyGap[] = [
  {
    sku: "TKA-001",
    product: "Triathlon TKA",
    region: "APAC",
    demand: 2450,
    supply: 1980,
    gap: 470,
    gapPercent: 19.2,
    revenueImpact: "$4.2M",
    rootCause: "Capacity constraint at Cork facility",
    status: "critical"
  },
  {
    sku: "SPINE-042",
    product: "Spine XT System",
    region: "EMEA",
    demand: 1820,
    supply: 1650,
    gap: 170,
    gapPercent: 9.3,
    revenueImpact: "$1.8M",
    rootCause: "Supplier lead time extension",
    status: "warning"
  },
  {
    sku: "BIO-015",
    product: "Bio-Tenodesis",
    region: "NA",
    demand: 3200,
    supply: 3150,
    gap: 50,
    gapPercent: 1.6,
    revenueImpact: "$0.4M",
    rootCause: "Minor timing mismatch",
    status: "ok"
  },
]

const capacityMetrics: CapacityMetric[] = [
  { plant: "Cork, Ireland", utilization: 94, trend: "up", constraint: "TKA Assembly Line" },
  { plant: "Warsaw, IN", utilization: 87, trend: "flat", constraint: null },
  { plant: "Suzhou, China", utilization: 82, trend: "up", constraint: null },
  { plant: "Kiel, Germany", utilization: 78, trend: "down", constraint: null },
]

const inventoryMetrics = [
  { label: "Days of Supply (Avg)", value: "52 days", target: "45 days", status: "warning" as const },
  { label: "Fill Rate", value: "96.8%", target: "95%", status: "good" as const },
  { label: "E&O Risk", value: "$18.2M", target: "<$15M", status: "warning" as const },
  { label: "Safety Stock Coverage", value: "98.5%", target: "99%", status: "warning" as const },
]

const statusColors = {
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100 text-amber-700" },
  ok: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
  good: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-green-100 text-green-700" },
}

export default function SupplyAlignmentPanel() {
  const totalGapRevenue = "$6.4M"
  const criticalGaps = supplyGaps.filter(g => g.status === "critical").length

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Demand-Supply Gaps */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Demand-Supply Gaps</h2>
          </div>
          <Badge className="bg-red-100 text-red-700 border border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {totalGapRevenue} at risk
          </Badge>
        </div>

        <div className="space-y-3">
          {supplyGaps.map((gap, idx) => {
            const colors = statusColors[gap.status]
            const supplyPercent = (gap.supply / gap.demand) * 100
            
            return (
              <div 
                key={idx}
                className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{gap.product}</span>
                      <Badge className="bg-muted text-muted-foreground text-xs">{gap.sku}</Badge>
                      <Badge className={`${
                        gap.region === "APAC" ? "bg-amber-100 text-amber-700" :
                        gap.region === "EMEA" ? "bg-emerald-100 text-emerald-700" :
                        "bg-blue-100 text-blue-700"
                      }`}>
                        {gap.region}
                      </Badge>
                    </div>
                    
                    {/* Supply Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">
                          Supply: {gap.supply.toLocaleString()} / Demand: {gap.demand.toLocaleString()}
                        </span>
                        <span className={colors.text}>Gap: {gap.gapPercent}%</span>
                      </div>
                      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`absolute left-0 top-0 h-full rounded-full ${
                            gap.status === "critical" ? "bg-red-500" :
                            gap.status === "warning" ? "bg-amber-500" : "bg-green-500"
                          }`}
                          style={{ width: `${supplyPercent}%` }}
                        />
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      <span className="font-medium">Root cause:</span> {gap.rootCause}
                    </p>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-muted-foreground">Revenue Impact</div>
                    <div className={`text-lg font-bold ${colors.text}`}>{gap.revenueImpact}</div>
                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                      Resolve
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Capacity & Inventory */}
      <div className="space-y-4">
        {/* Capacity Utilization */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Factory className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Capacity Utilization</h3>
            </div>
            <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
              1 Constraint
            </Badge>
          </div>
          
          <div className="space-y-3">
            {capacityMetrics.map((plant, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-28 text-sm text-foreground truncate">{plant.plant}</div>
                <div className="flex-1">
                  <Progress 
                    value={plant.utilization} 
                    className={`h-2 ${plant.utilization > 90 ? "[&>div]:bg-red-500" : ""}`}
                  />
                </div>
                <div className="w-12 text-right">
                  <span className={`text-sm font-semibold ${
                    plant.utilization > 90 ? "text-red-600" : "text-foreground"
                  }`}>
                    {plant.utilization}%
                  </span>
                </div>
                <div className="w-5">
                  {plant.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : plant.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  ) : (
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {capacityMetrics.filter(p => p.constraint).map((plant, idx) => (
            <div key={idx} className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">
                  <span className="font-medium">{plant.plant}:</span> {plant.constraint} at max capacity
                </span>
              </div>
            </div>
          ))}
        </Card>

        {/* Inventory Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Inventory Health</h3>
            </div>
            <Badge className="bg-muted text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              As of today
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {inventoryMetrics.map((metric, idx) => {
              const colors = statusColors[metric.status]
              return (
                <div 
                  key={idx}
                  className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {metric.status === "good" ? (
                      <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    )}
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className={`text-xl font-bold ${colors.text}`}>{metric.value}</div>
                  <div className="text-xs text-muted-foreground">Target: {metric.target}</div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
