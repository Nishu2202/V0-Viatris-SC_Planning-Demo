"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface AIInsight {
  action: string
  region: string
  regionCode: string
  reason: string
  time: string
  impact: "positive" | "alert" | "neutral"
  delta?: string
}

const aiInsights: AIInsight[] = [
  {
    action: "Increased AMER forecast +6%",
    region: "Americas",
    regionCode: "AMER",
    reason: "Strong EHR procedure bookings in Florida & Texas hospitals",
    time: "1 hour ago",
    impact: "positive",
    delta: "+6%",
  },
  {
    action: "Flagged EMEA demand decline -5%",
    region: "EMEA",
    regionCode: "EMEA",
    reason: "Q4 seasonality + regulatory delays in Germany",
    time: "3 hours ago",
    impact: "alert",
    delta: "-5%",
  },
  {
    action: "APAC confidence adjusted to 78%",
    region: "Asia Pacific",
    regionCode: "APAC",
    reason: "New surgeon preference data from Japan & Australia",
    time: "5 hours ago",
    impact: "neutral",
  },
  {
    action: "Cross-regional rebalancing suggested",
    region: "Global",
    regionCode: "ALL",
    reason: "Shift 12% EMEA inventory to APAC to meet demand surge",
    time: "6 hours ago",
    impact: "alert",
  },
]

const regionColorMap: Record<string, string> = {
  AMER: "bg-blue-100 text-blue-700 border-blue-200",
  EMEA: "bg-emerald-100 text-emerald-700 border-emerald-200",
  APAC: "bg-amber-100 text-amber-700 border-amber-200",
  ALL: "bg-gray-100 text-gray-700 border-gray-200",
}

const impactIconMap = {
  positive: <TrendingUp className="h-4 w-4 text-green-600" />,
  alert: <AlertTriangle className="h-4 w-4 text-orange-500" />,
  neutral: <CheckCircle className="h-4 w-4 text-blue-500" />,
}

const impactBgMap = {
  positive: "bg-green-50 border-green-200",
  alert: "bg-orange-50 border-orange-200",
  neutral: "bg-blue-50 border-blue-200",
}

export default function RegionalAIInsights() {
  return (
    <Card className="p-6 border-border">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Agent Activity & Regional Insights</h2>
        </div>
        <Badge className="bg-blue-100 text-blue-700">12 adjustments this week</Badge>
      </div>

      <div className="space-y-3">
        {aiInsights.map((insight, idx) => (
          <div
            key={idx}
            className={`flex gap-4 p-4 rounded-lg border ${impactBgMap[insight.impact]} transition-all hover:shadow-sm`}
          >
            <div className="flex-shrink-0 mt-0.5">{impactIconMap[insight.impact]}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground text-sm">{insight.action}</span>
                    <Badge variant="outline" className={`text-xs ${regionColorMap[insight.regionCode]}`}>
                      {insight.regionCode}
                    </Badge>
                    {insight.delta && (
                      <span
                        className={`text-xs font-semibold ${
                          insight.delta.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {insight.delta}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{insight.reason}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                  <Clock className="h-3 w-3" />
                  {insight.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
