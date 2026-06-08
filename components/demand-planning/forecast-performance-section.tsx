"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  ReferenceLine,
} from "recharts"
import { TrendingUp, TrendingDown, Brain, Users, BarChart3 } from "lucide-react"

// Forecast performance trend data
const performanceTrendData = [
  { month: "Jan", wmape: 22.1, bias: -4.2, target: 15 },
  { month: "Feb", wmape: 20.8, bias: -3.8, target: 15 },
  { month: "Mar", wmape: 19.5, bias: -3.1, target: 15 },
  { month: "Apr", wmape: 18.9, bias: -2.8, target: 15 },
  { month: "May", wmape: 19.2, bias: -3.0, target: 15 },
  { month: "Jun", wmape: 18.4, bias: -2.5, target: 15 },
  { month: "Jul", wmape: 17.8, bias: -2.2, target: 15 },
  { month: "Aug", wmape: 18.1, bias: -2.4, target: 15 },
  { month: "Sep", wmape: 17.5, bias: -1.9, target: 15 },
  { month: "Oct", wmape: 18.2, bias: -2.1, target: 15 },
]

// AI vs Planner vs Actuals comparison
const comparisonData = [
  { month: "Jul", ai: 2450, planner: 2380, actual: 2420 },
  { month: "Aug", ai: 2520, planner: 2480, actual: 2510 },
  { month: "Sep", ai: 2680, planner: 2620, actual: 2650 },
  { month: "Oct", ai: 2750, planner: 2700, actual: null },
  { month: "Nov", ai: 2820, planner: 2780, actual: null },
  { month: "Dec", ai: 2950, planner: 2900, actual: null },
]

// Forecast Value Added (FVA) metrics
const fvaMetrics = [
  { 
    source: "AI Model", 
    wmape: 14.2, 
    bias: -1.2, 
    fva: "+5.8%",
    icon: Brain,
    color: "blue"
  },
  { 
    source: "Planner Adjusted", 
    wmape: 16.8, 
    bias: -2.1, 
    fva: "+3.2%",
    icon: Users,
    color: "purple"
  },
  { 
    source: "Statistical Baseline", 
    wmape: 20.0, 
    bias: -3.5, 
    fva: "Baseline",
    icon: BarChart3,
    color: "gray"
  },
]

export default function ForecastPerformanceSection() {
  const [activeView, setActiveView] = useState<"trend" | "comparison">("trend")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Forecast Performance</h2>
          <p className="text-sm text-muted-foreground">Accuracy trends, bias analysis, and forecast value added</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={activeView === "trend" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("trend")}
          >
            Accuracy Trend
          </Button>
          <Button
            variant={activeView === "comparison" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("comparison")}
          >
            AI vs Planner
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Main Chart */}
        <Card className="col-span-2 p-6">
          {activeView === "trend" ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">WMAPE & Bias Trend</h3>
                <Badge className="bg-muted text-muted-foreground">Last 10 months</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#6b7280" 
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#6b7280" 
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value}%`,
                      name === "wmape" ? "WMAPE" : name === "bias" ? "Bias" : "Target"
                    ]}
                  />
                  <Legend />
                  <ReferenceLine 
                    yAxisId="left" 
                    y={15} 
                    stroke="#22c55e" 
                    strokeDasharray="5 5" 
                    label={{ value: "Target 15%", position: "right", fill: "#22c55e", fontSize: 11 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="wmape"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    name="WMAPE"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="bias"
                    fill="#f59e0b"
                    opacity={0.7}
                    name="Bias"
                    radius={[4, 4, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">AI vs Planner vs Actuals</h3>
                <Badge className="bg-muted text-muted-foreground">Units (K)</Badge>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value: number | null) => [
                      value ? `${value.toLocaleString()}K` : "N/A"
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ai"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                    name="AI Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="planner"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                    name="Planner Adjusted"
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    dot={{ fill: "#22c55e", strokeWidth: 2 }}
                    name="Actuals"
                    connectNulls={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>

        {/* FVA Metrics Sidebar */}
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Forecast Value Added</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Comparing accuracy across forecast sources
          </p>
          
          <div className="space-y-4">
            {fvaMetrics.map((metric, idx) => {
              const Icon = metric.icon
              const colorClasses = {
                blue: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" },
                purple: { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600" },
                gray: { bg: "bg-gray-50", border: "border-gray-200", icon: "text-gray-600" },
              }[metric.color]
              
              return (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border ${colorClasses?.bg} ${colorClasses?.border}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-4 w-4 ${colorClasses?.icon}`} />
                    <span className="text-sm font-medium text-foreground">{metric.source}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground">WMAPE</div>
                      <div className="text-lg font-bold text-foreground">{metric.wmape}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Bias</div>
                      <div className="text-lg font-bold text-foreground">{metric.bias}%</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">FVA</span>
                      {metric.fva !== "Baseline" ? (
                        <Badge className="bg-green-100 text-green-700">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {metric.fva}
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-600">Baseline</Badge>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Brain className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <div className="text-xs font-medium text-blue-700">AI Recommendation</div>
                <div className="text-xs text-blue-600 mt-1">
                  AI model outperforming planner adjustments by 2.6pts. Consider increasing AI adoption for stable SKUs.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
