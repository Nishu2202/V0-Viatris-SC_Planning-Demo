"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Bot, CheckCircle2, Clock, AlertTriangle, Settings, Zap, BarChart3, TrendingUp } from 'lucide-react'

const agentStatus = [
  {
    name: "Demand Sensing Agent",
    status: "active",
    lastRun: "2 min ago",
    actionsToday: 124,
    accuracy: "96.2%",
    description: "Real-time demand signal processing and forecast adjustment",
  },
  {
    name: "Inventory Optimizer",
    status: "active",
    lastRun: "5 min ago",
    actionsToday: 89,
    accuracy: "94.8%",
    description: "Multi-echelon inventory positioning and reorder optimization",
  },
  {
    name: "Supply Risk Monitor",
    status: "alert",
    lastRun: "1 min ago",
    actionsToday: 12,
    accuracy: "98.1%",
    description: "Supplier monitoring and risk-based expediting recommendations",
  },
  {
    name: "Capacity Balancer",
    status: "active",
    lastRun: "8 min ago",
    actionsToday: 34,
    accuracy: "95.5%",
    description: "Cross-facility capacity optimization and production routing",
  },
  {
    name: "Logistics Coordinator",
    status: "active",
    lastRun: "3 min ago",
    actionsToday: 67,
    accuracy: "97.3%",
    description: "Transportation optimization and delivery scheduling",
  },
]

const policyControls = [
  {
    name: "Auto-Execute Threshold",
    value: "$500K",
    description: "Maximum value for autonomous agent decisions",
    type: "currency",
  },
  {
    name: "Human Review Required",
    value: "Cross-Region",
    description: "Actions requiring manual approval",
    type: "text",
  },
  {
    name: "Safety Stock Override",
    value: "Enabled",
    description: "Allow agent to adjust safety stock levels",
    type: "toggle",
    enabled: true,
  },
  {
    name: "Expedite Authority",
    value: "5% Premium",
    description: "Maximum cost premium for expediting",
    type: "percentage",
  },
]

const recentAgentActions = [
  {
    agent: "Demand Sensing",
    action: "Adjusted CORI forecast +8% for Q2 based on hospital contract signals",
    time: "2 min ago",
    impact: "+$12M revenue",
    status: "executed",
  },
  {
    agent: "Inventory Optimizer",
    action: "Rebalanced JOURNEY II stock from Germany to UK distribution center",
    time: "15 min ago",
    impact: "3 days DOS reduction",
    status: "executed",
  },
  {
    agent: "Supply Risk Monitor",
    action: "Flagged titanium supplier delay - recommended backup sourcing",
    time: "1 hr ago",
    impact: "Risk mitigation",
    status: "pending",
  },
  {
    agent: "Capacity Balancer",
    action: "Shifted 200 CORI units to Memphis facility for Q2 production",
    time: "2 hr ago",
    impact: "$2.4M cost avoided",
    status: "executed",
  },
]

export default function AdvancedAnalytics() {
  const [activeTab, setActiveTab] = useState("orchestrator")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200"
      case "alert":
        return "bg-amber-50 text-amber-700 border-amber-200"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-6 pb-1.5">
          <h3 className="text-lg font-bold">Agent Orchestration Center</h3>
        </div>
        <div style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }} />
        <div className="px-6 pt-1.5 pb-6">
          <div className="flex items-center gap-6 border-b mb-6">
            <button
              onClick={() => setActiveTab("orchestrator")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "orchestrator"
                  ? "text-[#1677FF] border-b-2 border-[#1677FF]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agent Status
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "activity"
                  ? "text-[#1677FF] border-b-2 border-[#1677FF]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab("policies")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "policies"
                  ? "text-[#1677FF] border-b-2 border-[#1677FF]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Policy Controls
            </button>
          </div>

          {activeTab === "orchestrator" && (
            <div className="grid grid-cols-1 gap-4">
              {agentStatus.map((agent, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E6F4FF] flex items-center justify-center">
                      <Bot className="h-5 w-5 text-[#1677FF]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{agent.name}</h4>
                        {getStatusIcon(agent.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold">{agent.actionsToday}</div>
                      <div className="text-xs text-muted-foreground">Actions Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{agent.accuracy}</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center min-w-[80px]">
                      <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium border ${getStatusBadge(agent.status)}`}>
                        {agent.status === "active" ? "Running" : agent.status === "alert" ? "Alert" : "Idle"}
                      </span>
                      <div className="text-xs text-muted-foreground mt-1">{agent.lastRun}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-3">
              {recentAgentActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors"
                >
                  <div className="flex gap-3">
                    <div className={`mt-0.5 ${action.status === "executed" ? "text-green-500" : "text-amber-500"}`}>
                      {action.status === "executed" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 bg-[#E6F4FF] text-[#1677FF] rounded">
                          {action.agent}
                        </span>
                        <span className="text-xs text-muted-foreground">{action.time}</span>
                      </div>
                      <p className="text-sm">{action.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-green-600">{action.impact}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${
                        action.status === "executed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {action.status === "executed" ? "Executed" : "Pending Review"}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-4 flex justify-center">
                <Button variant="link" className="text-[#1677FF]">
                  View All Agent Activity
                </Button>
              </div>
            </div>
          )}

          {activeTab === "policies" && (
            <div className="grid grid-cols-2 gap-4">
              {policyControls.map((policy, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{policy.name}</h4>
                    {policy.type === "toggle" ? (
                      <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${policy.enabled ? 'bg-[#1677FF]' : 'bg-muted'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${policy.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-[#1677FF]">{policy.value}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{policy.description}</p>
                </div>
              ))}
              <div className="col-span-2 mt-2">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Agent Policies
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#E6F4FF] flex items-center justify-center">
              <Zap className="h-5 w-5 text-[#1677FF]" />
            </div>
            <div>
              <h4 className="font-semibold">Agent Efficiency</h4>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
          </div>
          <div className="text-3xl font-bold">847</div>
          <p className="text-sm text-muted-foreground">Autonomous actions executed</p>
          <div className="mt-3 text-xs text-green-600 font-medium">+23% vs previous period</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold">Value Generated</h4>
              <p className="text-xs text-muted-foreground">Cost savings & revenue</p>
            </div>
          </div>
          <div className="text-3xl font-bold">$14.2M</div>
          <p className="text-sm text-muted-foreground">This quarter</p>
          <div className="mt-3 text-xs text-green-600 font-medium">On track for $48M annual</div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold">Pending Reviews</h4>
              <p className="text-xs text-muted-foreground">Requiring human input</p>
            </div>
          </div>
          <div className="text-3xl font-bold">12</div>
          <p className="text-sm text-muted-foreground">Decisions awaiting approval</p>
          <div className="mt-3">
            <Button size="sm" className="bg-[#1677FF] hover:bg-[#1677FF]/90 text-white">
              Review Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
