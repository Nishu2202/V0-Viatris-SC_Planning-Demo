"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  TrendingUp,
  Package,
  Factory,
  Zap,
  DollarSign,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Play,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Lightbulb
} from "lucide-react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

interface Scenario {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  impact: {
    revenue: number
    margin: number
    inventory: number
    cash: number
    service: number
  }
}

const scenarios: Scenario[] = [
  {
    id: "efficiency",
    title: "Improve Manufacturing",
    description: "Optimize production efficiency",
    icon: Factory,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    impact: { revenue: 50, margin: 180, inventory: -8, cash: 32, service: 2.1 }
  },
  {
    id: "rationalize",
    title: "Rationalize Portfolio",
    description: "Exit underperforming SKUs",
    icon: Package,
    color: "bg-green-50 text-green-600 border-green-200",
    impact: { revenue: -120, margin: 240, inventory: -12, cash: 45, service: -1.2 }
  },
  {
    id: "inventory",
    title: "Rebalance Inventory",
    description: "Optimize inventory levels",
    icon: Zap,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    impact: { revenue: 0, margin: 0, inventory: -15, cash: 28, service: -0.8 }
  },
  {
    id: "demand",
    title: "Demand Growth",
    description: "Capture market upside",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    impact: { revenue: 180, margin: 100, inventory: 8, cash: -15, service: 1.5 }
  }
]

const mockKpiData = [
  { name: "Revenue", baseline: 2400, scenario: 2450 },
  { name: "Margin", baseline: 42, scenario: 43 },
  { name: "Inventory", baseline: 45, scenario: 35 },
  { name: "Cash", baseline: 1200, scenario: 1250 }
]

export default function SimulateDecisionsCompact() {
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([])
  const [revenueGrowth, setRevenueGrowth] = useState(5)
  const [demandUplift, setDemandUplift] = useState(0)

  const toggleScenario = (id: string) => {
    setSelectedScenarios(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const calculateImpact = () => {
    let totalImpact = { revenue: 0, margin: 0, inventory: 0, cash: 0, service: 0 }
    selectedScenarios.forEach(id => {
      const scenario = scenarios.find(s => s.id === id)
      if (scenario) {
        totalImpact.revenue += scenario.impact.revenue
        totalImpact.margin += scenario.impact.margin
        totalImpact.inventory += scenario.impact.inventory
        totalImpact.cash += scenario.impact.cash
        totalImpact.service += scenario.impact.service
      }
    })
    return totalImpact
  }

  const impact = calculateImpact()

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">Simulate Decisions</h2>
        <p className="text-xs text-gray-600 mb-3">Test scenarios and view P&L impact</p>
      </div>

      {/* Scenario Cards - Compact Grid */}
      <div className="grid grid-cols-2 gap-2">
        {scenarios.map(scenario => {
          const Icon = scenario.icon
          const isSelected = selectedScenarios.includes(scenario.id)
          return (
            <Card
              key={scenario.id}
              onClick={() => toggleScenario(scenario.id)}
              className={`p-2.5 border-2 cursor-pointer transition-all ${
                isSelected
                  ? `${scenario.color} border-current`
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-2 mb-1">
                <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? scenario.color.split(" ")[1] : "text-gray-400"}`} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-gray-900 leading-tight">{scenario.title}</h3>
                  <p className="text-xs text-gray-600 leading-tight">{scenario.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Controls */}
      <div className="space-y-2 pt-2 border-t border-gray-200">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-900">Revenue Growth Target</label>
            <span className="text-xs font-bold text-blue-600">{revenueGrowth}%</span>
          </div>
          <Slider
            value={[revenueGrowth]}
            onValueChange={val => setRevenueGrowth(val[0])}
            min={0}
            max={20}
            step={1}
            className="h-1.5"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-900">Demand Uplift</label>
            <span className="text-xs font-bold text-green-600">{demandUplift}%</span>
          </div>
          <Slider
            value={[demandUplift]}
            onValueChange={val => setDemandUplift(val[0])}
            min={-10}
            max={30}
            step={1}
            className="h-1.5"
          />
        </div>
      </div>

      {/* Impact Output - Compact */}
      {selectedScenarios.length > 0 && (
        <div className="pt-2 border-t border-gray-200 space-y-2">
          <h3 className="text-xs font-bold text-gray-900">Impact Summary</h3>
          <div className="grid grid-cols-5 gap-1.5">
            <div className="p-2 bg-blue-50 rounded border border-blue-200">
              <div className="text-xs text-blue-600 font-semibold mb-0.5">Revenue</div>
              <div className={`text-sm font-bold ${impact.revenue > 0 ? 'text-green-600' : impact.revenue < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                ${impact.revenue > 0 ? '+' : ''}{impact.revenue}M
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded border border-green-200">
              <div className="text-xs text-green-600 font-semibold mb-0.5">Margin</div>
              <div className={`text-sm font-bold ${impact.margin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {impact.margin > 0 ? '+' : ''}{impact.margin}bps
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded border border-purple-200">
              <div className="text-xs text-purple-600 font-semibold mb-0.5">Inventory</div>
              <div className={`text-sm font-bold ${impact.inventory < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {impact.inventory}d
              </div>
            </div>
            <div className="p-2 bg-orange-50 rounded border border-orange-200">
              <div className="text-xs text-orange-600 font-semibold mb-0.5">Cash</div>
              <div className={`text-sm font-bold ${impact.cash > 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${impact.cash > 0 ? '+' : ''}{impact.cash}M
              </div>
            </div>
            <div className="p-2 bg-cyan-50 rounded border border-cyan-200">
              <div className="text-xs text-cyan-600 font-semibold mb-0.5">Service</div>
              <div className={`text-sm font-bold ${impact.service > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {impact.service > 0 ? '+' : ''}{impact.service}%
              </div>
            </div>
          </div>

          {/* Key Insight */}
          {selectedScenarios.length > 0 && (
            <div className="p-2 bg-amber-50 border border-amber-200 rounded flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <strong>Trade-off:</strong> {impact.revenue > 0 && impact.margin < 0 ? "Revenue growth will compress margins." : "Scenario optimizes for margin protection."}
              </div>
            </div>
          )}

          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5">
            <Play className="h-3 w-3 mr-1" />
            Approve & Proceed
          </Button>
        </div>
      )}

      {selectedScenarios.length === 0 && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded text-center">
          <p className="text-xs text-gray-600">Select scenarios to view impact analysis</p>
        </div>
      )}
    </div>
  )
}
