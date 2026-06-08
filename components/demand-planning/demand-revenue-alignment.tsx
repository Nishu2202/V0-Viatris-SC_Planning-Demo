"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  BarChart,
} from "recharts"
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

// Demand vs Revenue trend data
const trendData = [
  { month: "Jan", demandUnits: 2100, revenuePlan: 245, revenueActual: 238 },
  { month: "Feb", demandUnits: 2200, revenuePlan: 258, revenueActual: 252 },
  { month: "Mar", demandUnits: 2350, revenuePlan: 275, revenueActual: 271 },
  { month: "Apr", demandUnits: 2280, revenuePlan: 268, revenueActual: 262 },
  { month: "May", demandUnits: 2420, revenuePlan: 285, revenueActual: 278 },
  { month: "Jun", demandUnits: 2510, revenuePlan: 295, revenueActual: 289 },
  { month: "Jul", demandUnits: 2580, revenuePlan: 305, revenueActual: 298 },
  { month: "Aug", demandUnits: 2650, revenuePlan: 312, revenueActual: 305 },
  { month: "Sep", demandUnits: 2720, revenuePlan: 320, revenueActual: 312 },
  { month: "Oct", demandUnits: 2800, revenuePlan: 330, revenueActual: null },
]

// Variance waterfall data
const waterfallData = [
  { name: "Plan", value: 330, fill: "#3b82f6", type: "base" },
  { name: "Volume", value: -12, fill: "#ef4444", type: "delta" },
  { name: "Price", value: +8, fill: "#22c55e", type: "delta" },
  { name: "Mix", value: -5, fill: "#ef4444", type: "delta" },
  { name: "FX", value: -3, fill: "#ef4444", type: "delta" },
  { name: "Forecast", value: 318, fill: "#8b5cf6", type: "total" },
]

// Calculate cumulative for waterfall
const waterfallWithCumulative = waterfallData.map((item, index) => {
  if (index === 0) return { ...item, start: 0, end: item.value }
  if (item.type === "total") return { ...item, start: 0, end: item.value }
  
  const prevEnd = waterfallData.slice(0, index).reduce((acc, d) => {
    if (d.type === "base") return d.value
    if (d.type === "delta") return acc + d.value
    return acc
  }, 0)
  
  return {
    ...item,
    start: prevEnd,
    end: prevEnd + item.value
  }
})

// Alignment breakdown
const alignmentBreakdown = [
  { label: "Volume Variance", value: "-$12M", impact: "negative", description: "Lower unit demand than planned" },
  { label: "Price Variance", value: "+$8M", impact: "positive", description: "Better price realization" },
  { label: "Mix Variance", value: "-$5M", impact: "negative", description: "Shift to lower-margin products" },
  { label: "FX Impact", value: "-$3M", impact: "negative", description: "USD strength vs EUR/JPY" },
]

export default function DemandRevenueAlignment() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Demand to Revenue Alignment</h2>
            <p className="text-sm text-muted-foreground">Connecting volume forecasts to financial outcomes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Current Alignment</div>
            <div className="text-lg font-bold text-foreground">94.2%</div>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            -$12M Gap
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Trend Chart - Takes 3 columns */}
        <Card className="col-span-3 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Demand Units vs Revenue Trend</h3>
            <Badge className="bg-muted text-muted-foreground">YTD + Q4 Forecast</Badge>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis 
                yAxisId="left" 
                stroke="#6b7280" 
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#6b7280" 
                fontSize={12}
                tickFormatter={(value) => `$${value}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number | null, name: string) => {
                  if (value === null) return ["N/A", name]
                  if (name === "demandUnits") return [`${value.toLocaleString()} units`, "Demand Units"]
                  return [`$${value}M`, name === "revenuePlan" ? "Revenue Plan" : "Revenue Actual"]
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="demandUnits"
                fill="#e0e7ff"
                stroke="#6366f1"
                name="Demand Units"
                radius={[4, 4, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenuePlan"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                name="Revenue Plan"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenueActual"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={{ fill: "#22c55e", strokeWidth: 2 }}
                name="Revenue Actual"
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Variance Waterfall - Takes 2 columns */}
        <Card className="col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue Variance Waterfall</h3>
            <Badge className="bg-muted text-muted-foreground">October</Badge>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={waterfallWithCumulative} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" stroke="#6b7280" fontSize={11} tickFormatter={(v) => `$${v}M`} />
              <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={11} width={60} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${Math.abs(value)}M`, value >= 0 ? "Add" : "Subtract"]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {waterfallWithCumulative.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    opacity={entry.type === "delta" && entry.value < 0 ? 0.8 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Variance Breakdown */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {alignmentBreakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {item.impact === "positive" ? (
                    <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                  )}
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
                <span className={`font-semibold ${
                  item.impact === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
