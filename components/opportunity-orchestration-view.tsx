"use client"

import { useState } from "react"
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
  ArrowLeft,
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
  Shield,
  Timer,
  CircleDot,
  Filter,
  Search,
  LayoutGrid,
  List,
  Send,
  Paperclip,
  Calendar,
  MapPin,
  Hash,
  Globe,
  Tag,
  Check,
  Ban,
  FileX,
  ArrowRightLeft,
  Pause,
  ClipboardCheck
} from "lucide-react"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type OpportunityType = 
  | "inventory-health"
  | "safety-stock"
  | "lead-time"
  | "moq"
  | "phase-in-out"
  | "npi-nci"
  | "forecast-revision"
  | "supplier-constraint"
  | "site-consolidation"

type ActionStatus = "to-execute" | "in-review" | "executed" | "blocked" | "waiting-approval"

type RoleType = "supply-planner" | "demand-planner" | "sales-account-manager" | "sourcing-manager" | "commercial-vp"

type Severity = "critical" | "high" | "medium" | "low"

interface Opportunity {
  id: string
  type: OpportunityType
  title: string
  severity: Severity
  financialImpact: string
  impactDetail: string
  product?: string
  customer?: string
  site?: string
  trigger: string
  triggerDetail: string[]
  recommendedAction: string
  owner: string
  ownerRole: string
  status: ActionStatus
  dueDate: string
  executionType: "auto" | "manual" | "approval"
  assignedRoles: RoleType[]
  detectionLogic?: string
  hasScenario: boolean
  scenarioId?: string
}

interface KPIData {
  label: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  color: string
}

// ============================================================================
// DATA
// ============================================================================

// KPI Banner Data
const kpiData: KPIData[] = [
  { label: "Combined Scenario Value (Yr 1)", value: "~$50M", change: "7 scenarios", trend: "up", icon: DollarSign, color: "#52C41A" },
  { label: "Inventory Days Reduction", value: "345 → 337", change: "8 days", trend: "up", icon: TrendingDown, color: "#FA8C16" },
  { label: "Scenarios Active", value: "7", change: "pending decision", trend: "neutral", icon: Lightbulb, color: "#722ED1" },
  { label: "Human Approval Required", value: "4", change: "of 7 scenarios", trend: "neutral", icon: AlertCircle, color: "#F5222D" }
]

// Role-specific KPI adjustments
const roleKpiAdjustments: Record<RoleType, Partial<KPIData>[]> = {
  "supply-planner": [
    { label: "My Actions", value: "6", change: "+2", trend: "up" },
    { label: "Pending Review", value: "3", change: "-1", trend: "up" },
    { label: "Due Today", value: "2", change: "0", trend: "neutral" },
    { label: "Completed This Week", value: "4", change: "+1", trend: "up" },
    { label: "Blocked", value: "1", change: "0", trend: "neutral" }
  ],
  "demand-planner": [
    { label: "Forecast Variances", value: "5", change: "+2", trend: "down" },
    { label: "Volume Validations", value: "8", change: "+3", trend: "up" },
    { label: "Planning Impact", value: "$4.2M", change: "+$1.1M", trend: "down" },
    { label: "Confidence Reviews", value: "3", change: "+1", trend: "up" },
    { label: "NPI Forecasts", value: "2", change: "0", trend: "neutral" }
  ],
  "sales-account-manager": [
    { label: "Customer Issues", value: "4", change: "+1", trend: "down" },
    { label: "Fact Packs Needed", value: "2", change: "+1", trend: "down" },
    { label: "Negotiations Active", value: "3", change: "+1", trend: "up" },
    { label: "Cost Exposure", value: "$2.4M", change: "+$180K", trend: "down" },
    { label: "Meetings Scheduled", value: "2", change: "+1", trend: "up" }
  ],
  "sourcing-manager": [
    { label: "Supplier Issues", value: "3", change: "+1", trend: "down" },
    { label: "MOQ Opportunities", value: "4", change: "+2", trend: "up" },
    { label: "Lead Time Gaps", value: "5", change: "+1", trend: "down" },
    { label: "Negotiations Pending", value: "2", change: "+1", trend: "up" },
    { label: "Contract Reviews", value: "1", change: "0", trend: "neutral" }
  ],
  "commercial-vp": [
    { label: "Escalations", value: "3", change: "+1", trend: "down" },
    { label: "Pending Approvals", value: "5", change: "+2", trend: "down" },
    { label: "Total Exposure", value: "$7.1M", change: "+$2.8M", trend: "down" },
    { label: "Cost Avoidance Target", value: "$4.2M", change: "+$800K", trend: "up" },
    { label: "Executive Actions", value: "2", change: "+1", trend: "up" }
  ]
}

// Opportunity Type Configuration
const opportunityTypes: { id: OpportunityType; label: string; icon: React.ElementType; color: string }[] = [
  { id: "inventory-health", label: "Inventory Health", icon: Package, color: "#F5222D" },
  { id: "safety-stock", label: "Safety Stock", icon: Shield, color: "#FA8C16" },
  { id: "lead-time", label: "Lead Time", icon: Timer, color: "#722ED1" },
  { id: "moq", label: "MOQ", icon: Layers, color: "#13C2C2" },
  { id: "phase-in-out", label: "Phase In/Out", icon: RefreshCw, color: "#EB2F96" },
  { id: "npi-nci", label: "NPI/NCI", icon: Zap, color: "#1677FF" },
  { id: "forecast-revision", label: "Forecast Revision", icon: TrendingDown, color: "#F5222D" },
  { id: "supplier-constraint", label: "Supplier Constraint", icon: Truck, color: "#FA8C16" },
  { id: "site-consolidation", label: "Site Consolidation", icon: Building2, color: "#52C41A" }
]

// Action Status Configuration
const actionStatusConfig: Record<ActionStatus, { label: string; color: string; bgColor: string }> = {
  "to-execute": { label: "To Execute", color: "#1677FF", bgColor: "bg-blue-100 text-blue-700" },
  "in-review": { label: "In Review", color: "#FA8C16", bgColor: "bg-amber-100 text-amber-700" },
  "executed": { label: "Executed", color: "#52C41A", bgColor: "bg-green-100 text-green-700" },
  "blocked": { label: "Blocked", color: "#F5222D", bgColor: "bg-red-100 text-red-700" },
  "waiting-approval": { label: "Waiting Approval", color: "#722ED1", bgColor: "bg-purple-100 text-purple-700" }
}

// Role Configuration
const roleConfig: { id: RoleType; label: string; icon: React.ElementType }[] = [
  { id: "supply-planner", label: "Supply Planner", icon: Factory },
  { id: "demand-planner", label: "Demand Planner", icon: TrendingUp },
  { id: "sales-account-manager", label: "Sales Account Manager", icon: ShoppingCart },
  { id: "sourcing-manager", label: "Sourcing Manager", icon: Truck },
  { id: "commercial-vp", label: "Commercial VP", icon: Briefcase }
]

// Action Workflow Stages
const workflowStages = [
  { id: "detect", label: "Detect Opportunity", icon: AlertCircle, color: "#F5222D" },
  { id: "quantify", label: "Quantify Exposure", icon: Calculator, color: "#FA8C16" },
  { id: "recommend", label: "Recommend Action", icon: Lightbulb, color: "#1677FF" },
  { id: "assign", label: "Assign Owner", icon: UserCheck, color: "#13C2C2" },
  { id: "review", label: "Review/Approve", icon: Eye, color: "#722ED1" },
  { id: "execute", label: "Execute", icon: Play, color: "#52C41A" },
  { id: "track", label: "Track Benefit", icon: Target, color: "#52C41A" }
]

// Fresenius Scenario Data - 7 Scenarios
const opportunitiesData: Opportunity[] = [
  {
    id: "fres-001",
    type: "inventory-health",
    title: "Clinic-Level Over-Stock – ESAs / Mircera / EPO (2,700 US Clinics)",
    severity: "critical",
    financialImpact: "$3.1M/yr expiry elimination",
    impactDetail: "$4.2M in units with <90 days to expiry",
    site: "2,700 US Clinics",
    trigger: "Elevated clinic ordering patterns above patient utilization",
    triggerDetail: [
      "38% of clinics carry >21-day ESA supply vs. 14-day target",
      "$4.2M in Mircera/EPO units identified with <90 days to expiry",
      "Average order quantity exceeds actual patient utilisation by +34%",
      "No centralised par management in place across clinic network"
    ],
    recommendedAction: "Deploy AI Par Management across all 2,700 clinics",
    owner: "Clinic Supply Lead",
    ownerRole: "supply-planner",
    status: "waiting-approval",
    dueDate: "Jun 1, 2026",
    executionType: "approval",
    assignedRoles: ["supply-planner", "demand-planner", "commercial-vp"],
    detectionLogic: "AI flagged 38% of clinics above 21-day ESA par; cross-referenced patient utilisation data showing +34% over-ordering pattern and $4.2M near-expiry exposure.",
    hasScenario: true,
    scenarioId: "clinic-overstock"
  },
  {
    id: "fres-002",
    type: "supplier-constraint",
    title: "Supply Disruption Response Inventory – IV Fluids & PD Solutions",
    severity: "critical",
    financialImpact: "$18M/event prevented",
    impactDetail: "$18M projected 30-day excess cost",
    site: "142 Regional DCs",
    trigger: "Uncoordinated surge ordering triggered by supplier alert",
    triggerDetail: [
      "News/supplier alert triggers +280% order surge across 142 regional DCs within 48 hours",
      "Projected 30-day excess inventory cost: $18M",
      "FME international PD manufacturing ramp capacity: +40% within 72 hours",
      "No cross-DC coordination or central override mechanism active"
    ],
    recommendedAction: "Centralise ordering + activate internal PD manufacturing ramp",
    owner: "Supply Chain VP",
    ownerRole: "supply-planner",
    status: "to-execute",
    dueDate: "May 13, 2026",
    executionType: "approval",
    assignedRoles: ["supply-planner", "sourcing-manager", "commercial-vp"],
    detectionLogic: "Real-time order velocity monitoring detected +280% surge across 142 DCs within 48h of supplier alert. AI projected $18M excess if unchecked and identified +40% internal ramp capacity available.",
    hasScenario: true,
    scenarioId: "panic-stocking"
  },
  {
    id: "fres-003",
    type: "site-consolidation",
    title: "Regional DC Imbalance – FX-Class Dialyzers & Bicarbonate Concentrates",
    severity: "high",
    financialImpact: "$2.8M vs $34K inter-DC transfer",
    impactDetail: "West DC 62 days on-hand; Southeast DC 18 days (critical)",
    site: "West DC / Southeast DC",
    trigger: "No rebalancing triggered despite severe network stock imbalance",
    triggerDetail: [
      "West DC: 62 days on-hand, 24 days above target",
      "Southeast DC: 18 days on-hand, below critical threshold",
      "Inter-DC freight cost ($34K) far cheaper than fresh production ($2.8M)",
      "No automated rebalancing rule active for FX-class dialyzers"
    ],
    recommendedAction: "Execute inter-DC transfer and suspend associated production order",
    owner: "Network Planning Director",
    ownerRole: "supply-planner",
    status: "to-execute",
    dueDate: "May 9, 2026",
    executionType: "auto",
    assignedRoles: ["supply-planner", "sourcing-manager"],
    detectionLogic: "Network inventory scan identified 24-day excess at West DC and critical-low at Southeast DC for same SKU class. Cost modelling confirmed inter-DC transfer at $34K vs. $2.8M new production.",
    hasScenario: true,
    scenarioId: "dc-imbalance"
  },
  {
    id: "fres-004",
    type: "phase-in-out",
    title: "Demand Shift & Product Expiry Risk – Legacy HD Bloodlines (5008X Rollout)",
    severity: "high",
    financialImpact: "$6.4M stranded legacy inventory",
    impactDetail: "5008X CAREsystem adoption +22% ahead of plan",
    product: "Legacy HD Bloodlines",
    site: "28 States",
    trigger: "5008X rollout acceleration stranding legacy HD bloodlines",
    triggerDetail: [
      "5008X CAREsystem adoption running +22% ahead of plan across 28 states",
      "Legacy bloodline consumption down -38% over 6 months",
      "$6.4M stranded legacy inventory value",
      "Expiry risk accelerating as legacy usage collapses"
    ],
    recommendedAction: "Dual-track: reroute legacy stock to slower-adoption markets + accelerate 5008X supply build",
    owner: "Product Transition Manager",
    ownerRole: "demand-planner",
    status: "in-review",
    dueDate: "May 16, 2026",
    executionType: "approval",
    assignedRoles: ["demand-planner", "supply-planner", "sales-account-manager"],
    detectionLogic: "AI tracked 5008X adoption velocity at +22% ahead of plan in 28 states; correlated with -38% legacy bloodline consumption drop over 6 months, flagging $6.4M stranded inventory exposure.",
    hasScenario: true,
    scenarioId: "demand-shift-expiry"
  },
  {
    id: "fres-005",
    type: "moq",
    title: "Supplier Raw Material Excess & Open POs – Manufacturing Plant",
    severity: "high",
    financialImpact: "$1.6M+ immediate cost avoidance",
    impactDetail: "$4.8M projected carrying cost over 90 days",
    product: "Raw Materials – Dialysis Manufacturing",
    site: "Manufacturing Plant",
    trigger: "Production schedule cut -18% with open POs adding further excess",
    triggerDetail: [
      "Production schedule revised -18% vs. prior plan",
      "On-hand RM coverage: 74 days vs. 45-day target",
      "3 active POs will add further excess coverage if not acted on",
      "Projected excess carrying cost: $4.8M over 90 days"
    ],
    recommendedAction: "Cancel PO-A, reduce PO-B quantity, push PO-C delivery date",
    owner: "Procurement Director",
    ownerRole: "sourcing-manager",
    status: "waiting-approval",
    dueDate: "May 10, 2026",
    executionType: "approval",
    assignedRoles: ["sourcing-manager", "supply-planner", "commercial-vp"],
    detectionLogic: "Production plan revision of -18% detected. AI recalculated RM coverage at 74 days (vs. 45-day target) and modelled 3 open POs adding further excess—projected $4.8M carrying cost over 90 days.",
    hasScenario: true,
    scenarioId: "rm-excess-pos"
  },
  {
    id: "fres-006",
    type: "forecast-revision",
    title: "Systematic Clinic Over-Demand Signal Inflation – 47 Clinics",
    severity: "high",
    financialImpact: "$2.3M/month demand quality improvement",
    impactDetail: "DC replenishment inflated by $2.3M/month",
    site: "47 Clinics / Regional DCs",
    trigger: ">6 months of order-to-actual variance above +25% across 47 clinics",
    triggerDetail: [
      "47 clinics with >6 consecutive months of order-to-actual variance above +25%",
      "22,400 excess dialyzer units/month submitted in inflated orders",
      "8,100 excess ESA doses/month in inflated orders",
      "DC replenishment inflated by $2.3M/month as a result"
    ],
    recommendedAction: "Apply AI demand correction, introduce clinic scorecard, recalibrate DC replenishment",
    owner: "Demand Planning Lead",
    ownerRole: "demand-planner",
    status: "in-review",
    dueDate: "May 20, 2026",
    executionType: "approval",
    assignedRoles: ["demand-planner", "supply-planner", "commercial-vp"],
    detectionLogic: "AI identified 47 clinics with >6 months consecutive order-to-actual variance above +25%. Pattern analysis confirmed systematic inflation: 22,400 excess dialyzer units and 8,100 excess ESA doses per month distorting DC replenishment by $2.3M/month.",
    hasScenario: true,
    scenarioId: "demand-signal-inflation"
  },
  {
    id: "fres-007",
    type: "safety-stock",
    title: "Safety Stock Right-Sizing – 1,200 DC-Level SKUs (Static COVID-Era Parameters)",
    severity: "medium",
    financialImpact: "$20–31M working capital freed",
    impactDetail: "Current SS $31.4M above statistically optimal levels",
    site: "All DCs – 1,200 SKUs",
    trigger: "Static COVID-era safety stock parameters creating structural excess",
    triggerDetail: [
      "1,200 active DC-level SKUs analysed against dynamic lead time and demand volatility",
      "68% of SKUs above statistically optimal safety stock",
      "Current safety stock is $31.4M above required levels",
      "12 SKUs account for 48% of excess value"
    ],
    recommendedAction: "Full recalibration of all 1,200 SKUs across 3 tranches prioritised by excess value",
    owner: "Inventory Optimisation Lead",
    ownerRole: "supply-planner",
    status: "waiting-approval",
    dueDate: "Jun 15, 2026",
    executionType: "approval",
    assignedRoles: ["supply-planner", "demand-planner", "commercial-vp"],
    detectionLogic: "Statistical analysis of 1,200 DC-level SKUs against current lead time distributions and demand volatility signals. 68% of SKUs exceed optimal SS; $31.4M structural excess identified, with 12 SKUs driving 48% of the exposure.",
    hasScenario: true,
    scenarioId: "safety-stock-rightsizing"
  }
]

// Scenario-specific modification parameters
const scenarioModifyConfig: Record<string, {
  title: string
  subtitle: string
  parameters: Array<{
    id: string
    name: string
    icon: string
    type: "slider" | "toggle-group" | "select"
    description: string
    options?: string[]
    min?: number
    max?: number
    unit?: string
    defaultValue: number | string | string[]
    color: string
  }>
  impactMetrics: {
    primaryLabel: string
    secondaryLabel: string
    costLabels: string[]
  }
}> = {
  "clinic-overstock": {
    title: "Clinic Par Level Management",
    subtitle: "Adjust AI par management deployment and clinic coverage parameters",
    parameters: [
      { id: "clinicCoverage", name: "Clinic Deployment Coverage", icon: "Building2", type: "slider", description: "Percentage of 2,700 clinics to deploy AI par management", min: 0, max: 100, unit: "%", defaultValue: 100, color: "blue" },
      { id: "parReduction", name: "Par Level Reduction Target", icon: "TrendingDown", type: "slider", description: "Target reduction from current 21-day to optimal par level", min: 14, max: 21, unit: " days", defaultValue: 14, color: "green" },
      { id: "rolloutPhase", name: "Rollout Approach", icon: "Layers", type: "toggle-group", description: "Select deployment strategy across clinics", options: ["Full Rollout", "Top 500 First", "Regional Pilot"], defaultValue: "Full Rollout", color: "purple" },
      { id: "timeline", name: "Implementation Timeline", icon: "Clock", type: "slider", description: "Weeks to complete deployment", min: 2, max: 12, unit: " weeks", defaultValue: 5, color: "amber" }
    ],
    impactMetrics: { primaryLabel: "Expiry Exposure", secondaryLabel: "Annual Savings", costLabels: ["Deployment Cost", "Training Cost", "System Integration"] }
  },
  "panic-stocking": {
    title: "Supply Disruption Response",
    subtitle: "Configure central override and manufacturing ramp parameters",
    parameters: [
      { id: "centralOverride", name: "Central PO Override Level", icon: "Shield", type: "slider", description: "Percentage of surge POs to freeze centrally", min: 0, max: 100, unit: "%", defaultValue: 100, color: "red" },
      { id: "manufacturingRamp", name: "Internal Manufacturing Ramp", icon: "Factory", type: "slider", description: "PD capacity increase activation level", min: 0, max: 40, unit: "%", defaultValue: 40, color: "blue" },
      { id: "dcRedistribution", name: "DC Redistribution Scope", icon: "Truck", type: "toggle-group", description: "Buffer stock redistribution approach", options: ["All 142 DCs", "Top 50 DCs", "Critical Only"], defaultValue: "All 142 DCs", color: "green" },
      { id: "responseTime", name: "Response Window", icon: "Clock", type: "slider", description: "Hours to activate response", min: 24, max: 72, unit: " hours", defaultValue: 48, color: "amber" }
    ],
    impactMetrics: { primaryLabel: "Excess Prevented", secondaryLabel: "Net Savings", costLabels: ["Ramp Activation Cost", "Logistics Cost", "Coordination Cost"] }
  },
  "dc-imbalance": {
    title: "DC Rebalancing Parameters",
    subtitle: "Configure inter-DC transfer and production adjustment settings",
    parameters: [
      { id: "transferVolume", name: "Transfer Volume", icon: "ArrowRightLeft", type: "slider", description: "Percentage of West DC excess to transfer", min: 0, max: 100, unit: "%", defaultValue: 80, color: "blue" },
      { id: "productionSuspension", name: "Production Order Action", icon: "Pause", type: "toggle-group", description: "Action on associated production orders", options: ["Suspend All", "Reduce 50%", "No Change"], defaultValue: "Suspend All", color: "amber" },
      { id: "targetDCs", name: "Target Distribution Centers", icon: "MapPin", type: "toggle-group", description: "DCs to receive transferred inventory", options: ["Southeast DC", "Northeast DC", "Both DCs"], defaultValue: "Southeast DC", color: "green" },
      { id: "timeline", name: "Transfer Timeline", icon: "Clock", type: "slider", description: "Days to complete transfer", min: 1, max: 7, unit: " days", defaultValue: 3, color: "purple" }
    ],
    impactMetrics: { primaryLabel: "Production Cost Avoided", secondaryLabel: "Net Savings", costLabels: ["Transfer Freight", "Handling Cost", "Inventory Adjustment"] }
  },
  "demand-shift-expiry": {
    title: "Legacy Inventory Rerouting",
    subtitle: "Configure legacy stock redistribution and 5008X supply acceleration",
    parameters: [
      { id: "reroutePercentage", name: "Legacy Stock Reroute", icon: "RotateCcw", type: "slider", description: "Percentage of $6.4M legacy inventory to reroute", min: 0, max: 100, unit: "%", defaultValue: 85, color: "blue" },
      { id: "targetMarkets", name: "Reroute Destinations", icon: "Globe", type: "toggle-group", description: "Markets for legacy stock redistribution", options: ["Low-Adoption States", "International", "Both"], defaultValue: "Both", color: "green" },
      { id: "productionHalt", name: "Legacy Production Action", icon: "Ban", type: "toggle-group", description: "Action on legacy bloodline production", options: ["Full Halt", "50% Reduction", "Continue"], defaultValue: "Full Halt", color: "red" },
      { id: "accelerationLevel", name: "5008X Supply Acceleration", icon: "Zap", type: "slider", description: "5008X supply build acceleration percentage", min: 0, max: 50, unit: "%", defaultValue: 30, color: "purple" }
    ],
    impactMetrics: { primaryLabel: "Stranded Inventory Risk", secondaryLabel: "Recovery Value", costLabels: ["Logistics Cost", "Ramp Cost", "Write-off Risk"] }
  },
  "rm-excess-pos": {
    title: "PO Management Parameters",
    subtitle: "Configure purchase order cancellation, reduction, and deferral settings",
    parameters: [
      { id: "poAAction", name: "PO-A Action", icon: "FileX", type: "toggle-group", description: "Action for PO-A (within 5-day window)", options: ["Cancel", "Reduce 50%", "Defer"], defaultValue: "Cancel", color: "red" },
      { id: "poBReduction", name: "PO-B Quantity Reduction", icon: "TrendingDown", type: "slider", description: "Percentage reduction for PO-B", min: 0, max: 50, unit: "%", defaultValue: 35, color: "amber" },
      { id: "poCDeferral", name: "PO-C Deferral Period", icon: "Calendar", type: "slider", description: "Weeks to defer PO-C delivery", min: 0, max: 12, unit: " weeks", defaultValue: 8, color: "blue" },
      { id: "forecastAlignment", name: "Forecast Alignment", icon: "Target", type: "toggle-group", description: "Align RM forecast to production plan", options: ["Full Alignment", "Partial", "No Change"], defaultValue: "Full Alignment", color: "green" }
    ],
    impactMetrics: { primaryLabel: "RM Excess Exposure", secondaryLabel: "Cost Avoidance", costLabels: ["Supplier Penalty", "Carrying Cost Saved", "Renegotiation Cost"] }
  },
  "demand-signal-inflation": {
    title: "Demand Signal Correction",
    subtitle: "Configure AI demand correction and clinic scorecard parameters",
    parameters: [
      { id: "clinicCoverage", name: "Clinic Correction Coverage", icon: "Users", type: "slider", description: "Number of flagged clinics to apply AI correction", min: 0, max: 47, unit: " clinics", defaultValue: 47, color: "blue" },
      { id: "orderCap", name: "Order Cap Threshold", icon: "AlertTriangle", type: "slider", description: "Maximum order percentage above utilisation", min: 100, max: 150, unit: "%", defaultValue: 115, color: "amber" },
      { id: "scorecardEnforcement", name: "Scorecard Enforcement", icon: "ClipboardCheck", type: "toggle-group", description: "Order accuracy scorecard implementation", options: ["Mandatory", "Advisory", "None"], defaultValue: "Mandatory", color: "green" },
      { id: "dcRecalibration", name: "DC Recalibration Scope", icon: "Database", type: "toggle-group", description: "DC replenishment signal recalibration", options: ["All DCs", "Affected DCs", "None"], defaultValue: "All DCs", color: "purple" }
    ],
    impactMetrics: { primaryLabel: "Monthly Distortion", secondaryLabel: "Demand Quality Improvement", costLabels: ["Configuration Cost", "Training Cost", "Monitoring Cost"] }
  },
  "safety-stock-rightsizing": {
    title: "Safety Stock Recalibration",
    subtitle: "Configure phased SKU recalibration and service level parameters",
    parameters: [
      { id: "tranche1Scope", name: "Tranche 1 Scope", icon: "Target", type: "slider", description: "Top SKUs to recalibrate first (by excess value)", min: 0, max: 50, unit: " SKUs", defaultValue: 12, color: "red" },
      { id: "tranche2Scope", name: "Tranche 2 Scope", icon: "Layers", type: "slider", description: "Additional SKUs in second phase", min: 0, max: 500, unit: " SKUs", defaultValue: 200, color: "amber" },
      { id: "serviceLevelTarget", name: "Service Level Target", icon: "Shield", type: "slider", description: "Minimum service level to maintain", min: 95, max: 99.5, unit: "%", defaultValue: 98.5, color: "green" },
      { id: "recalibrationCycle", name: "Refresh Cycle", icon: "RefreshCw", type: "toggle-group", description: "Automated recalibration frequency", options: ["30 Days", "60 Days", "90 Days"], defaultValue: "90 Days", color: "blue" }
    ],
    impactMetrics: { primaryLabel: "Structural Excess", secondaryLabel: "Working Capital Freed", costLabels: ["Analysis Cost", "System Updates", "Monitoring Cost"] }
  }
}

// Scenario-specific execution plan configuration
const scenarioExecutionPlans: Record<string, {
  summary: { agentActions: number; plannerApprovals: number }
  rows: Array<{
    function: string
    functionIcon: string
    functionColor: string
    agentAction: {
      title: string
      description: string
      metric: string
      hasAction: boolean
    }
    plannerAction: {
      role: string
      title: string
      description: string
      status: "pending" | "awaiting"
    }
  }>
}> = {
  "clinic-overstock": {
    summary: { agentActions: 2, plannerApprovals: 3 },
    rows: [
      {
        function: "Clinic Operations",
        functionIcon: "Building2",
        functionColor: "amber",
        agentAction: { title: "Deploy AI Par Engine", description: "Roll out AI-driven par management to target clinics", metric: "2,700 clinics ready", hasAction: true },
        plannerAction: { role: "Clinic Supply Lead", title: "Approve Clinic Deployment", description: "Review and approve AI par engine deployment schedule", status: "pending" }
      },
      {
        function: "Inventory",
        functionIcon: "Package",
        functionColor: "blue",
        agentAction: { title: "Calibrate Par Levels", description: "Adjust par from 21-day to 14-day target across ESA/Mircera/EPO", metric: "38% clinics above par", hasAction: true },
        plannerAction: { role: "Inventory Planner", title: "Approve Par Reduction", description: "Validate par level changes for patient safety compliance", status: "awaiting" }
      },
      {
        function: "Quality",
        functionIcon: "Shield",
        functionColor: "green",
        agentAction: { title: "No agent action", description: "", metric: "", hasAction: false },
        plannerAction: { role: "Quality Manager", title: "Final Compliance Review", description: "Ensure par changes meet regulatory and patient safety standards", status: "awaiting" }
      }
    ]
  },
  "panic-stocking": {
    summary: { agentActions: 3, plannerApprovals: 2 },
    rows: [
      {
        function: "Procurement",
        functionIcon: "Truck",
        functionColor: "red",
        agentAction: { title: "Freeze Surge POs", description: "Central override to freeze all surge purchase orders above baseline", metric: "$18M exposure blocked", hasAction: true },
        plannerAction: { role: "Procurement Lead", title: "Approve PO Freeze", description: "Authorize central PO override for affected suppliers", status: "pending" }
      },
      {
        function: "Manufacturing",
        functionIcon: "Factory",
        functionColor: "blue",
        agentAction: { title: "Activate Internal Ramp", description: "Increase PD production capacity to internal manufacturing", metric: "40% capacity ramp", hasAction: true },
        plannerAction: { role: "Plant Manager", title: "Confirm Capacity Allocation", description: "Validate manufacturing capacity reallocation plan", status: "awaiting" }
      },
      {
        function: "Distribution",
        functionIcon: "MapPin",
        functionColor: "green",
        agentAction: { title: "Redistribute Buffer Stock", description: "Rebalance existing buffer across 142 regional DCs", metric: "142 DCs rebalanced", hasAction: true },
        plannerAction: { role: "DC Operations", title: "No planner action", description: "", status: "pending" }
      }
    ]
  },
  "dc-imbalance": {
    summary: { agentActions: 2, plannerApprovals: 2 },
    rows: [
      {
        function: "Logistics",
        functionIcon: "Truck",
        functionColor: "blue",
        agentAction: { title: "Execute Inter-DC Transfer", description: "Move excess inventory from West DC to Southeast DC", metric: "$2.8M transferred", hasAction: true },
        plannerAction: { role: "Network Planner", title: "Approve Transfer Route", description: "Validate transfer logistics and cost allocation", status: "pending" }
      },
      {
        function: "Production",
        functionIcon: "Factory",
        functionColor: "amber",
        agentAction: { title: "Suspend FX-Class Orders", description: "Halt associated production orders for Dialyzers & Bicarbonate", metric: "3 orders suspended", hasAction: true },
        plannerAction: { role: "Production Planner", title: "Confirm Production Hold", description: "Approve production suspension pending inventory rebalance", status: "awaiting" }
      },
      {
        function: "Finance",
        functionIcon: "DollarSign",
        functionColor: "green",
        agentAction: { title: "No agent action", description: "", metric: "", hasAction: false },
        plannerAction: { role: "Finance Controller", title: "Approve Transfer Costs", description: "Authorize $34K inter-DC freight and handling costs", status: "awaiting" }
      }
    ]
  },
  "demand-shift-expiry": {
    summary: { agentActions: 2, plannerApprovals: 3 },
    rows: [
      {
        function: "Commercial",
        functionIcon: "ShoppingCart",
        functionColor: "purple",
        agentAction: { title: "Reroute Legacy Stock", description: "Redirect 5008-series inventory to low-adoption states and international", metric: "$6.4M rerouted", hasAction: true },
        plannerAction: { role: "Commercial Lead", title: "Approve Market Redirect", description: "Validate alternative market allocation for legacy products", status: "pending" }
      },
      {
        function: "Production",
        functionIcon: "Factory",
        functionColor: "red",
        agentAction: { title: "Halt Legacy Production", description: "Stop legacy bloodline production, accelerate 5008X supply", metric: "Production switched", hasAction: true },
        plannerAction: { role: "Production Planner", title: "Confirm Line Conversion", description: "Approve production line transition timeline", status: "awaiting" }
      },
      {
        function: "Supply Planning",
        functionIcon: "TrendingUp",
        functionColor: "blue",
        agentAction: { title: "No agent action", description: "", metric: "", hasAction: false },
        plannerAction: { role: "Supply Chain VP", title: "Final Strategy Approval", description: "Authorize complete demand shift response strategy", status: "awaiting" }
      }
    ]
  },
  "rm-excess-pos": {
    summary: { agentActions: 3, plannerApprovals: 2 },
    rows: [
      {
        function: "Procurement",
        functionIcon: "FileX",
        functionColor: "red",
        agentAction: { title: "Cancel PO-A", description: "Cancel purchase order within 5-day cancellation window", metric: "$420K avoided", hasAction: true },
        plannerAction: { role: "Procurement Manager", title: "Confirm Cancellation", description: "Authorize PO cancellation and supplier notification", status: "pending" }
      },
      {
        function: "Supply Planning",
        functionIcon: "TrendingDown",
        functionColor: "amber",
        agentAction: { title: "Reduce PO-B Quantity", description: "Reduce order quantity by 35% to align with revised forecast", metric: "35% reduction", hasAction: true },
        plannerAction: { role: "Supply Planner", title: "Approve Quantity Change", description: "Validate reduced order against production requirements", status: "awaiting" }
      },
      {
        function: "Finance",
        functionIcon: "Calendar",
        functionColor: "blue",
        agentAction: { title: "Defer PO-C Delivery", description: "Push delivery date by 8 weeks to align with consumption", metric: "8 weeks deferred", hasAction: true },
        plannerAction: { role: "Finance Controller", title: "No planner action", description: "", status: "pending" }
      }
    ]
  },
  "demand-signal-inflation": {
    summary: { agentActions: 2, plannerApprovals: 3 },
    rows: [
      {
        function: "Demand Planning",
        functionIcon: "TrendingUp",
        functionColor: "blue",
        agentAction: { title: "Apply AI Demand Correction", description: "Deploy AI correction to 47 flagged clinics with inflated signals", metric: "47 clinics corrected", hasAction: true },
        plannerAction: { role: "Demand Planner", title: "Approve Signal Override", description: "Validate AI demand correction parameters", status: "pending" }
      },
      {
        function: "Clinic Operations",
        functionIcon: "Users",
        functionColor: "amber",
        agentAction: { title: "Implement Order Caps", description: "Set maximum order threshold at 115% of patient utilisation", metric: "Caps activated", hasAction: true },
        plannerAction: { role: "Clinic Supply Lead", title: "Approve Order Policy", description: "Authorize order accuracy scorecard enforcement", status: "awaiting" }
      },
      {
        function: "Distribution",
        functionIcon: "Database",
        functionColor: "green",
        agentAction: { title: "No agent action", description: "", metric: "", hasAction: false },
        plannerAction: { role: "DC Operations Manager", title: "Confirm DC Recalibration", description: "Approve replenishment signal recalibration at affected DCs", status: "awaiting" }
      }
    ]
  },
  "safety-stock-rightsizing": {
    summary: { agentActions: 2, plannerApprovals: 3 },
    rows: [
      {
        function: "Inventory",
        functionIcon: "Target",
        functionColor: "red",
        agentAction: { title: "Recalibrate Tranche 1", description: "Adjust safety stock for top 12 SKUs by excess value", metric: "$20-31M freed", hasAction: true },
        plannerAction: { role: "Inventory Planner", title: "Approve Tranche 1", description: "Validate safety stock reduction for high-value SKUs", status: "pending" }
      },
      {
        function: "Supply Planning",
        functionIcon: "Layers",
        functionColor: "amber",
        agentAction: { title: "Queue Tranche 2 Analysis", description: "Prepare recalibration analysis for 200 additional SKUs", metric: "200 SKUs queued", hasAction: true },
        plannerAction: { role: "Supply Planner", title: "Approve Tranche 2 Scope", description: "Confirm SKU selection and recalibration parameters", status: "awaiting" }
      },
      {
        function: "Executive",
        functionIcon: "Building2",
        functionColor: "purple",
        agentAction: { title: "No agent action", description: "", metric: "", hasAction: false },
        plannerAction: { role: "VP Supply Chain", title: "Final Policy Approval", description: "Authorize enterprise-wide safety stock policy change", status: "awaiting" }
      }
    ]
  }
}

// Scenario Detail Data – 7 Fresenius Scenarios
const scenarioData = {
  "clinic-overstock": {
    issue: {
      title: "Clinic-Level Over-Stock – ESAs / Mircera / EPO",
      summary: "Elevated clinic ordering patterns across 2,700 US clinics have created excess ESA inventory. 38% of clinics hold >21-day supply vs. 14-day target, with $4.2M in Mircera/EPO units under 90 days to expiry.",
      impact: "$3.1M/yr expiry elimination",
      unitsImpacted: "$4.2M near-expiry ESA/Mircera/EPO units",
      accountsAtRisk: "2,700 US Clinics",
      constraint: "Perishable drug; expiry clock running on $4.2M of stock"
    },
    drivers: [
      { name: "Over-Ordering Rate", context: "+34% above patient utilisation", type: "critical" as const },
      { name: "Near-Expiry Exposure", context: "$4.2M with <90 days", type: "critical" as const },
      { name: "Clinic Coverage", context: "38% above 21-day par", type: "negative" as const },
      { name: "AI Par Management", context: "Available for deployment", type: "positive" as const }
    ],
    recommendations: [
      "Deploy AI Par Management system across all 2,700 clinics",
      "Set automated par levels based on actual patient utilisation data",
      "Flag clinics with >21-day ESA supply for immediate review",
      "Coordinate near-expiry ESA redistribution to clinics with low stock",
      "Implement weekly order-vs-utilisation variance reporting",
      "Align procurement policy to new AI-driven par targets"
    ],
    scenarios: [
      {
        id: "a",
        name: "Full AI Par Management",
        recommended: true,
        impact: "$3.1M/yr expiry elimination",
        cost: "Low implementation cost",
        timeline: "4–6 weeks rollout",
        risk: "Low",
        actions: ["Deploy AI par engine to all 2,700 clinics", "Calibrate to patient utilisation", "Activate near-expiry redistribution alerts", "Train clinic coordinators"]
      },
      {
        id: "b",
        name: "Phased Clinic Rollout",
        recommended: false,
        impact: "$1.8M/yr (top 500 clinics first)",
        cost: "Low, extended timeline",
        timeline: "10–12 weeks",
        risk: "Medium – remaining clinics still exposed",
        actions: ["Prioritise top 500 clinics by excess value", "Phased deployment over 3 months", "Manual review for remainder"]
      },
      {
        id: "c",
        name: "Manual Policy Enforcement",
        recommended: false,
        impact: "$0.8M/yr estimated",
        cost: "High labour cost",
        timeline: "Ongoing",
        risk: "High – relies on human compliance",
        actions: ["Issue clinic-level stocking guidelines", "Monthly compliance audits", "Escalation process for violations"]
      }
    ]
  },
  "panic-stocking": {
    issue: {
    title: "Supply Disruption Response Inventory – IV Fluids & PD Solutions",
      summary: "A supplier alert triggered a +280% order surge across 142 regional DCs within 48 hours, creating a projected $18M 30-day excess. FME international PD manufacturing has +40% ramp capacity available within 72 hours.",
      impact: "$18M/event prevented",
      unitsImpacted: "IV Fluids & PD Solutions across 142 DCs",
      accountsAtRisk: "All regional DC network",
      constraint: "Requires central override within 48h to prevent full excess build"
    },
    drivers: [
      { name: "Order Surge", context: "+280% across 142 DCs in 48h", type: "critical" as const },
      { name: "Excess Cost", context: "$18M projected 30-day excess", type: "critical" as const },
      { name: "Internal Ramp", context: "+40% PD capacity in 72h", type: "positive" as const },
      { name: "No Central Override", context: "Currently no coordination mechanism", type: "negative" as const }
    ],
    recommendations: [
      "Activate central ordering override to freeze surge POs above policy",
      "Trigger FME internal PD manufacturing ramp (+40% within 72 hours)",
      "Redistribute existing buffer stock from stable DCs to shortage-risk DCs",
      "Issue supply security communication to all 142 DCs to reduce fear ordering",
      "Establish a surge-event playbook for future disruption events",
      "Post-event: recalibrate DC buffer stock policies"
    ],
    scenarios: [
      {
        id: "a",
        name: "Centralise + Internal Ramp",
        recommended: true,
        impact: "$18M/event prevented",
        cost: "$420K ramp activation cost",
        timeline: "48–72 hours",
        risk: "Low",
        actions: ["Freeze surplus POs centrally", "Activate +40% PD ramp", "Redistribute buffer stock", "Communicate supply security to DCs"]
      },
      {
        id: "b",
        name: "Partial Freeze + External Supplier",
        recommended: false,
        impact: "$12M savings",
        cost: "$1.2M premium sourcing cost",
        timeline: "5–7 days",
        risk: "Medium – external lead time risk",
        actions: ["Freeze top 30% of excess POs", "Source supplemental supply externally", "Monitor DC inventory daily"]
      },
      {
        id: "c",
        name: "Allow Surge, Discount Excess",
        recommended: false,
        impact: "-$6M net (discounting losses)",
        cost: "Up to $18M carrying + markdown",
        timeline: "8–12 weeks to clear",
        risk: "High – full excess materialises",
        actions: ["Allow orders to fulfil", "Discount excess to clinics post-event", "Write off unplaceable stock"]
      }
    ]
  },
  "dc-imbalance": {
    issue: {
      title: "Regional DC Imbalance – FX-Class Dialyzers & Bicarbonate Concentrates",
      summary: "West DC carries 62 days on-hand (24 days above target) while Southeast DC is critically low at 18 days. Inter-DC transfer costs only $34K vs. $2.8M fresh production cost.",
      impact: "$2.8M production cost avoided; $34K transfer cost",
      unitsImpacted: "FX-class dialyzers & bicarbonate concentrates",
      accountsAtRisk: "Southeast DC – below critical threshold",
      constraint: "No automated rebalancing rule active for this SKU class"
    },
    drivers: [
      { name: "West DC Excess", context: "62 days on-hand, 24 above target", type: "critical" as const },
      { name: "Southeast DC Shortage", context: "18 days, below critical threshold", type: "critical" as const },
      { name: "Transfer Cost", context: "$34K vs. $2.8M production", type: "positive" as const },
      { name: "No Rebalancing Rule", context: "Missing automation for this class", type: "negative" as const }
    ],
    recommendations: [
      "Execute inter-DC transfer from West DC to Southeast DC immediately",
      "Suspend associated production order to avoid further excess build",
      "Activate automated rebalancing rule for FX-class dialyzers",
      "Review network stock allocation policy for bicarbonate concentrates",
      "Set DC-level min/max triggers for automated rebalancing",
      "Post-transfer: validate Southeast DC replenishment cycle"
    ],
    scenarios: [
      {
        id: "a",
        name: "Execute Transfer + Suspend Production Order",
        recommended: true,
        impact: "Prevents stockout; avoids $2.8M unnecessary production",
        cost: "$34K inter-DC freight",
        timeline: "2–3 days",
        risk: "Low",
        actions: ["Raise inter-DC transfer order", "Suspend West DC production PO", "Update network inventory records", "Set rebalancing alert for class"]
      },
      {
        id: "b",
        name: "New Production Order Only",
        recommended: false,
        impact: "Resolves Southeast shortage but builds West excess further",
        cost: "$2.8M production cost",
        timeline: "3–4 weeks",
        risk: "High – West excess worsens",
        actions: ["Raise new production order for Southeast", "No change to West DC excess"]
      },
      {
        id: "c",
        name: "Emergency External Procurement",
        recommended: false,
        impact: "Resolves shortage but at premium cost",
        cost: "$3.2M+ premium",
        timeline: "1–2 weeks",
        risk: "Medium – cost and lead time",
        actions: ["Source FX dialyzers from external supplier", "Expedite freight to Southeast DC"]
      }
    ]
  },
  "demand-shift-expiry": {
    issue: {
      title: "Demand Shift & Product Expiry Risk – Legacy HD Bloodlines",
      summary: "5008X CAREsystem adoption running +22% ahead of plan across 28 states, collapsing legacy HD bloodline consumption by -38%. $6.4M of legacy inventory is now stranded with accelerating expiry risk.",
      impact: "$6.4M stranded inventory risk addressed",
      unitsImpacted: "Legacy HD Bloodlines – 28 states",
      accountsAtRisk: "Legacy HD bloodline inventory network-wide",
      constraint: "Expiry acceleration as legacy usage collapses; 5008X supply build required in parallel"
    },
    drivers: [
      { name: "5008X Adoption", context: "+22% ahead of plan, 28 states", type: "positive" as const },
      { name: "Legacy Consumption", context: "-38% over 6 months", type: "critical" as const },
      { name: "Stranded Inventory", context: "$6.4M legacy bloodlines", type: "critical" as const },
      { name: "Expiry Risk", context: "Accelerating as usage collapses", type: "negative" as const }
    ],
    recommendations: [
      "Reroute legacy HD bloodline stock to slower-adoption states and international markets",
      "Accelerate 5008X bloodline supply build to match adoption velocity",
      "Place moratorium on new legacy bloodline production orders",
      "Identify export/donation channels for near-expiry legacy units",
      "Update demand plan to reflect revised adoption trajectory",
      "Monitor 5008X adoption weekly and adjust supply plan dynamically"
    ],
    scenarios: [
      {
        id: "a",
        name: "Dual-Track Reroute + Accelerate",
        recommended: true,
        impact: "$6.4M risk addressed; supply continuity maintained",
        cost: "$380K logistics + ramp cost",
        timeline: "3–5 weeks",
        risk: "Low",
        actions: ["Reroute legacy stock to low-adoption markets", "Accelerate 5008X supply build", "Halt new legacy production", "Activate export channels for near-expiry units"]
      },
      {
        id: "b",
        name: "Legacy Write-Down Only",
        recommended: false,
        impact: "-$6.4M write-off",
        cost: "$6.4M P&L impact",
        timeline: "Immediate accounting action",
        risk: "High – full loss realised",
        actions: ["Write down $6.4M legacy inventory", "No supply action taken"]
      },
      {
        id: "c",
        name: "Slow Reroute – Extend Timelines",
        recommended: false,
        impact: "$3.5M recovered; $2.9M residual risk",
        cost: "$210K logistics",
        timeline: "8–12 weeks",
        risk: "Medium – expiry risk on remainder",
        actions: ["Gradual redistribution over 3 months", "Risk expiry on units not moved in time"]
      }
    ]
  },
  "rm-excess-pos": {
    issue: {
      title: "Supplier Raw Material Excess & Open POs",
      summary: "Production schedule cut -18% while on-hand RM coverage sits at 74 days vs. 45-day target. Three active POs will worsen the excess further. Projected carrying cost: $4.8M over 90 days.",
      impact: "$1.6M+ immediate cost avoidance",
      unitsImpacted: "Raw materials – dialysis manufacturing plant",
      accountsAtRisk: "Manufacturing plant – 3 active open POs",
      constraint: "Supplier contractual terms limit cancellation window to 5 business days"
    },
    drivers: [
      { name: "Production Cut", context: "-18% vs. prior plan", type: "critical" as const },
      { name: "RM Coverage", context: "74 days vs. 45-day target", type: "critical" as const },
      { name: "Open POs", context: "3 POs adding further excess", type: "negative" as const },
      { name: "Cancellation Window", context: "5 business days", type: "negative" as const }
    ],
    recommendations: [
      "Cancel PO-A immediately within the 5-day contractual window",
      "Reduce PO-B order quantity to align with revised production schedule",
      "Push PO-C delivery date out by 8 weeks",
      "Re-forecast RM requirements based on updated -18% production plan",
      "Establish production-linked PO auto-adjustment rules",
      "Review supplier contractual terms to enable faster PO flexibility"
    ],
    scenarios: [
      {
        id: "a",
        name: "Cancel A + Reduce B + Push C",
        recommended: true,
        impact: "$1.6M+ immediate cost avoidance",
        cost: "Minimal – within contract terms",
        timeline: "This week (5-day window)",
        risk: "Low",
        actions: ["Cancel PO-A within 5-day window", "Reduce PO-B quantity by 35%", "Push PO-C delivery by 8 weeks", "Update RM forecast to -18% plan"]
      },
      {
        id: "b",
        name: "Push All Three POs",
        recommended: false,
        impact: "$900K savings",
        cost: "Supplier relationship risk",
        timeline: "This week",
        risk: "Medium – multiple deferrals may strain supplier",
        actions: ["Negotiate delivery push on all 3 POs", "Accept potential supplier premium on future orders"]
      },
      {
        id: "c",
        name: "Accept All POs, Discount Excess RM",
        recommended: false,
        impact: "-$3.2M net after carrying and discount costs",
        cost: "$4.8M carrying + markdown losses",
        timeline: "90 days",
        risk: "High – full excess materialises",
        actions: ["Allow all POs to deliver", "Sell excess RM at discount", "Absorb $4.8M carrying cost"]
      }
    ]
  },
  "demand-signal-inflation": {
    issue: {
      title: "Systematic Clinic Over-Demand Signal Inflation – 47 Clinics",
      summary: "47 clinics have submitted inflated demand signals for >6 consecutive months, distorting S&OP and DC replenishment by $2.3M/month. Excess: 22,400 dialyzer units and 8,100 ESA doses per month.",
      impact: "$2.3M/month demand quality improvement",
      unitsImpacted: "22,400 excess dialyzer units + 8,100 excess ESA doses/month",
      accountsAtRisk: "47 clinics; all downstream DCs",
      constraint: "Inflated signals are embedded in S&OP baseline; must be corrected before next planning cycle"
    },
    drivers: [
      { name: "Inflation Duration", context: ">6 months consecutive", type: "critical" as const },
      { name: "Dialyzer Excess", context: "22,400 units/month", type: "critical" as const },
      { name: "ESA Dose Excess", context: "8,100 doses/month", type: "negative" as const },
      { name: "DC Replenishment Impact", context: "$2.3M/month distortion", type: "critical" as const }
    ],
    recommendations: [
      "Apply AI demand correction algorithm to all 47 flagged clinics",
      "Recalibrate DC replenishment signals using corrected demand baseline",
      "Introduce clinic scorecard with order accuracy KPIs",
      "Require clinic-level justification for orders >15% above utilisation",
      "Integrate real patient utilisation data into demand planning",
      "Review before next S&OP cycle to embed corrected baseline"
    ],
    scenarios: [
      {
        id: "a",
        name: "AI Demand Correction + Scorecard + DC Recalibration",
        recommended: true,
        impact: "$2.3M/month demand quality improvement",
        cost: "Low – software configuration",
        timeline: "2–3 weeks",
        risk: "Low",
        actions: ["Deploy AI correction to 47 clinics", "Introduce order accuracy scorecard", "Recalibrate DC replenishment baseline", "Brief S&OP team on corrected signals"]
      },
      {
        id: "b",
        name: "Manual Review + Cap Policy",
        recommended: false,
        impact: "$1.1M/month improvement",
        cost: "High labour cost",
        timeline: "4–6 weeks",
        risk: "Medium – labour-intensive, partial fix",
        actions: ["Manual review of 47 clinic orders each month", "Implement hard cap at 115% of utilisation", "Escalation for exceptions"]
      },
      {
        id: "c",
        name: "No Action – Accept Distortion",
        recommended: false,
        impact: "-$2.3M/month ongoing cost",
        cost: "$27.6M/yr carry cost",
        timeline: "N/A",
        risk: "High – structural excess perpetuated",
        actions: ["Continue current planning with inflated signals", "Accept ongoing DC excess build"]
      }
    ]
  },
  "safety-stock-rightsizing": {
    issue: {
      title: "Safety Stock Right-Sizing – 1,200 DC-Level SKUs",
      summary: "Static COVID-era safety stock parameters are creating $31.4M of structural excess across 1,200 DC-level SKUs. 68% of SKUs are above statistically optimal SS, with 12 SKUs accounting for 48% of excess value.",
      impact: "$20–31M working capital freed",
      unitsImpacted: "1,200 DC-level SKUs network-wide",
      accountsAtRisk: "All DCs – structural overcapitalisation",
      constraint: "Requires phased recalibration to avoid service level disruption"
    },
    drivers: [
      { name: "SKUs Above Optimal SS", context: "68% of 1,200 SKUs", type: "critical" as const },
      { name: "Excess Value", context: "$31.4M above required levels", type: "critical" as const },
      { name: "Top 12 SKUs", context: "48% of excess value", type: "negative" as const },
      { name: "COVID-Era Parameters", context: "Static assumptions no longer valid", type: "negative" as const }
    ],
    recommendations: [
      "Prioritise Tranche 1: top 12 SKUs representing 48% of excess value",
      "Recalibrate SS parameters using dynamic lead time and demand volatility models",
      "Validate Tranche 1 changes vs. service level impact before Tranche 2",
      "Deploy Tranche 2 (next 200 SKUs by excess value) after Tranche 1 validated",
      "Complete Tranche 3 (remaining 988 SKUs) on rolling quarterly review",
      "Establish automated SS recalibration on a 90-day refresh cycle"
    ],
    scenarios: [
      {
        id: "a",
        name: "Full Recalibration – 3 Tranches",
        recommended: true,
        impact: "$20–31M working capital freed",
        cost: "Low – data-driven recalibration",
        timeline: "8–12 weeks (phased)",
        risk: "Low – phased protects service levels",
        actions: ["Tranche 1: top 12 SKUs (week 1–2)", "Validate service levels", "Tranche 2: next 200 SKUs (week 3–6)", "Tranche 3: remaining 988 SKUs (week 7–12)"]
      },
      {
        id: "b",
        name: "Top 12 SKUs Only",
        recommended: false,
        impact: "$15M working capital freed (48% of excess)",
        cost: "Low",
        timeline: "2–3 weeks",
        risk: "Low – but leaves $16M+ unaddressed",
        actions: ["Recalibrate top 12 SKUs only", "No action on remaining 1,188 SKUs"]
      },
      {
        id: "c",
        name: "Full Immediate Reset",
        recommended: false,
        impact: "$31.4M freed immediately",
        cost: "Low",
        timeline: "1 week",
        risk: "High – service level disruption likely",
        actions: ["Reset all 1,200 SKUs simultaneously", "Accept service level risk during transition"]
      }
    ]
  },
  // Legacy key retained for any residual references
  "customer-stocking-excess": {
    issue: {
      title: "Clinic-Level Over-Stock – ESAs / Mircera / EPO",
      summary: "See clinic-overstock scenario.",
      impact: "$3.1M/yr", unitsImpacted: "", accountsAtRisk: "", constraint: ""
    },
    drivers: [],
    recommendations: [],
    scenarios: [
      {
        id: "a",
        name: "Full AI Par Management",
        recommended: true,
        impact: "$3.1M/yr",
        cost: "Low",
        timeline: "4–6 weeks",
        risk: "Low",
        actions: ["Deploy AI par engine"]
      }
    ]
  },
  "demand-drop-excess": {
    issue: {
      title: "Supply Disruption Response Inventory",
      summary: "See supply disruption response inventory scenario.",
      impact: "$18M/event", unitsImpacted: "", accountsAtRisk: "", constraint: ""
    },
    drivers: [],
    recommendations: [],
    scenarios: [
      {
        id: "a",
        name: "Centralise + Internal Ramp",
        recommended: true,
        impact: "$18M/event prevented",
        cost: "$420K",
        timeline: "48–72 hours",
        risk: "Low",
        actions: ["Freeze surplus POs centrally"]
      }
    ]
  },
  "supplier-moq-excess": {
    issue: {
      title: "Supplier Raw Material Excess & Open POs",
      summary: "See rm-excess-pos scenario.",
      impact: "$1.6M+", unitsImpacted: "", accountsAtRisk: "", constraint: ""
    },
    drivers: [],
    recommendations: [],
    scenarios: [
      {
        id: "a",
        name: "Cancel A + Reduce B + Push C",
        recommended: true,
        impact: "$1.6M+ immediate avoidance",
        cost: "Minimal",
        timeline: "This week",
        risk: "Low",
        actions: ["Cancel PO-A", "Reduce PO-B", "Push PO-C"]
      }
    ]
  },
  "dummy-c": {
    issue: {
      title: "",
      summary: "",
      impact: "",
      unitsImpacted: "",
      accountsAtRisk: "",
      constraint: ""
    },
    drivers: [],
    recommendations: [],
    scenarios: [
      {
        id: "c",
        name: "Write-Off",
        recommended: false,
        impact: "N/A",
        cost: "N/A",
        timeline: "N/A",
        risk: "High",
        actions: []
      }
    ]
  }
}

// ============================================================================
// COMPONENTS
// ============================================================================

// KPI Banner Component
function KPIBanner({ 
  viewType, 
  selectedRole 
}: { 
  viewType: "master" | "role"
  selectedRole: RoleType 
}) {
  const displayKpis = viewType === "master" 
    ? kpiData 
    : (roleKpiAdjustments[selectedRole] || kpiData).map((kpi, idx) => ({
        ...kpiData[idx],
        ...kpi,
        icon: kpiData[idx]?.icon || Package,
        color: kpiData[idx]?.color || "#1677FF"
      }))

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {displayKpis.map((kpi, idx) => {
        const Icon = kpi.icon
        return (
          <Card key={idx} className="p-4 border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${kpi.color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color: kpi.color }} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                kpi.trend === "up" ? "bg-green-100 text-green-700" : 
                kpi.trend === "down" ? "bg-red-100 text-red-700" : 
                "bg-gray-100 text-gray-700"
              )}>
                {kpi.trend === "up" ? <ArrowUp className="h-3 w-3" /> : 
                 kpi.trend === "down" ? <ArrowDown className="h-3 w-3" /> : 
                 <ArrowRight className="h-3 w-3" />}
                {kpi.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </Card>
        )
      })}
    </div>
  )
}


// Opportunity Card Component
function OpportunityCard({ 
  opportunity, 
  isSelected, 
  onSelect,
  isExpanded,
  onToggleExpand
}: { 
  opportunity: Opportunity
  isSelected: boolean
  onSelect: () => void
  isExpanded: boolean
  onToggleExpand: () => void
}) {
  const typeConfig = opportunityTypes.find(t => t.id === opportunity.type)
  const statusConfig = actionStatusConfig[opportunity.status]
  const TypeIcon = typeConfig?.icon || Package

  const severityConfig = {
    critical: { bg: "bg-red-100", text: "text-red-700", border: "border-l-red-500" },
    high: { bg: "bg-amber-100", text: "text-amber-700", border: "border-l-amber-500" },
    medium: { bg: "bg-blue-100", text: "text-blue-700", border: "border-l-blue-500" },
    low: { bg: "bg-green-100", text: "text-green-700", border: "border-l-green-500" }
  }

  const severity = severityConfig[opportunity.severity]

  return (
    <div className="mb-3">
      <Card 
        className={cn(
          "p-4 border-l-4 transition-all cursor-pointer",
          severity.border,
          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
        )}
        onClick={onSelect}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Header Row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${typeConfig?.color}15` }}
              >
                <TypeIcon className="h-4 w-4" style={{ color: typeConfig?.color }} />
              </div>
              <span 
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${typeConfig?.color}15`, color: typeConfig?.color }}
              >
                {typeConfig?.label}
              </span>
              <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full uppercase", severity.bg, severity.text)}>
                {opportunity.severity}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusConfig.bgColor)}>
                {statusConfig.label}
              </span>
              {opportunity.executionType === "auto" && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Auto
                </span>
              )}
              {opportunity.executionType === "approval" && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Approval
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="font-semibold text-foreground text-sm mb-2 pr-4">{opportunity.title}</h4>

            {/* Details Row */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span className="font-semibold text-foreground">{opportunity.financialImpact}</span>
              </span>
              {opportunity.customer && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {opportunity.customer}
                </span>
              )}
              {opportunity.site && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {opportunity.site}
                </span>
              )}
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {opportunity.owner}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {opportunity.dueDate}
              </span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onToggleExpand()
              }}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Expanded Detection Logic */}
      {isExpanded && (
        <Card className="p-4 mt-2 ml-6 border border-dashed border-gray-300 bg-gray-50">
          <div className="flex items-start gap-3">
            <Bot className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-semibold text-gray-900 mb-2">Detection Logic</h5>
              <p className="text-xs text-gray-700 mb-3">{opportunity.detectionLogic}</p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-600">Trigger Details:</p>
                <ul className="space-y-1">
                  {opportunity.triggerDetail.map((detail, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <CircleDot className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

// Opportunity Detail Panel Component
function OpportunityDetailPanel({ 
  opportunity, 
  onClose,
  onOpenScenario
}: { 
  opportunity: Opportunity | null
  onClose: () => void
  onOpenScenario: (scenarioId: string) => void
}) {
  if (!opportunity) {
    return (
      <Card className="p-6 border border-border bg-card h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Select an opportunity to view details</p>
        </div>
      </Card>
    )
  }

  const typeConfig = opportunityTypes.find(t => t.id === opportunity.type)
  const statusConfig = actionStatusConfig[opportunity.status]
  const TypeIcon = typeConfig?.icon || Package
  const scenario = opportunity.scenarioId ? scenarioData[opportunity.scenarioId as keyof typeof scenarioData] : null

  return (
    <Card className="border border-border bg-card h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${typeConfig?.color}15` }}
          >
            <TypeIcon className="h-5 w-5" style={{ color: typeConfig?.color }} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">{opportunity.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", statusConfig.bgColor)}>
                {statusConfig.label}
              </span>
              <span className="text-xs text-muted-foreground">Due: {opportunity.dueDate}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Financial Impact */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-xs text-gray-500">Financial Impact</p>
            <p className="text-lg font-bold text-red-600">{opportunity.financialImpact}</p>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-xs text-gray-500">Impact Detail</p>
            <p className="text-sm font-semibold text-amber-700">{opportunity.impactDetail}</p>
          </div>
        </div>

        {/* Trigger */}
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-1">Trigger / Why Flagged</p>
          <p className="text-sm text-gray-900">{opportunity.trigger}</p>
        </div>

        {/* Recommended Action */}
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-xs font-semibold text-blue-600 mb-1">Recommended Action</p>
          <p className="text-sm text-gray-900">{opportunity.recommendedAction}</p>
        </div>

        {/* Owner & Approver */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Owner</p>
            <p className="text-sm font-semibold text-gray-900">{opportunity.owner}</p>
            <p className="text-xs text-gray-500">{opportunity.ownerRole}</p>
          </div>
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500">Execution Type</p>
            <p className="text-sm font-semibold text-gray-900 capitalize">{opportunity.executionType}</p>
          </div>
        </div>

        {/* Scenario Recommendations */}
        {scenario && (
          <div className="p-3 rounded-lg border border-purple-200 bg-purple-50">
            <p className="text-xs font-semibold text-purple-700 mb-2">Fresenius Recommendations</p>
            <ul className="space-y-1.5">
              {scenario.recommendations.slice(0, 4).map((rec, idx) => (
                <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-purple-500 flex-shrink-0 mt-0.5" />
                  {rec}
                </li>
              ))}
            </ul>
            {scenario.recommendations.length > 4 && (
              <p className="text-xs text-purple-600 mt-2">+{scenario.recommendations.length - 4} more recommendations</p>
            )}
          </div>
        )}

        {/* Assigned Roles */}
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-2">Assigned Functions</p>
          <div className="flex flex-wrap gap-2">
            {opportunity.assignedRoles.map((roleId) => {
              const role = roleConfig.find(r => r.id === roleId)
              if (!role) return null
              const RoleIcon = role.icon
              return (
                <span key={roleId} className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                  <RoleIcon className="h-3 w-3" />
                  {role.label}
                </span>
              )
            })}
          </div>
        </div>

        {/* Notes placeholder */}
        <div className="p-3 rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-600 mb-2">Notes / Comments</p>
          <p className="text-xs text-gray-500 italic">No comments yet. Add context for the team.</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border space-y-2">
        {opportunity.hasScenario && opportunity.scenarioId && (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onOpenScenario(opportunity.scenarioId!)}
          >
            <Layers className="h-4 w-4 mr-2" />
            View Scenario Options
          </Button>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-1" />
            Generate Fact Pack
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-1" />
            Send to Approver
          </Button>
        </div>
        {opportunity.status === "to-execute" && (
          <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark Executed
          </Button>
        )}
      </div>
    </Card>
  )
}

// Role View Content Component
function RoleViewContent({
  role,
  opportunities,
  selectedOpportunity,
  onSelectOpportunity,
  expandedOpportunity,
  onToggleExpand
}: {
  role: RoleType
  opportunities: Opportunity[]
  selectedOpportunity: Opportunity | null
  onSelectOpportunity: (opp: Opportunity) => void
  expandedOpportunity: string | null
  onToggleExpand: (id: string) => void
}) {
  const roleInfo = roleConfig.find(r => r.id === role)
  const RoleIcon = roleInfo?.icon || User

  // Filter opportunities for this role
  const myOpportunities = opportunities.filter(opp => opp.assignedRoles.includes(role))
  const toExecute = myOpportunities.filter(opp => opp.status === "to-execute")
  const inReview = myOpportunities.filter(opp => opp.status === "in-review" || opp.status === "waiting-approval")
  const completed = myOpportunities.filter(opp => opp.status === "executed")
  const blocked = myOpportunities.filter(opp => opp.status === "blocked")

  return (
    <div className="space-y-6">
      {/* Role Header */}
      <Card className="p-4 border border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <RoleIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{roleInfo?.label} Execution Cockpit</h3>
            <p className="text-sm text-muted-foreground">
              {myOpportunities.length} opportunities assigned | {toExecute.length} to execute | {inReview.length} in review
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="p-3 border border-blue-200 bg-blue-50">
          <p className="text-xs text-blue-600 font-medium">To Execute</p>
          <p className="text-2xl font-bold text-blue-700">{toExecute.length}</p>
        </Card>
        <Card className="p-3 border border-amber-200 bg-amber-50">
          <p className="text-xs text-amber-600 font-medium">In Review</p>
          <p className="text-2xl font-bold text-amber-700">{inReview.length}</p>
        </Card>
        <Card className="p-3 border border-green-200 bg-green-50">
          <p className="text-xs text-green-600 font-medium">Completed</p>
          <p className="text-2xl font-bold text-green-700">{completed.length}</p>
        </Card>
        <Card className="p-3 border border-red-200 bg-red-50">
          <p className="text-xs text-red-600 font-medium">Blocked</p>
          <p className="text-2xl font-bold text-red-700">{blocked.length}</p>
        </Card>
      </div>

      {/* My Actions Section */}
      {toExecute.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Play className="h-4 w-4 text-blue-600" />
              My Actions - To Execute
            </h4>
            <span className="text-xs text-muted-foreground">{toExecute.length} items</span>
          </div>
          <div className="space-y-2">
            {toExecute.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSelected={selectedOpportunity?.id === opp.id}
                onSelect={() => onSelectOpportunity(opp)}
                isExpanded={expandedOpportunity === opp.id}
                onToggleExpand={() => onToggleExpand(opp.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Needs Review Section */}
      {inReview.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 text-amber-600" />
              Needs Review / Approval
            </h4>
            <span className="text-xs text-muted-foreground">{inReview.length} items</span>
          </div>
          <div className="space-y-2">
            {inReview.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSelected={selectedOpportunity?.id === opp.id}
                onSelect={() => onSelectOpportunity(opp)}
                isExpanded={expandedOpportunity === opp.id}
                onToggleExpand={() => onToggleExpand(opp.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {completed.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              Completed This Week
            </h4>
            <span className="text-xs text-muted-foreground">{completed.length} items</span>
          </div>
          <div className="space-y-2">
            {completed.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                isSelected={selectedOpportunity?.id === opp.id}
                onSelect={() => onSelectOpportunity(opp)}
                isExpanded={expandedOpportunity === opp.id}
                onToggleExpand={() => onToggleExpand(opp.id)}
              />
            ))}
          </div>
        </div>
      )}

      {myOpportunities.length === 0 && (
        <Card className="p-8 text-center border border-dashed border-gray-300">
          <CheckCircle2 className="h-12 w-12 mx-auto text-green-500 mb-4" />
          <p className="text-muted-foreground">No opportunities assigned to this role</p>
        </Card>
      )}
    </div>
  )
}

// Scenario Modal Component
export function ScenarioModal({
  scenarioId,
  onClose
}: {
  scenarioId: string
  onClose: () => void
}) {
  const [selectedOption, setSelectedOption] = useState("a")
  const [showExecution, setShowExecution] = useState(false)
  const [isModifyMode, setIsModifyMode] = useState(false)
  const [hasCustomScenario, setHasCustomScenario] = useState(false)
  
  // Modify Scenario Parameters State
  const [globalRedeployment, setGlobalRedeployment] = useState(75)
  const [targetMarkets, setTargetMarkets] = useState<string[]>(["EU EMEA", "AP APAC"])
  const [discountRate, setDiscountRate] = useState(0)
  const [productionAdjustment, setProductionAdjustment] = useState(0)
  const [executionTimeline, setExecutionTimeline] = useState(5)
  
  // Saved custom scenario parameters
  const [savedCustomScenario, setSavedCustomScenario] = useState<{
    globalRedeployment: number
    targetMarkets: string[]
    discountRate: number
    productionAdjustment: number
    executionTimeline: number
    netSavings: number
    totalCost: number
    eoRecovery: number
    riskLevel: string
  } | null>(null)

  const data = scenarioData[scenarioId as keyof typeof scenarioData]
  if (!data) return null

  // Calculate live impact based on parameters
  const baseExposure = 3.0 // $3M base
  const redeploymentCost = (globalRedeployment / 100) * 0.35 + (targetMarkets.length * 0.05)
  const discountingCost = (discountRate / 100) * 0.8
  const productionImpact = (productionAdjustment / 100) * 0.25
  const totalCost = redeploymentCost + discountingCost + productionImpact
  const netSavings = (globalRedeployment / 100) * 2.0 + (targetMarkets.length * 0.1) - totalCost
  const eoRecovery = Math.min(100, Math.round((netSavings / baseExposure) * 100 + 20))
  const riskLevel = executionTimeline <= 3 ? "Medium" : executionTimeline <= 6 ? "Low" : "Very Low"

  const toggleMarket = (market: string) => {
    setTargetMarkets(prev => 
      prev.includes(market) 
        ? prev.filter(m => m !== market)
        : [...prev, market]
    )
  }

  const resetToDefault = () => {
    setGlobalRedeployment(75)
    setTargetMarkets(["EU EMEA", "AP APAC"])
    setDiscountRate(0)
    setProductionAdjustment(0)
    setExecutionTimeline(5)
  }
  
  const applyCustomScenario = () => {
    setSavedCustomScenario({
      globalRedeployment,
      targetMarkets,
      discountRate,
      productionAdjustment,
      executionTimeline,
      netSavings,
      totalCost,
      eoRecovery,
      riskLevel
    })
    setHasCustomScenario(true)
    setSelectedOption("custom")
    setIsModifyMode(false)
  }

  // Get scenario-specific configuration
  const modifyConfig = scenarioModifyConfig[scenarioId as keyof typeof scenarioModifyConfig] || scenarioModifyConfig["clinic-overstock"]
  
  // Modify Scenario View
  if (isModifyMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="relative bg-background rounded-2xl shadow-2xl w-[90vw] max-w-[1200px] h-[85vh] max-h-[800px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-blue-50 to-cyan-50 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{modifyConfig.title}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{modifyConfig.subtitle}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetToDefault} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset to Default
            </Button>
          </div>

          {/* Content - Two Column Layout */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-5 gap-6 h-full">
              {/* Left Column - Dynamic Parameters based on Scenario */}
              <div className="col-span-3 space-y-5">
                {modifyConfig.parameters.map((param, idx) => {
                  const colorClasses: Record<string, { bg: string, accent: string, text: string }> = {
                    blue: { bg: "bg-blue-100", accent: "accent-blue-600", text: "text-blue-600" },
                    green: { bg: "bg-green-100", accent: "accent-green-600", text: "text-green-600" },
                    amber: { bg: "bg-amber-100", accent: "accent-amber-500", text: "text-amber-600" },
                    purple: { bg: "bg-purple-100", accent: "accent-purple-600", text: "text-purple-600" },
                    red: { bg: "bg-red-100", accent: "accent-red-600", text: "text-red-600" },
                    cyan: { bg: "bg-cyan-100", accent: "accent-cyan-500", text: "text-cyan-600" }
                  }
                  const colors = colorClasses[param.color] || colorClasses.blue
                  
                  // Get parameter value from state
                  const paramValues: Record<string, number | string | string[]> = {
                    0: globalRedeployment,
                    1: discountRate,
                    2: targetMarkets,
                    3: executionTimeline
                  }
                  const currentValue = paramValues[idx] ?? param.defaultValue
                  
                  // Get setter function
                  const setters: Record<number, (val: number) => void> = {
                    0: setGlobalRedeployment,
                    1: setDiscountRate,
                    2: () => {}, // Toggle group handled separately
                    3: setExecutionTimeline
                  }
                  
                  if (param.type === "slider") {
                    return (
                      <div key={param.id} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={cn("p-1 rounded", colors.bg)}>
                              {param.icon === "Building2" && <Building2 className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "TrendingDown" && <TrendingDown className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Clock" && <Clock className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Globe" && <Globe className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Shield" && <Shield className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Factory" && <Factory className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Truck" && <Truck className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "ArrowRightLeft" && <ArrowRightLeft className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Pause" && <Pause className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "MapPin" && <MapPin className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "RotateCcw" && <RotateCcw className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Ban" && <Ban className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Zap" && <Zap className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "FileX" && <FileX className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Calendar" && <Calendar className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Target" && <Target className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Users" && <Users className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "AlertTriangle" && <AlertTriangle className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "ClipboardCheck" && <ClipboardCheck className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Database" && <Database className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "Layers" && <Layers className={cn("h-4 w-4", colors.text)} />}
                              {param.icon === "RefreshCw" && <RefreshCw className={cn("h-4 w-4", colors.text)} />}
                            </div>
                            <span className="text-sm font-semibold text-foreground">{param.name}</span>
                          </div>
                          <span className={cn("text-sm font-bold", colors.text)}>
                            {typeof currentValue === 'number' ? currentValue : param.defaultValue}{param.unit}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={param.min}
                          max={param.max}
                          value={typeof currentValue === 'number' ? currentValue : param.defaultValue as number}
                          onChange={(e) => setters[idx]?.(Number(e.target.value))}
                          className={cn("w-full h-2 rounded-lg appearance-none cursor-pointer", colors.bg, colors.accent)}
                        />
                        <p className="text-xs text-muted-foreground mt-2">{param.description}</p>
                      </div>
                    )
                  }
                  
                  if (param.type === "toggle-group") {
                    const selectedOptions = Array.isArray(currentValue) ? currentValue : [currentValue as string]
                    return (
                      <div key={param.id} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={cn("p-1 rounded", colors.bg)}>
                            {param.icon === "Layers" && <Layers className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Truck" && <Truck className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Pause" && <Pause className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "MapPin" && <MapPin className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Globe" && <Globe className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Ban" && <Ban className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "FileX" && <FileX className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Target" && <Target className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "ClipboardCheck" && <ClipboardCheck className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "Database" && <Database className={cn("h-4 w-4", colors.text)} />}
                            {param.icon === "RefreshCw" && <RefreshCw className={cn("h-4 w-4", colors.text)} />}
                          </div>
                          <span className="text-sm font-semibold text-foreground">{param.name}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {param.options?.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                if (idx === 2) {
                                  setTargetMarkets([option])
                                }
                              }}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                                selectedOptions.includes(option)
                                  ? `bg-${param.color}-500 text-white border-${param.color}-500`
                                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-400",
                                selectedOptions.includes(option) && param.color === "green" && "bg-green-500 border-green-500",
                                selectedOptions.includes(option) && param.color === "purple" && "bg-purple-500 border-purple-500",
                                selectedOptions.includes(option) && param.color === "amber" && "bg-amber-500 border-amber-500",
                                selectedOptions.includes(option) && param.color === "red" && "bg-red-500 border-red-500",
                                selectedOptions.includes(option) && param.color === "blue" && "bg-blue-500 border-blue-500"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{param.description}</p>
                      </div>
                    )
                  }
                  
                  return null
                })}
              </div>

              {/* Right Column - Live Impact Summary */}
              <div className="col-span-2 space-y-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-0">
                  <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    Live Impact Summary
                  </h3>
                  
                  {/* Main Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                      <p className="text-xs text-gray-500 mb-1">{modifyConfig.impactMetrics.primaryLabel}</p>
                      <p className="text-2xl font-bold text-red-600">${baseExposure.toFixed(2)}M</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-xs text-gray-500 mb-1">{modifyConfig.impactMetrics.secondaryLabel}</p>
                      <p className="text-2xl font-bold text-green-600">${netSavings.toFixed(2)}M</p>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" />
                        {modifyConfig.impactMetrics.costLabels[0] || "Implementation Cost"}
                      </span>
                      <span className="font-semibold">${(redeploymentCost * 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" />
                        {modifyConfig.impactMetrics.costLabels[1] || "Operational Cost"}
                      </span>
                      <span className="font-semibold">${(discountingCost * 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <BarChart3 className="h-3.5 w-3.5" />
                        {modifyConfig.impactMetrics.costLabels[2] || "Other Cost"}
                      </span>
                      <span className="font-semibold">${(productionImpact * 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="font-semibold text-foreground">Total Cost</span>
                      <span className="font-bold">${(totalCost * 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  {/* E&O Recovery Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">E&O Recovery</span>
                      <span className="font-bold text-green-600">{eoRecovery}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                        style={{ width: `${eoRecovery}%` }}
                      />
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border",
                    riskLevel === "Low" || riskLevel === "Very Low" ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
                  )}>
                    <AlertTriangle className={cn(
                      "h-4 w-4",
                      riskLevel === "Low" || riskLevel === "Very Low" ? "text-green-600" : "text-amber-600"
                    )} />
                    <span className={cn(
                      "text-sm font-semibold",
                      riskLevel === "Low" || riskLevel === "Very Low" ? "text-green-700" : "text-amber-700"
                    )}>
                      Risk Level: {riskLevel}
                    </span>
                  </div>
                </div>

                {/* Comparison vs Defaults */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    Your Custom Scenario vs. Defaults
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Global Redeployment (default)</span>
                      <span className="font-semibold text-green-600">$2.65M savings</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Discounting (default)</span>
                      <span className="font-semibold text-green-600">$2.40M savings</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Production Reduction (default)</span>
                      <span className="font-semibold text-green-600">$2.15M savings</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200">
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                        Your Custom Scenario
                      </span>
                      <span className="font-bold text-green-600">${netSavings.toFixed(2)}M savings</span>
                    </div>
                  </div>
                  {netSavings < 2.15 && (
                    <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs text-amber-700 flex items-center gap-1">
                        <TrendingDown className="h-3.5 w-3.5" />
                        Below conservative baseline. Consider adjusting parameters.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/50 flex-shrink-0">
            <p className="text-xs text-muted-foreground">All calculations are estimates based on current E&O exposure data</p>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} className="gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={applyCustomScenario} className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Check className="h-4 w-4" />
                Apply Custom Scenario
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-2xl shadow-2xl w-[90vw] max-w-[1200px] h-[85vh] max-h-[800px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/50 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-red-100">
              <Package className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{data.issue.title}</h2>
              <p className="text-sm text-muted-foreground mt-0.5 max-w-2xl">{data.issue.summary}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} className="h-10 w-10 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Issue Summary Cards */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
              <p className="text-xs text-gray-500 mb-1">Exposure</p>
              <p className="text-xl font-bold text-red-600">{data.issue.impact}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
              <p className="text-xs text-gray-500 mb-1">Units/SKUs Impacted</p>
              <p className="text-lg font-bold text-amber-600">{data.issue.unitsImpacted}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
              <p className="text-xs text-gray-500 mb-1">Account/Scope</p>
              <p className="text-sm font-bold text-blue-600">{data.issue.accountsAtRisk}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Constraint/Opportunity</p>
              <p className="text-xs font-semibold text-gray-700">{data.issue.constraint}</p>
            </div>
          </div>

          {/* Key Drivers */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-foreground mb-3">Key Drivers</h3>
            <div className="grid grid-cols-4 gap-3">
              {data.drivers.map((driver, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-3 rounded-xl border",
                    driver.type === "positive" ? "bg-green-50 border-green-200" : 
                    driver.type === "critical" ? "bg-red-50 border-red-200" : 
                    "bg-amber-50 border-amber-200"
                  )}
                >
                  <p className="text-xs text-gray-600 mb-1">{driver.name}</p>
                  <p className={cn(
                    "text-sm font-bold",
                    driver.type === "positive" ? "text-green-600" : 
                    driver.type === "critical" ? "text-red-600" : "text-amber-600"
                  )}>
                    {driver.context}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Options */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-foreground mb-3">Scenario Options</h3>
            <div className={cn("grid gap-4", hasCustomScenario ? "grid-cols-4" : "grid-cols-3")}>
              {/* Custom Scenario - shown first if applied */}
              {hasCustomScenario && savedCustomScenario && (
                <div 
                  onClick={() => setSelectedOption("custom")}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedOption === "custom" 
                      ? "border-blue-500 bg-blue-50 shadow-lg" 
                      : "border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:shadow"
                  )}
                >
                  <span className="absolute -top-2 left-4 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                    YOUR CUSTOM
                  </span>
                  <h4 className="text-sm font-bold text-foreground mt-1 mb-3">Custom Scenario</h4>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Net Savings</span>
                      <span className="font-semibold text-green-600">${savedCustomScenario.netSavings.toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Total Cost</span>
                      <span className="font-semibold text-red-600">${(savedCustomScenario.totalCost * 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Timeline</span>
                      <span className="font-semibold text-foreground">{savedCustomScenario.executionTimeline} weeks</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Risk</span>
                      <span className={cn(
                        "font-semibold",
                        savedCustomScenario.riskLevel === "High" ? "text-red-600" : 
                        savedCustomScenario.riskLevel === "Medium" ? "text-amber-600" : "text-green-600"
                      )}>{savedCustomScenario.riskLevel}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">E&O Recovery</span>
                      <span className="font-semibold text-blue-600">{savedCustomScenario.eoRecovery}%</span>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">Parameters</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
                        {savedCustomScenario.globalRedeployment}% global redeployment
                      </li>
                      <li className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
                        {savedCustomScenario.targetMarkets.length} target markets
                      </li>
                      <li className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-blue-400 flex-shrink-0 mt-0.5" />
                        {savedCustomScenario.discountRate}% discount rate
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Default Scenarios */}
              {data.scenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  onClick={() => setSelectedOption(scenario.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                    selectedOption === scenario.id 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "border-border bg-card hover:border-gray-300 hover:shadow"
                  )}
                >
                  {scenario.recommended && !hasCustomScenario && (
                    <span className="absolute -top-2 left-4 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                      RECOMMENDED
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-foreground mt-1 mb-3">{scenario.name}</h4>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Impact</span>
                      <span className="font-semibold text-green-600">{scenario.impact}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Cost</span>
                      <span className="font-semibold text-red-600">{scenario.cost}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Timeline</span>
                      <span className="font-semibold text-foreground">{scenario.timeline}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Risk</span>
                      <span className={cn(
                        "font-semibold",
                        scenario.risk === "High" ? "text-red-600" : 
                        scenario.risk === "Medium" ? "text-amber-600" : "text-green-600"
                      )}>{scenario.risk}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">Key Actions</p>
                    <ul className="space-y-1">
                      {scenario.actions.slice(0, 3).map((action, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
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

          {/* Fresenius Recommendations */}
          {!showExecution && (
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50">
              <h3 className="text-sm font-bold text-purple-700 mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Fresenius-Specific Recommendations
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {data.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-500 flex-shrink-0 mt-0.5" />
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Execution Plan - shown after Generate Execution Plan is clicked */}
          {showExecution && (
            <div className="space-y-6">
              {/* Active Scenario Header */}
              {(hasCustomScenario && selectedOption === "custom") && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Edit3 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">Custom Scenario Active</h3>
                      <p className="text-sm text-blue-700">
                        {savedCustomScenario?.globalRedeployment}% redeployment to {savedCustomScenario?.targetMarkets.length} market(s) | Net savings: ${savedCustomScenario?.netSavings.toFixed(2)}M
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsModifyMode(true)} className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-100">
                    <Edit3 className="h-4 w-4" />
                    Edit Parameters
                  </Button>
                </div>
              )}
              
              {/* Execution Plan Table - Dynamic based on scenario */}
              {(() => {
                const execPlan = scenarioExecutionPlans[scenarioId as keyof typeof scenarioExecutionPlans] || scenarioExecutionPlans["clinic-overstock"]
                const colorClasses: Record<string, { border: string, bg: string, text: string, icon: string }> = {
                  amber: { border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-600" },
                  blue: { border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-600" },
                  green: { border: "border-green-200", bg: "bg-green-50", text: "text-green-700", icon: "text-green-600" },
                  red: { border: "border-red-200", bg: "bg-red-50", text: "text-red-700", icon: "text-red-600" },
                  purple: { border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-600" }
                }
                
                const getIcon = (iconName: string, className: string) => {
                  const icons: Record<string, React.ReactNode> = {
                    "Building2": <Building2 className={className} />,
                    "Package": <Package className={className} />,
                    "Shield": <Shield className={className} />,
                    "Truck": <Truck className={className} />,
                    "Factory": <Factory className={className} />,
                    "MapPin": <MapPin className={className} />,
                    "DollarSign": <DollarSign className={className} />,
                    "ShoppingCart": <ShoppingCart className={className} />,
                    "TrendingUp": <TrendingUp className={className} />,
                    "TrendingDown": <TrendingDown className={className} />,
                    "FileX": <FileX className={className} />,
                    "Calendar": <Calendar className={className} />,
                    "Users": <Users className={className} />,
                    "Database": <Database className={className} />,
                    "Target": <Target className={className} />,
                    "Layers": <Layers className={className} />
                  }
                  return icons[iconName] || <Package className={className} />
                }
                
                return (
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <h3 className="font-bold text-foreground">Execution Plan</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Execution plan generated: {execPlan.summary.agentActions} agent actions, {execPlan.summary.plannerApprovals} planner approvals
                      </p>
                    </div>
                    
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-muted-foreground uppercase">
                      <div className="col-span-2">Function</div>
                      <div className="col-span-5 flex items-center gap-1">
                        <Bot className="h-3.5 w-3.5" />
                        Agent Action
                      </div>
                      <div className="col-span-5 flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        Planner Action
                      </div>
                    </div>
                    
                    {/* Dynamic Rows */}
                    {execPlan.rows.map((row, idx) => {
                      const colors = colorClasses[row.functionColor] || colorClasses.blue
                      const isLastRow = idx === execPlan.rows.length - 1
                      
                      return (
                        <div key={idx} className={cn("grid grid-cols-12 gap-4 px-4 py-4 items-stretch", !isLastRow && "border-b border-gray-100")}>
                          {/* Function Column */}
                          <div className="col-span-2 flex">
                            <div className={cn("flex flex-col items-center justify-center gap-2 p-3 rounded-lg border w-full", colors.border, colors.bg)}>
                              {getIcon(row.functionIcon, cn("h-5 w-5", colors.icon))}
                              <span className={cn("text-xs font-semibold text-center", colors.text)}>{row.function}</span>
                            </div>
                          </div>
                          
                          {/* Agent Action Column */}
                          <div className="col-span-5 flex">
                            {row.agentAction.hasAction ? (
                              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex flex-col w-full">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded flex items-center gap-1">
                                    <Bot className="h-3 w-3" />
                                    Auto
                                  </span>
                                </div>
                                <h4 className="font-semibold text-sm text-foreground">{row.agentAction.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1 flex-1">{row.agentAction.description}</p>
                                {row.agentAction.metric && (
                                  <div className="mt-2 px-2 py-1 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 inline-block self-start">
                                    {row.agentAction.metric}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center w-full">
                                <p className="text-xs text-muted-foreground italic">No agent action</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Planner Action Column */}
                          <div className="col-span-5 flex">
                            {row.plannerAction.title !== "No planner action" ? (
                              <div className={cn("p-3 rounded-lg flex flex-col w-full", row.plannerAction.status === "pending" ? "bg-amber-50 border border-amber-200" : "bg-orange-50 border border-orange-200")}>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Users className="h-3.5 w-3.5" />
                                    {row.plannerAction.role}
                                  </div>
                                  <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", row.plannerAction.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-orange-100 text-orange-700")}>
                                    {row.plannerAction.status === "pending" ? "Pending Review" : "Awaiting Approval"}
                                  </span>
                                </div>
                                <h4 className="font-semibold text-sm text-foreground">{row.plannerAction.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1 flex-1">{row.plannerAction.description}</p>
                              </div>
                            ) : (
                              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center w-full">
                                <p className="text-xs text-muted-foreground italic">No planner action</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            {showExecution ? (
              <>
                <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 gap-2">
                  <Play className="h-4 w-4" />
                  Commit & Execute
                </Button>
                <Button variant="outline" onClick={() => setIsModifyMode(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Modify Scenario
                </Button>
                <Button variant="outline" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsModifyMode(true)} className="gap-2">
                  <Edit3 className="h-4 w-4" />
                  Modify Scenario
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!showExecution ? (
              <Button onClick={() => setShowExecution(true)} className="bg-blue-600 hover:bg-blue-700">
                Generate Execution Plan
              </Button>
            ) : (
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            )}
            {!showExecution && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OpportunityOrchestrationView() {
  // View State
  const [viewType, setViewType] = useState<"master" | "role">("master")
  const [selectedRole, setSelectedRole] = useState<RoleType>("supply-planner")
  
  // Filter State
  const [selectedTypes, setSelectedTypes] = useState<OpportunityType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  
  // Selection State
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(null)
  
  // Modal State
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null)

  // Filter opportunities
  const filteredOpportunities = opportunitiesData.filter(opp => {
    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(opp.type)) {
      return false
    }
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        opp.title.toLowerCase().includes(query) ||
        opp.customer?.toLowerCase().includes(query) ||
        opp.product?.toLowerCase().includes(query) ||
        opp.owner.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Toggle type filter
  const toggleTypeFilter = (typeId: OpportunityType) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    )
  }

  // Handle opportunity selection
  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp)
  }

  // Toggle expansion
  const handleToggleExpand = (id: string) => {
    setExpandedOpportunity(prev => prev === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Fresenius S&OE Opportunity Orchestration</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and act on inventory, safety stock, lead time, MOQ, and phase in/out opportunities across planning, sales, and sourcing.
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewType("master")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  viewType === "master" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="h-4 w-4 inline mr-2" />
                Master View
              </button>
              <button
                onClick={() => setViewType("role")}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all",
                  viewType === "role" 
                    ? "bg-card text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <User className="h-4 w-4 inline mr-2" />
                Role View
              </button>
            </div>
            
            {/* Role Selector (only visible in Role View) */}
            {viewType === "role" && (
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as RoleType)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground"
              >
                {roleConfig.map((role) => (
                  <option key={role.id} value={role.id}>{role.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* KPI Banner */}
        <KPIBanner viewType={viewType} selectedRole={selectedRole} />
        
        {viewType === "master" ? (
          /* Master View Layout */
          <div className="flex gap-6">
            {/* Left Side - Opportunity List */}
            <div className="flex-1">
              {/* Type Filters */}
              <Card className="p-4 mb-4 border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Filter by Opportunity Type</h3>
                  {selectedTypes.length > 0 && (
                    <button 
                      onClick={() => setSelectedTypes([])}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {opportunityTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = selectedTypes.includes(type.id)
                    const count = opportunitiesData.filter(o => o.type === type.id).length
                    
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleTypeFilter(type.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                          isSelected 
                            ? "text-white shadow-md" 
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                        style={isSelected ? { backgroundColor: type.color } : {}}
                      >
                        <Icon className="h-4 w-4" />
                        {type.label}
                        <span className={cn(
                          "px-1.5 py-0.5 rounded-full text-[10px]",
                          isSelected ? "bg-white/20" : "bg-gray-200"
                        )}>
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </Card>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search opportunities by title, customer, product, or owner..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Opportunity Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredOpportunities.length}</span> of {opportunitiesData.length} opportunities
                </p>
              </div>

              {/* Opportunity Cards */}
              <div className="space-y-2">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isSelected={selectedOpportunity?.id === opp.id}
                    onSelect={() => handleSelectOpportunity(opp)}
                    isExpanded={expandedOpportunity === opp.id}
                    onToggleExpand={() => handleToggleExpand(opp.id)}
                  />
                ))}
              </div>

              {filteredOpportunities.length === 0 && (
                <Card className="p-8 text-center border border-dashed border-gray-300">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No opportunities match your filters</p>
                </Card>
              )}
            </div>

            {/* Right Side - Detail Panel */}
            <div className="w-[400px] flex-shrink-0">
              <div className="sticky top-6">
                <OpportunityDetailPanel 
                  opportunity={selectedOpportunity}
                  onClose={() => setSelectedOpportunity(null)}
                  onOpenScenario={(id) => setActiveScenarioId(id)}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Role View Layout */
          <div className="flex gap-6">
            <div className="flex-1">
              <RoleViewContent
                role={selectedRole}
                opportunities={opportunitiesData}
                selectedOpportunity={selectedOpportunity}
                onSelectOpportunity={handleSelectOpportunity}
                expandedOpportunity={expandedOpportunity}
                onToggleExpand={handleToggleExpand}
              />
            </div>
            
            {/* Right Side - Detail Panel */}
            <div className="w-[400px] flex-shrink-0">
              <div className="sticky top-6">
                <OpportunityDetailPanel 
                  opportunity={selectedOpportunity}
                  onClose={() => setSelectedOpportunity(null)}
                  onOpenScenario={(id) => setActiveScenarioId(id)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Scenario Modal */}
      {activeScenarioId && (
        <ScenarioModal
          scenarioId={activeScenarioId}
          onClose={() => setActiveScenarioId(null)}
        />
      )}
    </div>
  )
}
