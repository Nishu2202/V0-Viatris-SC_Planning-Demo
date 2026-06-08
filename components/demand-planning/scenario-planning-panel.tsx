"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle,
  RefreshCw,
  Save,
  Play
} from "lucide-react"

interface ScenarioVariable {
  id: string
  label: string
  unit: string
  min: number
  max: number
  step: number
  default: number
  current: number
}

interface ScenarioImpact {
  label: string
  baseline: string
  adjusted: string
  delta: string
  direction: "up" | "down" | "neutral"
  icon: React.ReactNode
}

const initialVariables: ScenarioVariable[] = [
  { id: "demand_uplift", label: "Demand Uplift/Reduction", unit: "%", min: -20, max: 20, step: 1, default: 0, current: 0 },
  { id: "price_change", label: "Price Realization", unit: "%", min: -10, max: 10, step: 0.5, default: 0, current: 0 },
  { id: "lead_time", label: "Lead Time Adjustment", unit: "weeks", min: -4, max: 4, step: 1, default: 0, current: 0 },
  { id: "capacity", label: "Capacity Expansion", unit: "%", min: 0, max: 25, step: 5, default: 0, current: 0 },
]

// Simulated forecast data
const generateForecastData = (demandUplift: number) => {
  const baseData = [
    { month: "Oct", baseline: 2750, current: 2750 },
    { month: "Nov", baseline: 2820, current: 2820 },
    { month: "Dec", baseline: 2950, current: 2950 },
    { month: "Jan", baseline: 2680, current: 2680 },
    { month: "Feb", baseline: 2780, current: 2780 },
    { month: "Mar", baseline: 2900, current: 2900 },
  ]
  
  return baseData.map(d => ({
    ...d,
    adjusted: Math.round(d.baseline * (1 + demandUplift / 100))
  }))
}

export default function ScenarioPlanningPanel() {
  const [variables, setVariables] = useState<ScenarioVariable[]>(initialVariables)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const demandUplift = variables.find(v => v.id === "demand_uplift")?.current || 0
  const priceChange = variables.find(v => v.id === "price_change")?.current || 0
  const capacityChange = variables.find(v => v.id === "capacity")?.current || 0
  
  const forecastData = generateForecastData(demandUplift)
  
  // Calculate impacts based on current variables
  const impacts: ScenarioImpact[] = [
    {
      label: "Revenue Impact",
      baseline: "$330M",
      adjusted: `$${(330 * (1 + (demandUplift + priceChange) / 100)).toFixed(1)}M`,
      delta: `${demandUplift + priceChange >= 0 ? "+" : ""}${(demandUplift + priceChange).toFixed(1)}%`,
      direction: demandUplift + priceChange >= 0 ? "up" : "down",
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      label: "Inventory Required",
      baseline: "$485M",
      adjusted: `$${(485 * (1 + demandUplift / 100)).toFixed(0)}M`,
      delta: `${demandUplift >= 0 ? "+" : ""}${demandUplift}%`,
      direction: demandUplift > 0 ? "up" : demandUplift < 0 ? "down" : "neutral",
      icon: <Package className="h-4 w-4" />
    },
    {
      label: "Capacity Gap",
      baseline: "6%",
      adjusted: `${Math.max(0, 6 + demandUplift - capacityChange).toFixed(1)}%`,
      delta: `${capacityChange > 0 ? "-" : ""}${capacityChange > 0 ? (capacityChange - demandUplift).toFixed(1) : demandUplift}pts`,
      direction: demandUplift > capacityChange ? "up" : "down",
      icon: <AlertTriangle className="h-4 w-4" />
    },
  ]

  const handleVariableChange = (id: string, value: number[]) => {
    setVariables(prev => prev.map(v => 
      v.id === id ? { ...v, current: value[0] } : v
    ))
  }

  const handleReset = () => {
    setVariables(prev => prev.map(v => ({ ...v, current: v.default })))
  }

  const handleRunScenario = () => {
    setIsCalculating(true)
    setTimeout(() => setIsCalculating(false), 1000)
  }

  const hasChanges = variables.some(v => v.current !== v.default)

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Scenario Planning</h2>
            <p className="text-sm text-muted-foreground">What-if analysis for demand planning decisions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button size="sm" onClick={handleRunScenario} disabled={isCalculating}>
            {isCalculating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Run Scenario
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Variables Panel */}
        <div className="space-y-5">
          <h3 className="font-semibold text-foreground text-sm">Adjust Variables</h3>
          
          {variables.map((variable) => (
            <div key={variable.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">{variable.label}</label>
                <span className={`text-sm font-semibold ${
                  variable.current !== variable.default
                    ? variable.current > variable.default ? "text-green-600" : "text-red-600"
                    : "text-muted-foreground"
                }`}>
                  {variable.current > 0 ? "+" : ""}{variable.current}{variable.unit}
                </span>
              </div>
              <Slider
                value={[variable.current]}
                min={variable.min}
                max={variable.max}
                step={variable.step}
                onValueChange={(value) => handleVariableChange(variable.id, value)}
                className="w-full"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{variable.min}{variable.unit}</span>
                <span>{variable.max}{variable.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Forecast Chart */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4">Forecast Impact Preview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
              <YAxis stroke="#6b7280" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value.toLocaleString()}K`, ""]}
              />
              <ReferenceLine y={2800} stroke="#22c55e" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="baseline"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Baseline"
              />
              {hasChanges && (
                <Line
                  type="monotone"
                  dataKey="adjusted"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                  name="Adjusted"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-0.5 bg-slate-400" style={{ backgroundImage: "repeating-linear-gradient(90deg, #94a3b8, #94a3b8 4px, transparent 4px, transparent 8px)" }} />
              <span className="text-muted-foreground">Baseline</span>
            </div>
            {hasChanges && (
              <div className="flex items-center gap-1">
                <div className="w-4 h-0.5 bg-blue-500" />
                <span className="text-blue-600">Adjusted</span>
              </div>
            )}
          </div>
        </div>

        {/* Impact Summary */}
        <div>
          <h3 className="font-semibold text-foreground text-sm mb-4">Impact Summary</h3>
          <div className="space-y-3">
            {impacts.map((impact, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg border ${
                  impact.direction === "up" && impact.label !== "Capacity Gap"
                    ? "bg-green-50 border-green-200"
                    : impact.direction === "down" && impact.label !== "Capacity Gap"
                      ? "bg-red-50 border-red-200"
                      : impact.direction === "up" && impact.label === "Capacity Gap"
                        ? "bg-red-50 border-red-200"
                        : impact.direction === "down" && impact.label === "Capacity Gap"
                          ? "bg-green-50 border-green-200"
                          : "bg-muted border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`${
                    (impact.direction === "up" && impact.label !== "Capacity Gap") ||
                    (impact.direction === "down" && impact.label === "Capacity Gap")
                      ? "text-green-600" 
                      : (impact.direction === "down" && impact.label !== "Capacity Gap") ||
                        (impact.direction === "up" && impact.label === "Capacity Gap")
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}>
                    {impact.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{impact.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Baseline</div>
                    <div className="text-lg font-semibold text-muted-foreground">{impact.baseline}</div>
                  </div>
                  <div className="text-center">
                    {impact.direction === "up" ? (
                      <TrendingUp className={`h-5 w-5 mx-auto ${
                        impact.label === "Capacity Gap" ? "text-red-500" : "text-green-500"
                      }`} />
                    ) : impact.direction === "down" ? (
                      <TrendingDown className={`h-5 w-5 mx-auto ${
                        impact.label === "Capacity Gap" ? "text-green-500" : "text-red-500"
                      }`} />
                    ) : null}
                    <div className={`text-xs font-semibold ${
                      (impact.direction === "up" && impact.label !== "Capacity Gap") ||
                      (impact.direction === "down" && impact.label === "Capacity Gap")
                        ? "text-green-600"
                        : (impact.direction === "down" && impact.label !== "Capacity Gap") ||
                          (impact.direction === "up" && impact.label === "Capacity Gap")
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }`}>
                      {impact.delta}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Adjusted</div>
                    <div className="text-lg font-bold text-foreground">{impact.adjusted}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasChanges && (
            <Button className="w-full mt-4" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save as Scenario
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
