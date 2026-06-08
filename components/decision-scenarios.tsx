"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, Clock, ChevronRight, TrendingDown, Users, MessageSquare, AlertCircle, Settings2, Play, Factory, Package, TrendingUp, Wrench, Layers } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Mock data
const simulateScenarios = [
  { id: "efficiency", title: "Improve Manufacturing", desc: "Optimize OEE across plants", icon: Factory, revenue: 50, margin: 180, inventory: -8, service: 1.2, cash: 32, complexity: "Medium" },
  { id: "rationalize", title: "Rationalize Portfolio", desc: "Reduce SKU complexity", icon: Package, revenue: -120, margin: 240, inventory: -12, service: -0.5, cash: 48, complexity: "High" },
  { id: "demand", title: "Demand Growth", desc: "Capture market upside", icon: TrendingUp, revenue: 180, margin: 100, inventory: 8, service: 2.1, cash: -15, complexity: "Low" },
  { id: "capacity", title: "Expand Capacity", desc: "Capex deployment", icon: Factory, revenue: 95, margin: -40, inventory: 5, service: 3.2, cash: -85, complexity: "High" },
  { id: "inventory", title: "Rebalance Inventory", desc: "DOS optimization", icon: Layers, revenue: 0, margin: 60, inventory: -15, service: -1.0, cash: 72, complexity: "Medium" },
  { id: "supplier", title: "Supplier Optimization", desc: "Consolidate & negotiate", icon: Wrench, revenue: 0, margin: 150, inventory: 2, service: 0.5, cash: 28, complexity: "Medium" },
]

const scenarios = [
  {
    id: 1,
    title: "Supplier Delay Risk",
    severity: "critical",
    subtitle: "Titanium supplier delay (6 weeks)",
    revenueAtRisk: "$4.1M",
    impact: "11 hospitals impacted",
    status: "active",
  },
  {
    id: 2,
    title: "Hospital Onboarding Risk",
    severity: "high",
    subtitle: "Meridian activation risk",
    revenueAtRisk: "$380K",
    impact: "16 configurations short",
    status: "active",
  },
  {
    id: 3,
    title: "Inventory Buildup",
    severity: "medium",
    subtitle: "APAC warehouse capacity",
    revenueAtRisk: "$1.2M",
    impact: "Cash impact projected",
    status: "monitoring",
  },
]

const agentSuggestions = [
  { id: 1, title: "Expedite titanium orders to 4 weeks", impact: "Recovers $2.8M revenue", priority: "high" },
  { id: 2, title: "Pre-activate Meridian configs", impact: "Enables on-time go-live", priority: "high" },
  { id: 3, title: "Redistribute APAC inventory", impact: "Frees 3,000 sqft capacity", priority: "medium" },
]

const mitigation = {
  id: 1,
  title: "Supplier Delay Risk - Titanium Supply",
  constraints: [
    "Supplier can expedite to 4 weeks (+$150K)",
    "Alternative supplier available (+$320K COGS)",
    "Demand push to Q4 (loses $2.1M margin)",
  ],
  options: [
    {
      name: "Expedite Order",
      revenueProtected: "$4.1M",
      casesAtRisk: "120 → 40",
      marginImpact: "-$150K",
      timeline: "4 weeks",
      recommended: true,
    },
    {
      name: "Alternative Supplier",
      revenueProtected: "$3.8M",
      casesAtRisk: "120 → 80",
      marginImpact: "-$320K",
      timeline: "2 weeks",
      recommended: false,
    },
    {
      name: "Demand Adjustment",
      revenueProtected: "$2.0M",
      casesAtRisk: "120 → 0",
      marginImpact: "-$2.1M",
      timeline: "Immediate",
      recommended: false,
    },
  ],
}

const activityLog = [
  { id: 1, action: "Agent flagged supply risk", type: "system", status: "done", time: "2 min ago" },
  { id: 2, action: "Demand planner reviewed options", type: "planner", status: "done", time: "1 min ago" },
  { id: 3, action: "Escalation pending approval", type: "system", status: "pending", time: "Now" },
  { id: 4, action: "Awaiting supply chain director decision", type: "pending", status: "review", time: "-" },
]

export default function DecisionScenarios() {
  const router = useRouter()
  const [selectedScenario, setSelectedScenario] = useState(1)
  const [selectedSimulateScenario, setSelectedSimulateScenario] = useState<string>("efficiency")

  const getScenarioImpact = (id: string) => {
    return simulateScenarios.find(x => x.id === id) || null
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Section: Agent Suggested Scenarios */}
      <div className="px-4 py-3 flex-shrink-0 bg-white border-b border-gray-200">
        <div className="max-w-full">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Agent Suggested Scenarios</h3>
          <div className="grid grid-cols-3 gap-3">
            {agentSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-3 rounded-lg border ${
                  suggestion.priority === "high"
                    ? "bg-red-50 border-red-200"
                    : "bg-amber-50 border-amber-200"
                } cursor-pointer hover:shadow-md transition-all`}
              >
                <div className="text-xs font-semibold text-gray-900">{suggestion.title}</div>
                <div className={`text-xs mt-1 ${suggestion.priority === "high" ? "text-red-600" : "text-amber-600"}`}>
                  {suggestion.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden px-4 pb-3 gap-3">
        {/* LEFT: Scenario Feed (40%) */}
        <div className="w-[40%] flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 flex-shrink-0 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900">Active Scenarios</h2>
            <p className="text-xs text-gray-500 mt-0.5">{scenarios.length} scenarios requiring action</p>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 p-3">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedScenario === scenario.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                      scenario.severity === "critical"
                        ? "text-red-600"
                        : scenario.severity === "high"
                        ? "text-amber-600"
                        : "text-yellow-600"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900">{scenario.title}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{scenario.subtitle}</div>
                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <span className="font-semibold text-red-600">{scenario.revenueAtRisk}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{scenario.impact}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: Scenario Analysis (35%) */}
        <div className="w-[35%] flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 flex-shrink-0 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900">Scenario Analysis</h2>
            <p className="text-xs text-gray-500 mt-0.5">{mitigation.title}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {/* Constraints */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Constraints</h3>
              <div className="space-y-1">
                {mitigation.constraints.map((constraint, idx) => (
                  <div key={idx} className="text-xs text-gray-600 p-2 bg-gray-50 rounded border border-gray-200">
                    {constraint}
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Options Table */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1.5">Mitigation Options</h3>
              <div className="space-y-1.5">
                {mitigation.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border-2 ${
                      option.recommended
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-900">{option.name}</span>
                      {option.recommended && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-600 text-white rounded">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <span className="text-gray-500">Revenue Protected:</span>
                        <span className="ml-1 font-semibold text-green-600">{option.revenueProtected}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cases at Risk:</span>
                        <span className="ml-1 font-semibold text-gray-900">{option.casesAtRisk}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Margin Impact:</span>
                        <span className="ml-1 font-semibold text-red-600">{option.marginImpact}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Timeline:</span>
                        <span className="ml-1 font-semibold text-gray-900">{option.timeline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg">
                Approve
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-8 text-xs rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Modify
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-8 text-xs rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Escalate
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Activity Log (25%) */}
        <div className="w-[25%] flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-4 py-3 flex-shrink-0 border-b border-gray-200">
            <h2 className="text-sm font-bold text-gray-900">Activity & Ownership</h2>
            <p className="text-xs text-gray-500 mt-0.5">Live updates</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {activityLog.map((item) => (
              <div key={item.id} className="flex items-start gap-2 pb-2 border-b border-gray-100 last:border-0">
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 mt-1.5 ${
                    item.status === "done"
                      ? "bg-green-500"
                      : item.status === "pending"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-900">{item.action}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        item.type === "system"
                          ? "bg-blue-50 text-blue-700"
                          : item.type === "planner"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.type === "system"
                        ? "System"
                        : item.type === "planner"
                        ? "Planner"
                        : "Pending"}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIMULATE DECISIONS SECTION */}
      <div className="px-4 py-3 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
          <div className="flex items-center justify-between flex-shrink-0 mb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Simulate Decisions</h2>
              <p className="text-xs text-gray-500 mt-0.5">Test scenarios and view P&amp;L, cash, service impact</p>
            </div>
            <button
              onClick={() => router.push("/financial-planning")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Settings2 className="h-3.5 w-3.5" />
              Advanced Simulation
            </button>
          </div>

          {/* Scenario Cards - 6 in one row */}
          <div className="grid grid-cols-6 gap-2 flex-shrink-0">
            {simulateScenarios.map(scenario => {
              const Icon = scenario.icon
              const isSelected = selectedSimulateScenario === scenario.id
              return (
                <Card
                  key={scenario.id}
                  onClick={() => setSelectedSimulateScenario(scenario.id)}
                  className={`p-2 border-2 cursor-pointer transition-all rounded-lg ${
                    isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 mb-1 ${isSelected ? "text-blue-600" : "text-gray-400"}`} />
                  <h3 className="text-xs font-semibold text-gray-900 leading-tight">{scenario.title}</h3>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">{scenario.desc}</p>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className={`text-xs font-semibold ${scenario.revenue >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {scenario.revenue >= 0 ? "+" : ""}{scenario.revenue}M
                    </span>
                    <span className={`text-xs font-medium ${scenario.complexity === "High" ? "text-red-500" : scenario.complexity === "Medium" ? "text-amber-500" : "text-green-500"}`}>
                      {scenario.complexity}
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Impact Display */}
          <div className="flex-1 flex flex-col min-h-0 mt-2 border-t border-gray-200 pt-2">
            <h3 className="text-sm font-bold text-gray-900 mb-1.5 flex-shrink-0">
              Impact: {simulateScenarios.find(s => s.id === selectedSimulateScenario)?.title}
            </h3>
            <div className="grid grid-cols-5 gap-2 mb-2 flex-shrink-0">
              {[
                { label: "Revenue", value: getScenarioImpact(selectedSimulateScenario)?.revenue || 0, unit: "M" },
                { label: "Margin", value: getScenarioImpact(selectedSimulateScenario)?.margin || 0, unit: "bps" },
                { label: "Inventory", value: getScenarioImpact(selectedSimulateScenario)?.inventory || 0, unit: "d" },
                { label: "Service", value: getScenarioImpact(selectedSimulateScenario)?.service || 0, unit: "%" },
                { label: "Cash", value: getScenarioImpact(selectedSimulateScenario)?.cash || 0, unit: "M" }
              ].map((metric, idx) => (
                <div key={idx} className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-center">
                  <div className="text-xs text-gray-600 mb-0.5">{metric.label}</div>
                  <div className={`text-sm font-bold ${metric.value > 0 ? "text-green-600" : metric.value < 0 ? "text-red-600" : "text-gray-600"}`}>
                    {metric.value > 0 ? "+" : ""}{metric.value}{metric.unit}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-1 p-2 bg-amber-50 border border-amber-200 rounded-lg flex gap-2 items-start">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Trade-off:</strong> {simulateScenarios.find(s => s.id === selectedSimulateScenario)?.complexity === "High"
                    ? "High complexity — requires cross-functional alignment"
                    : "Moderate execution risk — monitor weekly"}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <Button className="text-xs py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white h-8 w-full rounded-lg">
                  <Play className="h-3.5 w-3.5 mr-1" /> Approve
                </Button>
                <button
                  onClick={() => router.push("/financial-planning")}
                  className="text-xs py-1.5 px-4 h-8 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium transition-all flex items-center justify-center gap-1 whitespace-nowrap"
                >
                  <Settings2 className="h-3.5 w-3.5" /> Simulate More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
