"use client"


import { DollarSign, TrendingUp, Package, Activity, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react"

// ---------- TYPES ----------

export type Scope = "fert" | "hawa" | "equipment"

// ---------- SCOPE CONFIG (No Overall) ----------

const scopeConfig: { id: Scope; label: string; shortLabel: string }[] = [
  { id: "fert", label: "FERT (Finished Pharma Goods)", shortLabel: "FERT" },
  { id: "hawa", label: "HAWA (Consumables)", shortLabel: "HAWA" },
  { id: "equipment", label: "Equipment", shortLabel: "Equipment" },
]

// ---------- METRICS TABLE DATA ----------

interface MetricRow {
  id: string
  label: string
  icon: typeof DollarSign
  unit: string
  historical: string
  historicalTrend: "up" | "down" | "flat"
  ytd: string
  ytdVsTarget: string
  ytdStatus: "above" | "below" | "on"
  q1Outlook: string
  q1OutlookMessage?: string // Optional message for Current Qtr
  yearOutlook: string
  yearOutlookMessage?: string // Optional message for Year'26 outlook
  outlook18M: string
  outlook18MMessage?: string // Optional message for Next 18M outlook
  outlookRisk: "high" | "medium" | "low"
  linkedInsight?: number // Links to insight index (1, 2, 3, etc.)
  inventoryYear26Trend?: "up" | "down" | "flat" // Special trend for Year'26 Inventory DOS
}

const scopedMetricsData: Record<Scope, MetricRow[]> = {
  fert: [
    {
      id: "revenue",
      label: "Revenue",
      icon: DollarSign,
      unit: "$M",
      historical: "$2,455M",
      historicalTrend: "up",
      ytd: "$759M",
      ytdVsTarget: "-$65M vs Target",
      ytdStatus: "below",
      q1Outlook: "$781M",
      yearOutlook: "$2,343M",
      yearOutlookMessage: "-$260M vs target",
      outlook18M: "$3,905M",
      outlookRisk: "medium",
      linkedInsight: 2
    },
    {
      id: "margin",
      label: "Gross Margin",
      icon: TrendingUp,
      unit: "%",
      historical: "47.09%",
      historicalTrend: "down",
      ytd: "46.61%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "46.00%",
      q1OutlookMessage: "on-target",
      yearOutlook: "44.14%",
      yearOutlookMessage: "high-risk",
      outlook18M: "46.33%",
      outlookRisk: "medium",
      linkedInsight: 1
    },
    {
      id: "service",
      label: "Service Level",
      icon: Activity,
      unit: "%",
      historical: "94.90%",
      historicalTrend: "stable",
      ytd: "95.85%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "92.2%",
      q1OutlookMessage: "high-risk",
      yearOutlook: "94.10%",
      yearOutlookMessage: "low-risk-green",
      outlook18M: "96.90%",
      outlookRisk: "low"
    },
    {
      id: "inventory",
      label: "Inventory DOS",
      icon: Package,
      unit: " days",
      historical: "788",
      historicalTrend: "up",
      ytd: "796",
      ytdVsTarget: "+8d vs target",
      ytdStatus: "below",
      q1Outlook: "756",
      yearOutlook: "780",
      outlook18M: "749",
      outlookRisk: "medium",
      inventoryYear26Trend: "up"
    },
    {
      id: "eo",
      label: "E&O Inventory",
      icon: AlertTriangle,
      unit: "$M",
      historical: "$199.5M",
      historicalTrend: "up",
      ytd: "$200.5M",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "$201M",
      q1OutlookMessage: "high-risk",
      yearOutlook: "$200.3M",
      yearOutlookMessage: "high-risk",
      outlook18M: "$199.1M",
      outlook18MMessage: "medium-risk",
      outlookRisk: "high",
      linkedInsight: 3
    }
  ],
  "hawa": [
    {
      id: "revenue",
      label: "Revenue",
      icon: DollarSign,
      unit: "$M",
      historical: "$1,292M",
      historicalTrend: "up",
      ytd: "$412M",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "$423M",
      yearOutlook: "$1,268M",
      outlook18M: "$2,110M",
      outlookRisk: "medium"
    },
    {
      id: "margin",
      label: "Gross Margin",
      icon: TrendingUp,
      unit: "%",
      historical: "65.20%",
      historicalTrend: "down",
      ytd: "63.80%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "62.00%",
      yearOutlook: "59.15%",
      outlook18M: "63.59%",
      outlookRisk: "medium"
    },
    {
      id: "service",
      label: "Service Level",
      icon: Activity,
      unit: "%",
      historical: "96.10%",
      historicalTrend: "stable",
      ytd: "96.85%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "95.10%",
      yearOutlook: "96.05%",
      outlook18M: "97.50%",
      outlookRisk: "low"
    },
    {
      id: "inventory",
      label: "Inventory DOS",
      icon: Package,
      unit: " days",
      historical: "162",
      historicalTrend: "up",
      ytd: "165",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "155",
      yearOutlook: "161",
      outlook18M: "150",
      outlookRisk: "medium"
    },
    {
      id: "eo",
      label: "E&O Inventory",
      icon: AlertTriangle,
      unit: "$M",
      historical: "$18.2M",
      historicalTrend: "up",
      ytd: "$18.5M",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "$19.5M",
      yearOutlook: "$18.3M",
      outlook18M: "$18.1M",
      outlookRisk: "medium"
    }
  ],
  "equipment": [
    {
      id: "revenue",
      label: "Revenue",
      icon: DollarSign,
      unit: "$M",
      historical: "$1,815M",
      historicalTrend: "up",
      ytd: "$554M",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "$569M",
      yearOutlook: "$1,708M",
      outlook18M: "$2,847M",
      outlookRisk: "medium",
      linkedInsight: 2
    },
    {
      id: "margin",
      label: "Gross Margin",
      icon: TrendingUp,
      unit: "%",
      historical: "71.90%",
      historicalTrend: "down",
      ytd: "71.40%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "69.40%",
      yearOutlook: "66.80%",
      outlook18M: "71.59%",
      outlookRisk: "medium",
      linkedInsight: 1
    },
    {
      id: "service",
      label: "Service Level",
      icon: Activity,
      unit: "%",
      historical: "94.90%",
      historicalTrend: "stable",
      ytd: "95.85%",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "93.10%",
      yearOutlook: "94.05%",
      outlook18M: "96.90%",
      outlookRisk: "low"
    },
    {
      id: "inventory",
      label: "Inventory DOS",
      icon: Package,
      unit: " days",
      historical: "195",
      historicalTrend: "up",
      ytd: "197",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "185",
      yearOutlook: "193",
      outlook18M: "185",
      outlookRisk: "low"
    },
    {
      id: "eo",
      label: "E&O Inventory",
      icon: AlertTriangle,
      unit: "$M",
      historical: "$20.1M",
      historicalTrend: "up",
      ytd: "$20.5M",
      ytdVsTarget: "",
      ytdStatus: "on",
      q1Outlook: "$21.7M",
      yearOutlook: "$20.3M",
      outlook18M: "$20.2M",
      outlookRisk: "medium",
      linkedInsight: 3
    }
  ]
}

// ---------- KEY INSIGHTS DATA (linked to alerts) ----------

export interface KeyInsight {
  id: number
  title: string
  summary: string
  severity: "high" | "medium" | "low"
  linkedAlert: string // Alert ID in executive overview
  metrics: string[]
}

// All 6 alerts mapped as insights — same set across all scopes, with scope-specific summaries
export const scopedInsights: Record<Scope, KeyInsight[]> = {
  fert: [
    {
      id: 1,
      title: "E&O Risk – Dialysis Concentrate Buildup (Short-Term)",
      summary: "$3M E&O exposure from lower dialysis concentrate demand and competitive pressure; phosphate binder inventory writeoff at risk",
      severity: "high",
      linkedAlert: "eo-risk-dialysis-concentrate",
      metrics: ["E&O Inventory"]
    },
    {
      id: 2,
      title: "Revenue & Margin Risk – Hospital Network Plan (2027 Outlook)",
      summary: "-$115M revenue shortfall (combined); margin at 13.5% vs 16% target (-150 bps). Dialysis penetration and OUS markets underperforming",
      severity: "high",
      linkedAlert: "revenue-margin-hospital-networks",
      metrics: ["Revenue"]
    },
    {
      id: 3,
      title: "Margin Risk – FY2026 Dialysis Portfolio",
      summary: "-$140M revenue shortfall; margin at 19.0% vs 20.4% target (-140 bps). Dialysis reimbursement restructuring, APAC slowdown, inventory revaluation pressure",
      severity: "high",
      linkedAlert: "margin-risk-fy2026",
      metrics: ["Margin", "Revenue"]
    },
    {
      id: 4,
      title: "Capital Allocation Risk - Dialysis Equipment",
      summary: "$78M capex request with equipment utilization at 7.8x vs theoretical 12–14x capacity; 28k units could support +$110M revenue at 10x turns",
      severity: "high",
      linkedAlert: "capital-allocation-dialysis-equipment",
      metrics: ["Inventory DOS"]
    },
    {
      id: 5,
      title: "Supplier Delay Risk",
      summary: "-$3.2M at risk from SE Asia logistics disruption; 12 hospitals at 60-day inventory buffer; 6-week supplier delay vs 4-week target",
      severity: "medium",
      linkedAlert: "supplier-delay-risk",
      metrics: ["Service Level"]
    },
    {
      id: 6,
      title: "Growth Opportunity – APAC",
      summary: "+$18M upside from India dialysis market acceleration, SE Asia home dialysis adoption, and FERT premium concentrate mix shift in growth markets",
      severity: "low",
      linkedAlert: "growth-opportunity-apac",
      metrics: ["Revenue"]
    }
  ],
  "hawa": [
    {
      id: 1,
      title: "E&O Risk – Consumables Overstock (Short-Term)",
      summary: "$3M E&O exposure from competitive dialyzer pricing; HAWA consumable (bloodlines, gloves, gauze) inventory writeoff at risk",
      severity: "high",
      linkedAlert: "eo-risk-dialysis-concentrate",
      metrics: ["E&O Inventory"]
    },
    {
      id: 2,
      title: "Revenue & Margin Risk – Network Growth Plan (2027 Outlook)",
      summary: "-$115M combined revenue shortfall; margin at 13.5% vs 16% target. Consumables outperforming but broader network plan at risk",
      severity: "high",
      linkedAlert: "revenue-margin-hospital-networks",
      metrics: ["Revenue"]
    },
    {
      id: 3,
      title: "Margin Risk – FY2026 Consumables",
      summary: "Margin pressure from dialyzer pricing and mix; HAWA margin holding above target but linens reimbursement changes a watch item",
      severity: "medium",
      linkedAlert: "margin-risk-fy2026",
      metrics: ["Margin"]
    },
    {
      id: 4,
      title: "Supply Chain Efficiency",
      summary: "Consumables utilization at optimal rates; lower capex intensity vs Equipment segment but supply optimization opportunities remain",
      severity: "medium",
      linkedAlert: "capital-allocation-dialysis-equipment",
      metrics: ["Inventory DOS"]
    },
    {
      id: 5,
      title: "Supplier Delay Risk",
      summary: "Dialyzer and bloodline supply constraints impacting service level; 0.3% below target. SE Asia logistics disruption creates -$3.2M risk exposure",
      severity: "medium",
      linkedAlert: "supplier-delay-risk",
      metrics: ["Service Level"]
    },
    {
      id: 6,
      title: "Growth Opportunity – APAC",
      summary: "+$15M market upside; dialyzer and consumable adoption growing in Asia Pacific with +$8M incremental opportunity identified",
      severity: "medium",
      linkedAlert: "growth-opportunity-apac",
      metrics: ["Revenue"]
    }
  ],
  "equipment": [
    {
      id: 1,
      title: "E&O Risk – Dialysis Equipment Inventory (Short-Term)",
      summary: "$3M E&O exposure from competitive market pressure; dialysis machine (NxStage systems) inventory revaluation risk if demand slows",
      severity: "low",
      linkedAlert: "eo-risk-dialysis-concentrate",
      metrics: ["E&O Inventory"]
    },
    {
      id: 2,
      title: "Revenue & Margin Risk – Equipment Growth Plan (2027 Outlook)",
      summary: "-$115M combined revenue shortfall; hospital/home dialysis repositioning required to offset equipment channel shift impact",
      severity: "medium",
      linkedAlert: "revenue-margin-hospital-networks",
      metrics: ["Revenue"]
    },
    {
      id: 3,
      title: "Margin Risk – FY2026 Equipment Portfolio",
      summary: "Equipment financing restructuring driving -80 bps margin pressure vs AOP; -$140M shortfall and depreciation risk",
      severity: "high",
      linkedAlert: "margin-risk-fy2026",
      metrics: ["Margin"]
    },
    {
      id: 4,
      title: "Capital Allocation Risk - Equipment",
      summary: "Equipment has higher capex dependency; focus on NxStage system deployment and utilization optimization rather than new expansion",
      severity: "low",
      linkedAlert: "capital-allocation-dialysis-equipment",
      metrics: ["Inventory DOS"]
    },
    {
      id: 5,
      title: "Supplier Delay Risk",
      summary: "Equipment supply chain stable with no active disruptions; minimal risk exposure vs -$3.2M at risk in consumables segments",
      severity: "low",
      linkedAlert: "supplier-delay-risk",
      metrics: ["Service Level"]
    },
    {
      id: 6,
      title: "Growth Opportunity – APAC",
      summary: "+$18M market upside; home dialysis equipment adoption in emerging markets growing with +$5M potential in next 18 months",
      severity: "low",
      linkedAlert: "growth-opportunity-apac",
      metrics: ["Revenue"]
    }
  ]
}

// ---------- COMPONENT ----------

interface PerformanceIntelligenceProps {
  scope: Scope
  onScopeChange: (s: Scope) => void
}

export default function PerformanceIntelligence({ scope, onScopeChange }: PerformanceIntelligenceProps) {
  const metrics = scopedMetricsData[scope]

  const getStatusColor = (status: "above" | "below" | "on") => {
    if (status === "above") return "text-green-600"
    if (status === "below") return "text-red-600"
    return "text-gray-600"
  }

  const getRiskBadge = (risk: "high" | "medium" | "low") => {
    if (risk === "high") return "bg-red-100 text-red-700 border-red-200"
    if (risk === "medium") return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-green-100 text-green-700 border-green-200"
  }

  const getSeverityColor = (severity: "high" | "medium" | "low") => {
    if (severity === "high") return "border-red-300 bg-red-50"
    if (severity === "medium") return "border-amber-300 bg-amber-50"
    return "border-green-300 bg-green-50"
  }

  const getSeverityDot = (severity: "high" | "medium" | "low") => {
    if (severity === "high") return "bg-red-500"
    if (severity === "medium") return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-2.5 shadow-sm">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-gray-900">Performance Intelligence</h2>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] font-semibold text-blue-600">
              <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.5 4.5H14l-3.75 2.75L11.5 13 8 10.25 4.5 13l1.25-4.75L2 5.5h4.5L8 1z"/></svg>
              AI Powered
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">Functional agents across demand, supply, and finance, orchestrated into a unified view, highlight gaps to plan</p>
        </div>
        
        {/* Scope Toggle (No Overall) */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg flex-shrink-0 ml-3">
          {scopeConfig.map((s) => (
            <button
              key={s.id}
              onClick={() => onScopeChange(s.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                scope === s.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {s.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Table (full width — Key Insights moved to parent layout) */}
      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Column Group Row */}
            <div className="grid grid-cols-[120px_1fr_1fr_3fr] bg-gray-100 border-b border-gray-300">
              <div className="px-2 py-0.5" />
              <div className="px-2 py-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center border-r border-gray-300">
                Historical
              </div>
              <div className="px-2 py-0.5 text-[9px] font-bold text-gray-500 uppercase tracking-widest text-center border-r border-gray-300">
                Current
              </div>
              <div className="px-2 py-0.5 text-[9px] font-bold text-blue-600 uppercase tracking-widest text-center bg-blue-50">
                Projection
              </div>
            </div>
            {/* Table Header */}
            <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200">
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700">Metric</div>
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 text-center">Year&apos;25</div>
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 text-center">YTD&apos;26</div>
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 text-center border-l border-gray-200 bg-blue-50">Current Qtr</div>
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 text-center bg-blue-50">Year&apos;26</div>
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-700 text-center bg-blue-50">Next 18M</div>
            </div>
            
            {/* Table Body */}
            {metrics.map((metric, idx) => {
              const Icon = metric.icon
              const isEO = metric.id === "eo"
              
              return (
                <div 
                  key={metric.id}
                  className={`grid grid-cols-[120px_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100 last:border-b-0 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  {/* Metric Name */}
                  <div className="px-2 py-1.5 flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
                    <span className="text-xs font-semibold text-gray-900">
                      {metric.label}
                    </span>

                  </div>
                  
                  {/* Historical (Year'26) */}
                  <div className="px-2 py-1.5 text-center">
                    <div className="text-xs font-bold text-gray-900">{metric.historical}</div>
                    <div className={`text-[10px] ${
                      metric.id === "inventory" && metric.inventoryYear26Trend === "up"
                        ? "text-red-500"
                        : metric.historicalTrend === "up" 
                        ? (isEO ? "text-red-500" : "text-green-500")
                        : metric.historicalTrend === "down"
                        ? (isEO ? "text-green-500" : "text-red-500")
                        : "text-gray-400"
                    }`}>
                      {metric.id === "inventory" && metric.inventoryYear26Trend === "up" 
                        ? "↑ trending" 
                        : metric.historicalTrend === "up" 
                        ? "↑ trending" 
                        : metric.historicalTrend === "down" 
                        ? "↓ trending" 
                        : "→ flat"}
                    </div>
                  </div>
                  
                  {/* YTD'26 */}
                  <div className="px-2 py-1.5 text-center">
                    <div className="text-xs font-bold text-gray-900">{metric.ytd}</div>
                    {metric.ytdVsTarget && (
                      <div className={`text-[10px] font-medium ${
                        metric.ytdVsTarget.includes("-") ? "text-yellow-600" : getStatusColor(metric.ytdStatus)
                      }`}>
                        {metric.ytdVsTarget}
                      </div>
                    )}
                  </div>
                  
                  {/* Current Qtr Outlook */}
                  <div className="px-2 py-1.5 text-center border-l border-gray-200 bg-blue-50/30">
                    <div className="text-xs font-bold text-gray-900">{metric.q1Outlook}</div>
                    {metric.q1OutlookMessage && (
                      metric.q1OutlookMessage === "high-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("high")}`}>
                          high risk
                        </span>
                      ) : metric.q1OutlookMessage === "medium-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("medium")}`}>
                          medium risk
                        </span>
                      ) : metric.q1OutlookMessage === "low-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          low risk
                        </span>
                      ) : metric.q1OutlookMessage === "on-target" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          on target
                        </span>
                      ) : (
                        <div className="text-[10px] font-medium text-gray-600">
                          {metric.q1OutlookMessage}
                        </div>
                      )
                    )}
                    {metric.id === "revenue" && !metric.q1OutlookMessage && (
                      <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                        on target
                      </span>
                    )}
                    {(metric.id === "inventory" || (metric.id === "eo" && metric.id !== "revenue")) && !metric.q1OutlookMessage && (
                      <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge(metric.outlookRisk)}`}>
                        {metric.outlookRisk} risk
                      </span>
                    )}
                  </div>
                  
                  {/* Year'26 Outlook */}
                  <div className="px-2 py-1.5 text-center bg-blue-50/30">
                    <div className="text-xs font-bold text-gray-900">{metric.yearOutlook}</div>
                    {metric.yearOutlookMessage && (
                      metric.yearOutlookMessage === "high-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("high")}`}>
                          high risk
                        </span>
                      ) : metric.yearOutlookMessage === "medium-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("medium")}`}>
                          medium risk
                        </span>
                      ) : metric.yearOutlookMessage === "low-risk" || metric.yearOutlookMessage === "low-risk-green" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          low risk
                        </span>
                      ) : metric.yearOutlookMessage === "on-target" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          on target
                        </span>
                      ) : (
                        <div className="text-[10px] font-medium text-gray-600">
                          {metric.yearOutlookMessage}
                        </div>
                      )
                    )}
                  </div>
                  
                  {/* Next 18M Outlook */}
                  <div className="px-2 py-1.5 text-center bg-blue-50/30">
                    <div className="text-xs font-bold text-gray-900">{metric.outlook18M}</div>
                    {metric.outlook18MMessage && (
                      metric.outlook18MMessage === "high-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("high")}`}>
                          high risk
                        </span>
                      ) : metric.outlook18MMessage === "medium-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("medium")}`}>
                          medium risk
                        </span>
                      ) : metric.outlook18MMessage === "low-risk" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          low risk
                        </span>
                      ) : metric.outlook18MMessage === "on-target" ? (
                        <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("low")}`}>
                          on target
                        </span>
                      ) : (
                        <div className="text-[10px] font-medium text-gray-600">
                          {metric.outlook18MMessage}
                        </div>
                      )
                    )}
                    {!metric.outlook18MMessage && metric.id === "revenue" && (
                      <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge("medium")}`}>
                        medium risk
                      </span>
                    )}
                    {!metric.outlook18MMessage && !(metric.id === "inventory" || metric.id === "eo" || metric.id === "revenue" || metric.id === "service") && (
                      <span className={`text-[10px] font-medium px-1 py-0.5 rounded border ${getRiskBadge(metric.outlookRisk)}`}>
                        {metric.outlookRisk} risk
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
