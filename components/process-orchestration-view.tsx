"use client"

import { useState } from "react"
import OpportunityOrchestrationView from "@/components/opportunity-orchestration-view"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Package,
  Factory,
  Truck,
  DollarSign,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Target,
  BarChart3,
  Settings,
  Lock,
  Zap,
  LineChart,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Clock,
  FileText,
  Lightbulb,
  RotateCcw,
  Layers,
  MoreVertical,
  X,
  Edit3,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  MessageSquare,
  Bot,
  Play,
  Eye,
  User,
  Database,
  RefreshCw,
  TrendingUpIcon,
  AlertTriangleIcon,
  AlertTriangle,
  Save,
  UserCheck,
  Calculator,
  Briefcase,
  Users,
  ShoppingCart,
  Warehouse,
  Building2,
  ClipboardList,
  HelpCircle,
  Calendar
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts"

// Planning story stages - S&OE Decision Orchestration
const planningStages = [
  {
    id: "baseline",
    name: "24×7 Opportunity Sensing & Auto Execution",
    icon: AlertCircle,
    description: "Always-on detection of risks and opportunities across demand, supply, and inventory with automated execution",
    cxoLabel: "Always-on detection of risks and opportunities across demand, supply, and inventory",
    cxoDescription: "AI-detected excess inventory from demand changes, stocking agreements, or supplier constraints with automated actions",
    color: "#F5222D",
    order: 1
  },
  {
    id: "opportunity",
    name: "Collaborative Decision Hub",
    icon: Lightbulb,
    description: "Align planners, sales, and sourcing teams to review and act on opportunities",
    cxoLabel: "Align planners, sales, and sourcing teams to act on opportunities",
    cxoDescription: "AI-curated inventory, safety stock, MOQ, lead-time, and phase in/out opportunities with recommended actions",
    color: "#722ED1",
    order: 2
  },
  {
    id: "performance",
    name: "Execution Control Tower and Tracking",
    icon: UserCheck,
    description: "Real-time visibility into actions, progress, and execution status",
    cxoLabel: "Real-time visibility into actions, progress, and execution status",
    cxoDescription: "Real-time monitoring of action assignment through completion with cross-functional visibility",
    color: "#13C2C2",
    order: 3
  }
]

// S&OE Key Decision Alerts - FRESENIUS INVENTORY EXCESS SCENARIOS
const soeKeyDecisionAlerts = [
  {
    id: "customer-stocking-excess",
    title: "Excess FG from Customer Stocking Agreement – Major Healthcare Provider",
    severity: "high" as const,
    revenueImpact: "$2.4M excess inventory",
    impactType: "Cost Exposure: $180K carrying cost/month",
    drivers: [
      "Minimum stocking level of 45 days in customer agreement",
      "Customer demand dropped 32% vs forecast",
      "8 SKUs affected across 3 DCs",
      "Contract renewal in 90 days"
    ],
    businessContext: "Healthcare provider agreement requires 45-day minimum stock. Actual demand has dropped significantly, creating $2.4M in excess FG inventory with $180K monthly carrying cost exposure.",
    recommendation: "Pursue Scenario A (Negotiate Agreement Adjustment) – reduce minimum stocking to 30 days and align supply plan with revised forecast",
    icon: ClipboardList,
    color: "text-red-600",
    hasDetailedScenario: true
  },
  {
    id: "demand-drop-excess",
    title: "Excess FG/RM from Sudden Demand Drop – Hospital Network Segment",
    severity: "high" as const,
    revenueImpact: "$3.8M at risk",
    impactType: "Inventory Risk: 12 weeks excess coverage",
    drivers: [
      "Hospital system forecast reduced 28% for Q2",
      "3 production lines affected",
      "Raw materials already on order from suppliers",
      "Limited alternative customer demand"
    ],
    businessContext: "Major hospital network reduced Q2 forecast by 28% due to procedure volume changes. Results in 12 weeks of excess coverage across FG and committed RM purchases.",
    recommendation: "Pursue Scenario A (Production Hold + RM Renegotiation) – pause production, negotiate PO deferrals with suppliers, identify alternative customers",
    icon: TrendingDown,
    color: "text-red-600",
    hasDetailedScenario: true
  },
  {
    id: "supplier-moq-excess",
    title: "Excess RM from Supplier MOQ – IV Solution Components",
    severity: "medium" as const,
    revenueImpact: "$890K excess RM",
    impactType: "Working Capital: 6-month supply on hand",
    drivers: [
      "Supplier MOQ requires 180-day purchase commitment",
      "No consolidated purchasing across 4 sites",
      "Each site ordering independently",
      "Price increase pending in 60 days"
    ],
    businessContext: "IV solution component supplier requires 180-day MOQ per order. Four sites ordering independently creates $890K excess RM. Opportunity to consolidate purchases and negotiate better terms.",
    recommendation: "Consolidate purchasing across sites and negotiate MOQ reduction with volume commitment",
    icon: Package,
    color: "text-amber-600",
    hasDetailedScenario: true
  },
  {
    id: "seasonal-buildup",
    title: "Seasonal Inventory Buildup – Medical Devices",
    severity: "medium" as const,
    revenueImpact: "$1.2M seasonal stock",
    impactType: "Timing Risk: Peak season in 8 weeks",
    drivers: [
      "Pre-season production complete",
      "Hospital procurement delays anticipated",
      "Healthcare partners requesting delivery delays",
      "Warehouse capacity at 94%"
    ],
    businessContext: "Seasonal medical device inventory built to plan but healthcare partners requesting 2-week delivery delays. Creates short-term warehouse capacity crunch.",
    recommendation: "Coordinate phased delivery schedule with healthcare partners and optimize warehouse allocation",
    icon: Warehouse,
    color: "text-amber-600",
    hasDetailedScenario: false
  },
  {
    id: "npi-transition",
    title: "Phase-Out Inventory Risk – Legacy Dialysis Solution Line",
    severity: "low" as const,
    revenueImpact: "$340K legacy stock",
    impactType: "Obsolescence Risk: NPI launch in 6 weeks",
    drivers: [
      "New dialysis solution formulation launching Q2",
      "Legacy SKUs need clearance before transition",
      "3 key accounts still on legacy product",
      "Marketing promotions available"
    ],
    businessContext: "Legacy dialysis solution line being replaced by improved formulation. $340K inventory needs clearance before NPI launch to avoid obsolescence write-off.",
    recommendation: "Accelerate legacy clearance through promotions and coordinate customer transitions",
    icon: RefreshCw,
    color: "text-green-600",
    hasDetailedScenario: false
  }
]

// S&OE Modal Scenario Data - Customer Stocking Agreement Excess
const customerStockingScenarios = {
  issue: {
    title: "Excess FG from Customer Stocking Agreement – Major Healthcare Provider",
    summary: "Minimum stocking requirement of 45 days in customer agreement combined with 32% demand drop creates $2.4M excess finished goods inventory.",
    impact: "$2.4M excess inventory",
    unitsImpacted: "8 SKUs across 3 DCs",
    accountsAtRisk: "Major Healthcare Provider (Top 5 Account)",
    constraint: "Contract renewal in 90 days – leverage for renegotiation"
  },
  drivers: [
    { name: "Stocking Agreement", context: "45-day minimum requirement", type: "critical" as const },
    { name: "Demand Drop", context: "32% below forecast", type: "critical" as const },
    { name: "Carrying Cost", context: "$180K/month exposure", type: "negative" as const },
    { name: "Contract Timing", context: "Renewal in 90 days", type: "positive" as const }
  ],
  scenarios: [
    {
      id: "a",
      name: "Negotiate Agreement Adjustment",
      recommended: true,
      revenueProtected: "Full relationship",
      marginImpact: "-$540K over 3 months",
      timeline: "2-4 weeks",
      risk: "Low",
      actions: [
        "Prepare demand analysis and cost impact fact pack",
        "Schedule commercial review with healthcare provider leadership",
        "Propose 30-day stocking level with volume incentives",
        "Align internal supply plan with revised terms",
        "Document agreement changes for contract renewal"
      ],
      agentActions: [
        { role: "Demand Planning Agent", action: "Generate demand analysis", description: "Create historical demand vs forecast comparison for healthcare provider account", status: "Auto" },
        { role: "Inventory Agent", action: "Calculate exposure", description: "Compute carrying cost and excess inventory value by SKU", status: "Auto" },
        { role: "Commercial Agent", action: "Prepare fact pack", description: "Build customer-facing presentation with cost sharing proposal", status: "In Progress" },
        { role: "Supply Planning Agent", action: "Model supply scenarios", description: "Create supply plan options for 30-day vs 45-day stocking levels", status: "Auto" },
        { role: "Exception Agent", action: "Flag for review", description: "Route to Sales VP for customer negotiation approval", status: "Auto" }
      ],
      plannerActions: [
        { role: "Sales VP", action: "Approve negotiation approach", description: "Review fact pack and authorize customer discussion", status: "Pending Review" },
        { role: "Account Manager", action: "Schedule customer meeting", description: "Coordinate meeting with healthcare provider procurement team", status: "Awaiting Approval" },
        { role: "Supply Chain Director", action: "Validate supply plan changes", description: "Approve revised stocking policy and DC allocation", status: "Pending Review" },
        { role: "Finance Manager", action: "Approve cost sharing terms", description: "Sign off on margin impact of proposed agreement changes", status: "Awaiting Approval" },
        { role: "Commercial Director", action: "Final approval", description: "Authorize contract amendment terms", status: "Awaiting Approval" }
      ]
    },
    {
      id: "b",
      name: "Accelerated Promotion",
      recommended: false,
      revenueProtected: "Partial margin erosion",
      marginImpact: "-$720K (promotions)",
      timeline: "4-6 weeks",
      risk: "Medium",
      actions: [
        "Launch targeted promotion to increase pull-through",
        "Offer volume discounts to healthcare partner for early orders",
        "Coordinate with marketing on promotional materials",
        "Monitor sell-through and adjust as needed"
      ],
      agentActions: [
        { role: "Commercial Agent", action: "Design promotion", description: "Create volume discount structure for excess SKUs", status: "Auto" },
        { role: "Demand Planning Agent", action: "Forecast uplift", description: "Estimate demand increase from promotional pricing", status: "In Progress" }
      ],
      plannerActions: [
        { role: "Marketing Manager", action: "Approve promotional campaign", description: "Validate promotion aligns with brand guidelines", status: "Pending Review" },
        { role: "Finance Manager", action: "Approve margin impact", description: "Sign off on promotional pricing and expected margin erosion", status: "Awaiting Approval" }
      ]
    },
    {
      id: "c",
      name: "Hold & Wait",
      recommended: false,
      revenueProtected: "Full (if demand recovers)",
      marginImpact: "-$180K/month carrying",
      timeline: "3+ months",
      risk: "High",
      actions: [
        "Maintain current inventory levels",
        "Monitor customer demand signals",
        "Accept ongoing carrying cost exposure",
        "Risk: demand may not recover, obsolescence risk"
      ],
      agentActions: [
        { role: "Exception Agent", action: "Flag ongoing risk", description: "Create weekly monitoring alert for inventory levels", status: "Auto" }
      ],
      plannerActions: [
        { role: "Supply Chain Director", action: "Accept risk", description: "Approve hold strategy with documented carrying cost exposure", status: "Awaiting Approval" },
        { role: "Finance VP", action: "Reserve for write-off", description: "Establish reserve if inventory becomes obsolete", status: "Awaiting Approval" }
      ]
    }
  ]
}

// S&OE Modal Scenario Data - Demand Drop Excess
const demandDropScenarios = {
  issue: {
    title: "Excess FG/RM from Sudden Demand Drop – Hospital Network Segment",
    summary: "Major hospital network reduced Q2 forecast by 28% due to procedure volume changes. Creates 12 weeks excess coverage across finished goods and committed raw material purchases.",
    impact: "$3.8M at risk",
    q1Revenue: "12 weeks excess coverage",
    coverage: "3 production lines affected",
    constraint: "Raw materials already on order – supplier negotiation needed"
  },
  drivers: [
    { name: "Hospital Forecast Cut", context: "28% reduction for Q2", type: "critical" as const },
    { name: "Production Lines", context: "3 lines affected", type: "critical" as const },
    { name: "Committed RM", context: "POs already placed", type: "negative" as const },
    { name: "Alt Demand", context: "Limited other customers", type: "negative" as const }
  ],
  scenarios: [
    {
      id: "a",
      name: "Production Hold + RM Renegotiation",
      recommended: true,
      revenue: "$3.2M protected",
      coverage: "8 weeks coverage",
      timeline: "Immediate",
      risk: "Low",
      actions: [
        "Pause 2 of 3 production lines immediately",
        "Contact suppliers to defer/cancel uncommitted POs",
        "Identify NPI and alternative customer opportunities",
        "Validate forecast with hospital network for Q3 recovery",
        "Create weekly monitoring cadence"
      ],
      agentActions: [
        { role: "Production Planning Agent", action: "Generate line hold schedule", description: "Create optimized production hold sequence minimizing changeover costs", status: "Auto" },
        { role: "Procurement Agent", action: "Identify deferrable POs", description: "Flag uncommitted purchase orders for renegotiation", status: "Auto" },
        { role: "Demand Planning Agent", action: "Scan alt demand", description: "Identify potential alternative customers for affected SKUs", status: "In Progress" },
        { role: "Commercial Agent", action: "Request hospital network forecast update", description: "Coordinate with healthcare account team for Q3 outlook", status: "In Progress" },
        { role: "Inventory Agent", action: "Model scenarios", description: "Calculate inventory trajectory under production hold scenario", status: "Auto" },
        { role: "Exception Agent", action: "Create monitoring alert", description: "Set up weekly excess inventory tracking dashboard", status: "Auto" }
      ],
      plannerActions: [
        { role: "Operations Director", action: "Approve production hold", description: "Authorize line shutdowns and labor reallocation plan", status: "Pending Review" },
        { role: "Procurement Manager", action: "Lead supplier negotiations", description: "Execute PO deferrals and document supplier agreements", status: "Awaiting Approval" },
        { role: "Sales Director", action: "Validate alt customers", description: "Confirm alternative customer opportunities and pricing", status: "Pending Review" },
        { role: "Supply Chain VP", action: "Approve scenario", description: "Final approval on integrated supply plan changes", status: "Awaiting Approval" },
        { role: "Finance Manager", action: "Track cost impact", description: "Monitor and report on cost avoidance vs carrying cost", status: "Pending Review" }
      ]
    },
    {
      id: "b",
      name: "Customer Diversification Push",
      recommended: false,
      revenue: "$2.8M protected",
      coverage: "10 weeks coverage",
      timeline: "4-8 weeks",
      risk: "Medium",
      actions: [
        "Aggressive sales push to non-hospital segments",
        "Offer competitive pricing to win new business",
        "Maintain production at reduced rate",
        "Accept margin compression on diverted volume"
      ],
      agentActions: [
        { role: "Commercial Agent", action: "Identify prospects", description: "Generate target list for non-hospital healthcare applications", status: "Auto" },
        { role: "Pricing Agent", action: "Create competitive quotes", description: "Develop pricing scenarios for new customer acquisition", status: "In Progress" }
      ],
      plannerActions: [
        { role: "Sales VP", action: "Approve diversification strategy", description: "Commit sales resources to new customer acquisition", status: "Pending Review" },
        { role: "Finance Manager", action: "Approve margin flexibility", description: "Authorize competitive pricing with margin impact", status: "Awaiting Approval" }
      ]
    },
    {
      id: "c",
      name: "Full Production Continue",
      recommended: false,
      revenue: "N/A - builds more excess",
      coverage: "16+ weeks coverage",
      timeline: "Ongoing",
      risk: "High",
      actions: [
        "Maintain current production schedule",
        "Build inventory in anticipation of Q3 recovery",
        "Risk: Hospital demand may not recover, massive write-off potential"
      ],
      agentActions: [
        { role: "Exception Agent", action: "Flag high risk", description: "Alert leadership to escalating inventory exposure", status: "Auto" }
      ],
      plannerActions: [
        { role: "Supply Chain VP", action: "Accept risk", description: "Approve continued production with documented risk", status: "Awaiting Approval" },
        { role: "CFO", action: "Reserve for write-off", description: "Establish significant inventory reserve", status: "Awaiting Approval" }
      ]
    }
  ]
}

// S&OE Modal Scenario Data - Supplier MOQ Excess
const supplierMoqScenarios = {
  issue: {
    title: "Excess RM from Supplier MOQ – IV Solution Components",
    summary: "IV solution component supplier requires 180-day MOQ per order. Four sites ordering independently creates $890K excess raw material inventory with 6-month supply on hand.",
    impact: "$890K excess RM",
    q1Revenue: "6-month supply on hand",
    coverage: "4 sites ordering independently",
    constraint: "Supplier price increase pending in 60 days"
  },
  drivers: [
    { name: "Supplier MOQ", context: "180-day commitment required", type: "critical" as const },
    { name: "Fragmented Purchasing", context: "4 sites ordering separately", type: "negative" as const },
    { name: "Price Increase", context: "Pending in 60 days", type: "negative" as const },
    { name: "Consolidation Opportunity", context: "Volume leverage available", type: "positive" as const }
  ],
  scenarios: [
    {
      id: "a",
      name: "Consolidated Purchasing",
      recommended: true,
      revenue: "$890K exposure reduced",
      coverage: "3-month target coverage",
      timeline: "4-6 weeks",
      risk: "Low",
      actions: [
        "Consolidate projected usage across all 4 sites",
        "Negotiate reduced MOQ with volume commitment",
        "Create single PO with multiple delivery line items",
        "Route split shipments by site consumption rate",
        "Lock pricing before increase"
      ],
      agentActions: [
        { role: "Procurement Agent", action: "Consolidate demand", description: "Aggregate IV component requirements across all 4 manufacturing sites", status: "Auto" },
        { role: "Inventory Agent", action: "Calculate optimal coverage", description: "Determine target inventory level with consolidated purchasing", status: "Auto" },
        { role: "Logistics Agent", action: "Plan split shipments", description: "Create delivery schedule by site based on consumption rates", status: "In Progress" },
        { role: "Commercial Agent", action: "Prepare negotiation brief", description: "Build supplier negotiation fact pack with volume leverage", status: "Auto" },
        { role: "Exception Agent", action: "Track price deadline", description: "Monitor 60-day window for pricing decision", status: "Auto" }
      ],
      plannerActions: [
        { role: "Procurement Director", action: "Lead supplier negotiation", description: "Execute MOQ reduction discussion with IV component supplier", status: "Pending Review" },
        { role: "Site Managers", action: "Validate site requirements", description: "Confirm consumption forecasts for each manufacturing site", status: "Pending Review" },
        { role: "Supply Chain VP", action: "Approve consolidated approach", description: "Authorize cross-site purchasing coordination", status: "Awaiting Approval" },
        { role: "Finance Manager", action: "Approve pre-buy strategy", description: "Decide on price lock vs MOQ reduction trade-off", status: "Awaiting Approval" }
      ]
    },
    {
      id: "b",
      name: "Price Lock Pre-Buy",
      recommended: false,
      revenue: "$890K maintained (price protected)",
      coverage: "6-month coverage continues",
      timeline: "Before price increase",
      risk: "Medium",
      actions: [
        "Accept higher inventory for price protection",
        "Buy additional volume before price increase",
        "Accept carrying cost vs price increase trade-off",
        "Maintain current fragmented ordering"
      ],
      agentActions: [
        { role: "Procurement Agent", action: "Calculate price vs carry", description: "Compare price increase cost vs inventory carrying cost", status: "Auto" },
        { role: "Finance Agent", action: "NPV analysis", description: "Compute net present value of pre-buy decision", status: "In Progress" }
      ],
      plannerActions: [
        { role: "Procurement Director", action: "Approve pre-buy volume", description: "Authorize additional inventory purchase", status: "Pending Review" },
        { role: "CFO", action: "Approve working capital", description: "Sign off on increased inventory investment", status: "Awaiting Approval" }
      ]
    },
    {
      id: "c",
      name: "Status Quo",
      recommended: false,
      revenue: "$890K excess continues",
      coverage: "6-month+ coverage",
      timeline: "Ongoing",
      risk: "High",
      actions: [
        "Continue independent site ordering",
        "Accept excess inventory levels",
        "No supplier negotiation",
        "Risk: Higher costs from price increase + excess inventory"
      ],
      agentActions: [
        { role: "Exception Agent", action: "Flag inefficiency", description: "Document ongoing excess and price exposure risk", status: "Auto" }
      ],
      plannerActions: [
        { role: "Supply Chain VP", action: "Accept current state", description: "Document decision to not pursue consolidation", status: "Awaiting Approval" }
      ]
    }
  ]
}



const lifecycleInsights = {
  baseline: {
    title: "24×7 Opportunity Sensing & Auto Execution",
    subtitle: "Always-on detection of risks and opportunities with automated execution",
    summary: "Always-on detection of risks and opportunities across demand, supply, and inventory with automated actions",
    metrics: [
      { label: "Opportunities Detected", value: "3", icon: AlertCircle, color: "#F5222D" },
      { label: "Total Exposure", value: "$7.1M", icon: DollarSign, color: "#FA8C16" },
      { label: "Auto-Executed Actions", value: "12", icon: Zap, color: "#1677FF" }
    ],
    keyInsight: "What the AI Detected & Executed Today",
    insight: "3 distinct excess inventory scenarios detected by AI this morning: customer stocking agreement excess ($2.4M), sudden demand drop ($3.8M), and supplier MOQ excess ($890K). 12 actions auto-executed within policy guardrails; remaining scenarios require human decision.",
    businessImpact: "Proactive AI detection and auto-execution prevents manual exception management; early visibility enables rapid decision-making"
  },
  opportunity: {
    title: "Collaborative Decision Hub",
    subtitle: "Align planners, sales, and sourcing teams",
    summary: "7 Fresenius scenarios requiring human review – AI has quantified tradeoffs and prepared decision options",
    metrics: [
      { label: "Scenarios", value: "7", icon: Lightbulb, color: "#722ED1" },
      { label: "Year 1 Value", value: ">$50M", icon: Target, color: "#52C41A" },
      { label: "Working Capital", value: "$525M", icon: RefreshCw, color: "#1677FF" }
    ],
    keyInsight: "AI Recommendations, Human Approval Required",
    insight: "7 Fresenius inventory reduction scenarios active: clinic over-stock ($3.1M/yr), supply disruption response inventory ($18M/event), DC imbalance ($2.8M), demand shift & expiry ($6.4M), RM excess & open POs ($1.6M+), demand variance ($2.3M/month), safety stock right-sizing ($20–31M). Inventory days target: 345 → 337.",
    businessImpact: "Combined year-1 scenario value ~$50M; 8-day inventory reduction from 345 to 337 days"
  },
  performance: {
    title: "Execution Control Tower and Tracking",
    subtitle: "Real-time visibility into actions and progress",
    summary: "Real-time visibility into actions, progress, and execution status",
    metrics: [
      { label: "Actions Tracked", value: "8", icon: UserCheck, color: "#13C2C2" },
      { label: "Departments", value: "4", icon: Users, color: "#1677FF" },
      { label: "Completion Rate", value: "75%", icon: CheckCircle2, color: "#52C41A" }
    ],
    keyInsight: "Cross-Functional Action Alignment",
    insight: "8 actions being tracked 24/7 across Sales, Supply Chain, Procurement, and Finance. Real-time status updates, escalations, and completion monitoring across all departments.",
    businessImpact: "Continuous accountability with real-time visibility; automated escalations and status tracking ensures no opportunity is missed"
  }
}

// Historical data for charts (last 7 days) - S&OE metrics
const historicalMetricsData = [
  { day: "Mon", inventoryTurns: 4.5, excessMM: 6.2, carryingCost: 195, actions: 8 },
  { day: "Tue", inventoryTurns: 4.4, excessMM: 6.5, carryingCost: 210, actions: 12 },
  { day: "Wed", inventoryTurns: 4.3, excessMM: 6.8, carryingCost: 235, actions: 15 },
  { day: "Thu", inventoryTurns: 4.2, excessMM: 7.0, carryingCost: 260, actions: 18 },
  { day: "Fri", inventoryTurns: 4.2, excessMM: 7.1, carryingCost: 280, actions: 12 },
  { day: "Sat", inventoryTurns: 4.2, excessMM: 7.1, carryingCost: 280, actions: 4 },
  { day: "Today", inventoryTurns: 4.2, excessMM: 7.1, carryingCost: 280, actions: 12 }
]

// Action summary data for planning sections - S&OE focused
const actionSummaryData = {
  autoExecuted: {
    count: 12,
    impact: "$2.1M analyzed",
    status: "stable",
    trend: "+8%"
  },
  pendingReview: {
    count: 6,
    highPriority: 3,
    status: "attention needed",
    trend: "-2"
  },
  crossFunctional: {
    count: 4,
    supplyImpact: 2,
    status: "active",
    trend: "+1"
  },
  sopCandidates: {
    count: 3,
    escalated: 2,
    status: "VP review",
    trend: "pending"
  }
}

// Functional view data mapping (keyed by view ID)
// Default functional view data structure with metrics, autoExecuted, and pendingReview arrays
const defaultFunctionalViewData = {
  metrics: [
    { label: "Total Items", value: "24", change: "+3", trend: "up" },
    { label: "Exposure", value: "$4.2M", change: "+$1.1M", trend: "down" },
    { label: "Actions", value: "8", change: "+2", trend: "up" }
  ],
  autoExecuted: [
    { id: 1, title: "Demand variance analysis completed", impact: "5 accounts flagged", timestamp: "10:15 AM", severity: "positive", agentType: "Demand Agent" },
    { id: 2, title: "Inventory exposure calculated", impact: "$7.1M total", timestamp: "09:30 AM", severity: "positive", agentType: "Inventory Agent" },
    { id: 3, title: "Supplier lead time analysis", impact: "3 suppliers flagged", timestamp: "08:45 AM", severity: "positive", agentType: "Procurement Agent" }
  ],
  pendingReview: [
    { id: 1, title: "Approve production hold for hospital lines", recommendation: "Hold lines 2 & 3 pending demand recovery", impact: "$1.2M excess prevention", priority: "High", linkedView: "Production" },
    { id: 2, title: "Review customer stocking agreement terms", recommendation: "Negotiate 30-day from 45-day terms", impact: "$2.4M exposure reduction", priority: "High", linkedView: "Commercial" },
    { id: 3, title: "Validate Q2 demand outlook", recommendation: "Coordinate with Sales on forecast", impact: "$800K at risk", priority: "Medium", linkedView: "Demand Planning" }
  ],
  crossFunctional: [],
  sopCandidates: [],
  copilotSuggestions: []
}

const functionalViewData = {
  demand: {
    metrics: [
      { label: "Forecast Accuracy", value: "84.2%", change: "-3.1%", trend: "down" },
      { label: "Demand Variance", value: "$12.4M", change: "+$4.2M", trend: "down" },
      { label: "Accounts Flagged", value: "5", change: "+2", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Generated demand variance analysis for top 10 accounts", impact: "5 accounts flagged for review", timestamp: "10:15 AM", severity: "positive", agentType: "Demand Agent", beforeValue: "Unanalyzed", afterValue: "5 Flagged", context: "Automated analysis of demand variance across top revenue accounts identified 5 requiring immediate attention due to >15% forecast deviation.", chartData: [{ name: "Mon", value: 2 }, { name: "Tue", value: 3 }, { name: "Wed", value: 5 }, { name: "Thu", value: 4 }, { name: "Fri", value: 5 }] },
      { id: 2, title: "Updated forecast baseline with latest POS data", impact: "Improved accuracy by 2.1%", timestamp: "09:30 AM", severity: "positive", agentType: "Demand Agent", beforeValue: "82.1%", afterValue: "84.2%", context: "Integrated latest point-of-sale data from retail partners, improving demand signal accuracy for hospital supply segment.", chartData: [{ name: "W1", value: 80 }, { name: "W2", value: 81 }, { name: "W3", value: 82 }, { name: "W4", value: 84 }] },
      { id: 3, title: "Identified seasonal pattern shift in Hospital segment", impact: "-28% demand detected", timestamp: "08:45 AM", severity: "warning", agentType: "Demand Agent", beforeValue: "Normal", afterValue: "-28%", context: "Seasonal analysis detected significant demand reduction in hospital segment, likely due to elective procedure deferrals.", chartData: [{ name: "Jan", value: 100 }, { name: "Feb", value: 95 }, { name: "Mar", value: 72 }] }
    ],
    pendingReview: [
      { id: 1, title: "Validate Fremont Health Q2 demand outlook", recommendation: "Review 45-day stocking agreement impact", impact: "$2.4M exposure at risk", priority: "High", linkedView: "Commercial" },
      { id: 2, title: "Approve demand sensing model update", recommendation: "Include new market signals", impact: "+3% forecast accuracy", priority: "Medium", linkedView: "Demand Planning" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  supply: {
    metrics: [
      { label: "Inventory Turns", value: "1.2x", change: "-0.3x", trend: "down" },
      { label: "Excess Inventory", value: "$7.1M", change: "+$2.8M", trend: "down" },
      { label: "Obsolete Inventory", value: "$2.4M", change: "+$1.1M", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Calculated excess inventory exposure by root cause", impact: "$7.1M total across 3 scenarios", timestamp: "10:00 AM", severity: "positive", agentType: "Inventory Agent", beforeValue: "Unknown", afterValue: "$7.1M", context: "Analyzed inventory positions across all SKUs and identified 3 distinct excess scenarios: customer stocking ($2.4M), demand drop ($3.8M), and MOQ issues ($0.9M).", chartData: [{ name: "Stocking", value: 2.4 }, { name: "Demand", value: 3.8 }, { name: "MOQ", value: 0.9 }] },
      { id: 2, title: "Generated safety stock recommendations", impact: "12 SKUs flagged for adjustment", timestamp: "09:15 AM", severity: "positive", agentType: "Inventory Agent", beforeValue: "6 wks avg", afterValue: "4 wks target", context: "Safety stock analysis identified 12 SKUs with excess coverage that can be reduced from 6 weeks to 4 weeks without impacting service levels.", chartData: [{ name: "Current", value: 6 }, { name: "Target", value: 4 }, { name: "Min", value: 3 }] },
      { id: 3, title: "Identified customer stocking excess at Fremont Health", impact: "$2.4M exposure from 45-day terms", timestamp: "08:30 AM", severity: "warning", agentType: "Inventory Agent", beforeValue: "30 days", afterValue: "45 days", context: "Fremont Health negotiated 45-day stocking terms creating $2.4M excess inventory exposure that needs commercial review.", chartData: [{ name: "Standard", value: 30 }, { name: "Fremont", value: 45 }] }
    ],
    pendingReview: [
      { id: 1, title: "Review inventory write-down candidates", recommendation: "Assess $890K slow-moving items", impact: "Potential reserve adjustment", priority: "High", linkedView: "Finance" },
      { id: 2, title: "Approve safety stock policy change for dialysis line", recommendation: "Reduce from 6 to 4 weeks cover", impact: "$1.1M inventory reduction", priority: "Medium", linkedView: "Supply Planning" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  capacity: {
    metrics: [
      { label: "Utilization", value: "78%", change: "-5%", trend: "down" },
      { label: "Bottlenecks", value: "3", change: "+1", trend: "down" },
      { label: "Efficiency", value: "92%", change: "-2%", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Analyzed capacity utilization across 4 plants", impact: "3 bottlenecks identified", timestamp: "10:20 AM", severity: "positive", agentType: "Capacity Agent", beforeValue: "Unassessed", afterValue: "3 Issues", context: "Cross-plant capacity analysis identified bottlenecks at Plant A (packaging), Plant B (sterilization), and Plant C (assembly line 2).", chartData: [{ name: "Plant A", value: 92 }, { name: "Plant B", value: 88 }, { name: "Plant C", value: 95 }, { name: "Plant D", value: 72 }] },
      { id: 2, title: "Generated shift optimization recommendations", impact: "Potential 8% efficiency gain", timestamp: "09:45 AM", severity: "positive", agentType: "Capacity Agent", beforeValue: "84%", afterValue: "92%", context: "Shift pattern analysis shows potential to improve overall efficiency from 84% to 92% by rebalancing labor across shifts.", chartData: [{ name: "Shift 1", value: 90 }, { name: "Shift 2", value: 85 }, { name: "Shift 3", value: 78 }] },
      { id: 3, title: "Flagged maintenance window conflicts", impact: "2 lines require rescheduling", timestamp: "08:15 AM", severity: "warning", agentType: "Capacity Agent", beforeValue: "Conflicting", afterValue: "Flagged", context: "Scheduled maintenance windows for Lines 2 and 4 conflict with high-demand production periods in Week 12.", chartData: [{ name: "W11", value: 100 }, { name: "W12", value: 60 }, { name: "W13", value: 100 }] }
    ],
    pendingReview: [
      { id: 1, title: "Approve overtime authorization for Line 3", recommendation: "Cover demand spike in Week 12", impact: "$45K additional labor cost", priority: "High", linkedView: "Production" },
      { id: 2, title: "Review capacity rebalancing between plants", recommendation: "Shift 15% volume to Plant B", impact: "Reduce bottleneck by 2 days", priority: "Medium", linkedView: "Operations" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  production: {
    metrics: [
      { label: "On-Time Rate", value: "94.2%", change: "-1.8%", trend: "down" },
      { label: "Quality Score", value: "98.5%", change: "+0.5%", trend: "up" },
      { label: "Throughput", value: "1.2M units", change: "-50K", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Optimized production sequence for hospital supply lines", impact: "Reduced changeover time by 12%", timestamp: "10:30 AM", severity: "positive", agentType: "Production Agent", beforeValue: "45 min", afterValue: "40 min", context: "Resequenced production batches to minimize changeover between similar products, reducing average changeover from 45 to 40 minutes.", chartData: [{ name: "Before", value: 45 }, { name: "After", value: 40 }, { name: "Target", value: 35 }] },
      { id: 2, title: "Generated production hold recommendation", impact: "Prevent $1.2M excess inventory", timestamp: "09:00 AM", severity: "warning", agentType: "Production Agent", beforeValue: "Running", afterValue: "Hold", context: "Demand signals indicate Lines 2 & 3 should be paused to prevent additional excess inventory buildup in hospital segment.", chartData: [{ name: "Line 1", value: 100 }, { name: "Line 2", value: 0 }, { name: "Line 3", value: 0 }, { name: "Line 4", value: 100 }] },
      { id: 3, title: "Updated batch scheduling based on demand signals", impact: "3 batches rescheduled", timestamp: "08:00 AM", severity: "positive", agentType: "Production Agent", beforeValue: "Original", afterValue: "Optimized", context: "Rescheduled 3 production batches to align with updated demand forecast, improving inventory flow.", chartData: [{ name: "Batch A", value: 1 }, { name: "Batch B", value: 2 }, { name: "Batch C", value: 3 }] }
    ],
    pendingReview: [
      { id: 1, title: "Approve production hold for Lines 2 & 3", recommendation: "Pause pending demand recovery confirmation", impact: "$1.2M excess prevention", priority: "High", linkedView: "Supply Planning" },
      { id: 2, title: "Review labor reallocation plan", recommendation: "Move 8 FTEs to packaging line", impact: "Maintain output with reduced demand", priority: "Medium", linkedView: "Operations" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  commercial: {
    metrics: [
      { label: "Order Fill Rate", value: "96.8%", change: "-0.5%", trend: "down" },
      { label: "Revenue at Risk", value: "$3.2M", change: "+$800K", trend: "down" },
      { label: "Customer Score", value: "4.2/5", change: "-0.1", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Generated customer fact pack for Fremont Health", impact: "Ready for Sales VP review", timestamp: "10:45 AM", severity: "positive", agentType: "Commercial Agent", beforeValue: "No Data", afterValue: "Complete", context: "Compiled comprehensive fact pack including demand history, inventory exposure, cost impact analysis, and proposed negotiation options.", chartData: [{ name: "History", value: 100 }, { name: "Exposure", value: 100 }, { name: "Options", value: 100 }] },
      { id: 2, title: "Identified alternative customer opportunities", impact: "3 accounts for excess inventory", timestamp: "09:30 AM", severity: "positive", agentType: "Commercial Agent", beforeValue: "0 Options", afterValue: "3 Accounts", context: "Analysis identified 3 potential accounts (MedCorp, HealthFirst, CarePlus) that could absorb excess inventory through promotional offers.", chartData: [{ name: "MedCorp", value: 450 }, { name: "HealthFirst", value: 320 }, { name: "CarePlus", value: 280 }] },
      { id: 3, title: "Analyzed stocking agreement terms impact", impact: "$2.4M exposure quantified", timestamp: "08:45 AM", severity: "warning", agentType: "Commercial Agent", beforeValue: "Unknown", afterValue: "$2.4M", context: "Quantified financial impact of extended stocking terms at Fremont Health, identifying $2.4M in excess inventory exposure.", chartData: [{ name: "Standard", value: 0.8 }, { name: "Extended", value: 2.4 }] }
    ],
    pendingReview: [
      { id: 1, title: "Review customer stocking agreement renegotiation", recommendation: "Propose 30-day from 45-day terms", impact: "$2.4M exposure reduction", priority: "High", linkedView: "Sales" },
      { id: 2, title: "Approve promotional pricing for excess inventory", recommendation: "10% discount on 5 SKUs", impact: "Move $450K inventory", priority: "Medium", linkedView: "Marketing" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  procurement: {
    metrics: [
      { label: "Supplier OTD", value: "89%", change: "-3%", trend: "down" },
      { label: "Open POs", value: "$4.8M", change: "+$1.2M", trend: "down" },
      { label: "Lead Time Avg", value: "18 days", change: "+3 days", trend: "down" }
    ],
    autoExecuted: [
      { id: 1, title: "Identified PO deferral opportunities", impact: "$1.8M in open orders eligible", timestamp: "10:15 AM", severity: "positive", agentType: "Procurement Agent", beforeValue: "$4.8M Open", afterValue: "$1.8M Defer", context: "Analyzed open purchase orders and identified $1.8M that can be deferred 30+ days without impacting production schedules.", chartData: [{ name: "Keep", value: 3.0 }, { name: "Defer", value: 1.8 }] },
      { id: 2, title: "Analyzed MOQ consolidation across 4 sites", impact: "$400K potential savings", timestamp: "09:30 AM", severity: "positive", agentType: "Procurement Agent", beforeValue: "Fragmented", afterValue: "Consolidated", context: "MOQ analysis shows consolidating Dialysis Concentrate orders across 4 sites can reduce excess by $400K through better volume leverage.", chartData: [{ name: "Site A", value: 100 }, { name: "Site B", value: 80 }, { name: "Site C", value: 120 }, { name: "Site D", value: 100 }] },
      { id: 3, title: "Flagged supplier lead time increases", impact: "3 critical suppliers affected", timestamp: "08:30 AM", severity: "warning", agentType: "Procurement Agent", beforeValue: "15 days", afterValue: "18 days", context: "Three critical suppliers have increased lead times by 3+ days, requiring safety stock adjustments to maintain service levels.", chartData: [{ name: "Supplier X", value: 18 }, { name: "Supplier Y", value: 20 }, { name: "Supplier Z", value: 17 }] }
    ],
    pendingReview: [
      { id: 1, title: "Approve PO deferrals for Dialysis Concentrate", recommendation: "Delay 2 orders by 30 days", impact: "$890K excess prevention", priority: "High", linkedView: "Supply Planning" },
      { id: 2, title: "Review MOQ negotiation strategy", recommendation: "Consolidate orders across sites", impact: "$400K cost reduction", priority: "Medium", linkedView: "Procurement" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  },
  quality: {
    metrics: [
      { label: "Defect Rate", value: "0.8%", change: "-0.2%", trend: "up" },
      { label: "NCRs Open", value: "12", change: "-3", trend: "up" },
      { label: "Compliance", value: "99.2%", change: "+0.3%", trend: "up" }
    ],
    autoExecuted: [
      { id: 1, title: "Completed batch release documentation review", impact: "15 batches approved", timestamp: "10:30 AM", severity: "positive", agentType: "Quality Agent", beforeValue: "Pending", afterValue: "15 Released", context: "Automated documentation review completed for 15 production batches, all meeting quality specifications for release.", chartData: [{ name: "Reviewed", value: 15 }, { name: "Approved", value: 15 }, { name: "Rejected", value: 0 }] },
      { id: 2, title: "Generated NCR aging report", impact: "3 NCRs approaching deadline", timestamp: "09:15 AM", severity: "warning", agentType: "Quality Agent", beforeValue: "12 Open", afterValue: "3 Critical", context: "NCR analysis identified 3 non-conformance reports approaching 30-day resolution deadline requiring immediate attention.", chartData: [{ name: "< 15 days", value: 5 }, { name: "15-25 days", value: 4 }, { name: "> 25 days", value: 3 }] },
      { id: 3, title: "Updated supplier quality scorecards", impact: "2 suppliers require review", timestamp: "08:00 AM", severity: "positive", agentType: "Quality Agent", beforeValue: "Outdated", afterValue: "Current", context: "Supplier quality scorecards updated with latest performance data. Suppliers X and Y flagged for quality improvement review.", chartData: [{ name: "A-Rated", value: 8 }, { name: "B-Rated", value: 4 }, { name: "C-Rated", value: 2 }] }
    ],
    pendingReview: [
      { id: 1, title: "Review supplier corrective action response", recommendation: "Assess adequacy of CAPA from Supplier X", impact: "Supply continuity risk", priority: "High", linkedView: "Procurement" },
      { id: 2, title: "Approve deviation for batch 2024-1247", recommendation: "Minor specification variance within tolerance", impact: "Release $280K inventory", priority: "Medium", linkedView: "Production" }
    ],
    crossFunctional: [], sopCandidates: [], copilotSuggestions: []
  }
}

// Functional views configuration
const functionalViews = [
  { id: "demand", name: "Demand Planning", icon: TrendingUp, color: "#1677FF" },
  { id: "supply", name: "Supply Planning", icon: Package, color: "#13C2C2" },
  { id: "capacity", name: "Capacity Planning", icon: Factory, color: "#FA8C16" },
  { id: "production", name: "Production", icon: Zap, color: "#722ED1" },
  { id: "commercial", name: "Commercial", icon: ShoppingCart, color: "#52C41A" },
  { id: "procurement", name: "Procurement", icon: Truck, color: "#EB2F96" },
  { id: "quality", name: "Quality", icon: ClipboardList, color: "#2F54EB" }
]

// Sample baseline plan content - S&OE focused
const baselineContent = {
  overview: {
    title: "Daily Supply Chain Health Scan (Today's Impact)",
    generatedAt: "7:00 AM Daily",
    description: "Auto-generated using latest ERP data, demand signals, supplier information, and planner overrides",
    coverage: ["Demand Planning", "Inventory Mgmt", "Sourcing", "Operations", "Sales", "Financial Impact"]
  },
  demand: {
    title: "Demand Planning View",
    sections: [
      {
        name: "Performance Overview",
        metrics: [
          { label: "Forecast Accuracy", value: "84.2%", change: "-3.1%" },
          { label: "Demand Variance", value: "$12.4M", change: "+$4.2M" },
          { label: "Accounts Flagged", value: "5", change: "+2" }
        ]
      },
      {
        name: "Drill-Down Visibility",
        items: [
          "Top variance accounts: Fremont Health, HCA Healthcare, Kaiser",
          "Segment risk: Hospital Network -28%",
          "NPI demand: New dialysis solution line launching Q2"
        ]
      },
      {
        name: "Agent Actions",
        actions: [
          { id: 1, type: "auto", text: "Generated demand variance analysis for top accounts", impact: "5 flagged", canRevert: true, canScenario: true },
          { id: 2, type: "pending", text: "Validate Fremont Health demand outlook for Q2", impact: "$2.4M at risk", canRevert: false, canScenario: false }
        ]
      },
      {
        name: "Recommendations",
        recommendations: [
          "Increase monitoring frequency for hospital network accounts",
          "Coordinate with Sales on Fremont Health relationship review"
        ]
      }
    ]
  },
  supply: {
    title: "Inventory Management View",
    sections: [
      {
        name: "Performance Overview",
        metrics: [
          { label: "Inventory Turns", value: "4.2x", change: "-0.3x" },
          { label: "Excess Inventory", value: "$7.1M", change: "+$2.8M" },
          { label: "Weeks of Cover", value: "8.4 wks", change: "+2.1 wks" }
        ]
      },
      {
        name: "Drill-Down Visibility",
        items: [
          "Customer stocking excess: $2.4M (Fremont Health)",
          "Demand drop excess: $3.8M (Hospital Network)",
          "MOQ excess: $890K (Dialysis Concentrate)"
        ]
      },
      {
        name: "Agent Actions",
        actions: [
          { id: 3, type: "auto", text: "Calculated excess inventory exposure by scenario", impact: "$7.1M total", canRevert: true, canScenario: true },
          { id: 4, type: "pending", text: "Approve inventory reduction targets for Q2", impact: "$4.2M goal", canRevert: false, canScenario: false }
        ]
      },
      {
        name: "Recommendations",
        recommendations: [
          "Prioritize customer agreement renegotiation for quick wins",
          "Implement consolidated purchasing for high-MOQ materials"
        ]
      }
    ]
  }
}

// Scenario plan data - S&OE focused
const scenarioData = {
  scenarios: [
    {
      id: 1,
      name: "Current State",
      description: "No action taken",
      status: "active",
      metrics: {
        patients: "$7.1M excess",
        veinToVein: "$280K/mo",
        onTimeRate: "8.4 wks",
        capacity: "4.2x turns"
      },
      impacts: { patients: 0, timeline: 0, onTime: 0 }
    },
    {
      id: 2,
      name: "Aggressive Reduction",
      description: "All mitigations executed",
      status: "simulated",
      metrics: {
        patients: "$2.9M excess",
        veinToVein: "$95K/mo",
        onTimeRate: "5.2 wks",
        capacity: "5.8x turns"
      },
      impacts: { patients: -4.2, timeline: -185, onTime: -3.2 }
    },
    {
      id: 3,
      name: "Conservative",
      description: "Low-risk actions only",
      status: "simulated",
      metrics: {
        patients: "$4.8M excess",
        veinToVein: "$185K/mo",
        onTimeRate: "6.8 wks",
        capacity: "4.9x turns"
      },
      impacts: { patients: -2.3, timeline: -95, onTime: -1.6 }
    },
    {
      id: 4,
      name: "Customer Focus",
      description: "Prioritize relationship",
      status: "pending",
      metrics: {
        patients: "$5.2M excess",
        veinToVein: "$210K/mo",
        onTimeRate: "7.2 wks",
        capacity: "4.6x turns"
      },
      impacts: { patients: -1.9, timeline: -70, onTime: -1.2 }
    }
  ]
}

// Execution plan data - S&OE focused
const executionPlanData = {
  decisions: [
    {
      id: 1,
      title: "Production hold for hospital supply lines 2 & 3",
      owner: "Operations Director",
      status: "executed",
      timestamp: "2024-01-15 10:32 AM",
      impact: "Prevents $1.2M excess buildup",
      approved: true
    },
    {
      id: 2,
      title: "Fremont Health stocking agreement negotiation",
      owner: "Sales VP",
      status: "submitted",
      timestamp: "2024-01-15 09:45 AM",
      impact: "Target: 30-day from 45-day",
      approved: false
    },
    {
      id: 3,
      title: "Dialysis Concentrate consolidated purchasing",
      owner: "Procurement Director",
      status: "approved",
      timestamp: "2024-01-15 09:15 AM",
      impact: "$400K savings potential",
      approved: true
    },
    {
      id: 4,
      title: "Inventory reserve for write-off risk",
      owner: "CFO",
      status: "pending",
      timestamp: "Awaiting input",
      impact: "$500K reserve",
      approved: false
    }
  ]
}

// Performance data
const performanceData = {
  planVsActual: [
    { metric: "Inventory Turns", planned: "5.0x", actual: "4.2x", variance: "-16%" },
    { metric: "Excess Inventory", planned: "$3.0M", actual: "$7.1M", variance: "+137%" },
    { metric: "Carrying Cost", planned: "$95K/mo", actual: "$280K/mo", variance: "+195%" },
    { metric: "Weeks of Cover", planned: "5.0 wks", actual: "8.4 wks", variance: "+68%" }
  ],
  insights: [
    { type: "alert", text: "Hospital network demand drop primary driver of excess - 28% forecast miss" },
    { type: "alert", text: "Customer stocking agreements creating structural excess - policy review needed" },
    { type: "positive", text: "MOQ consolidation opportunity identified - $400K potential savings" }
  ]
}

// Policies data
const policiesData = {
  rules: [
    {
      id: 1,
      name: "Excess Threshold Alert",
      description: "Flag SKUs with >6 weeks coverage for review",
      type: "threshold",
      status: "active"
    },
    {
      id: 2,
      name: "Auto-Execute Analysis",
      description: "Automatically generate exposure calculations and fact packs",
      type: "autonomy",
      status: "active"
    },
    {
      id: 3,
      name: "Escalation Trigger",
      description: "Excess exposure >$1M requires VP approval",
      type: "escalation",
      status: "active"
    },
    {
      id: 4,
      name: "Customer Impact Review",
      description: "Any action affecting top 10 accounts requires Sales VP sign-off",
      type: "governance",
      status: "active"
    }
  ]
}

// TODAY'S SIGNAL - Executive Dashboard Metrics
const todaysSignalData = {
  totalImpact: { value: "$7.1M", label: "Total Excess", icon: DollarSign, color: "#F5222D" },
  pendingDecisions: { value: "6", label: "Pending Decisions", icon: AlertTriangleIcon || AlertCircle, color: "#F5A623" },
  escalations: { value: "3", label: "VP Escalations", icon: AlertCircle, color: "#F5222D" },
  autoExecuted: { value: "12", label: "Auto-Executed", icon: Zap, color: "#1677FF" }
}

// Slider mapping: step to stage with timing descriptors
const timeSliderMap = [
  { time: "Step 1 - 24×7 Sensing & Auto Execution", stageId: "baseline", order: 1 },
  { time: "Step 2 - AI + Human Review", stageId: "opportunity", order: 2 },
  { time: "Step 3 - Execute & Track", stageId: "performance", order: 3 }
]

// Stage-driven decision flow data
const stageDecisionFlowData: Record<string, { autoExecuted: { count: number; impact: number }, plannerReview: { count: number }, sopEscalation: { count: number } }> = {
  baseline: { autoExecuted: { count: 12, impact: 7100000 }, plannerReview: { count: 2 }, sopEscalation: { count: 1 } },
  opportunity: { autoExecuted: { count: 9, impact: 4800000 }, plannerReview: { count: 5 }, sopEscalation: { count: 2 } },
  performance: { autoExecuted: { count: 4, impact: 1500000 }, plannerReview: { count: 3 }, sopEscalation: { count: 2 } }
}

// Stage-driven insights data for right panel
const stageInsightsData: Record<string, { strategy: string; dataSources: number; overrides: number; netImpact: number; marginImprovement: string; pendingReview: number }> = {
  baseline: { strategy: "Morning scan detected 3 excess inventory scenarios totaling $7.1M exposure. 12 actions auto-executed within policy guardrails.", dataSources: 12, overrides: 2, netImpact: 7100000, marginImprovement: "-$280K/mo", pendingReview: 2 },
  opportunity: { strategy: "18 opportunities identified across 9 types; 12 actions in progress with owners assigned.", dataSources: 15, overrides: 3, netImpact: 4800000, marginImprovement: "$4.8M target", pendingReview: 5 },
  performance: { strategy: "8 owners assigned across Sales, Procurement, Operations, and Finance.", dataSources: 18, overrides: 2, netImpact: 1500000, marginImprovement: "100% coverage", pendingReview: 3 }
}

export default function ProcessOrchestrationView() {
  const [activeStage, setActiveStage] = useState("baseline")
  const [sliderValue, setSliderValue] = useState(0)
  const [activeView, setActiveView] = useState("demand")
  const [activeSection, setActiveSection] = useState("auto")
  const [expandedInsight, setExpandedInsight] = useState<number | null>(null)
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)
  const [activityFilter, setActivityFilter] = useState<string>("system")
  
  // S&OP Modal state
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("a")
  const [modifyMode, setModifyMode] = useState(false)
  const [showExecutionBreakdown, setShowExecutionBreakdown] = useState(false)

  // Get current modal data based on selected alert
  const getModalData = () => {
    if (selectedAlertId === "customer-stocking-excess") return customerStockingScenarios
    if (selectedAlertId === "demand-drop-excess") return demandDropScenarios
    if (selectedAlertId === "supplier-moq-excess") return supplierMoqScenarios
    return null
  }

  const modalData = getModalData()
  const isSoeModal = selectedAlertId !== null
  
  // Get selected scenario
  const selectedScenario = modalData?.scenarios?.find(s => s.id === selectedScenarioId)

  // Handle alert click - open modal
  const handleAlertClick = (alertId: string) => {
    setSelectedAlertId(alertId)
    setSelectedScenarioId("a")
    setModifyMode(false)
    setShowExecutionBreakdown(false)
  }

  const closeModal = () => {
    setSelectedAlertId(null)
    setSelectedScenarioId("a")
    setModifyMode(false)
    setShowExecutionBreakdown(false)
  }
  
  // Get current functional view data
  const currentViewData = functionalViewData[activeView as keyof typeof functionalViewData]
  const viewConfig = functionalViews.find(v => v.id === activeView)
  const viewColor = viewConfig?.color || "#1677FF"

  // Update active stage when slider changes
  const handleSliderChange = (value: number) => {
    setSliderValue(value)
    setActiveStage(timeSliderMap[value].stageId)
  }

  // Toggle action expansion
  const toggleActionExpand = (id: number) => {
    setExpandedInsight(expandedInsight === id ? null : id)
  }

  const renderBaselineContent = () => {
    const viewConfig = functionalViews.find(v => v.id === activeView)
    const viewColor = viewConfig?.color || "#1677FF"

    return (
      <div className="space-y-6">
        {/* Overview card */}
        <Card className="p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">Daily Supply Chain Health Scan (Today's Impact)</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Auto-generated using latest ERP data, demand signals, customer orders, supplier information, and planner overrides
              </p>
            </div>
            <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FFF1F0", color: "#F5222D" }}>
              3 Excess Scenarios Detected
            </span>
          </div>

          {/* Functional View Tabs - Now Interactive */}
          <div className="flex flex-wrap gap-2 border-t pt-2">
            {functionalViews.map((view) => {
              const Icon = view.icon
              const isActive = activeView === view.id
              return (
                <button
                  key={view.id}
                  onClick={() => {
                    setActiveView(view.id)
                    setExpandedInsight(null)
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md ${
                    isActive
                      ? "shadow-md"
                      : "bg-white border border-gray-300 text-foreground hover:border-gray-400"
                  }`}
                  style={isActive ? { backgroundColor: view.color, color: "white" } : {}}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {view.name}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Performance Metrics for Selected View */}
        <div className="grid grid-cols-3 gap-4">
          {currentViewData.metrics.map((metric, idx) => (
            <Card key={idx} className="p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {metric.change}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 border-b pb-4 mb-6 overflow-x-auto">
          {[
            { id: "auto", label: "Auto-Executed", count: currentViewData.autoExecuted.length, color: "#52C41A" },
            { id: "pending", label: "Pending Review", count: currentViewData.pendingReview.length, color: "#F5A623" }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 flex-shrink-0 hover:shadow-md transform hover:scale-105 ${
                activeSection === section.id
                  ? "text-white shadow-md"
                  : "bg-white border border-gray-300 text-foreground hover:border-gray-400"
              }`}
              style={activeSection === section.id ? { backgroundColor: section.color } : {}}
            >
              {section.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeSection === section.id ? "bg-white/20" : "bg-gray-100"
              }`}>
                {section.count}
              </span>
            </button>
          ))}
        </div>

        {/* Auto-Executed Section */}
        {activeSection === "auto" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Auto-Executed Agent Actions</h4>
                <p className="text-xs text-muted-foreground mt-0.5">AI-driven analysis and calculations completed</p>
              </div>
              <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">{currentViewData.autoExecuted.length} completed</span>
            </div>
            {currentViewData.autoExecuted.map((action) => (
              <div key={action.id}>
                <Card 
                  className={`p-4 border-l-4 border-l-green-500 transition-all cursor-pointer hover:shadow-md ${
                    expandedInsight === action.id 
                      ? "bg-green-50 border-green-300" 
                      : "border-gray-200 bg-white hover:border-green-200"
                  }`}
                  onClick={() => toggleActionExpand(action.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="font-semibold text-sm text-gray-900">{action.title}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{action.agent}</span>
                      </div>
                      <p className="text-xs text-muted-foreground ml-7 leading-relaxed">{action.context}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className="text-sm font-bold text-green-600 whitespace-nowrap">{action.impact}</span>
                      {expandedInsight === action.id ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
                    </div>
                  </div>
                </Card>

                {/* Expanded Detail Card */}
                {expandedInsight === action.id && (
                  <Card className="p-5 border-2 border-green-200 bg-green-50 mt-2 ml-6 animate-in slide-in-from-top-2 duration-200 shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <h5 className="font-semibold text-gray-900">Action Details</h5>
                      <button onClick={(e) => { e.stopPropagation(); setExpandedInsight(null); }} className="p-1 hover:bg-white rounded transition-colors">
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {/* Before/After Comparison */}
                      <div>
                        <p className="text-xs text-gray-600 font-medium mb-3 uppercase tracking-wide">Before / After Comparison</p>
                        <div className="flex items-center gap-3">
                          <div className="text-center p-3 bg-white rounded-lg flex-1 border border-gray-200">
                            <p className="text-xs text-gray-500 font-medium">Before</p>
                            <p className="text-lg font-bold text-gray-700 mt-1">{action.beforeValue}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-green-500" />
                          <div className="text-center p-3 bg-white rounded-lg flex-1 border border-green-300">
                            <p className="text-xs text-green-600 font-medium">After</p>
                            <p className="text-lg font-bold text-green-700 mt-1">{action.afterValue}</p>
                          </div>
                        </div>
                        
                        {/* Mini Chart */}
                        <div className="mt-4 bg-white p-3 rounded-lg">
                          <ResponsiveContainer width="100%" height={100}>
                            <RechartsBarChart data={action.chartData}>
                              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                              <YAxis hide />
                              <Bar dataKey="value" fill="#52C41A" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Context & Actions */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-600 font-medium mb-1 uppercase tracking-wide">Context</p>
                          <p className="text-sm text-gray-700">{action.context}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-green-200">
                          <button className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white hover:bg-gray-50 flex items-center gap-1 transition-colors">
                            <RotateCcw className="h-3 w-3" />
                            Revert
                          </button>
                          <button className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white hover:bg-gray-50 flex items-center gap-1 transition-colors">
                            <Layers className="h-3 w-3" />
                            Create Scenario
                          </button>
                          <button className="px-3 py-1.5 text-xs font-medium rounded border border-gray-300 bg-white hover:bg-gray-50 flex items-center gap-1 transition-colors">
                            <FileText className="h-3 w-3" />
                            View History
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pending Review Section */}
        {activeSection === "pending" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Pending Planner Review</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Awaiting decision or approval</p>
              </div>
              <span className="text-sm text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">{currentViewData.pendingReview.filter(p => p.priority === "High").length} high priority</span>
            </div>
            {currentViewData.pendingReview.map((item) => {
              const priorityConfig = {
                High: { border: "border-l-red-500", bg: "bg-red-50", badge: "bg-red-100 text-red-700" },
                Medium: { border: "border-l-amber-500", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700" },
                Low: { border: "border-l-gray-400", bg: "bg-gray-50", badge: "bg-gray-100 text-gray-700" }
              }
              const config = priorityConfig[item.priority as keyof typeof priorityConfig] || priorityConfig.Low
              
              return (
                <Card key={item.id} className={`p-4 border-l-4 border border-gray-200 ${config.border} ${config.bg} hover:shadow-md transition-all`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${config.badge}`}>
                          {item.priority}
                        </span>
                        <span className="font-semibold text-sm text-gray-900">{item.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{item.reason}</p>
                      <p className="text-xs text-gray-500">Due by: <span className="font-semibold text-gray-700">{item.dueBy}</span></p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 font-medium">Impact</p>
                        <p className="text-sm font-bold text-gray-900">{item.impact}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 rounded bg-green-100 hover:bg-green-200 transition-colors hover:scale-110 transform duration-150" title="Approve">
                          <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
                        </button>
                        <button className="p-2 rounded bg-red-100 hover:bg-red-200 transition-colors hover:scale-110 transform duration-150" title="Reject">
                          <ThumbsDown className="h-3.5 w-3.5 text-red-700" />
                        </button>
                        <button className="p-2 rounded bg-blue-100 hover:bg-blue-200 transition-colors hover:scale-110 transform duration-150" title="Modify">
                          <Edit3 className="h-3.5 w-3.5 text-blue-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}



      </div>
    )
  }

  const renderOpportunityContent = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <OpportunityOrchestrationView />
    </div>
  )

  const renderPerformanceContent = () => (
    <div className="space-y-6">
      {/* KPI Metrics Row */}
      <div className="grid grid-cols-6 gap-4">
        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase">Total Excess</h4>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">$71.9M</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-$1.3M (-1.8%)</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Risk through 12/30/2026</p>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase">Actionable</h4>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">$32.3M</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-$344.8K (-1.1%)</span>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase">Reviewed</h4>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">$29.2M</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-$175.0K (-0.6%)</span>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase">Committed</h4>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">$13.8M</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-$74.4K (-0.5%)</span>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-xs font-semibold text-gray-600 uppercase">Escalated</h4>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">$2.5M</p>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-semibold">35</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-red-600">-$209.3K (-7.8%)</span>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xs font-semibold text-gray-600 uppercase">Cumulative Actioned</h4>
            <button className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-2">
            <p className="text-2xl font-bold text-gray-900">$29.8M</p>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-green-600">+$141.4K (+0.5%)</span>
          </div>
        </Card>
      </div>

      {/* Disposition Status Legend */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-6 flex-wrap">
          <span className="text-sm font-semibold text-gray-700">Disposition Status:</span>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Actioned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-600">Escalated / Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-400"></div>
              <span className="text-sm text-gray-600">Escalation Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Rejected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span className="text-sm text-gray-600">Not yet assessed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.5) 2px, rgba(0,0,0,.5) 4px)'}}></div>
              <span className="text-sm text-gray-600">New items from prior week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4 border border-gray-200">
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-1">Excess Inventory by Segment</h4>
            <p className="text-xs text-gray-600">Disposition status trending of Excess PO Risk by 12/2026 | Track progress of disposioning and rescheduling over time</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={[
                  { week: "Nov W1", actioned: 1.2, inProgress: 0.3, escalated: 0.4, approved: 0, rejected: 2.1, notAssessed: 1.8, newItems: 0.5 },
                  { week: "Nov W2", actioned: 2.4, inProgress: 0.5, escalated: 0.6, approved: 0, rejected: 3.2, notAssessed: 1.4, newItems: 0.4 },
                  { week: "Nov W3", actioned: 3.8, inProgress: 0.4, escalated: 0.5, approved: 0, rejected: 4.1, notAssessed: 1.1, newItems: 0.3 },
                  { week: "Dec W1", actioned: 5.2, inProgress: 0.6, escalated: 0.7, approved: 0, rejected: 5.8, notAssessed: 0.8, newItems: 0.4 },
                  { week: "Dec W2", actioned: 7.1, inProgress: 0.8, escalated: 0.9, approved: 0, rejected: 7.4, notAssessed: 0.6, newItems: 0.5 },
                  { week: "Dec W3", actioned: 8.9, inProgress: 1.2, escalated: 1.4, approved: 0, rejected: 9.2, notAssessed: 0.5, newItems: 0.6 },
                  { week: "Jan W1", actioned: 10.2, inProgress: 1.5, escalated: 1.8, approved: 0, rejected: 10.8, notAssessed: 0.4, newItems: 0.8 },
                  { week: "Jan W2", actioned: 11.9, inProgress: 1.9, escalated: 2.5, approved: 0, rejected: 12.9, notAssessed: 3.9, newItems: 2.3 }
                ]}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(1)}M`, '']} />
                <Bar dataKey="actioned" stackId="a" fill="#22c55e" name="Actioned" />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
                <Bar dataKey="escalated" stackId="a" fill="#f59e0b" name="Escalated" />
                <Bar dataKey="approved" stackId="a" fill="#ec4899" name="Approved" />
                <Bar dataKey="rejected" stackId="a" fill="#ef4444" name="Rejected" />
                <Bar dataKey="notAssessed" stackId="a" fill="#9ca3af" name="Not Assessed" />
                <Bar dataKey="newItems" stackId="a" fill="#374151" name="New Items" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <div><span className="text-green-600">Actioned</span> <span className="text-gray-600">($11.9M)</span></div>
              <div><span className="text-blue-600">In Progress</span> <span className="text-gray-600">($1.9M)</span></div>
              <div><span className="text-amber-600">Escalated / Pending</span> <span className="text-gray-600">($2.5M)</span></div>
              <div><span className="text-pink-600">Escalation Approved</span> <span className="text-gray-600">($0)</span></div>
              <div><span className="text-red-600">Rejected</span> <span className="text-gray-600">($12.9M)</span></div>
              <div><span className="text-gray-500">Not yet assessed</span> <span className="text-gray-600">($3.9M)</span></div>
              <div><span className="text-gray-700">New items from prior week</span> <span className="text-gray-600">($2.3M)</span></div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border border-gray-200">
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-1">Expiry Risk by Time Fence</h4>
            <p className="text-xs text-gray-600">Excess PO Risk by 12/2026 by days until PO enters time fence | Focus on POs entering the fence soon with high excess value</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  dataKey="daysToFence" 
                  name="Days to Fence" 
                  tick={{ fontSize: 10 }} 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Days until Time Fence Entry', position: 'bottom', fontSize: 10, offset: -5 }}
                  domain={[0, 90]}
                />
                <YAxis 
                  type="number" 
                  dataKey="excessValue" 
                  name="Excess Value" 
                  tick={{ fontSize: 10 }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(v) => `$${v}K`}
                  domain={[0, 500]}
                />
                <ZAxis type="number" dataKey="poCount" range={[50, 400]} name="PO Count" />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === 'Excess Value') return [`$${value}K`, name]
                    if (name === 'Days to Fence') return [`${value} days`, name]
                    return [value, name]
                  }}
                />
                <Scatter 
                  name="POs" 
                  data={[
                    { daysToFence: 5, excessValue: 420, poCount: 18, status: 'critical' },
                    { daysToFence: 8, excessValue: 280, poCount: 12, status: 'critical' },
                    { daysToFence: 12, excessValue: 350, poCount: 15, status: 'high' },
                    { daysToFence: 15, excessValue: 180, poCount: 8, status: 'high' },
                    { daysToFence: 22, excessValue: 240, poCount: 22, status: 'medium' },
                    { daysToFence: 28, excessValue: 310, poCount: 28, status: 'medium' },
                    { daysToFence: 35, excessValue: 150, poCount: 14, status: 'medium' },
                    { daysToFence: 42, excessValue: 200, poCount: 18, status: 'low' },
                    { daysToFence: 55, excessValue: 120, poCount: 24, status: 'low' },
                    { daysToFence: 62, excessValue: 180, poCount: 20, status: 'low' },
                    { daysToFence: 70, excessValue: 90, poCount: 16, status: 'low' },
                    { daysToFence: 78, excessValue: 140, poCount: 11, status: 'low' }
                  ]}
                >
                  {[
                    { daysToFence: 5, status: 'critical' },
                    { daysToFence: 8, status: 'critical' },
                    { daysToFence: 12, status: 'high' },
                    { daysToFence: 15, status: 'high' },
                    { daysToFence: 22, status: 'medium' },
                    { daysToFence: 28, status: 'medium' },
                    { daysToFence: 35, status: 'medium' },
                    { daysToFence: 42, status: 'low' },
                    { daysToFence: 55, status: 'low' },
                    { daysToFence: 62, status: 'low' },
                    { daysToFence: 70, status: 'low' },
                    { daysToFence: 78, status: 'low' }
                  ].map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.status === 'critical' ? '#ef4444' : 
                        entry.status === 'high' ? '#f59e0b' : 
                        entry.status === 'medium' ? '#3b82f6' : '#22c55e'
                      } 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span><span>Critical (0-10 days)</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span><span>High (11-20 days)</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span><span>Medium (21-40 days)</span></div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span><span>Low (40+ days)</span></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Date Range and Summary */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-gray-600">From:</span>
            <span className="font-semibold">11/03/2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-gray-600">To:</span>
            <span className="font-semibold">03/16/2026</span>
          </div>
          <div className="text-gray-600">134 days | 12 snapshots loaded</div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-gray-600">Next 7 days:</span>
            <span className="font-semibold ml-2">64 POs · $2.6M</span>
          </div>
          <div>
            <span className="text-gray-600">Next 14 days:</span>
            <span className="font-semibold ml-2">118 POs · $4.0M</span>
          </div>
          <div>
            <span className="text-gray-600">Next 30 days:</span>
            <span className="font-semibold ml-2">206 POs · $9.0M</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-0">
      {/* 1. HERO BANNER - Dark banner with centered content */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Agentic S&OE Decision Orchestration</h1>
            <p className="text-blue-200 text-sm">Always-on sensing, intelligence, execution, and impact realization across the supply chain</p>
          </div>
          <div className="text-right flex-shrink-0 ml-6">
            <div className="flex items-center gap-2 justify-end mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs font-medium text-white">System Active</span>
            </div>
            <p className="text-xs text-slate-400">Last sync: Today 7:15 AM</p>
          </div>
        </div>
      </div>

      {/* 2. S&OE DECISION FLOW BANNER - Full width, single row with descriptions */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <div className="grid grid-cols-3 gap-3">
          {planningStages.map((stage) => {
            const Icon = stage.icon
            const insights = lifecycleInsights[stage.id as keyof typeof lifecycleInsights]
            const isActive = activeStage === stage.id
            
            // Determine stage status based on slider position
            const stageOrder = stage.order || 0
            const currentTimeOrder = timeSliderMap[sliderValue]?.order || 0
            let stageStatus = "pending"
            if (stageOrder < currentTimeOrder) stageStatus = "completed"
            if (stageOrder === currentTimeOrder) stageStatus = "in-progress"
            
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStage(stage.id)
                  const index = timeSliderMap.findIndex(item => item.stageId === stage.id)
                  if (index !== -1) setSliderValue(index)
                }}
                className={cn(
                  "flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border-2 transition-all duration-200 text-center relative overflow-hidden",
                  isActive
                    ? "border-current shadow-lg scale-105"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-md",
                  stageStatus === "completed" && !isActive && "opacity-60"
                )}
                style={{
                  borderColor: isActive ? stage.color : undefined,
                  backgroundColor: isActive ? `${stage.color}10` : undefined,
                }}
              >
                {/* Top accent bar for active card */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: stage.color }}
                  />
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isActive ? "scale-110" : ""
                }`} style={{
                  backgroundColor: `${stage.color}25`
                }}>
                  <Icon className="h-4 w-4" style={{ color: stage.color }} />
                </div>
                <h3 className="font-bold text-xs leading-tight">{stage.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{stage.cxoLabel}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. MAIN FULL-WIDTH LAYOUT */}
      <div className="space-y-8">
        {/* Stage-driven content */}
        {activeStage === "baseline" ? (
          renderBaselineContent()
        ) : activeStage === "opportunity" ? (
          renderOpportunityContent()
        ) : activeStage === "performance" ? (
          renderPerformanceContent()
        ) : null}
      </div>

      {/* S&OE Analyze Modal */}
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
                <div className="p-2.5 rounded-xl bg-red-100">
                  <Package className="h-5 w-5 text-red-600" />
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

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* Issue Summary Cards */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <p className="text-xs text-gray-500 mb-1">Exposure</p>
                  <p className="text-xl font-bold text-red-600">{modalData.issue.impact}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                  <p className="text-xs text-gray-500 mb-1">Units/SKUs Impacted</p>
                  <p className="text-lg font-bold text-amber-600">{modalData.issue.unitsImpacted || (modalData.issue as any).q1Revenue}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <p className="text-xs text-gray-500 mb-1">Account/Scope</p>
                  <p className="text-lg font-bold text-blue-600">{modalData.issue.accountsAtRisk || (modalData.issue as any).coverage}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Constraint/Opportunity</p>
                  <p className="text-xs font-semibold text-gray-700">{modalData.issue.constraint}</p>
                </div>
              </div>

              {/* Key Drivers */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Drivers</h3>
                <div className="grid grid-cols-4 gap-3">
                  {modalData.drivers.map((driver, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border ${
                        driver.type === "positive" 
                          ? "bg-green-50 border-green-200" 
                          : driver.type === "critical"
                          ? "bg-red-50 border-red-200"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <p className="text-xs text-gray-600 mb-1">{driver.name}</p>
                      <p className={`text-sm font-bold ${
                        driver.type === "positive" ? "text-green-600" : 
                        driver.type === "critical" ? "text-red-600" : "text-amber-600"
                      }`}>
                        {driver.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scenario Comparison */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Scenario Options</h3>
                <div className="grid grid-cols-3 gap-4">
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
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Impact</span>
                          <span className="font-semibold text-green-600">{scenario.revenueProtected || (scenario as any).revenue}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Cost/Margin</span>
                          <span className="font-semibold text-red-600">{scenario.marginImpact || (scenario as any).coverage}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Timeline</span>
                          <span className="font-semibold text-gray-900">{scenario.timeline}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Risk</span>
                          <span className={`font-semibold ${
                            scenario.risk.includes("High") ? "text-red-600" : 
                            scenario.risk.includes("Medium") ? "text-amber-600" : "text-green-600"
                          }`}>{scenario.risk}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-200 pt-2">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase mb-1.5">Key Actions</p>
                        <ul className="space-y-1">
                          {scenario.actions.slice(0, 3).map((action, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                              <CheckCircle2 className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Breakdown */}
              {showExecutionBreakdown && selectedScenario && (
                <div className="mb-6 border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <h3 className="text-sm font-bold text-gray-900">Execution Plan</h3>
                    </div>
                    <p className="text-xs text-gray-600">
                      Execution plan generated: {selectedScenario.agentActions?.length || 0} agent actions, {selectedScenario.plannerActions?.length || 0} planner approvals
                    </p>
                  </div>

                  {/* Agent Actions Section */}
                  <div className="mb-6">
                    <div className="mb-3">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-600" />
                        Agent Actions
                        <span className="text-blue-600 font-semibold ml-auto">{selectedScenario.agentActions?.length || 0} autonomous actions</span>
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {selectedScenario.agentActions?.map((action, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-blue-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-gray-900">{action.role}</span>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                  action.status === "Auto" ? "bg-green-200 text-green-800" :
                                  action.status === "In Progress" ? "bg-blue-200 text-blue-800" :
                                  "bg-gray-200 text-gray-800"
                                }`}>
                                  {action.status}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-gray-900 mb-0.5">{action.action}</p>
                              <p className="text-xs text-gray-700">{action.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Planner Actions Section */}
                  <div>
                    <div className="mb-3">
                      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
                        <Users className="h-4 w-4 text-amber-600" />
                        Planner Actions
                        <span className="text-amber-600 font-semibold ml-auto">{selectedScenario.plannerActions?.length || 0} approvals required</span>
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {selectedScenario.plannerActions?.map((action, idx) => (
                        <div key={idx} className="p-3 rounded-lg border border-amber-100 bg-amber-50 hover:bg-amber-100 transition-colors">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                              <Users className="h-3 w-3 text-amber-700" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-gray-900">{action.role}</span>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                  action.status === "Pending Review" ? "bg-amber-200 text-amber-800" :
                                  action.status === "Awaiting Approval" ? "bg-orange-200 text-orange-800" :
                                  "bg-gray-200 text-gray-800"
                                }`}>
                                  {action.status}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-gray-900 mb-0.5">{action.action}</p>
                              <p className="text-xs text-gray-700">{action.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
              <div className="flex items-center gap-3">
                {!showExecutionBreakdown ? (
                  <Button
                    onClick={() => setShowExecutionBreakdown(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Execution Plan
                  </Button>
                ) : (
                  <Button
                    onClick={closeModal}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve & Execute
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
