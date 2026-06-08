"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

const baselineData = [
  { week: "W1", baseline: 42, scenario1: 42, scenario2: 42 },
  { week: "W2", baseline: 44, scenario1: 46, scenario2: 43 },
  { week: "W3", baseline: 43, scenario1: 48, scenario2: 41 },
  { week: "W4", baseline: 45, scenario1: 52, scenario2: 40 },
  { week: "W5", baseline: 44, scenario1: 54, scenario2: 39 },
  { week: "W6", baseline: 46, scenario1: 56, scenario2: 38 },
  { week: "W7", baseline: 45, scenario1: 55, scenario2: 38 },
  { week: "W8", baseline: 47, scenario1: 54, scenario2: 39 },
]

const scenarioComparison = [
  { metric: "Revenue Impact", baseline: "$2.14B", upside: "$2.28B", downside: "$1.98B" },
  { metric: "Service Level", baseline: "96.2%", upside: "97.8%", downside: "92.4%" },
  { metric: "Inventory Days", baseline: "45", upside: "42", downside: "52" },
  { metric: "Margin Impact", baseline: "42.3%", upside: "44.1%", downside: "39.8%" },
]

const capacityScenarios = [
  { facility: "Hull, UK", baseline: 87, scenario1: 92, scenario2: 78 },
  { facility: "Memphis, TN", baseline: 82, scenario1: 88, scenario2: 75 },
  { facility: "Tuttlingen, DE", baseline: 79, scenario1: 85, scenario2: 72 },
  { facility: "Suzhou, CN", baseline: 84, scenario1: 90, scenario2: 76 },
]

const demandScenarios = [
  { product: "CORI Systems", current: 1200, upside: 1380, downside: 1020 },
  { product: "JOURNEY II", current: 3400, upside: 3740, downside: 2890 },
  { product: "PICO Wound", current: 8500, upside: 9350, downside: 7225 },
  { product: "RENASYS", current: 4200, upside: 4620, downside: 3570 },
]

export default function DeepDives() {
  const [activeTab, setActiveTab] = useState("scenarios")
  const [selectedScenario, setSelectedScenario] = useState<"baseline" | "upside" | "downside">("baseline")

  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 pt-6 pb-1.5">
        <h3 className="text-lg font-semibold">Scenario Simulation & What-If Analysis</h3>
      </div>
      <div style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }} />
      <div className="px-6 pb-6 pt-1.5">
        <div className="flex items-center gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("scenarios")}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "scenarios"
                ? "text-[#1677FF] border-b-2 border-[#1677FF]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Demand Scenarios
          </button>
          <button
            onClick={() => setActiveTab("capacity")}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "capacity" 
                ? "text-[#1677FF] border-b-2 border-[#1677FF]" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Capacity Impact
          </button>
          <button
            onClick={() => setActiveTab("comparison")}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === "comparison"
                ? "text-[#1677FF] border-b-2 border-[#1677FF]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Scenario Comparison
          </button>
        </div>

        {activeTab === "scenarios" && (
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold">Inventory Days Projection</h4>
                  <div className="inline-flex rounded-md border border-border bg-background">
                    <button
                      onClick={() => setSelectedScenario("baseline")}
                      className={`px-4 py-1.5 text-xs font-medium rounded-l-md transition-colors ${
                        selectedScenario === "baseline" ? "bg-[#1677FF] text-white" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Baseline
                    </button>
                    <button
                      onClick={() => setSelectedScenario("upside")}
                      className={`px-4 py-1.5 text-xs font-medium border-l border-border transition-colors ${
                        selectedScenario === "upside" ? "bg-[#1677FF] text-white" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Upside
                    </button>
                    <button
                      onClick={() => setSelectedScenario("downside")}
                      className={`px-4 py-1.5 text-xs font-medium border-l border-border rounded-r-md transition-colors ${
                        selectedScenario === "downside" ? "bg-[#1677FF] text-white" : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Downside
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1677FF]"></div>
                    <span className="text-muted-foreground">Baseline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-muted-foreground">Upside (+15%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-muted-foreground">Downside (-15%)</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={baselineData}>
                    <defs>
                      <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1677FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#1677FF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorUpside" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDownside" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="week" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} domain={[35, 60]} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="baseline"
                      stroke="#1677FF"
                      fillOpacity={1}
                      fill="url(#colorBaseline)"
                    />
                    <Area
                      type="monotone"
                      dataKey="scenario1"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#colorUpside)"
                    />
                    <Area
                      type="monotone"
                      dataKey="scenario2"
                      stroke="#f87171"
                      fillOpacity={1}
                      fill="url(#colorDownside)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="border rounded-lg p-6 bg-muted/30">
                <div className="mb-3">
                  <h4 className="text-lg font-semibold">Demand Scenario by Product</h4>
                  <p className="text-xs text-muted-foreground mt-1">Units per week projection</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={demandScenarios} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                    <XAxis type="number" stroke="#9ca3af" style={{ fontSize: "10px" }} />
                    <YAxis dataKey="product" type="category" stroke="#9ca3af" style={{ fontSize: "10px" }} width={90} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar dataKey="downside" fill="#f87171" name="Downside" />
                    <Bar dataKey="current" fill="#1677FF" name="Baseline" />
                    <Bar dataKey="upside" fill="#22c55e" name="Upside" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === "capacity" && (
          <div className="mt-6">
            <div className="border rounded-lg p-6 bg-muted/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">Capacity Utilization by Facility</h4>
                  <p className="text-xs text-muted-foreground mt-1">Impact of demand scenarios on manufacturing capacity</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={capacityScenarios}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="facility" stroke="#9ca3af" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "10px" }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="baseline" fill="#1677FF" name="Baseline" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="scenario1" fill="#22c55e" name="Upside Demand" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="scenario2" fill="#f87171" name="Downside Demand" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <p className="text-sm text-amber-800">
                  <strong>Alert:</strong> Upside scenario shows Hull facility at 92% utilization - approaching constraint threshold. Consider capacity expansion or production shift to Memphis.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "comparison" && (
          <div className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left text-sm font-semibold px-6 py-4 border-b">Key Metric</th>
                    <th className="text-center text-sm font-semibold px-6 py-4 border-b">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#1677FF]"></div>
                        Baseline
                      </div>
                    </th>
                    <th className="text-center text-sm font-semibold px-6 py-4 border-b">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        Upside (+15%)
                      </div>
                    </th>
                    <th className="text-center text-sm font-semibold px-6 py-4 border-b">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        Downside (-15%)
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scenarioComparison.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm font-medium">{row.metric}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-[#1677FF]">{row.baseline}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-green-600">{row.upside}</td>
                      <td className="px-6 py-4 text-sm text-center font-semibold text-red-500">{row.downside}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="px-4 py-2 bg-[#1677FF] text-white text-sm font-medium rounded-md hover:bg-[#1677FF]/90 transition-colors">
                Run New Simulation
              </button>
              <button className="px-4 py-2 border border-border text-sm font-medium rounded-md hover:bg-muted transition-colors">
                Export Scenarios
              </button>
              <button className="px-4 py-2 border border-border text-sm font-medium rounded-md hover:bg-muted transition-colors">
                Share with S&OP Team
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
