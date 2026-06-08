"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import { Globe, Layers } from "lucide-react"

// Global forecast data
const globalForecastData = [
  { month: "Jan", historical: 2.1, baseline: 2.15, aiAdjusted: 2.2, plannerAdjusted: 2.18, confidence: 0.95 },
  { month: "Feb", historical: 2.0, baseline: 2.1, aiAdjusted: 2.15, plannerAdjusted: 2.12, confidence: 0.93 },
  { month: "Mar", historical: 2.3, baseline: 2.35, aiAdjusted: 2.4, plannerAdjusted: 2.38, confidence: 0.92 },
  { month: "Apr", historical: 2.2, baseline: 2.25, aiAdjusted: 2.3, plannerAdjusted: 2.28, confidence: 0.91 },
  { month: "May", historical: 2.4, baseline: 2.45, aiAdjusted: 2.52, plannerAdjusted: 2.5, confidence: 0.89 },
  { month: "Jun", historical: 2.5, baseline: 2.55, aiAdjusted: 2.65, plannerAdjusted: 2.62, confidence: 0.87 },
  { month: "Jul", historical: 2.3, baseline: 2.32, aiAdjusted: 2.38, plannerAdjusted: 2.35, confidence: 0.85 },
  { month: "Aug", historical: 2.1, baseline: 2.12, aiAdjusted: 2.16, plannerAdjusted: 2.14, confidence: 0.84 },
  { month: "Sep", historical: null, baseline: 2.28, aiAdjusted: 2.35, plannerAdjusted: 2.32, confidence: 0.82 },
  { month: "Oct", historical: null, baseline: 2.4, aiAdjusted: 2.48, plannerAdjusted: 2.45, confidence: 0.80 },
  { month: "Nov", historical: null, baseline: 2.35, aiAdjusted: 2.42, plannerAdjusted: 2.40, confidence: 0.78 },
  { month: "Dec", historical: null, baseline: 2.5, aiAdjusted: 2.58, plannerAdjusted: 2.55, confidence: 0.75 },
]

// Regional forecast data
const regionalForecastData = [
  { month: "Jan", AMER: 1.05, EMEA: 0.65, APAC: 0.40 },
  { month: "Feb", AMER: 1.00, EMEA: 0.62, APAC: 0.38 },
  { month: "Mar", AMER: 1.15, EMEA: 0.70, APAC: 0.45 },
  { month: "Apr", AMER: 1.10, EMEA: 0.68, APAC: 0.42 },
  { month: "May", AMER: 1.20, EMEA: 0.75, APAC: 0.50 },
  { month: "Jun", AMER: 1.25, EMEA: 0.80, APAC: 0.55 },
  { month: "Jul", AMER: 1.15, EMEA: 0.72, APAC: 0.48 },
  { month: "Aug", AMER: 1.05, EMEA: 0.65, APAC: 0.42 },
  { month: "Sep", AMER: 1.12, EMEA: 0.68, APAC: 0.48 },
  { month: "Oct", AMER: 1.18, EMEA: 0.72, APAC: 0.52 },
  { month: "Nov", AMER: 1.15, EMEA: 0.70, APAC: 0.50 },
  { month: "Dec", AMER: 1.22, EMEA: 0.75, APAC: 0.55 },
]

type ViewMode = "global" | "regional"

export default function RegionalForecastChart() {
  const [viewMode, setViewMode] = useState<ViewMode>("global")

  return (
    <Card className="p-6 border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Forecast Trend & Confidence Analysis</h2>
          <p className="text-sm text-muted-foreground">
            {viewMode === "global"
              ? "12-month historical and projected demand with confidence intervals"
              : "Regional demand breakdown across AMER, EMEA, and APAC"}
          </p>
        </div>
        <div className="flex gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === "global" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("global")}
            className="text-xs gap-1.5"
          >
            <Globe className="h-3.5 w-3.5" />
            Global
          </Button>
          <Button
            variant={viewMode === "regional" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("regional")}
            className="text-xs gap-1.5"
          >
            <Layers className="h-3.5 w-3.5" />
            By Region
          </Button>
        </div>
      </div>

      {viewMode === "global" ? (
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={globalForecastData}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}B`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}B units`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="confidence"
              fill="url(#colorConfidence)"
              stroke="none"
              name="Confidence Band"
            />
            <Line
              type="monotone"
              dataKey="historical"
              stroke="#6b7280"
              strokeWidth={2}
              name="Historical"
              connectNulls
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="baseline"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Baseline"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aiAdjusted"
              stroke="#3b82f6"
              strokeWidth={2.5}
              name="AI-Adjusted"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="plannerAdjusted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Planner-Adjusted"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={regionalForecastData}>
            <defs>
              <linearGradient id="colorAMER" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorEMEA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorAPAC" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `${value}B`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}B units`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Area
              type="monotone"
              dataKey="AMER"
              stackId="1"
              stroke="#3b82f6"
              fill="url(#colorAMER)"
              name="Americas"
            />
            <Area
              type="monotone"
              dataKey="EMEA"
              stackId="1"
              stroke="#10b981"
              fill="url(#colorEMEA)"
              name="EMEA"
            />
            <Area
              type="monotone"
              dataKey="APAC"
              stackId="1"
              stroke="#f59e0b"
              fill="url(#colorAPAC)"
              name="APAC"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
