"use client"

import { ScenarioModal } from "@/components/opportunity-orchestration-view"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  AlertTriangle,
  DollarSign,
  ChevronRight,
  Zap,
  Clock,
  AlertCircle,
  Truck,
  Factory,
  CheckCircle2,
  Wrench,
  ShieldCheck,
  Target,
  Package,
  Globe,
  Users,
  Lightbulb,
  X,
  Play,
  Edit3,
  Save,
  Bot,
  ExternalLink,
  UserCheck,
  Calculator,
  Briefcase,
  Archive,
  ShoppingCart,
  Settings,
  Tag,
  Shield,
  BarChart2,
  Circle,
  MapPin
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts"
import PerformanceIntelligence, { scopedInsights, type Scope, type KeyInsight } from "@/components/performance-intelligence"
import { ArrowRight } from "lucide-react"
import EOScenarioEditor, { type EOScenarioParams, type EOScenarioImpact } from "@/components/eo-scenario-editor"

// Key Decision Alerts - Based on partner's real business scenarios
// Prioritized: S&OE Opportunities (#1-4), then E&O Risk (#5), Supplier Delay (#6), then mid-long term alerts (#7–10)
const keyDecisionAlerts = [
  {
    id: "clinic-overstock-esa",
    title: "Clinic-Level Over-Stock – ESAs / Mircera / EPO",
    horizon: "Short Term",
    severity: "high",
    revenueImpact: "$3.1M/yr expiry elimination",
    marginImpact: "$4.2M near-expiry exposure",
    drivers: [
      "38% of clinics carry >21-day ESA supply vs. 14-day target",
      "$4.2M in Mircera/EPO units with <90 days to expiry",
      "Average order quantity exceeds patient utilisation by +34%"
    ],
    recommendation: "Deploy AI Par Management across all 2,700 US clinics",
    businessContext: "Elevated clinic ordering patterns creating systemic ESA excess across 2,700 US clinics",
    icon: Package,
    color: "text-red-600",
    detailPageId: "clinic-overstock-esa",
    insightLink: 1
  },
  {
    id: "supply-disruption-response",
    title: "Supply Disruption Response – IV Fluids & PD Solutions",
    horizon: "Short Term",
    severity: "high",
    revenueImpact: "$18M/event prevented",
    marginImpact: "$18M projected 30-day excess cost",
    drivers: [
      "Supplier alert triggered +280% order surge across 142 regional DCs",
      "Projected 30-day excess inventory cost: $18M",
      "FME internal PD manufacturing ramp capacity: +40% within 72 hours"
    ],
    recommendation: "Centralise ordering + activate internal PD manufacturing ramp",
    businessContext: "Uncoordinated surge ordering triggered by supplier alert needs central override",
    icon: Truck,
    color: "text-red-600",
    detailPageId: "supply-disruption-response",
    insightLink: 2
  },
  {
    id: "dc-imbalance-dialyzers",
    title: "Regional DC Imbalance – FX-Class Dialyzers & Bicarbonate",
    horizon: "Short Term",
    severity: "high",
    revenueImpact: "$2.8M production cost avoided",
    marginImpact: "$34K inter-DC transfer cost",
    drivers: [
      "West DC: 62 days on-hand, 24 days above target",
      "Southeast DC: 18 days on-hand, below critical threshold",
      "Inter-DC freight ($34K) far cheaper than fresh production ($2.8M)"
    ],
    recommendation: "Execute inter-DC transfer and suspend associated production order",
    businessContext: "Severe network stock imbalance requires rebalancing instead of new production",
    icon: MapPin,
    color: "text-amber-600",
    detailPageId: "dc-imbalance-dialyzers",
    insightLink: 3
  },
  {
    id: "legacy-product-expiry",
    title: "Demand Shift & Expiry Risk – Legacy HD Bloodlines",
    horizon: "Short Term",
    severity: "high",
    revenueImpact: "$6.4M stranded inventory",
    marginImpact: "5008X adoption +22% ahead of plan",
    drivers: [
      "5008X CAREsystem adoption running +22% ahead of plan across 28 states",
      "Legacy bloodline consumption down -38% over 6 months",
      "Expiry risk accelerating as legacy usage collapses"
    ],
    recommendation: "Reroute legacy stock to slower-adoption markets + accelerate 5008X supply",
    businessContext: "5008X rollout acceleration stranding legacy HD bloodlines inventory",
    icon: AlertTriangle,
    color: "text-amber-600",
    detailPageId: "legacy-product-expiry",
    insightLink: 4
  },
  {
    id: "eo-risk-dialysis-concentrate",
    title: "E&O Risk – Dialysis Concentrate Buildup",
    horizon: "Short Term",
    severity: "high",
    revenueImpact: "$2.4M E&O exposure",
    marginImpact: "Dialysis concentrate writeoff",
    drivers: [
      "Competitor gaining hospital dialysis network share at lower pricing",
      "Production inflow surge from prior supply chain disruptions",
      "Lower-than-expected dialysis patient volumes"
    ],
    recommendation: "Global Redeployment: Transfer stock US→EMEA/APAC ($2.1M savings)",
    businessContext: "E&O risk from competitive pressure & supply timing mismatch in dialysis market",
    icon: Package,
    color: "text-red-600",
    detailPageId: "eo-risk-dialysis-concentrate",
    insightLink: 5,
    scenarios: [
      {
        name: "Global Redeployment",
        recommended: true,
        action: "Transfer dialysis concentrate stock from US to EMEA/APAC",
        cost: "$280K",
        netImpact: "$2.1M savings",
        timeline: "4–6 weeks",
        consideration: "Temporary inventory buildup in new regions"
      },
      {
        name: "Discounting",
        recommended: false,
        action: "Targeted hospital dialysis network discounting campaign",
        cost: "$480K (margin erosion)",
        netImpact: "$1.92M savings",
        timeline: "2–4 weeks",
        consideration: "Pricing pressure and future erosion risk"
      },
      {
        name: "Production Reduction",
        recommended: false,
        action: "Reduce dialysis concentrate production",
        cost: "$680K (absorption impact)",
        netImpact: "$1.72M savings",
        timeline: "8–12 weeks",
        consideration: "Raw material reallocation constraints"
      }
    ]
  },
  {
    id: "supplier-delay-risk",
    title: "Supplier Delay Risk - Dialysis Solutions",
    horizon: "Short Term",
    severity: "medium",
    revenueImpact: "-$3.2M at risk",
    marginImpact: "-20 bps short-term",
    drivers: [
      "SE Asia logistics disruption (dialysis consumables raw materials)",
      "12 major hospital networks at 60-day buffer",
      "6-week delay vs 4-week target"
    ],
    recommendation: "Expedite orders to 4 weeks (-$120K margin impact)",
    businessContext: "Preserves revenue; avoids costly alt supplier",
    icon: Truck,
    color: "text-amber-600",
    detailPageId: "supplier-delay-risk",
    insightLink: 6
  },
  {
    id: "revenue-margin-hospital-networks",
    title: "Revenue & Margin – Hospital Network Growth Plan",
    horizon: "Mid to Long Term",
    severity: "high",
    revenueImpact: "-$85M shortfall",
    marginImpact: "-120 bps vs 18% target",
    drivers: [
      "$52M shortfall Fremont Health (dialysis penetration)",
      "$33M shortfall Regional Networks (lower ASP)",
      "Dialysis mix → margin dilution"
    ],
    recommendation: "Combined: Fremont acceleration ($28M) + opex deferral ($14M)",
    businessContext: "14.8% vs 18% target; investor commitment risk",
    icon: DollarSign,
    color: "text-red-600",
    detailPageId: "revenue-margin-hospital-networks",
    insightLink: 7,
    scenarios: [
      {
        name: "Fremont Health Acceleration",
        recommended: false,
        action: "Pull forward $28M dialysis solution pipeline via targeted pricing",
        cost: "Moderate pricing impact",
        netImpact: "Recovers revenue with minimal margin dilution",
        timeline: "Immediate (2–4 weeks)",
        consideration: "Execution risk on sales acceleration; customer concentration"
      },
      {
        name: "Opex Deferral",
        recommended: false,
        action: "Defer $14M SG&A to next year",
        cost: "Low",
        netImpact: "Protects margin floor",
        timeline: "Immediate",
        consideration: "Delays growth investments; limits capability building"
      },
      {
        name: "Combined Strategy",
        recommended: true,
        action: "Combine Fremont acceleration ($28M) + opex deferral ($14M)",
        cost: "Moderate + Low",
        netImpact: "Best balance of revenue + margin recovery",
        timeline: "Phased over 6–8 weeks",
        consideration: "Requires coordination across sales, operations, and finance"
      }
    ]
  },
  {
    id: "margin-risk-fy2026",
    title: "Margin Risk – FY2026 Dialysis Portfolio",
    horizon: "Mid to Long Term",
    severity: "high",
    revenueImpact: "-$110M shortfall",
    marginImpact: "-110 bps vs AOP",
    drivers: [
      "Dialysis concentrate reimbursement restructuring (-60 bps)",
      "Asia-Pacific demand slowdown (-50 bps)",
      "Inventory revaluation risk (-55 bps)"
    ],
    recommendation: "Dialysis acceleration + Hospital/Clinic home health channel shift",
    businessContext: "AOP 19.5% vs consensus 18.5%",
    icon: AlertTriangle,
    color: "text-red-600",
    detailPageId: "margin-risk-fy2026",
    insightLink: 8,
    scenarios: [
      {
        name: "Dialysis Acceleration",
        recommended: true,
        action: "Deploy dialysis pipeline + premium solution mix shift",
        cost: "Moderate (training + marketing)",
        netImpact: "$52M revenue recovery",
        timeline: "2–3 weeks",
        consideration: "Sales execution and adoption risk"
      },
      {
        name: "Hospital Network Repositioning",
        recommended: true,
        action: "Shift to hospital/home dialysis channels",
        cost: "Low to moderate",
        netImpact: "$35M revenue + 50 bps margin lift",
        timeline: "4–6 weeks",
        consideration: "Channel partner negotiation needed"
      },
      {
        name: "Inventory Revaluation",
        recommended: false,
        action: "Defer FY2026 write-offs to FY2027",
        cost: "None (timing shift)",
        netImpact: "Protects margin temporally",
        timeline: "Immediate",
        consideration: "Defers problem; not sustainable"
      }
    ]
  },
  {
    id: "capital-allocation-dialysis-equipment",
    title: "Capital Allocation Risk - Dialysis Equipment",
    horizon: "Mid to Long Term",
    severity: "high",
    revenueImpact: "$78M capex request",
    marginImpact: "-$11–16M depreciation",
    drivers: [
      "Equipment utilization 7.8x vs 12–14x capacity",
      "28k NxStage units could support +$110M at 10x",
      "Field rep hoarding limiting turns"
    ],
    recommendation: "Turn improvement to 10x; partial capex ($32–48M) contingent",
    businessContext: "$78M capex may mask utilization problem",
    icon: Factory,
    color: "text-red-600",
    detailPageId: "capital-allocation-dialysis-equipment",
    insightLink: 9,
    scenarios: [
      {
        name: "Full Capex Deployment",
        recommended: false,
        action: "Deploy all $78M in dialysis equipment immediately",
        cost: "$11–16M annual depreciation",
        netImpact: "Solves capacity but may mask utilization problem",
        timeline: "Immediate",
        consideration: "High risk if turns don't improve"
      },
      {
        name: "Turn Improvement First",
        recommended: true,
        action: "Implement incentive program + field rep training to improve turns to 10x",
        cost: "$1.5–2M (incentives + training)",
        netImpact: "Enables +$110M revenue on existing 28k units",
        timeline: "6–8 weeks",
        consideration: "Requires behavioral change; execution critical"
      },
      {
        name: "Partial Capex Contingent",
        recommended: true,
        action: "Deploy $32–48M only if turns reach 8x+ within 8 weeks",
        cost: "$5–8M annual depreciation",
        netImpact: "Balances growth with financial discipline",
        timeline: "Phased over 8–12 weeks",
        consideration: "Requires milestone tracking and governance"
      }
    ]
  },
  {
    id: "growth-opportunity-apac",
    title: "Growth Opportunity – APAC Dialysis Expansion",
    horizon: "Mid to Long Term",
    severity: "low",
    revenueImpact: "+$18M upside",
    marginImpact: "+25 bps premium mix",
    drivers: [
      "India dialysis market acceleration",
      "SE Asia home dialysis adoption growth",
      "Dialysis concentrate premium mix shift"
    ],
    recommendation: "Market expansion; capture upside before competitors",
    businessContext: "FY2027 growth vector in India & SE Asia",
    icon: TrendingUp,
    color: "text-green-600",
    detailPageId: "growth-opportunity-apac",
    insightLink: 10,
  }
]

// Modal Scenario Data for Margin Risk FY2026
// Modal Scenario Data for E&O Risk – EVOS Large
const eoRiskDialysisConcentrateScenarios = {
  issue: {
    title: "E&O Risk – Dialysis Concentrate Buildup (Short-Term)",
    summary: "Short-term E&O risk detected by end of quarter due to lower than expected dialysis patient volumes.",
    eOExposure: "$2.4M",
    redeploymentCost: "$280K",
    discountingCost: "$480K",
    productionReductionCost: "$680K",
    recommendedSavings: "$2.1M"
  },
  drivers: [
    { name: "Competitor offering in Hospital Networks", bps: "Competitors offering at lower price point increased share in the market and reduced demand for dialysis concentrate", type: "negative" },
    { name: "Production inflow", bps: "Increased production inflow for dialysis concentrate in the coming month due to supply chain disruptions in the last quarter", type: "negative" }
  ],
  scenarios: [
    {
      id: "a",
      name: "Global Redeployment",
      recommended: true,
      actionPlan: "Transfer dialysis concentrate stock from the US to EMEA/APAC markets where E&O is not present.",
      considerations: "Temporary $2.4M net inventory increase in EU/APAC till inventory gets consumed.",
      costLabel: "Freight, relabeling, customs",
      cost: "$280K",
      impact: "$2.1M savings",
      impactLabel: "Avoids write-off minus transfer costs",
      timeline: "4–6 weeks",
      flag: "Recommended",
      executionPlan: [
        { 
          function: "Demand", 
          agent: { action: "Adjust demand forecast for UK/Spain markets", description: "Temporarily increase demand to accelerate regional sell-through", status: "Auto", impactSummary: "2 Markets × 1 SKU × 4 weeks = Forecast adjusted" },
          planner: { name: "Sarah Mitchell", action: "Validate forecast uplift", description: "Confirm temporary forecast increase for UK/Spain and define duration window", status: "Pending Review" }
        },
        { 
          function: "Supply", 
          agent: { action: "Redirect fulfillment to priority regions", description: "Reorder fulfillment from US to UK and Spain distribution", status: "In Progress", impactSummary: "$280K transfer cost × 2.4M units = Routing optimized" },
          planner: { name: "Marcus Chen", action: "Approve inventory redeployment", description: "Request Area leadership approval for 3-month inventory increase in priority markets", status: "Pending Review" }
        },
        { 
          function: "Inventory", 
          agent: { action: "Identify excess stock by market", description: "Map dialysis concentrate inventory positions across all distribution centers", status: "Auto", impactSummary: "12 DCs × 4M units = $5.6M excess identified" },
          planner: null
        },
        { 
          function: "Procurement", 
          agent: { action: "Pause near-term replenishment", description: "Halt replenishment for affected SKUs until inventory normalizes", status: "Auto", impactSummary: "3 SKUs × 8 weeks = $960K PO deferred" },
          planner: null
        },
        { 
          function: "Finance", 
          agent: { action: "Estimate write-off avoidance", description: "Calculate E&O exposure reduction post-transfer (target: $2.1M savings)", status: "In Progress", impactSummary: "$2.1M E&O exposure × 6 months = Risk reduced" },
          planner: { name: "Emily Watson", action: "Approve balance-sheet impact", description: "Review inventory carrying cost and approve financial impact", status: "Awaiting Approval" }
        },
        { 
          function: "Operations", 
          agent: { action: "Flag supply imbalances", description: "Route cross-border transfer approval to planners", status: "Auto", impactSummary: "15 Transfer orders × 3 regions = Execution flagged" },
          planner: { name: "James Rodriguez", action: "Authorize cross-border transfer", description: "Approve DC-to-DC transfer plan and confirm execution windows", status: "Awaiting Approval" }
        },
        { 
          function: "Executive", 
          agent: null,
          planner: { name: "David Park", action: "Release redeployment decision", description: "Final sign-off on inventory transfer strategy and execution authority", status: "Awaiting Approval" }
        }
      ]
    },
    {
      id: "b",
      name: "Discounting",
      recommended: false,
      actionPlan: "Launch a targeted discounting campaign to incentivize hospital procurement.",
      considerations: "Potential risk of price erosion in the future; impact to other products pricing strategy.",
      costLabel: "Margin erosion from discounting",
      cost: "$600K",
      impact: "$2.4M savings",
      impactLabel: "Maintains volume at a lower margin",
      timeline: "2–4 weeks",
      flag: "Alternative",
      executionPlan: [
        { 
          function: "Pricing", 
          agent: { action: "Model discount scenarios", description: "Calculate optimal discount levels by account and SKU", status: "Auto", impactSummary: "150 Hospitals × 3 tiers × 8% discount = $18M volume modeled" },
          planner: { name: "Rachel Kim", action: "Approve discount strategy", description: "Review and approve hospital-level discounting approach", status: "Pending Review" }
        },
        { 
          function: "Demand", 
          agent: { action: "Forecast demand uplift", description: "Estimate volume increase from discounting", status: "Auto", impactSummary: "12% volume uplift × $600K discount = Demand forecast updated" },
          planner: null
        },
        { 
          function: "Finance", 
          agent: { action: "Flag margin impact", description: "Alert finance to potential price erosion risk", status: "Auto", impactSummary: "$600K margin × 2 quarters = $1.2M risk flagged" },
          planner: { name: "Emily Watson", action: "Approve margin erosion", description: "Sign off on $600K margin impact", status: "Awaiting Approval" }
        }
      ]
    },
    {
      id: "c",
      name: "Production Reduction",
      recommended: false,
      actionPlan: "Cut potential production on EVOS Large.",
      considerations: "EVOS demand is already under budgeted supply; impact on absorption cost. Raw material unavailable to substitute production to another product.",
      costLabel: "Production reduction",
      cost: "$850K",
      impact: "$2.15M savings",
      impactLabel: "Defers risk, allows normal sell-through",
      timeline: "8–12 weeks",
      flag: "Conservative option",
      executionPlan: [
        { 
          function: "Supply", 
          agent: { action: "Model production cut scenarios", description: "Calculate absorption impact and timeline", status: "Auto", impactSummary: "4M units × $212/unit × 8 weeks = $850K capex avoided" },
          planner: { name: "Marcus Chen", action: "Approve production reduction", description: "Confirm production schedule changes", status: "Awaiting Approval" }
        },
        { 
          function: "Operations", 
          agent: { action: "Flag raw material constraints", description: "Alert to material reallocation limitations", status: "Auto", impactSummary: "3 Raw materials × 2 suppliers = Allocation constraints flagged" },
          planner: { name: "Michael Torres", action: "Authorize capacity reallocation", description: "Approve factory schedule adjustments", status: "Awaiting Approval" }
        }
      ]
    }
  ],
  recommendation: "Global Redeployment is the preferred option because it avoids write-off while balancing recovery speed and limiting margin erosion."
}

// Modal Scenario Data for Revenue & Margin Risk – RISE Plan
const revenueMarginRiseScenarios = {
  issue: {
    title: "Revenue & Margin Risk – RISE Plan (2026 Outlook)",
    summary: "3.58% margin gap vs. target for 2026 as part of RISE plan — 64.32% current vs. 67.90% target margin with $260M revenue gap.",
    projectedRevenue: "$2.34B",
    targetRevenue: "$2.60B",
    currentMargin: "64.32%",
    targetMargin: "67.90%",
    gap: "-$260M revenue / -358 bps"
  },
  drivers: [
    { name: "US Knees shortfall", bps: "$68M revenue shortfall in Knees in the US driven by lower CORI pullthrough than planned", type: "negative" },
    { name: "OUS markets shortfall", bps: "$47M shortfall in OUS markets across Hips and Knees, primarily in EU and Japan, from lower ASP than previously anticipated", type: "negative" },
    { name: "Trauma mix pressure", bps: "Trauma growth is faster than planned, creating mix pressure and margin dilution", type: "negative" },
    { name: "CORI pipeline opportunity", bps: "+$38M", type: "positive" }
  ],
  scenarios: [
    {
      id: "a",
      name: "Orthopaedics Acceleration",
      recommended: false,
      actionPlan: "Leverage CORI momentum and Reconstruction pipeline; pull forward opportunity through targeted discounting.",
      considerations: "CORI systems have better than average margin, so discounting should not materially hurt margin.",
      costLabel: "Targeted commercial support / discounting",
      cost: "Targeted commercial support / discounting",
      impact: "$38M opportunity identified",
      impactLabel: "Revenue recovery lever",
      timeline: "2–4 weeks",
      flag: "Revenue recovery lever",
      executionPlan: [
        { function: "Demand", agent: { action: "Identify CORI pipeline accounts", description: "Map high-potential accounts for CORI acceleration", status: "Auto", impactSummary: "45 Accounts × 8 SKUs × $100K ACV = $36M pipeline identified" }, planner: { name: "Lisa Chen", action: "Validate pipeline targets", description: "Confirm regional CORI acceleration targets", status: "Pending Review" } },
        { function: "Commercial", agent: { action: "Model discount scenarios", description: "Calculate optimal discount levels by account", status: "Auto", impactSummary: "12% discount × $36M pipeline = $4.3M investment required" }, planner: { name: "Robert Hayes", action: "Approve discount strategy", description: "Sign off on targeted discounting approach", status: "Awaiting Approval" } },
        { function: "Supply", agent: { action: "Confirm capacity availability", description: "Validate supply chain can support acceleration", status: "In Progress", impactSummary: "5 Plants × 200K units/month × 4 months = Capacity confirmed" }, planner: null },
        { function: "Executive", agent: null, planner: { name: "Jennifer Walsh", action: "Approve acceleration plan", description: "Final sign-off on Ortho acceleration strategy", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "b",
      name: "Discretionary Opex Deferral",
      recommended: false,
      actionPlan: "Defer planned Q4 commercial investments (market development programs, conference sponsorships, non-committed headcount additions) to Q1 2027.",
      considerations: "Does not impact core revenue trajectory.",
      costLabel: "$18M SG&A deferral",
      cost: "$18M SG&A deferral",
      impact: "Margin protection / trading margin floor support",
      impactLabel: "Margin protection lever",
      timeline: "Immediate / next planning cycle",
      flag: "Margin protection lever",
      executionPlan: [
        { function: "Finance", agent: { action: "Identify deferral candidates", description: "Flag $18M SG&A items eligible for deferral", status: "Auto", impactSummary: "250 Line items × $72K avg = $18M deferral identified" }, planner: { name: "Emily Watson", action: "Approve opex deferrals", description: "Sign off on Q4 investment deferrals to Q1 2027", status: "Pending Review" } },
        { function: "Commercial", agent: { action: "Model impact on programs", description: "Assess market development and sponsorship deferral impact", status: "Auto", impactSummary: "12 Programs × $1.5M avg = $18M program deferral modeled" }, planner: { name: "Robert Hayes", action: "Confirm program timing", description: "Validate deferral does not impact critical initiatives", status: "Pending Review" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Release deferral decision", description: "Final approval on opex deferral strategy", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "c",
      name: "Combined Mitigation Package",
      recommended: true,
      actionPlan: "Combine Orthopaedics acceleration + opex deferral.",
      considerations: "Best balance of revenue recovery and margin protection.",
      costLabel: "Combined execution effort",
      cost: "Combined execution effort",
      impact: "Best overall outcome",
      impactLabel: "Recommended",
      timeline: "6–8 weeks",
      flag: "Recommended",
      executionPlan: [
        { function: "Demand", agent: { action: "Identify CORI pipeline accounts", description: "Map high-potential accounts for CORI acceleration", status: "Auto", impactSummary: "45 Accounts × 8 SKUs × $100K ACV = $36M pipeline identified" }, planner: { name: "Lisa Chen", action: "Validate pipeline targets", description: "Confirm regional CORI acceleration targets", status: "Pending Review" } },
        { function: "Commercial", agent: { action: "Model combined revenue impact", description: "Calculate uplift from acceleration + cost savings", status: "Auto", impactSummary: "Ortho $45M + AWM $28M = $73M combined upside" }, planner: { name: "Robert Hayes", action: "Approve combined strategy", description: "Sign off on acceleration + deferral approach", status: "Pending Review" } },
        { function: "Finance", agent: { action: "Consolidate margin impact", description: "Model combined P&L effect of both levers", status: "In Progress", impactSummary: "Revenue $73M + Opex -$18M = 110 bps margin swing" }, planner: { name: "Emily Watson", action: "Approve opex deferrals", description: "Sign off on $18M SG&A deferral to Q1 2027", status: "Awaiting Approval" } },
        { function: "Supply", agent: { action: "Confirm capacity for acceleration", description: "Validate supply chain readiness for CORI pull-forward", status: "Auto", impactSummary: "5 Plants × 200K units/month × 6 months = Capacity confirmed" }, planner: null },
        { function: "Operations", agent: { action: "Generate execution timeline", description: "Create integrated 6-8 week execution plan", status: "Auto", impactSummary: "Week 1-2: Planning × Week 3-6: Execution = 6-8 weeks total" }, planner: { name: "James Rodriguez", action: "Authorize execution timeline", description: "Approve cross-functional execution schedule", status: "Awaiting Approval" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Approve combined package", description: "Final sign-off on combined mitigation strategy", status: "Awaiting Approval" } }
      ]
    }
  ],
  recommendation: "Combined Mitigation Package is the preferred path because it balances revenue recovery and margin protection.",
  executionBreakdown: [
    { owner: "Agent", icon: Bot, actions: 423, status: "Ready", items: ["Identify CORI pipeline accounts", "Model opex deferral scenarios", "Generate execution timeline"] },
    { owner: "Sales", icon: UserCheck, actions: 15, status: "Pending", items: ["Confirm CORI acceleration targets", "Align regional quotas", "Execute discounting strategy"] },
    { owner: "Finance", icon: Calculator, actions: 8, status: "Pending", items: ["Approve opex deferrals", "Update margin forecasts", "Validate RISE plan assumptions"] },
    { owner: "Operations", icon: Package, actions: 5, status: "Pending", items: ["Confirm capacity for acceleration", "Align supply with demand pull-forward", "Update production schedule"] },
    { owner: "Executive", icon: Briefcase, actions: 2, status: "Awaiting", items: ["Approve combined strategy", "Investor communication alignment"] }
  ]
}

// Modal Scenario Data for Margin Risk FY2026
const marginRiskScenarios = {
  issue: {
    title: "Margin Risk – FY2026",
    summary: "AOP targets 20.4% margin but current consensus is 19.0% due to $140M revenue shortfall and inventory revaluation pressure.",
    currentRevenue: "$6.48B",
    targetRevenue: "$6.62B",
    currentMargin: "19.0%",
    targetMargin: "20.4%",
    gap: "-140 bps"
  },
  drivers: [
    { name: "AWM Reimbursement", impact: "-$68M", bps: "-80 bps", type: "negative" },
    { name: "China APAC Slowdown", impact: "-$47M", bps: "-60 bps", type: "negative" },
    { name: "Inventory Revaluation", impact: "-$34M", bps: "-55 bps", type: "negative" },
    { name: "Ortho Growth", impact: "+$25M", bps: "+30 bps", type: "positive" }
  ],
  scenarios: [
    {
      id: "a",
      name: "Full Mitigation",
      recommended: true,
      revenue: "$6.53B",
      margin: "20.1%",
      vsAOP: "-30 bps",
      actions: [
        "Ortho acceleration via CORI pipeline (+$45M)",
        "AWM repositioning to hospital/home health (+$28M)",
        "Targeted cost reduction (-$18M opex)"
      ],
      risk: "Medium",
      timeline: "6 months",
      executionPlan: [
        { function: "Demand", agent: { action: "Model CORI pipeline uplift", description: "Calculate $45M revenue opportunity from CORI acceleration", status: "Auto", impactSummary: "45 Accounts × 8 SKUs × $125K ACV = $45M identified" }, planner: { name: "Sarah Mitchell", action: "Approve CORI pipeline forecast", description: "Validate acceleration targets by region", status: "Pending Review" } },
        { function: "Commercial", agent: { action: "Reposition AWM channels", description: "Shift AWM focus to hospital/home health (+$28M)", status: "In Progress", impactSummary: "28 Districts × $1M uplift × 1 quarter = $28M acceleration" }, planner: { name: "Kevin O'Brien", action: "Approve channel strategy", description: "Sign off on AWM repositioning approach", status: "Awaiting Approval" } },
        { function: "Supply", agent: { action: "Rebalance inventory positions", description: "Optimize inventory allocation across segments", status: "Auto", impactSummary: "6 Channels × 120 SKUs = Allocation optimized" }, planner: { name: "Marcus Chen", action: "Confirm capacity allocation", description: "Approve safety stock and lead time changes", status: "Pending Review" } },
        { function: "Finance", agent: { action: "Model margin recovery path", description: "Calculate path from 19.0% to 20.1% margin", status: "Auto", impactSummary: "$45M Ortho + $28M AWM + $18M opex = 110 bps swing" }, planner: { name: "Emily Watson", action: "Approve opex deferrals", description: "Sign off on $18M targeted cost reduction", status: "Awaiting Approval" } },
        { function: "Operations", agent: { action: "Auto-execute PO adjustments", description: "Update demand signals and rebalance inventory", status: "Auto", impactSummary: "150 POs × $500K avg = $75M annual spend rebalanced" }, planner: null },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Final scenario approval", description: "Approve full mitigation and board communication", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "b",
      name: "Partial Mitigation",
      recommended: false,
      revenue: "$6.51B",
      margin: "19.8%",
      vsAOP: "-60 bps",
      actions: [
        "Ortho acceleration only (+$45M)",
        "Defer AWM restructuring to FY2027",
        "Minimal cost action"
      ],
      risk: "Low",
      timeline: "3 months",
      executionPlan: [
        { function: "Demand", agent: { action: "Model CORI pipeline uplift", description: "Calculate $45M revenue opportunity from Ortho acceleration", status: "Auto", impactSummary: "45 Accounts × 8 SKUs × $125K ACV = $45M identified" }, planner: { name: "Sarah Mitchell", action: "Approve CORI forecast", description: "Validate Ortho-only acceleration targets", status: "Pending Review" } },
        { function: "Commercial", agent: { action: "Defer AWM restructuring", description: "Document FY2027 AWM channel shift plan", status: "Auto", impactSummary: "28 Districts × 1 Quarter = Q4 deferral documented" }, planner: null },
        { function: "Supply", agent: { action: "Validate capacity for Ortho", description: "Confirm supply chain supports acceleration", status: "Auto", impactSummary: "5 Plants × 200K units/month × 1 quarter = Confirmed" }, planner: { name: "Marcus Chen", action: "Approve capacity plan", description: "Sign off on Ortho-focused supply allocation", status: "Pending Review" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Approve partial approach", description: "Accept -60 bps vs AOP with lower execution risk", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "c",
      name: "No Action",
      recommended: false,
      revenue: "$6.48B",
      margin: "19.0%",
      vsAOP: "-140 bps",
      actions: [
        "Accept current trajectory",
        "Focus on FY2027 planning",
        "Preserve organizational bandwidth"
      ],
      risk: "High (miss AOP)",
      timeline: "N/A",
      executionPlan: [
        { function: "Finance", agent: { action: "Document AOP miss rationale", description: "Prepare board communication on -140 bps gap", status: "Auto", impactSummary: "$140M revenue gap × 140 bps = AOP miss documented" }, planner: { name: "Emily Watson", action: "Finalize FY2027 baseline", description: "Lock in current trajectory for FY2027 planning", status: "Pending Review" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Accept current trajectory", description: "Approve AOP miss and pivot focus to FY2027", status: "Awaiting Approval" } }
      ]
    }
  ],
  executionBreakdown: [
    { owner: "Agent", icon: Bot, actions: 847, status: "Ready", items: ["Auto-execute PO adjustments", "Rebalance inventory", "Update demand signals"] },
    { owner: "Demand Planner", icon: UserCheck, actions: 12, status: "Pending", items: ["Approve CORI pipeline forecast", "Validate AWM channel shift", "Sign off regional targets"] },
    { owner: "Supply Planner", icon: Package, actions: 8, status: "Pending", items: ["Confirm capacity allocation", "Approve safety stock changes", "Validate lead times"] },
    { owner: "Finance", icon: Calculator, actions: 4, status: "Pending", items: ["Approve opex deferrals", "Validate margin assumptions", "Update P&L forecast"] },
    { owner: "Executive", icon: Briefcase, actions: 2, status: "Awaiting", items: ["Final scenario approval", "Board communication sign-off"] }
  ]
}

// Modal Scenario Data for Capital Allocation Risk
const capitalAllocationScenarios = {
  issue: {
    title: "Capital Allocation Risk",
    summary: "$100M capex request may solve utilization problem with investment rather than operational improvement. Current set turns at 8.2x vs 14-16x theoretical capacity.",
    currentSets: "34,000",
    currentTurns: "8.2x",
    theoreticalTurns: "14-16x",
    unlockedRevenue: "$140M at 12x turns",
    capexRequest: "$100M"
  },
  drivers: [
    { name: "Low Set Utilization", impact: "8.2x turns", bps: "vs 14-16x capacity", type: "negative" },
    { name: "Field Rep Hoarding", impact: "~40% idle", bps: "behavioral issue", type: "negative" },
    { name: "Revenue Opportunity", impact: "+$140M", bps: "at 12x turns", type: "positive" },
    { name: "Depreciation Risk", impact: "-$14-20M", bps: "annual if full deploy", type: "negative" }
  ],
  scenarios: [
    {
      id: "a",
      name: "Operational Fix First",
      recommended: false,
      capex: "$4-6M",
      turns: "12x",
      revenue: "+$140M",
      depreciation: "~$1M",
      actions: [
        "Implement set turn improvement program",
        "Address field rep hoarding behavior",
        "Deploy minimal enabling capex only"
      ],
      risk: "Medium (execution)",
      timeline: "9-12 months",
      executionPlan: [
        { function: "Operations", agent: { action: "Track set utilization daily", description: "Monitor 34,000 sets for turn rate improvements", status: "Auto", impactSummary: "34K sets × 40% utilization = Daily tracking enabled" }, planner: { name: "Michael Torres", action: "Implement turn targets", description: "Set regional utilization KPIs and tracking", status: "Pending Review" } },
        { function: "Supply", agent: { action: "Alert on hoarding patterns", description: "Flag field reps with >40% idle set inventory", status: "Auto", impactSummary: "2,500 Reps × 15 sets each = Hoarding patterns identified" }, planner: { name: "Marcus Chen", action: "Approve redistribution", description: "Authorize set reallocation from low-turn reps", status: "Awaiting Approval" } },
        { function: "Commercial", agent: { action: "Model behavioral interventions", description: "Identify incentive changes to reduce hoarding", status: "In Progress", impactSummary: "15% hoarding reduction × 34K sets = 5.1K sets freed" }, planner: { name: "Robert Hayes", action: "Address hoarding behavior", description: "Approve field incentive restructuring", status: "Awaiting Approval" } },
        { function: "Finance", agent: { action: "Calculate minimal capex needs", description: "Model $4-6M enabling capex requirements", status: "Auto", impactSummary: "$4-6M capex × $1M depreciation = ROI 24x" }, planner: { name: "Emily Watson", action: "Approve minimal capex", description: "Sign off on operational-first investment", status: "Awaiting Approval" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Approve operational approach", description: "Commit to 9-12 month utilization improvement program", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "b",
      name: "Hybrid Approach",
      recommended: true,
      capex: "$38-42M",
      turns: "12x",
      revenue: "+$155M",
      depreciation: "$5-6M",
      actions: [
        "Partial capex deployment",
        "Contingent on utilization gains",
        "Staged rollout with gates"
      ],
      risk: "Low",
      timeline: "6-9 months",
      executionPlan: [
        { function: "Operations", agent: { action: "Track set utilization daily", description: "Monitor turn rates against stage gates", status: "Auto", impactSummary: "34K sets × 12x target = Utilization gated tracking" }, planner: { name: "Michael Torres", action: "Set utilization gates", description: "Define turn rate thresholds for capex tranches", status: "Pending Review" } },
        { function: "Supply", agent: { action: "Optimize set allocation", description: "Rebalance 34,000 sets based on utilization data", status: "Auto", impactSummary: "5K sets × $25K cost = $125M optimized allocation" }, planner: { name: "Marcus Chen", action: "Validate set allocation", description: "Approve staged set redistribution plan", status: "Pending Review" } },
        { function: "Finance", agent: { action: "Model staged depreciation", description: "Calculate $5-6M depreciation across tranches", status: "Auto", impactSummary: "$38-42M capex × 3 tranches = $5-6M depreciation" }, planner: { name: "Emily Watson", action: "Approve staged capex", description: "Sign off on $38-42M contingent investment", status: "Awaiting Approval" } },
        { function: "Inventory", agent: { action: "Forecast capacity needs", description: "Project set requirements at 12x turn target", status: "In Progress", impactSummary: "150K expected volume × 0.12 turn = 18K sets needed" }, planner: null },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Approve phased approach", description: "Commit to hybrid capex with utilization gates", status: "Awaiting Approval" } }
      ]
    },
    {
      id: "c",
      name: "Full Deployment",
      recommended: false,
      capex: "$100M",
      turns: "14x+",
      revenue: "+$180M",
      depreciation: "$14-20M",
      actions: [
        "Deploy full requested capex",
        "Maximum capacity expansion",
        "Accept higher depreciation burden"
      ],
      risk: "High (over-invest)",
      timeline: "12-18 months",
      executionPlan: [
        { function: "Supply", agent: { action: "Plan maximum capacity expansion", description: "Model deployment of full $100M capex", status: "Auto", impactSummary: "$100M capex ÷ $25K per set = 4,000 new sets" }, planner: { name: "Marcus Chen", action: "Approve full capacity plan", description: "Sign off on maximum set deployment", status: "Awaiting Approval" } },
        { function: "Finance", agent: { action: "Model full depreciation impact", description: "Calculate $14-20M annual depreciation burden", status: "Auto", impactSummary: "$100M capex × 14-20% = $14-20M annual cost" }, planner: { name: "Emily Watson", action: "Approve depreciation impact", description: "Accept higher annual cost structure", status: "Awaiting Approval" } },
        { function: "Operations", agent: { action: "Generate deployment timeline", description: "Create 12-18 month rollout schedule", status: "In Progress", impactSummary: "4K sets ÷ 250/month = 16 month deployment" }, planner: { name: "Michael Torres", action: "Authorize full deployment", description: "Commit resources to maximum expansion", status: "Awaiting Approval" } },
        { function: "Executive", agent: null, planner: { name: "David Park", action: "Approve full capex request", description: "Final sign-off on $100M investment despite utilization risk", status: "Awaiting Approval" } }
      ]
    }
  ],
  executionBreakdown: [
    { owner: "Agent", icon: Bot, actions: 156, status: "Ready", items: ["Track set utilization daily", "Alert on hoarding patterns", "Optimize allocation"] },
    { owner: "Supply Planner", icon: Package, actions: 24, status: "Pending", items: ["Validate set allocation", "Approve redistribution", "Update capacity model"] },
    { owner: "Field Operations", icon: Users, actions: 18, status: "Pending", items: ["Implement turn targets", "Address hoarding behavior", "Report utilization metrics"] },
    { owner: "Finance", icon: Calculator, actions: 6, status: "Pending", items: ["Approve staged capex", "Model depreciation scenarios", "Update capital plan"] },
    { owner: "Executive", icon: Briefcase, actions: 2, status: "Awaiting", items: ["Approve phased approach", "Set utilization gates"] }
  ]
}

// Chart data for modals - Waterfall with base + delta structure
const marginWaterfallData = [
  { name: "AOP Target", base: 0, value: 20.4, delta: 20.4, type: "start", fill: "#3b82f6" },
  { name: "AWM", base: 19.6, value: 0.8, delta: -0.8, type: "negative", fill: "#ef4444" },
  { name: "China", base: 19.0, value: 0.6, delta: -0.6, type: "negative", fill: "#ef4444" },
  { name: "Reval", base: 18.45, value: 0.55, delta: -0.55, type: "negative", fill: "#ef4444" },
  { name: "Ortho", base: 18.45, value: 0.3, delta: 0.3, type: "positive", fill: "#22c55e" },
  { name: "Current", base: 0, value: 18.75, delta: 18.75, type: "end", fill: "#f59e0b" }
]

const setUtilizationData = [
  { name: "Current", turns: 8.2, capacity: 16, revenue: 0 },
  { name: "Target 10x", turns: 10, capacity: 16, revenue: 70 },
  { name: "Target 12x", turns: 12, capacity: 16, revenue: 140 },
  { name: "Target 14x", turns: 14, capacity: 16, revenue: 180 }
]

const executionStatus = [
  { label: "Auto-run", value: "847", icon: Zap, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200", impact: "Planning actions executed", detail: "+$12M value captured" },
  { label: "Reviews", value: "23", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50", borderColor: "border-amber-200", impact: "Pending planner approval", detail: "Avg 2-day turnaround" },
  { label: "Escalations", value: "3", icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200", impact: "Critical issues flagged", detail: "Hull, APAC inventory" }
]

// Extended activity log (20+ items)
const activityLog = [
  { action: "Sarah Chen approved Hull capacity scenario", desc: "Supply Planning", icon: CheckCircle2, color: "text-green-600", time: "2m ago", priority: "EU demand conversion" },
  { action: "System auto-executed 367 PO adjustments", desc: "Procurement", icon: Zap, color: "text-blue-600", time: "15m ago", priority: null },
  { action: "Mike Torres flagged APAC inventory escalation", desc: "Inventory Planning", icon: AlertCircle, color: "text-amber-600", time: "32m ago", priority: "APAC inventory reduction" },
  { action: "Lisa Park submitted demand scenario for EU", desc: "Demand Planning", icon: Clock, color: "text-purple-600", time: "1h ago", priority: "EU demand conversion" },
  { action: "Auto-balanced NA distribution routes", desc: "Logistics", icon: CheckCircle2, color: "text-green-600", time: "1h ago", priority: "NA distribution optimization" },
  { action: "James Wu updated titanium supplier forecast", desc: "Procurement", icon: Wrench, color: "text-gray-600", time: "2h ago", priority: "Supplier consolidation" },
  { action: "System detected Hull utilization at 94%", desc: "Capacity Planning", icon: AlertCircle, color: "text-red-600", time: "2h ago", priority: "Hull capacity constraint" },
  { action: "Emma Davis approved LATAM compliance plan", desc: "Regulatory", icon: ShieldCheck, color: "text-green-600", time: "3h ago", priority: "LATAM regulatory compliance" },
  { action: "Auto-adjusted safety stock for 42 SKUs", desc: "Inventory", icon: Zap, color: "text-blue-600", time: "3h ago", priority: null },
  { action: "David Kim submitted premium mix scenario", desc: "Revenue Planning", icon: TrendingUp, color: "text-green-600", time: "4h ago", priority: "Premium implant mix" },
  { action: "System flagged packaging cost variance", desc: "Cost Planning", icon: DollarSign, color: "text-amber-600", time: "4h ago", priority: "Packaging cost reduction" },
  { action: "Rachel Lee updated Singapore expansion timeline", desc: "Capacity", icon: Factory, color: "text-blue-600", time: "5h ago", priority: "Singapore expansion" },
  { action: "Auto-generated 23 scenario recommendations", desc: "AI Planning", icon: Lightbulb, color: "text-purple-600", time: "6h ago", priority: null },
  { action: "Tom Anderson reviewed COGS assumptions", desc: "Finance", icon: DollarSign, color: "text-gray-600", time: "6h ago", priority: null },
  { action: "System optimized 156 shipment routes", desc: "Logistics", icon: Truck, color: "text-green-600", time: "7h ago", priority: null },
  { action: "Amy Zhang flagged China demand signal", desc: "Demand Planning", icon: Globe, color: "text-blue-600", time: "8h ago", priority: "China market entry" },
  { action: "Auto-calculated Q3 workforce requirements", desc: "HR Planning", icon: Users, color: "text-purple-600", time: "8h ago", priority: "Workforce planning" },
  { action: "Mark Johnson approved digital surgery budget", desc: "Innovation", icon: CheckCircle2, color: "text-green-600", time: "9h ago", priority: "Digital surgery integration" },
  { action: "System detected supplier delivery variance", desc: "Procurement", icon: AlertCircle, color: "text-amber-600", time: "10h ago", priority: null },
  { action: "Jennifer Brown updated margin assumptions", desc: "Finance", icon: Target, color: "text-gray-600", time: "11h ago", priority: null },
  { action: "Auto-rebalanced EU warehouse inventory", desc: "Inventory", icon: Package, color: "text-green-600", time: "12h ago", priority: null },
  { action: "Chris Miller submitted capacity scenario", desc: "Capacity Planning", icon: Factory, color: "text-blue-600", time: "1d ago", priority: null },
]

export default function ExecutiveOverview() {
  const router = useRouter()
  const [piScope, setPiScope] = useState<Scope>("fert")
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("a")
  const [modifyMode, setModifyMode] = useState(false)
  const [showExecutionBreakdown, setShowExecutionBreakdown] = useState(false)
  const [customScenarioParams, setCustomScenarioParams] = useState<EOScenarioParams | null>(null)
  const [customScenarioImpact, setCustomScenarioImpact] = useState<EOScenarioImpact | null>(null)

  // Get current modal data based on selected alert
  const getModalData = () => {
    if (selectedAlertId === "eo-risk-dialysis-concentrate") return eoRiskDialysisConcentrateScenarios
    if (selectedAlertId === "revenue-margin-rise-plan") return revenueMarginRiseScenarios
    if (selectedAlertId === "margin-risk-fy2026") return marginRiskScenarios
    if (selectedAlertId === "capital-allocation-sets") return capitalAllocationScenarios
    return null
  }

  const modalData = getModalData()
  const isCapitalAllocation = selectedAlertId === "capital-allocation-sets"
  const isEORisk = selectedAlertId === "eo-risk-evos-large"

  // State for S&OE ScenarioModal (reused from collaborative decision hub)
  const [activeOppScenarioId, setActiveOppScenarioId] = useState<string | null>(null)

  // Map exec overview alert IDs to opportunity scenarioData IDs
  const alertToScenarioIdMap: Record<string, string> = {
    "clinic-overstock-esa": "clinic-overstock",
    "supply-disruption-response": "panic-stocking",
    "dc-imbalance-dialyzers": "dc-imbalance",
    "legacy-product-expiry": "demand-shift-expiry",
  }

  // Handle alert click - open S&OE ScenarioModal for opp alerts, inline modal for exec alerts, navigate for others
  const handleAlertClick = (alertId: string) => {
    if (alertToScenarioIdMap[alertId]) {
      setActiveOppScenarioId(alertToScenarioIdMap[alertId])
    } else if (alertId === "margin-risk-fy2026" || alertId === "capital-allocation-sets" || alertId === "eo-risk-evos-large" || alertId === "revenue-margin-rise-plan") {
      setSelectedAlertId(alertId)
      setSelectedScenarioId("a")
      setModifyMode(false)
      setShowExecutionBreakdown(false)
    } else {
      router.push(`/decision-scenarios?alert=${alertId}`)
    }
  }

  const closeModal = () => {
    setSelectedAlertId(null)
    setSelectedScenarioId("a")
    setModifyMode(false)
    setShowExecutionBreakdown(false)
    setCustomScenarioParams(null)
    setCustomScenarioImpact(null)
  }

  const insights = scopedInsights[piScope]

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
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* TOP ROW: Performance Intelligence (full width) */}
      <div className="px-3 pt-2 pb-1 flex-shrink-0">
        {/* PI Metrics - full width */}
        <PerformanceIntelligence scope={piScope} onScopeChange={setPiScope} />
      </div>

      {/* MAIN 2-COLUMN GRID */}
      <div className="flex-1 flex overflow-hidden px-3 pb-2 pt-1 gap-2">

        {/* LEFT (flex): Key Decision Alerts - expand to fill remaining space */}
        <div className="flex-1 flex flex-col gap-1.5 overflow-hidden min-w-0">

          {/* TOP ROW: Key Decision Alerts (full width) */}
          <div className="flex gap-2 flex-shrink-0" style={{ height: "100%" }}>

            {/* Key Decision Alerts */}
            <div className="flex-1 flex flex-col bg-white rounded-xl border border-gray-200 p-3 overflow-hidden min-w-0 shadow-sm">
              <div className="flex items-start justify-between flex-shrink-0 mb-0.5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold text-gray-900 leading-none">Key Decision Alerts</h2>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[9px] font-semibold text-blue-600">
                      <svg className="h-2 w-2" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l1.5 4.5H14l-3.75 2.75L11.5 13 8 10.25 4.5 13l1.25-4.75L2 5.5h4.5L8 1z"/></svg>
                      AI Powered
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">Top risks & opportunities ({keyDecisionAlerts.length} total)</p>
                </div>
                <a 
                  href="/decision-scenarios" 
                  className="group flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                  <Lightbulb className="h-3 w-3" />
                  Create New Scenario
                  <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                </a>
              </div>
              <p className="text-[10px] text-gray-500 mb-2 flex items-center gap-1 flex-shrink-0">
                <Bot className="h-3 w-3 text-blue-500" />
                <span>AI-prepared scenarios for executive review and decision.</span>
              </p>
              {/* Table-style header row */}
              <div className="grid grid-cols-12 gap-1 px-2 py-1.5 bg-gray-50 rounded-lg border border-gray-200 mb-2 flex-shrink-0">
                <div className="col-span-1 text-[9px] font-bold text-gray-500 uppercase tracking-wide text-center">Horizon</div>
                <div className="col-span-3 text-[9px] font-bold text-gray-500 uppercase tracking-wide">Alert / Context</div>
                <div className="col-span-2 text-[9px] font-bold text-gray-500 uppercase tracking-wide text-center">Impact</div>
                <div className="col-span-3 text-[9px] font-bold text-gray-500 uppercase tracking-wide">Key Drivers</div>
                <div className="col-span-3 text-[9px] font-bold text-gray-500 uppercase tracking-wide">Decision Path</div>
              </div>

              {/* Alert rows */}
              <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 pr-1">
                {keyDecisionAlerts.map((alert, index) => {
                  const Icon = alert.icon
                  const severityConfig = {
                    high: { accent: "border-l-red-500", iconBg: "bg-red-100", badge: "bg-red-100 text-red-700", badgeLabel: "Critical" },
                    medium: { accent: "border-l-amber-400", iconBg: "bg-amber-100", badge: "bg-amber-100 text-amber-700", badgeLabel: "Warning" },
                    low: { accent: "border-l-green-500", iconBg: "bg-green-100", badge: "bg-green-100 text-green-700", badgeLabel: "Opportunity" }
                  }
                  const config = severityConfig[alert.severity]

                  return (
                    <div key={alert.id} className={`grid grid-cols-12 gap-1 items-stretch border border-gray-200 border-l-4 ${config.accent} rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow`}>

                      {/* Column 0: Horizon (1 col) */}
                      <div className="col-span-1 p-1.5 flex items-start justify-center border-r border-gray-100">
                        {alert.horizon === "Short Term" ? (
                          <span className="text-[9px] font-bold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-1 text-center leading-tight w-full">
                            Short<br/>Term
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold uppercase tracking-wide text-indigo-700 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-1 text-center leading-tight w-full">
                            Mid–Long<br/>Term
                          </span>
                        )}
                      </div>

                      {/* Column 1: Alert Title & Context (3 cols) */}
                      <div className="col-span-3 p-2 flex flex-col gap-1 border-r border-gray-100">
                        <div className="flex items-start gap-2">
                          {/* Number and Icon */}
                          <div className="flex flex-col items-center gap-1 flex-shrink-0">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div className={`flex-shrink-0 p-1 rounded-md ${config.iconBg}`}>
                              <Icon className={`h-4 w-4 ${alert.color}`} />
                            </div>
                          </div>
                          {/* Title and content */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{alert.title}</h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${config.badge}`}>
                                {config.badgeLabel}
                              </span>
                              <span className="text-[9px] font-medium px-1 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-0.5">
                                <Bot className="h-2 w-2" />
                                AI
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-600 leading-tight mt-1 line-clamp-2">{alert.businessContext}</p>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Impact Metrics (2 cols) */}
                      <div className="col-span-2 p-2 flex flex-col justify-center gap-1 border-r border-gray-100">
                        <div className="px-2 py-1 bg-green-50 border border-green-200 rounded">
                          <span className="text-[11px] font-bold text-green-700">{alert.revenueImpact}</span>
                        </div>
                        <div className="px-2 py-1 bg-blue-50 border border-blue-200 rounded">
                          <span className="text-[11px] font-bold text-blue-700">{alert.marginImpact}</span>
                        </div>
                      </div>

                      {/* Column 3: Key Drivers (3 cols) */}
                      <div className="col-span-3 p-2 border-r border-gray-100">
                        <ul className="flex flex-col gap-0.5">
                          {alert.drivers.slice(0, 3).map((driver, idx) => (
                            <li key={idx} className="flex items-start gap-1 text-[11px] text-gray-600">
                              <span className="mt-1 h-1 w-1 rounded-full bg-gray-400 flex-shrink-0" />
                              <span className="line-clamp-1">{driver}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 4: Decision Path + CTA (3 cols) */}
                      <div className="col-span-3 p-2 flex flex-col justify-between gap-1 bg-blue-50/50">
                        <div>
                          <p className="text-[9px] font-semibold text-blue-900 uppercase tracking-wide mb-0.5 flex items-center gap-1">
                            Decision Path
                            <span className="text-[8px] font-normal text-blue-600 normal-case">(Agent)</span>
                          </p>
                          <p className="text-[11px] text-blue-800 leading-tight line-clamp-2">{alert.recommendation}</p>
                        </div>
                        <button
                          onClick={() => handleAlertClick(alert.id)}
                          className="self-start px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold transition-all flex items-center gap-0.5"
                        >
                          Review
                          <ChevronRight className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT (190px): Today's AI Automated Actions & Current Planner Activity */}
        <div className="w-[190px] flex-shrink-0 flex flex-col gap-2 overflow-hidden">
          {/* Today's AI Automated Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-2.5 flex-shrink-0 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <h2 className="text-xs font-bold text-gray-900 leading-none">Today&apos;s AI Automated Actions</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Autonomous &amp; planner-driven execution</p>
              </div>
              <button
                onClick={() => router.push("/process-orchestration")}
                className="text-[10px] text-blue-600 hover:underline font-medium flex items-center gap-0.5"
              >
                View all <ChevronRight className="h-2.5 w-2.5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {executionStatus.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className={`flex items-center gap-1.5 rounded-md border ${item.borderColor} ${item.bgColor} px-1.5 py-1`}>
                    <Icon className={`h-2.5 w-2.5 flex-shrink-0 ${item.color}`} />
                    <span className={`text-xs font-bold ${item.color} flex-shrink-0 w-7`}>{item.value}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-semibold text-gray-700 leading-tight truncate">{item.impact}</div>
                      <div className={`text-[9px] font-medium ${item.color} leading-tight`}>{item.detail}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Activity Log - Show 5, scroll rest */}
          <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 p-1.5 overflow-hidden min-h-0">
            <h2 className="text-[10px] font-bold text-gray-900 leading-none flex-shrink-0">Current Planner Activity</h2>
            <p className="text-[9px] text-gray-500 mt-0.5 mb-1 flex-shrink-0">Recent actions ({activityLog.length} total)</p>
            <div className="space-y-0.5 overflow-y-auto flex-1 pr-0.5">
              {activityLog.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="flex items-start gap-1 p-1 rounded border border-gray-200 bg-gray-50 hover:bg-white transition-all">
                    <Icon className={`h-2.5 w-2.5 flex-shrink-0 mt-0.5 ${item.color}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-semibold text-gray-900 leading-tight line-clamp-2">{item.action}</div>
                      <div className="flex items-center gap-1 text-[9px] text-gray-500">
                        <span className="truncate">{item.desc}</span>
                        <span className="text-gray-400">|</span>
                        <span className="flex-shrink-0">{item.time}</span>
                      </div>
                      {item.priority && (
                        <span className="text-[9px] text-blue-600 font-medium line-clamp-1">{item.priority}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedAlertId && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90vw] max-w-[1400px] h-[90vh] max-h-[900px] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${isCapitalAllocation ? "bg-red-100" : "bg-red-100"}`}>
                  {isCapitalAllocation ? (
                    <Factory className="h-5 w-5 text-red-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{modalData.issue.title}</h2>
                  <p className="text-sm text-gray-600 mt-0.5 max-w-2xl">{modalData.issue.summary}</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Custom Scenario Active Banner */}
            {selectedScenarioId === "custom" && customScenarioParams && customScenarioImpact && isEORisk && (
              <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Edit3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Custom Scenario Active</p>
                    <p className="text-xs text-blue-600">
                      {customScenarioParams.redeploymentPercent}% redeployment to {customScenarioParams.targetMarkets.length} market(s) | 
                      {customScenarioParams.discountRate > 0 ? ` ${customScenarioParams.discountRate}% discount |` : ""} 
                      Net savings: ${(customScenarioImpact.netSavings / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setModifyMode(true)}
                  variant="outline"
                  size="sm"
                  className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  <Edit3 className="h-3 w-3 mr-1" />
                  Edit Parameters
                </Button>
              </div>
            )}

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* Issue Summary Cards */}
              <div className={`grid ${isCapitalAllocation ? "grid-cols-5" : isEORisk ? "grid-cols-5" : "grid-cols-5"} gap-3 mb-6`}>
                {isCapitalAllocation ? (
                  <>
                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Current Sets</p>
                      <p className="text-xl font-bold text-gray-900">{modalData.issue.currentSets}</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                      <p className="text-xs text-gray-500 mb-1">Current Turns</p>
                      <p className="text-xl font-bold text-amber-600">{modalData.issue.currentTurns}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                      <p className="text-xs text-gray-500 mb-1">Theoretical</p>
                      <p className="text-xl font-bold text-blue-600">{modalData.issue.theoreticalTurns}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">Unlocked Revenue</p>
                      <p className="text-xl font-bold text-green-600">{modalData.issue.unlockedRevenue}</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                      <p className="text-xs text-gray-500 mb-1">Capex Request</p>
                      <p className="text-xl font-bold text-red-600">{modalData.issue.capexRequest}</p>
                    </div>
                  </>
                ) : isEORisk ? (
                  <>
                    <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                      <p className="text-xs text-gray-500 mb-1">E&O Exposure</p>
                      <p className="text-xl font-bold text-red-600">{modalData.issue.eOExposure}</p>
                    </div>
                    <div className={`rounded-xl p-4 text-center border ${selectedScenarioId === "custom" && customScenarioImpact ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`}>
                      <p className="text-xs text-gray-500 mb-1">
                        {selectedScenarioId === "custom" ? "Custom Redeployment Cost" : "Global Redeployment Cost"}
                      </p>
                      <p className={`text-xl font-bold ${selectedScenarioId === "custom" && customScenarioImpact ? "text-blue-600" : "text-amber-600"}`}>
                        {selectedScenarioId === "custom" && customScenarioImpact 
                          ? `$${(customScenarioImpact.redeploymentCost / 1000).toFixed(0)}K`
                          : modalData.issue.redeploymentCost}
                      </p>
                    </div>
                    <div className={`rounded-xl p-4 text-center border ${selectedScenarioId === "custom" && customScenarioImpact ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`}>
                      <p className="text-xs text-gray-500 mb-1">Discounting Cost</p>
                      <p className={`text-xl font-bold ${selectedScenarioId === "custom" && customScenarioImpact ? "text-blue-600" : "text-amber-600"}`}>
                        {selectedScenarioId === "custom" && customScenarioImpact 
                          ? `$${(customScenarioImpact.discountingCost / 1000).toFixed(0)}K`
                          : modalData.issue.discountingCost}
                      </p>
                    </div>
                    <div className={`rounded-xl p-4 text-center border ${selectedScenarioId === "custom" && customScenarioImpact ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`}>
                      <p className="text-xs text-gray-500 mb-1">Production Impact</p>
                      <p className={`text-xl font-bold ${selectedScenarioId === "custom" && customScenarioImpact ? "text-blue-600" : "text-amber-600"}`}>
                        {selectedScenarioId === "custom" && customScenarioImpact 
                          ? `$${(customScenarioImpact.productionCost / 1000).toFixed(0)}K`
                          : modalData.issue.productionReductionCost}
                      </p>
                    </div>
                    <div className={`rounded-xl p-4 text-center border ${selectedScenarioId === "custom" && customScenarioImpact ? "bg-blue-50 border-blue-200" : "bg-green-50 border-green-200"}`}>
                      <p className="text-xs text-gray-500 mb-1">
                        {selectedScenarioId === "custom" ? "Custom Net Savings" : "Recommended Savings"}
                      </p>
                      <p className={`text-xl font-bold ${selectedScenarioId === "custom" && customScenarioImpact 
                        ? (customScenarioImpact.netSavings >= 0 ? "text-blue-600" : "text-red-600")
                        : "text-green-600"}`}>
                        {selectedScenarioId === "custom" && customScenarioImpact 
                          ? `$${(customScenarioImpact.netSavings / 1000000).toFixed(2)}M`
                          : modalData.issue.recommendedSavings}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Projected Revenue</p>
                      <p className="text-xl font-bold text-gray-900">{modalData.issue.projectedRevenue}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                      <p className="text-xs text-gray-500 mb-1">Target Revenue</p>
                      <p className="text-xl font-bold text-blue-600">{modalData.issue.targetRevenue}</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                      <p className="text-xs text-gray-500 mb-1">Current Margin</p>
                      <p className="text-xl font-bold text-amber-600">{modalData.issue.currentMargin}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">Target Margin</p>
                      <p className="text-xl font-bold text-green-600">{modalData.issue.targetMargin}</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                      <p className="text-xs text-gray-500 mb-1">Gap</p>
                      <p className="text-xl font-bold text-red-600">{modalData.issue.gap}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Key Drivers */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Drivers</h3>
                <div className={`grid ${isEORisk ? "grid-cols-2" : "grid-cols-4"} gap-3`}>
                  {modalData.drivers.map((driver, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border ${
                        driver.type === "positive" 
                          ? "bg-green-50 border-green-200" 
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-900 mb-2">{driver.name}</p>
                      {driver.impact && (
                        <p className={`text-lg font-bold mb-1 ${driver.type === "positive" ? "text-green-600" : "text-red-600"}`}>
                          {driver.impact}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 leading-relaxed">{driver.bps}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* E&O Scenario Editor - Only when modifyMode is active and E&O Risk is selected */}
              {modifyMode && isEORisk && (
                <EOScenarioEditor
                  initialParams={customScenarioParams || undefined}
                  onApply={(params, impact) => {
                    setCustomScenarioParams(params)
                    setCustomScenarioImpact(impact)
                    setModifyMode(false)
                  }}
                  onCancel={() => setModifyMode(false)}
                />
              )}

              {/* Chart Section - Only for Capital Allocation */}
              {isCapitalAllocation && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Set Utilization vs Revenue Potential</h3>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={setUtilizationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area yAxisId="left" type="monotone" dataKey="turns" stroke="#3b82f6" fill="#93c5fd" name="Turns" />
                      <Area yAxisId="right" type="monotone" dataKey="revenue" stroke="#22c55e" fill="#86efac" name="Revenue ($M)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              )}

              {/* Scenario Comparison */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Scenario Options</h3>
                <div className={`grid ${customScenarioParams && isEORisk ? "grid-cols-4" : "grid-cols-3"} gap-4`}>
                  {/* Custom Scenario Card - Only for E&O Risk when custom params exist */}
                  {customScenarioParams && customScenarioImpact && isEORisk && (
                    <div 
                      onClick={() => setSelectedScenarioId("custom")}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedScenarioId === "custom" 
                          ? "border-blue-500 bg-blue-50 shadow-lg" 
                          : "border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-300 hover:shadow"
                      }`}
                    >
                      <span className="absolute -top-2 left-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                        <Edit3 className="h-2.5 w-2.5" />
                        CUSTOM
                      </span>
                      <h4 className="text-sm font-bold text-gray-900 mt-1 mb-3">Custom Scenario</h4>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Total Cost</span>
                            <span className="font-semibold text-amber-600">
                              ${((customScenarioImpact.redeploymentCost + customScenarioImpact.discountingCost + customScenarioImpact.productionCost) / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500">Combined execution costs</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Net Financial Impact</span>
                            <span className={`font-semibold ${customScenarioImpact.netSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                              ${(customScenarioImpact.netSavings / 1000000).toFixed(2)}M savings
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-500">{customScenarioImpact.recoveryPercent}% E&O recovery</p>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Execution Timeline</span>
                          <span className="font-semibold text-gray-900">{customScenarioParams.executionTimeline} weeks</span>
                        </div>
                      </div>

                      <div className="border-t border-blue-200 pt-2">
                        <div className="mb-2">
                          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Configuration</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            {customScenarioParams.redeploymentPercent}% redeployment to {customScenarioParams.targetMarkets.length} market(s), 
                            {customScenarioParams.discountRate > 0 ? ` ${customScenarioParams.discountRate}% discount,` : ""}
                            {customScenarioParams.productionAdjustment < 0 ? ` ${Math.abs(customScenarioParams.productionAdjustment)}% production cut` : " no production changes"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Risk Level</p>
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold ${
                            customScenarioImpact.riskScore === "low" ? "bg-green-100 text-green-700" :
                            customScenarioImpact.riskScore === "medium" ? "bg-amber-100 text-amber-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {customScenarioImpact.riskScore.charAt(0).toUpperCase() + customScenarioImpact.riskScore.slice(1)} Risk
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {modalData.scenarios.map((scenario) => (
                    <div 
                      key={scenario.id}
                      onClick={() => setSelectedScenarioId(scenario.id)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedScenarioId === scenario.id 
                          ? "border-blue-500 bg-blue-50 shadow-lg" 
                          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow"
                      }`}
                    >
                      {scenario.recommended && (
                        <span className="absolute -top-2 left-4 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                          RECOMMENDED
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-gray-900 mt-1 mb-3">{scenario.name}</h4>
                      
                      {/* Scenario Metrics */}
                      <div className="space-y-2 mb-3">
                        {isCapitalAllocation ? (
                          <>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Capex</span>
                              <span className="font-semibold text-gray-900">{scenario.capex}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Target Turns</span>
                              <span className="font-semibold text-gray-900">{scenario.turns}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Revenue Unlock</span>
                              <span className="font-semibold text-green-600">{scenario.revenue}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Depreciation</span>
                              <span className="font-semibold text-red-600">{scenario.depreciation}</span>
                            </div>
                          </>
                        ) : isEORisk ? (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Cost to Achieve</span>
                                <span className="font-semibold text-amber-600">{scenario.cost}</span>
                              </div>
                              <p className="text-[10px] text-gray-500">{scenario.costLabel}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Net Financial Impact</span>
                                <span className="font-semibold text-green-600">{scenario.impact}</span>
                              </div>
                              <p className="text-[10px] text-gray-500">{scenario.impactLabel}</p>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Execution Timeline</span>
                              <span className="font-semibold text-gray-900">{scenario.timeline}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Cost to Achieve</span>
                                <span className="font-semibold text-amber-600">{scenario.cost}</span>
                              </div>
                              {scenario.costLabel && <p className="text-[10px] text-gray-500">{scenario.costLabel}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Net Financial Impact</span>
                                <span className="font-semibold text-green-600">{scenario.impact}</span>
                              </div>
                              {scenario.impactLabel && <p className="text-[10px] text-gray-500">{scenario.impactLabel}</p>}
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Execution Timeline</span>
                              <span className="font-semibold text-gray-900">{scenario.timeline}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Action Plan & Considerations */}
                      <div className="border-t border-gray-200 pt-2">
                        {isEORisk || (selectedAlertId === "revenue-margin-rise-plan") ? (
                          <>
                            <div className="mb-2">
                              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Action Plan</p>
                              <p className="text-[11px] text-gray-600 leading-relaxed">{scenario.actionPlan}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Considerations</p>
                              <p className="text-[11px] text-gray-600 leading-relaxed">{scenario.considerations}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Key Actions</p>
                            <ul className="space-y-1">
                              {scenario.actions?.map((action, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                                  <CheckCircle2 className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Breakdown (conditional) - Function-Based Parallel Layout */}
              {showExecutionBreakdown && (() => {
                const selectedScenario = modalData.scenarios.find(s => s.id === selectedScenarioId)
                
                // Generate custom execution plan for custom scenario
                const customExecutionPlan = customScenarioParams && customScenarioImpact ? [
                  {
                    function: "Inventory",
                    agent: {
                      action: "Reallocate E&O Inventory",
                      description: `Redistribute ${customScenarioParams.redeploymentPercent}% of excess inventory to ${customScenarioParams.targetMarkets.join(", ")} markets`,
                      status: "Auto" as const,
                      impactSummary: `${customScenarioImpact.recoveryPercent}% recovery, $${(customScenarioImpact.redeploymentCost / 1000).toFixed(0)}K cost`
                    },
                    planner: {
                      name: "Inventory Planner",
                      action: "Approve Reallocation",
                      description: "Review and approve inventory reallocation plan across target markets",
                      status: "Pending Review" as const
                    }
                  },
                  ...(customScenarioParams.discountRate > 0 ? [{
                    function: "Pricing",
                    agent: {
                      action: "Apply Discount Strategy",
                      description: `Implement ${customScenarioParams.discountRate}% discount on remaining E&O inventory`,
                      status: "Auto" as const,
                      impactSummary: `$${(customScenarioImpact.discountingCost / 1000).toFixed(0)}K discounting cost`
                    },
                    planner: {
                      name: "Pricing Manager",
                      action: "Approve Discounts",
                      description: "Review pricing impact and approve discount levels",
                      status: "Awaiting Approval" as const
                    }
                  }] : []),
                  ...(customScenarioParams.productionAdjustment < 0 ? [{
                    function: "Supply",
                    agent: {
                      action: "Adjust Production Volume",
                      description: `Reduce production by ${Math.abs(customScenarioParams.productionAdjustment)}% to prevent future E&O buildup`,
                      status: "In Progress" as const,
                      impactSummary: `$${(customScenarioImpact.productionCost / 1000).toFixed(0)}K production impact`
                    },
                    planner: {
                      name: "Supply Planner",
                      action: "Confirm Adjustments",
                      description: "Validate production schedule changes with manufacturing",
                      status: "Pending Review" as const
                    }
                  }] : []),
                  {
                    function: "Finance",
                    agent: {
                      action: "Update Financial Projections",
                      description: `Adjust forecasts for ${customScenarioParams.executionTimeline}-week execution timeline`,
                      status: "Auto" as const,
                      impactSummary: `Net savings: $${(customScenarioImpact.netSavings / 1000000).toFixed(2)}M`
                    },
                    planner: {
                      name: "Finance Controller",
                      action: "Approve Budget Impact",
                      description: `Authorize write-off up to ${customScenarioParams.writeOffTolerance}% tolerance`,
                      status: "Awaiting Approval" as const
                    }
                  },
                  {
                    function: "Executive",
                    agent: null,
                    planner: {
                      name: "VP Supply Chain",
                      action: "Final Approval",
                      description: `Review custom E&O recovery strategy: ${customScenarioImpact.riskScore} risk profile`,
                      status: "Awaiting Approval" as const
                    }
                  }
                ] : []

                const executionPlan = selectedScenarioId === "custom" ? customExecutionPlan : selectedScenario?.executionPlan
                const agentCount = executionPlan?.filter(p => p.agent).length || 0
                const plannerCount = executionPlan?.filter(p => p.planner).length || 0
                return (
                  <div className="mb-6 border border-gray-200 rounded-xl p-5 bg-white">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="text-sm font-bold text-gray-900">Execution Plan</h3>
                      </div>
                      <p className="text-xs text-gray-600">
                        Execution plan generated: {agentCount} agent actions, {plannerCount} planner approvals
                      </p>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-[100px_1fr_1fr] gap-3 mb-2 px-2">
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Function</div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <Bot className="h-3 w-3 text-blue-600" />
                        Agent Action
                      </div>
                      <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <Users className="h-3 w-3 text-amber-600" />
                        Planner Action
                      </div>
                    </div>

                    {/* Execution Rows by Function */}
                    <div className="space-y-2">
                      {executionPlan?.map((row, idx) => {
                        const fnConfig: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
                          Demand:      { icon: TrendingUp,   color: "text-violet-700", bg: "bg-violet-50",  border: "border-violet-200" },
                          Supply:      { icon: Package,      color: "text-blue-700",   bg: "bg-blue-50",    border: "border-blue-200"   },
                          Inventory:   { icon: Archive,      color: "text-cyan-700",   bg: "bg-cyan-50",    border: "border-cyan-200"   },
                          Procurement: { icon: ShoppingCart, color: "text-orange-700", bg: "bg-orange-50",  border: "border-orange-200" },
                          Finance:     { icon: DollarSign,   color: "text-green-700",  bg: "bg-green-50",   border: "border-green-200"  },
                          Operations:  { icon: Settings,     color: "text-slate-700",  bg: "bg-slate-50",   border: "border-slate-200"  },
                          Pricing:     { icon: Tag,          color: "text-pink-700",   bg: "bg-pink-50",    border: "border-pink-200"   },
                          Executive:   { icon: Briefcase,    color: "text-gray-700",   bg: "bg-gray-100",   border: "border-gray-300"   },
                          Regulatory:  { icon: Shield,       color: "text-red-700",    bg: "bg-red-50",     border: "border-red-200"    },
                          Commercial:  { icon: BarChart2,    color: "text-indigo-700", bg: "bg-indigo-50",  border: "border-indigo-200" },
                        }
                        const fn = fnConfig[row.function] ?? { icon: Circle, color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" }
                        const FnIcon = fn.icon
                        return (
                        <div key={idx} className="grid grid-cols-[120px_1fr_1fr] gap-3 items-stretch">
                          {/* Function Card */}
                          <div className={`flex flex-col items-center justify-center gap-1.5 rounded-lg border ${fn.border} ${fn.bg} p-3`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white border ${fn.border}`}>
                              <FnIcon className={`h-4 w-4 ${fn.color}`} />
                            </div>
                            <span className={`text-xs font-bold ${fn.color} text-center leading-tight`}>
                              {row.function}
                            </span>
                          </div>

                          {/* Agent Action Cell */}
                          {row.agent ? (
                            <div className="p-2.5 rounded-lg border border-blue-100 bg-blue-50 flex flex-col">
                              <div className="flex items-center gap-1.5 mb-2">
                                <Bot className="h-3 w-3 text-blue-600 flex-shrink-0" />
                                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                                  row.agent.status === "Auto" ? "bg-green-200 text-green-800" :
                                  row.agent.status === "In Progress" ? "bg-blue-200 text-blue-800" :
                                  "bg-gray-200 text-gray-800"
                                }`}>
                                  {row.agent.status}
                                </span>
                              </div>
                              <div className="flex items-stretch gap-3 flex-1">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 mb-0.5">{row.agent.action}</p>
                                  <p className="text-[11px] text-gray-600">{row.agent.description}</p>
                                </div>
                                {row.agent.impactSummary && (
                                  <div className="flex-shrink-0 w-44 flex items-center justify-end pl-2 border-l border-blue-200">
                                    <div className="w-full bg-white rounded-md border border-blue-200 px-2.5 py-1.5">
                                      <p className="text-[9px] font-medium text-blue-700 text-right line-clamp-2">{row.agent.impactSummary}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/50">
                              <span className="text-[10px] text-gray-400 italic">No agent action</span>
                            </div>
                          )}

                          {/* Planner Action Cell */}
                          {row.planner ? (
                            <div className="p-2.5 rounded-lg border border-amber-100 bg-amber-50">
                              <div className="flex items-center gap-1.5 mb-1">
                                <Users className="h-3 w-3 text-amber-600 flex-shrink-0" />
                                <span className="text-[10px] font-medium text-gray-700">{row.planner.name}</span>
                                <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ml-auto ${
                                  row.planner.status === "Pending Review" ? "bg-blue-200 text-blue-800" :
                                  row.planner.status === "Awaiting Approval" ? "bg-amber-200 text-amber-800" :
                                  "bg-green-200 text-green-800"
                                }`}>
                                  {row.planner.status}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-gray-900 mb-0.5">{row.planner.action}</p>
                              <p className="text-[11px] text-gray-600">{row.planner.description}</p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50/50">
                              <span className="text-[10px] text-gray-400 italic">No approval required</span>
                            </div>
                          )}
                        </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })()}

            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setShowExecutionBreakdown(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 text-sm font-semibold flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Commit & Execute
                </Button>
                <Button
                  onClick={() => setModifyMode(!modifyMode)}
                  variant="outline"
                  className="px-4 py-2 text-sm font-semibold flex items-center gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Modify Scenario
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 text-sm font-semibold flex items-center gap-2 text-gray-600"
                >
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
              </div>
              <Button
                onClick={closeModal}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* S&OE Scenario Modal - reused from Collaborative Decision Hub */}
      {activeOppScenarioId && (
        <ScenarioModal
          scenarioId={activeOppScenarioId}
          onClose={() => setActiveOppScenarioId(null)}
        />
      )}
    </div>
  )
}
