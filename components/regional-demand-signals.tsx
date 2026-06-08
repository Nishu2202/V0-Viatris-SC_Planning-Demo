"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Building2, Landmark, Globe } from "lucide-react"

interface RegionSignal {
  region: string
  code: string
  icon: React.ReactNode
  color: string
  signals: {
    name: string
    value: string
    trend: "up" | "down" | "neutral"
    description: string
  }[]
}

const regionalSignals: RegionSignal[] = [
  {
    region: "Americas",
    code: "AMER",
    icon: <Building2 className="h-4 w-4" />,
    color: "blue",
    signals: [
      { name: "EHR Bookings", value: "+12%", trend: "up", description: "FL & TX hospitals" },
      { name: "Surgeon Prefs", value: "+8%", trend: "up", description: "Joint replacement" },
      { name: "Seasonality", value: "-3%", trend: "down", description: "Q4 normalization" },
    ],
  },
  {
    region: "EMEA",
    code: "EMEA",
    icon: <Landmark className="h-4 w-4" />,
    color: "emerald",
    signals: [
      { name: "EHR Bookings", value: "+4%", trend: "up", description: "UK & France" },
      { name: "Surgeon Prefs", value: "-2%", trend: "down", description: "Spine procedures" },
      { name: "Regulatory", value: "-5%", trend: "down", description: "Germany delays" },
    ],
  },
  {
    region: "APAC",
    code: "APAC",
    icon: <Globe className="h-4 w-4" />,
    color: "amber",
    signals: [
      { name: "EHR Bookings", value: "+18%", trend: "up", description: "Japan & Australia" },
      { name: "Surgeon Prefs", value: "+15%", trend: "up", description: "Knee implants" },
      { name: "Market Growth", value: "+10%", trend: "up", description: "China expansion" },
    ],
  },
]

const colorClasses: Record<string, { header: string; icon: string }> = {
  blue: {
    header: "bg-blue-50 border-b border-blue-100",
    icon: "text-blue-600",
  },
  emerald: {
    header: "bg-emerald-50 border-b border-emerald-100",
    icon: "text-emerald-600",
  },
  amber: {
    header: "bg-amber-50 border-b border-amber-100",
    icon: "text-amber-600",
  },
}

export default function RegionalDemandSignals() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Demand Signals by Region</h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {regionalSignals.map((region) => {
          const colors = colorClasses[region.color]
          return (
            <Card key={region.code} className="overflow-hidden border-border">
              {/* Header */}
              <div className={`p-4 ${colors.header}`}>
                <div className="flex items-center gap-2">
                  <div className={colors.icon}>{region.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{region.code}</div>
                    <div className="text-xs text-muted-foreground">{region.region}</div>
                  </div>
                </div>
              </div>

              {/* Signals */}
              <div className="p-4 space-y-3">
                {region.signals.map((signal, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-foreground">{signal.name}</div>
                      <div className="text-xs text-muted-foreground">{signal.description}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {signal.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                      ) : signal.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                      ) : null}
                      <span
                        className={`text-sm font-semibold ${
                          signal.trend === "up"
                            ? "text-green-600"
                            : signal.trend === "down"
                              ? "text-red-600"
                              : "text-muted-foreground"
                        }`}
                      >
                        {signal.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Adjustment Summary */}
              <div className="px-4 pb-4">
                <div className="p-2.5 bg-muted rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Net AI Adjustment</span>
                    <Badge
                      className={
                        region.code === "APAC"
                          ? "bg-green-100 text-green-700"
                          : region.code === "AMER"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {region.code === "APAC" ? "+14.3%" : region.code === "AMER" ? "+5.7%" : "-1.0%"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
