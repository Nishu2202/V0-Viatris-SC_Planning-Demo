"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { useState } from "react"

type ActionStatus = "auto-executed" | "pending-review" | "escalation"

const actions = [
  {
    number: 1,
    title: "Shift dialysis concentrate production to regional distribution center",
    status: "auto-executed" as ActionStatus,
    statusLabel: "Auto-Executed",
    problemStatement:
      "Supply capacity constraint detected at primary dialysis concentrate production facility. Agent identified excess capacity at regional facility and auto-routed 200 units for Q2 production.",
    keyIssues: [
      { text: "Primary facility at 98% capacity utilization for dialysis concentrate production in Q2", isNested: false },
      { text: "Regional facility showing 15% available capacity for FERT products", isNested: false },
      { text: "Dialysis concentrate demand increase of 12% vs forecast:", isNested: false },
      { text: "Finished pharma goods segment growing faster than plan", isNested: true },
      { text: "New hospital dialysis programs signed in March", isNested: true },
    ],
    consequences: [
      "Avoided $2.4M in potential backorder costs",
      "Maintained 98.5% OTIF service level for dialysis drugs",
      "Zero impact to hospital customer delivery commitments",
    ],
    action: [
      "Production order PO-2024-3847 created at regional facility",
      "Material requirements synchronized with phosphate binder suppliers",
      "Logistics routes updated for regional dialysis network distribution",
    ],
    impact: "+$2.4M saved",
  },
  {
    number: 2,
    title: "Expedite dialyzer raw materials from secondary supplier",
    status: "pending-review" as ActionStatus,
    statusLabel: "Pending Review",
    problemStatement:
      "Primary dialyzer supplier flagged 2-week delay on high-flux dialyzer membranes. Agent recommends expedited order from qualified backup supplier at 8% premium.",
    keyIssues: [
      { text: "Primary supplier delayed due to membrane production maintenance", isNested: false },
      { text: "Affects dialyzer production line and consumables (bloodlines, gloves)", isNested: false },
      { text: "Safety stock covers 10 days; gap of 4 days identified", isNested: false },
    ],
    consequences: [
      "Risk of production stoppage if not addressed",
      "Potential impact to 340 hospital customer orders",
      "8% cost premium on expedited materials (~$180K)",
    ],
    action: [
      "Expedite order from qualified dialyzer membrane supplier",
      "Adjust production schedule to prioritize critical dialyzer SKUs",
      "Notify hospital networks of potential 2-day delay window",
    ],
    impact: "Risk: $1.2M revenue",
  },
  {
    number: 3,
    title: "Reallocate HAWA inventory for dialyzer demand surge",
    status: "escalation" as ActionStatus,
    statusLabel: "S&OP Escalation",
    problemStatement:
      "Unexpected 25% demand increase for dialyzer and bloodline consumables (HAWA). Requires cross-regional inventory reallocation that exceeds agent authority threshold.",
    keyIssues: [
      { text: "Hospital dialysis network contract acceleration faster than planned", isNested: false },
      { text: "UK dialyzer safety stock depleting 3 weeks ahead of replenishment", isNested: false },
      { text: "Germany showing 40% excess inventory on same HAWA SKUs", isNested: false },
    ],
    consequences: [
      "UK consumable stockout risk within 2 weeks without action",
      "Germany inventory carrying cost increasing",
      "Cross-border logistics and customs implications for medical supplies",
    ],
    action: [
      "Transfer 15,000 units of dialyzer consumables from Tuttlingen to UK DC",
      "Requires VP approval for cross-region P&L impact",
      "Update regional demand forecasts for HAWA S&OP review",
    ],
    impact: "Decision needed by Apr 15",
  },
]

const statusConfig = {
  "auto-executed": {
    icon: CheckCircle2,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  "pending-review": {
    icon: Clock,
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
  },
  "escalation": {
    icon: AlertTriangle,
    bgColor: "bg-red-50",
    textColor: "text-red-600",
    borderColor: "border-red-200",
  },
}

export default function NextBestActions() {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

  const toggleCard = (number: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [number]: !prev[number],
    }))
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Agent Actions & Exceptions</h3>

      <div className="grid grid-cols-3 gap-4 items-stretch">
        {actions.map((action) => {
          const isExpanded = expandedCards[action.number]
          const config = statusConfig[action.status]
          const StatusIcon = config.icon
          return (
            <Card key={action.number} className="p-0 flex flex-col h-full">
              <div className="px-6 py-4 pb-4" style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }}>
                <div className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center font-semibold text-2xl ${
                    isExpanded 
                      ? 'rounded-[6px]' 
                      : 'rounded-[6px]'
                  }`}
                  style={{
                    backgroundColor: isExpanded ? '#E6F4FF' : '#F5F5F5',
                    color: isExpanded ? '#1677FF' : '#000000'
                  }}>
                    {action.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-left">{action.title}</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md font-medium ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {action.statusLabel}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">{action.impact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pt-4 pb-4 flex-1 flex flex-col">
                <div className="mt-0.5 space-y-4 flex-1 flex flex-col">
                  <div>
                    <h5 className="font-semibold text-sm mb-1.5">Situation</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">{action.problemStatement}</p>
                  </div>

                  {isExpanded && (
                    <>
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Root Cause Analysis</h5>
                        <ul className="space-y-3 pl-0">
                          {Array.isArray(action.keyIssues) && typeof action.keyIssues[0] === 'object' ? (
                            action.keyIssues.map((issue: { text: string; isNested: boolean }, idx: number) => (
                              <li key={idx} className={`text-sm text-muted-foreground leading-relaxed flex gap-3 ${issue.isNested ? 'ml-6' : ''}`}>
                                {issue.isNested ? (
                                  <span className="flex-shrink-0 text-primary -mt-0.5">-</span>
                                ) : (
                                  <span className="flex-shrink-0 text-primary font-bold -mt-0.5">*</span>
                                )}
                                <span className="flex-1">{issue.text}</span>
                              </li>
                            ))
                          ) : (
                            (action.keyIssues as unknown as string[]).map((issue: string, idx: number) => (
                              <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                                <span className="flex-shrink-0 text-primary font-bold -mt-0.5">*</span>
                                <span className="flex-1">{issue}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">Impact Assessment</h5>
                        <ul className="space-y-3 pl-0">
                          {action.consequences.map((consequence, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                              <span className="flex-shrink-0 text-primary font-bold -mt-0.5">*</span>
                              <span className="flex-1">{consequence}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-sm mb-2">
                          {action.status === "auto-executed" ? "Actions Taken" : "Recommended Actions"}
                        </h5>
                        <ul className="space-y-3 pl-0">
                          {action.action.map((act, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                              <span className="flex-shrink-0 text-primary font-bold -mt-0.5">*</span>
                              <span className="flex-1">{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {action.status !== "auto-executed" && (
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded-md text-sm font-medium transition-all"
                            style={{
                              backgroundColor: '#1677FF',
                              color: 'white',
                            }}
                          >
                            {action.status === "pending-review" ? "Approve" : "Review in S&OP"}
                          </button>
                          <button
                            className="px-4 py-2 rounded-md text-sm font-medium transition-all border"
                            style={{
                              backgroundColor: 'white',
                              borderColor: '#D9D9D9',
                              color: '#000000',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#1677FF'
                              e.currentTarget.style.color = '#1677FF'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#D9D9D9'
                              e.currentTarget.style.color = '#000000'
                              e.currentTarget.style.backgroundColor = 'white'
                            }}
                          >
                            {action.status === "pending-review" ? "Modify" : "Escalate"}
                          </button>
                        </div>
                      )}

                      {action.status === "auto-executed" && (
                        <button
                          className="px-4 py-2 rounded-md text-sm font-medium transition-all border"
                          style={{
                            backgroundColor: 'white',
                            borderColor: '#D9D9D9',
                            color: '#000000',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#1677FF'
                            e.currentTarget.style.color = '#1677FF'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#D9D9D9'
                            e.currentTarget.style.color = '#000000'
                            e.currentTarget.style.backgroundColor = 'white'
                          }}
                        >
                          View details
                        </button>
                      )}
                    </>
                  )}

                  <div className="pt-4" style={{ borderTop: "0.5px solid rgba(0, 0, 0, 0.06)" }}>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-primary text-sm flex items-center gap-1 mt-4"
                      onClick={() => toggleCard(action.number)}
                    >
                      {isExpanded ? (
                        <>
                          See less
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          See more
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
