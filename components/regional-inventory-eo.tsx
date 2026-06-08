"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Package, TrendingUp, TrendingDown, Building2, Landmark, Globe } from "lucide-react"

interface RegionInventory {
  region: string
  code: string
  icon: React.ReactNode
  color: string
  dos: number
  dosTarget: number
  inventoryChange: string
  inventoryPositive: boolean
  eoRisk: string
  eoSeverity: "low" | "medium" | "high"
  capitalRequired: string
  flaggedSKUs: number
}

const regionalInventory: RegionInventory[] = [
  {
    region: "Americas",
    code: "AMER",
    icon: <Building2 className="h-4 w-4" />,
    color: "blue",
    dos: 52,
    dosTarget: 45,
    inventoryChange: "+8%",
    inventoryPositive: true,
    eoRisk: "$8.2M",
    eoSeverity: "medium",
    capitalRequired: "$32M",
    flaggedSKUs: 2,
  },
  {
    region: "EMEA",
    code: "EMEA",
    icon: <Landmark className="h-4 w-4" />,
    color: "emerald",
    dos: 45,
    dosTarget: 45,
    inventoryChange: "-3%",
    inventoryPositive: false,
    eoRisk: "$6.5M",
    eoSeverity: "high",
    capitalRequired: "$18M",
    flaggedSKUs: 3,
  },
  {
    region: "APAC",
    code: "APAC",
    icon: <Globe className="h-4 w-4" />,
    color: "amber",
    dos: 38,
    dosTarget: 45,
    inventoryChange: "+22%",
    inventoryPositive: true,
    eoRisk: "$3.3M",
    eoSeverity: "low",
    capitalRequired: "$22M",
    flaggedSKUs: 1,
  },
]

const colorClasses: Record<string, { header: string; icon: string; accent: string }> = {
  blue: {
    header: "bg-blue-50 border-b border-blue-100",
    icon: "text-blue-600",
    accent: "bg-blue-100 text-blue-700",
  },
  emerald: {
    header: "bg-emerald-50 border-b border-emerald-100",
    icon: "text-emerald-600",
    accent: "bg-emerald-100 text-emerald-700",
  },
  amber: {
    header: "bg-amber-50 border-b border-amber-100",
    icon: "text-amber-600",
    accent: "bg-amber-100 text-amber-700",
  },
}

const severityClasses = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
}

export default function RegionalInventoryEO() {
  return (
    <Card className="p-6 border-border">
      <div className="flex items-center gap-2 mb-5">
        <Package className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Inventory & E&O Impact by Region</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {regionalInventory.map((region) => {
          const colors = colorClasses[region.color]
          const dosStatus = region.dos >= region.dosTarget ? "above" : "below"

          return (
            <div key={region.code} className="space-y-4">
              {/* Region Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <div className={colors.icon}>{region.icon}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{region.code}</div>
                  <div className="text-xs text-muted-foreground">{region.region}</div>
                </div>
              </div>

              {/* Days of Supply */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Days of Supply</span>
                  <span className="text-xs text-muted-foreground">Target: {region.dosTarget}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">{region.dos}</span>
                  <span className="text-xs text-muted-foreground">days</span>
                  <Badge className={dosStatus === "above" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                    {dosStatus === "above" ? "On Track" : "Below Target"}
                  </Badge>
                </div>
                <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${region.dos >= region.dosTarget ? "bg-green-500" : "bg-orange-500"}`}
                    style={{ width: `${Math.min((region.dos / region.dosTarget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              {/* Inventory Change */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-xs text-muted-foreground">Inventory Required</span>
                <div className="flex items-center gap-1">
                  {region.inventoryPositive ? (
                    <TrendingUp className="h-3.5 w-3.5 text-orange-600" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-green-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${region.inventoryPositive ? "text-orange-600" : "text-green-600"}`}
                  >
                    {region.inventoryChange}
                  </span>
                </div>
              </div>

              {/* E&O Risk */}
              <div>
                <div className="text-xs text-muted-foreground mb-2">E&O Risk</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-red-600">{region.eoRisk}</span>
                  <Badge className={severityClasses[region.eoSeverity]}>
                    {region.flaggedSKUs} SKU{region.flaggedSKUs > 1 ? "s" : ""} flagged
                  </Badge>
                </div>
              </div>

              {/* Capital Required */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-1.5 text-xs text-blue-700">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>
                    <span className="font-semibold">{region.capitalRequired}</span> working capital
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs text-muted-foreground">Total E&O Risk</div>
              <div className="text-lg font-bold text-red-600">$18.0M</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Capital Required</div>
              <div className="text-lg font-bold text-foreground">$72M</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Total Flagged SKUs</div>
              <div className="text-lg font-bold text-foreground">6 products</div>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-700">Review Required</Badge>
        </div>
      </div>
    </Card>
  )
}
