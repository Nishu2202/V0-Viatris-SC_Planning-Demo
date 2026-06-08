"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  ChevronRight,
  MapPin
} from "lucide-react"

interface RegionMetric {
  region: string
  code: string
  accuracy: number
  bias: number
  revenueAtRisk: string
  fillRate: number
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "flat"
  topException: string
}

const regionData: RegionMetric[] = [
  {
    region: "North America",
    code: "NA",
    accuracy: 85.2,
    bias: -1.8,
    revenueAtRisk: "$12.4M",
    fillRate: 97.2,
    status: "good",
    trend: "up",
    topException: "Triathlon TKA supply gap"
  },
  {
    region: "Europe, Middle East & Africa",
    code: "EMEA",
    accuracy: 78.5,
    bias: -4.2,
    revenueAtRisk: "$8.2M",
    fillRate: 94.1,
    status: "warning",
    trend: "down",
    topException: "Regulatory delays in Germany"
  },
  {
    region: "Asia Pacific",
    code: "APAC",
    accuracy: 72.1,
    bias: +2.8,
    revenueAtRisk: "$3.9M",
    fillRate: 91.5,
    status: "critical",
    trend: "down",
    topException: "Japan demand surge - capacity constrained"
  },
]

const statusColors = {
  good: {
    cell: "bg-green-50 border-green-200",
    text: "text-green-700",
    badge: "bg-green-100 text-green-700 border-green-200"
  },
  warning: {
    cell: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    badge: "bg-amber-100 text-amber-700 border-amber-200"
  },
  critical: {
    cell: "bg-red-50 border-red-200",
    text: "text-red-700",
    badge: "bg-red-100 text-red-700 border-red-200"
  }
}

const getAccuracyStatus = (accuracy: number): "good" | "warning" | "critical" => {
  if (accuracy >= 85) return "good"
  if (accuracy >= 75) return "warning"
  return "critical"
}

const getBiasStatus = (bias: number): "good" | "warning" | "critical" => {
  const absBias = Math.abs(bias)
  if (absBias <= 2) return "good"
  if (absBias <= 4) return "warning"
  return "critical"
}

const getFillRateStatus = (rate: number): "good" | "warning" | "critical" => {
  if (rate >= 96) return "good"
  if (rate >= 93) return "warning"
  return "critical"
}

export default function RegionalHeatmap() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Regional Performance Heatmap</h2>
            <p className="text-sm text-muted-foreground">Quick identification of regions requiring intervention</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 border border-green-200">Good</Badge>
          <Badge className="bg-amber-100 text-amber-700 border border-amber-200">Warning</Badge>
          <Badge className="bg-red-100 text-red-700 border border-red-200">Critical</Badge>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground pb-3 pr-4">Region</th>
              <th className="text-center text-xs font-semibold text-muted-foreground pb-3 px-3">Accuracy</th>
              <th className="text-center text-xs font-semibold text-muted-foreground pb-3 px-3">Bias</th>
              <th className="text-center text-xs font-semibold text-muted-foreground pb-3 px-3">Revenue at Risk</th>
              <th className="text-center text-xs font-semibold text-muted-foreground pb-3 px-3">Fill Rate</th>
              <th className="text-left text-xs font-semibold text-muted-foreground pb-3 px-3">Top Exception</th>
              <th className="text-center text-xs font-semibold text-muted-foreground pb-3 pl-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {regionData.map((region, idx) => {
              const accStatus = getAccuracyStatus(region.accuracy)
              const biasStatus = getBiasStatus(region.bias)
              const fillStatus = getFillRateStatus(region.fillRate)
              const overallColors = statusColors[region.status]
              
              return (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  {/* Region */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full ${
                        region.status === "good" ? "bg-green-500" :
                        region.status === "warning" ? "bg-amber-500" : "bg-red-500"
                      }`} />
                      <div>
                        <div className="font-semibold text-foreground">{region.code}</div>
                        <div className="text-xs text-muted-foreground">{region.region}</div>
                      </div>
                      {region.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : region.trend === "down" ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : null}
                    </div>
                  </td>

                  {/* Accuracy Cell */}
                  <td className="py-4 px-3">
                    <div className={`text-center py-2 px-3 rounded-lg border ${statusColors[accStatus].cell}`}>
                      <div className={`text-lg font-bold ${statusColors[accStatus].text}`}>
                        {region.accuracy}%
                      </div>
                    </div>
                  </td>

                  {/* Bias Cell */}
                  <td className="py-4 px-3">
                    <div className={`text-center py-2 px-3 rounded-lg border ${statusColors[biasStatus].cell}`}>
                      <div className={`text-lg font-bold ${statusColors[biasStatus].text}`}>
                        {region.bias > 0 ? "+" : ""}{region.bias}%
                      </div>
                    </div>
                  </td>

                  {/* Revenue at Risk Cell */}
                  <td className="py-4 px-3">
                    <div className={`text-center py-2 px-3 rounded-lg border ${overallColors.cell}`}>
                      <div className={`text-lg font-bold ${overallColors.text}`}>
                        {region.revenueAtRisk}
                      </div>
                    </div>
                  </td>

                  {/* Fill Rate Cell */}
                  <td className="py-4 px-3">
                    <div className={`text-center py-2 px-3 rounded-lg border ${statusColors[fillStatus].cell}`}>
                      <div className={`text-lg font-bold ${statusColors[fillStatus].text}`}>
                        {region.fillRate}%
                      </div>
                    </div>
                  </td>

                  {/* Top Exception */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      {region.status === "critical" ? (
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      ) : region.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        {region.topException}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 pl-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`${
                        region.status === "critical" 
                          ? "text-red-600 hover:bg-red-50" 
                          : region.status === "warning"
                            ? "text-amber-600 hover:bg-amber-50"
                            : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {region.status === "critical" ? "Investigate" : "Review"}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-muted-foreground">Total Revenue at Risk:</span>
          <span className="font-bold text-red-600">$24.5M</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">Regions Needing Attention:</span>
          <Badge className="bg-red-100 text-red-700">2 of 3</Badge>
        </div>
        <Button variant="outline" size="sm">
          View Regional Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  )
}
