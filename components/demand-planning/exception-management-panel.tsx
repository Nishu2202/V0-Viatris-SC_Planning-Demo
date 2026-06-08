"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronRight,
  Filter,
  DollarSign,
  Package,
  TrendingDown,
  TrendingUp,
  ArrowUpDown,
  Zap
} from "lucide-react"

type ExceptionType = "demand_spike" | "supply_gap" | "low_confidence" | "bias_alert" | "excess_inventory"
type Severity = "critical" | "high" | "medium" | "low"

interface Exception {
  id: string
  sku: string
  productName: string
  region: string
  type: ExceptionType
  severity: Severity
  revenueImpact: string
  description: string
  aiSuggestion: string
  dueDate: string
  assignee?: string
  status: "open" | "in_progress" | "resolved"
}

const exceptions: Exception[] = [
  {
    id: "EXC-001",
    sku: "TKA-TRIATHLON-001",
    productName: "Triathlon TKA System",
    region: "APAC",
    type: "demand_spike",
    severity: "critical",
    revenueImpact: "$8.2M",
    description: "Demand surge 45% above forecast in Japan - capacity constraints emerging",
    aiSuggestion: "Accelerate APAC production by 20% and reallocate 15% EMEA inventory",
    dueDate: "Oct 18",
    assignee: "Sarah Chen",
    status: "open"
  },
  {
    id: "EXC-002",
    sku: "SPINE-XT-042",
    productName: "Spine XT Fusion System",
    region: "EMEA",
    type: "supply_gap",
    severity: "high",
    revenueImpact: "$4.5M",
    description: "Supplier delay - 3 week lead time extension on critical components",
    aiSuggestion: "Activate secondary supplier or adjust regional allocation priorities",
    dueDate: "Oct 20",
    status: "in_progress"
  },
  {
    id: "EXC-003",
    sku: "BIO-TENODESIS-015",
    productName: "Bio-Tenodesis Screw Kit",
    region: "NA",
    type: "low_confidence",
    severity: "medium",
    revenueImpact: "$2.1M",
    description: "Forecast confidence dropped to 58% - new competitor product launch",
    aiSuggestion: "Review market intelligence and adjust demand signals weighting",
    dueDate: "Oct 22",
    status: "open"
  },
  {
    id: "EXC-004",
    sku: "SHOULDER-ARTH-008",
    productName: "Shoulder Arthroplasty Kit",
    region: "NA",
    type: "excess_inventory",
    severity: "medium",
    revenueImpact: "$1.8M",
    description: "120 DOS - potential E&O risk if demand trend continues",
    aiSuggestion: "Consider APAC reallocation or promotional pricing in Q4",
    dueDate: "Oct 25",
    assignee: "Mike Rodriguez",
    status: "open"
  },
  {
    id: "EXC-005",
    sku: "KNEE-REVISION-003",
    productName: "Knee Revision System",
    region: "EMEA",
    type: "bias_alert",
    severity: "low",
    revenueImpact: "$0.9M",
    description: "Consistent under-forecasting for 3 months - review model parameters",
    aiSuggestion: "Increase baseline by 8% and add recent procedure data signals",
    dueDate: "Oct 28",
    status: "open"
  },
]

const typeConfig: Record<ExceptionType, { label: string; icon: React.ReactNode; color: string }> = {
  demand_spike: { 
    label: "Demand Spike", 
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    color: "bg-orange-100 text-orange-700 border-orange-200"
  },
  supply_gap: { 
    label: "Supply Gap", 
    icon: <Package className="h-3.5 w-3.5" />,
    color: "bg-red-100 text-red-700 border-red-200"
  },
  low_confidence: { 
    label: "Low Confidence", 
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
    color: "bg-amber-100 text-amber-700 border-amber-200"
  },
  bias_alert: { 
    label: "Bias Alert", 
    icon: <ArrowUpDown className="h-3.5 w-3.5" />,
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  excess_inventory: { 
    label: "Excess Inventory", 
    icon: <TrendingDown className="h-3.5 w-3.5" />,
    color: "bg-purple-100 text-purple-700 border-purple-200"
  },
}

const severityConfig: Record<Severity, { color: string; bg: string }> = {
  critical: { color: "text-red-700", bg: "bg-red-500" },
  high: { color: "text-orange-700", bg: "bg-orange-500" },
  medium: { color: "text-amber-700", bg: "bg-amber-500" },
  low: { color: "text-blue-700", bg: "bg-blue-500" },
}

const regionColors: Record<string, string> = {
  NA: "bg-blue-100 text-blue-700",
  EMEA: "bg-emerald-100 text-emerald-700",
  APAC: "bg-amber-100 text-amber-700",
}

export default function ExceptionManagementPanel() {
  const [filter, setFilter] = useState<Severity | "all">("all")
  
  const filteredExceptions = filter === "all" 
    ? exceptions 
    : exceptions.filter(e => e.severity === filter)
  
  const criticalCount = exceptions.filter(e => e.severity === "critical").length
  const highCount = exceptions.filter(e => e.severity === "high").length
  const totalRevenue = "$17.5M"

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Exception Management</h2>
            <p className="text-sm text-muted-foreground">Prioritized exceptions requiring planner action</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total at Risk:</span>
            <span className="font-bold text-red-600">{totalRevenue}</span>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["all", "critical", "high", "medium"] as const).map((sev) => (
              <Button
                key={sev}
                variant={filter === sev ? "default" : "outline"}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setFilter(sev)}
              >
                {sev === "all" ? "All" : sev.charAt(0).toUpperCase() + sev.slice(1)}
                {sev !== "all" && (
                  <span className="ml-1 opacity-70">
                    ({exceptions.filter(e => e.severity === sev).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="text-xs text-red-600 font-medium">Critical</div>
          <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
        </div>
        <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
          <div className="text-xs text-orange-600 font-medium">High</div>
          <div className="text-2xl font-bold text-orange-700">{highCount}</div>
        </div>
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
          <div className="text-xs text-amber-600 font-medium">Open</div>
          <div className="text-2xl font-bold text-amber-700">
            {exceptions.filter(e => e.status === "open").length}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
          <div className="text-xs text-green-600 font-medium">In Progress</div>
          <div className="text-2xl font-bold text-green-700">
            {exceptions.filter(e => e.status === "in_progress").length}
          </div>
        </div>
      </div>

      {/* Exception List */}
      <div className="space-y-3">
        {filteredExceptions.map((exception) => {
          const typeInfo = typeConfig[exception.type]
          const sevInfo = severityConfig[exception.severity]
          
          return (
            <div 
              key={exception.id}
              className="p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Severity Indicator */}
                <div className={`w-1.5 h-16 rounded-full ${sevInfo.bg} flex-shrink-0`} />
                
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-muted-foreground">{exception.id}</span>
                    <Badge className={regionColors[exception.region]}>{exception.region}</Badge>
                    <Badge className={`${typeInfo.color} border flex items-center gap-1`}>
                      {typeInfo.icon}
                      {typeInfo.label}
                    </Badge>
                    {exception.status === "in_progress" && (
                      <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <div className="font-semibold text-foreground">{exception.productName}</div>
                    <div className="text-xs text-muted-foreground font-mono">{exception.sku}</div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-2">{exception.description}</p>
                  
                  {/* AI Suggestion */}
                  <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-blue-700">AI Suggestion: </span>
                        <span className="text-xs text-blue-600">{exception.aiSuggestion}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Impact & Actions */}
                <div className="flex-shrink-0 text-right space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Revenue Impact</div>
                    <div className={`text-lg font-bold ${sevInfo.color}`}>{exception.revenueImpact}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Due</div>
                    <div className="text-sm font-medium text-foreground">{exception.dueDate}</div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Button size="sm" className="h-7 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Accept AI
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Override
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredExceptions.length} of {exceptions.length} exceptions
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm">
            Batch Review ({criticalCount + highCount} priority)
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
