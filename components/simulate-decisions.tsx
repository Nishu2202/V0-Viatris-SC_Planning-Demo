"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { LineChart as RechartsLineChart, Line, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ScenarioOption {
  id: string
  title: string
  description: string
  expectedImpact: string
  icon: React.ComponentType<any>
  color: string
  baselineMetrics: {
    revenue: number
    margin: number
    inventory: number
    cash: number
    serviceLevel: number
  }
  projectedMetrics: {
    revenue: number
    margin: number
    inventory: number
    cash: number
    serviceLevel: number
  }
}

interface SimulationOutput {
  revenueImpact: number
  marginImpact: number
  inventoryChange: number
  cashImpact: number
  serviceImpactLevel: number
}

interface CustomScenarioInputs {
  revenueGrowth: number
  demandUplift: number
  capacityChange: number
  inventoryWriteOff: number
  capexDeployment: number
  marginAdjustment: number
}

const preBuiltScenarios: ScenarioOption[] = [
  {
    id: "efficiency",
    title: "Improve Manufacturing Efficiency",
    description: "Lean transformation and cost reduction through process optimization",
    expectedImpact: "Margin +2.4%, Cost -$1.2M",
    icon: Factory,
    color: "#1677FF",
    baselineMetrics: {
      revenue: 2400,
      margin: 42.3,
      inventory: 45,
      cash: 850,
      serviceLevel: 96.2
    },
    projectedMetrics: {
      revenue: 2400,
      margin: 44.7,
      inventory: 44,
      cash: 920,
      serviceLevel: 96.1
    }
  },
  {
    id: "portfolio",
    title: "Rationalize Portfolio",
    description: "Reduce product families and manage inventory write-off",
    expectedImpact: "Cash +$2.1M, SKU Count -18%",
    icon: Package,
    color: "#13C2C2",
    baselineMetrics: {
      revenue: 2400,
      margin: 42.3,
      inventory: 45,
      cash: 850,
      serviceLevel: 96.2
    },
    projectedMetrics: {
      revenue: 2250,
      margin: 43.1,
      inventory: 31,
      cash: 1050,
      serviceLevel: 95.8
    }
  },
  {
    id: "rebalance",
    title: "Rebalance Inventory",
    description: "Reduce excess stock and improve cash flow",
    expectedImpact: "Cash +$1.8M, DOS -8 days",
    icon: TrendingDown,
    color: "#52C41A",
    baselineMetrics: {
      revenue: 2400,
      margin: 42.3,
      inventory: 45,
      cash: 850,
      serviceLevel: 96.2
    },
    projectedMetrics: {
      revenue: 2380,
      margin: 42.8,
      inventory: 37,
      cash: 1020,
      serviceLevel: 95.9
    }
  },
  {
    id: "capacity",
    title: "Expand Capacity (Capex)",
    description: "Meet demand gaps and improve service levels",
    expectedImpact: "Service +3.2%, Revenue +$450M",
    icon: Factory,
    color: "#FA8C16",
    baselineMetrics: {
      revenue: 2400,
      margin: 42.3,
      inventory: 45,
      cash: 850,
      serviceLevel: 96.2
    },
    projectedMetrics: {
      revenue: 2850,
      margin: 41.2,
      inventory: 48,
      cash: 450,
      serviceLevel: 99.4
    }
  },
  {
    id: "demand",
    title: "Demand Growth Scenario",
    description: "Increase demand and see impact on capacity and inventory",
    expectedImpact: "Revenue +$890M, Inventory +$3.2M",
    icon: TrendingUp,
    color: "#EB2F96",
    baselineMetrics: {
      revenue: 2400,
      margin: 42.3,
      inventory: 45,
      cash: 850,
      serviceLevel: 96.2
    },
    projectedMetrics: {
      revenue: 3290,
      margin: 40.8,
      inventory: 62,
      cash: 620,
      serviceLevel: 94.1
    }
  }
]

export default function SimulateDecisions() {
  const [activeScenario, setActiveScenario] = useState<ScenarioOption | null>(null)
  const [showCustomBuilder, setShowCustomBuilder] = useState(false)
  const [simulationOutput, setSimulationOutput] = useState<SimulationOutput | null>(null)
  const [selectedTradeoffScenarios, setSelectedTradeoffScenarios] = useState<string[]>([])

  const [customInputs, setCustomInputs] = useState<CustomScenarioInputs>({
    revenueGrowth: 0,
    demandUplift: 0,
    capacityChange: 0,
    inventoryWriteOff: 0,
    capexDeployment: 0,
    marginAdjustment: 0
  })

  const handleRunSimulation = (scenario: ScenarioOption) => {
    setActiveScenario(scenario)
    
    // Calculate impact based on baseline vs projected metrics
    const output: SimulationOutput = {
      revenueImpact: scenario.projectedMetrics.revenue - scenario.baselineMetrics.revenue,
      marginImpact: scenario.projectedMetrics.margin - scenario.baselineMetrics.margin,
      inventoryChange: scenario.projectedMetrics.inventory - scenario.baselineMetrics.inventory,
      cashImpact: scenario.projectedMetrics.cash - scenario.baselineMetrics.cash,
      serviceImpactLevel: scenario.projectedMetrics.serviceLevel - scenario.baselineMetrics.serviceLevel
    }
    
    setSimulationOutput(output)
    
    // Auto-select for trade-off view
    if (!selectedTradeoffScenarios.includes(scenario.id)) {
      setSelectedTradeoffScenarios([...selectedTradeoffScenarios, scenario.id])
    }
  }

  const handleCustomSimulation = () => {
    // Mock custom scenario calculation
    const output: SimulationOutput = {
      revenueImpact: (customInputs.revenueGrowth * 24) + (customInputs.demandUplift * 35),
      marginImpact: customInputs.marginAdjustment + (customInputs.capacityChange * 0.5),
      inventoryChange: (customInputs.inventoryWriteOff * -1) + (customInputs.demandUplift * 0.8),
      cashImpact: (customInputs.inventoryWriteOff * 10) - (customInputs.capexDeployment * 5),
      serviceImpactLevel: (customInputs.capacityChange * 0.1) - (customInputs.inventoryWriteOff * 0.05)
    }
    
    setSimulationOutput(output)
  }

  const getTradeoffScenarios = () => {
    return preBuiltScenarios.filter(s => selectedTradeoffScenarios.includes(s.id))
  }

  const formatMetric = (value: number, isPercentage: boolean = false, isNegative: boolean = false) => {
    if (isPercentage) {
      return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
    }
    if (isNegative && value > 0) {
      return `-$${value.toFixed(1)}M`
    }
    return `${value >= 0 ? '+' : ''}$${Math.abs(value).toFixed(1)}M`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Simulate Decisions</h2>
        <p className="text-sm text-gray-600 mt-2">Test improvement levers and see impact on P&L, cash, and service</p>
      </div>

      {/* Pre-Built Scenario Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pre-Built Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {preBuiltScenarios.map((scenario) => {
            const Icon = scenario.icon
            const isActive = activeScenario?.id === scenario.id
            
            return (
              <Card
                key={scenario.id}
                className={`p-4 border transition-all cursor-pointer hover:shadow-lg ${
                  isActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: scenario.color + "20" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: scenario.color }} />
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm text-gray-900 mb-1">
                  {scenario.title}
                </h4>
                
                <p className="text-xs text-gray-600 mb-3">{scenario.description}</p>
                
                <div className="mb-4 p-2 bg-gray-50 rounded text-xs font-medium text-gray-700">
                  {scenario.expectedImpact}
                </div>
                
                <Button
                  onClick={() => handleRunSimulation(scenario)}
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className="w-full text-xs"
                >
                  <Play className="h-3 w-3 mr-1" />
                  Run Simulation
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Custom Scenario Builder */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Custom Scenario Builder</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomBuilder(!showCustomBuilder)}
          >
            {showCustomBuilder ? "Hide" : "Show"} Builder
          </Button>
        </div>

        {showCustomBuilder && (
          <Card className="p-6 border border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              {/* Revenue Growth */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Revenue Growth Target (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={-10}
                    max={20}
                    step={1}
                    value={[customInputs.revenueGrowth]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, revenueGrowth: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {customInputs.revenueGrowth.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Demand Uplift */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Demand Uplift (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={-15}
                    max={25}
                    step={1}
                    value={[customInputs.demandUplift]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, demandUplift: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {customInputs.demandUplift.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Capacity Change */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Capacity Change ($M)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={-500}
                    max={500}
                    step={50}
                    value={[customInputs.capacityChange]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, capacityChange: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    ${customInputs.capacityChange.toFixed(0)}M
                  </span>
                </div>
              </div>

              {/* Inventory Write-off */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Inventory Write-off ($M)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={0}
                    max={200}
                    step={10}
                    value={[customInputs.inventoryWriteOff]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, inventoryWriteOff: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    ${customInputs.inventoryWriteOff.toFixed(0)}M
                  </span>
                </div>
              </div>

              {/* Capex Deployment */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Capex Deployment ($M)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={0}
                    max={500}
                    step={50}
                    value={[customInputs.capexDeployment]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, capexDeployment: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-16 text-right">
                    ${customInputs.capexDeployment.toFixed(0)}M
                  </span>
                </div>
              </div>

              {/* Margin Adjustment */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Margin Adjustment (%)</Label>
                <div className="flex items-center gap-3">
                  <Slider
                    min={-5}
                    max={5}
                    step={0.5}
                    value={[customInputs.marginAdjustment]}
                    onValueChange={(val) =>
                      setCustomInputs({ ...customInputs, marginAdjustment: val[0] })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {customInputs.marginAdjustment.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button onClick={handleCustomSimulation} className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Run Custom Simulation
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Output Panel */}
      {simulationOutput && activeScenario && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Simulation Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Revenue Impact */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Revenue Impact</span>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatMetric(simulationOutput.revenueImpact)}
              </div>
              <div
                className={`text-xs font-medium ${
                  simulationOutput.revenueImpact >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {simulationOutput.revenueImpact >= 0 ? (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                )}
                {Math.abs(
                  ((simulationOutput.revenueImpact / 2400) * 100).toFixed(1)
                )}
                % vs baseline
              </div>
            </Card>

            {/* Margin Impact */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Margin Impact</span>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatMetric(simulationOutput.marginImpact, true)}
              </div>
              <div
                className={`text-xs font-medium ${
                  simulationOutput.marginImpact >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {simulationOutput.marginImpact >= 0 ? (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                )}
                Target margin: 44.2%
              </div>
            </Card>

            {/* Inventory Change */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Inventory Change</span>
                <Package className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {simulationOutput.inventoryChange >= 0 ? "+" : ""}
                {simulationOutput.inventoryChange.toFixed(1)} days
              </div>
              <div
                className={`text-xs font-medium ${
                  simulationOutput.inventoryChange <= 0 ? "text-green-600" : "text-orange-600"
                }`}
              >
                {simulationOutput.inventoryChange <= 0 ? (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                )}
                Current: 45 DOS
              </div>
            </Card>

            {/* Cash Impact */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Cash Impact</span>
                <Zap className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatMetric(simulationOutput.cashImpact)}
              </div>
              <div
                className={`text-xs font-medium ${
                  simulationOutput.cashImpact >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {simulationOutput.cashImpact >= 0 ? (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                )}
                Working capital relief
              </div>
            </Card>

            {/* Service Level Impact */}
            <Card className="p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Service Impact</span>
                <Truck className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatMetric(simulationOutput.serviceImpactLevel, true)}
              </div>
              <div
                className={`text-xs font-medium ${
                  simulationOutput.serviceImpactLevel >= 0 ? "text-green-600" : "text-orange-600"
                }`}
              >
                {simulationOutput.serviceImpactLevel >= 0 ? (
                  <ArrowUp className="h-3 w-3 inline mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 inline mr-1" />
                )}
                Current: 96.2%
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Trade-off View */}
      {selectedTradeoffScenarios.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trade-off Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {getTradeoffScenarios().map((scenario) => {
              const tradeoffOutput: SimulationOutput = {
                revenueImpact: scenario.projectedMetrics.revenue - scenario.baselineMetrics.revenue,
                marginImpact: scenario.projectedMetrics.margin - scenario.baselineMetrics.margin,
                inventoryChange: scenario.projectedMetrics.inventory - scenario.baselineMetrics.inventory,
                cashImpact: scenario.projectedMetrics.cash - scenario.baselineMetrics.cash,
                serviceImpactLevel: scenario.projectedMetrics.serviceLevel - scenario.baselineMetrics.serviceLevel
              }

              return (
                <Card key={scenario.id} className="p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{scenario.description}</p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedTradeoffScenarios(
                          selectedTradeoffScenarios.filter((id) => id !== scenario.id)
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    {/* Revenue */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Revenue</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatMetric(tradeoffOutput.revenueImpact)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tradeoffOutput.revenueImpact >= 0 ? "↑" : "↓"}{" "}
                          {Math.abs(
                            ((tradeoffOutput.revenueImpact / 2400) * 100).toFixed(1)
                          )}
                          %
                        </div>
                      </div>
                    </div>

                    {/* Margin */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Margin</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatMetric(tradeoffOutput.marginImpact, true)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: 44.2%
                        </div>
                      </div>
                    </div>

                    {/* Service Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Service Level</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatMetric(tradeoffOutput.serviceImpactLevel, true)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Current: 96.2%
                        </div>
                      </div>
                    </div>

                    {/* Cash */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cash</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatMetric(tradeoffOutput.cashImpact)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Current: $850M
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {tradeoffOutput.revenueImpact >= 100 && (
                      <div className="flex items-start gap-2 p-2 bg-green-50 rounded border border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-green-700">Higher revenue potential</p>
                      </div>
                    )}
                    {tradeoffOutput.marginImpact >= 1.5 && (
                      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-blue-700">Margin improvement</p>
                      </div>
                    )}
                    {tradeoffOutput.cashImpact >= 150 && (
                      <div className="flex items-start gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-purple-700">Strong cash generation</p>
                      </div>
                    )}
                    {tradeoffOutput.serviceImpactLevel < -1 && (
                      <div className="flex items-start gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-amber-700">Service level trade-off</p>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    Approve & Proceed
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Insights Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-900 text-sm">Capex delays impacting demand fulfillment</p>
              <p className="text-xs text-blue-700 mt-1">Hull Plant expansion delay of 2 months reduces capacity to meet 15% demand uplift scenario</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-amber-900 text-sm">Inventory buildup affecting cash flow</p>
              <p className="text-xs text-amber-700 mt-1">Current inventory rebalancing initiative could free up $1.2M in working capital if executed within 4 weeks</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <Zap className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-purple-900 text-sm">Instrument set constraints limiting flexibility</p>
              <p className="text-xs text-purple-700 mt-1">Supply chain optimization tools currently constrained by 8 legacy SKU policies; consider policy refresh for better scenario analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
