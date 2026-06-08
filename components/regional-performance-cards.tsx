"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Globe, Building2, Landmark } from "lucide-react"

interface RegionData {
  region: string
  code: string
  demand: string
  revenue: string
  vsAOP: string
  vsAOPPositive: boolean
  growthRate: string
  growthPositive: boolean
  confidence: number
  color: string
  icon: React.ReactNode
}

const regionData: RegionData[] = [
  {
    region: "Americas",
    code: "AMER",
    demand: "1.2B",
    revenue: "$980M",
    vsAOP: "+3.2%",
    vsAOPPositive: true,
    growthRate: "+5.8%",
    growthPositive: true,
    confidence: 92,
    color: "blue",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    region: "Europe, Middle East & Africa",
    code: "EMEA",
    demand: "680M",
    revenue: "$520M",
    vsAOP: "-2.1%",
    vsAOPPositive: false,
    growthRate: "+2.4%",
    growthPositive: true,
    confidence: 85,
    color: "emerald",
    icon: <Landmark className="h-4 w-4" />,
  },
  {
    region: "Asia Pacific",
    code: "APAC",
    demand: "450M",
    revenue: "$385M",
    vsAOP: "+8.5%",
    vsAOPPositive: true,
    growthRate: "+12.3%",
    growthPositive: true,
    confidence: 78,
    color: "amber",
    icon: <Globe className="h-4 w-4" />,
  },
]

const colorClasses: Record<string, { bg: string; border: string; badge: string; icon: string }> = {
  blue: {
    bg: "bg-gradient-to-br from-blue-50 to-white",
    border: "border-blue-200 hover:border-blue-300",
    badge: "bg-blue-100 text-blue-700",
    icon: "text-blue-600",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-50 to-white",
    border: "border-emerald-200 hover:border-emerald-300",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "text-emerald-600",
  },
  amber: {
    bg: "bg-gradient-to-br from-amber-50 to-white",
    border: "border-amber-200 hover:border-amber-300",
    badge: "bg-amber-100 text-amber-700",
    icon: "text-amber-600",
  },
}

export default function RegionalPerformanceCards() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-4">Regional Demand Performance</h2>
      <div className="grid grid-cols-3 gap-4">
        {regionData.map((region) => {
          const colors = colorClasses[region.color]
          return (
            <Card
              key={region.code}
              className={`p-5 ${colors.bg} ${colors.border} border-2 hover:shadow-lg transition-all cursor-pointer`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={colors.icon}>{region.icon}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{region.code}</div>
                    <div className="text-xs text-muted-foreground">{region.region}</div>
                  </div>
                </div>
                <Badge className={colors.badge}>{region.confidence}% conf</Badge>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Demand */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Demand</div>
                  <div className="text-xl font-bold text-foreground">{region.demand}</div>
                  <div className="text-xs text-muted-foreground">units</div>
                </div>

                {/* Revenue */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                  <div className="text-xl font-bold text-foreground">{region.revenue}</div>
                </div>

                {/* vs AOP */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">vs AOP</div>
                  <div className="flex items-center gap-1">
                    {region.vsAOPPositive ? (
                      <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-semibold ${region.vsAOPPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {region.vsAOP}
                    </span>
                  </div>
                </div>

                {/* Growth Rate */}
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Growth</div>
                  <div className="flex items-center gap-1">
                    {region.growthPositive ? (
                      <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-semibold ${region.growthPositive ? "text-green-600" : "text-red-600"}`}
                    >
                      {region.growthRate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Forecast Confidence</span>
                  <span>{region.confidence}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      region.confidence >= 90
                        ? "bg-green-500"
                        : region.confidence >= 80
                          ? "bg-blue-500"
                          : "bg-amber-500"
                    }`}
                    style={{ width: `${region.confidence}%` }}
                  />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
