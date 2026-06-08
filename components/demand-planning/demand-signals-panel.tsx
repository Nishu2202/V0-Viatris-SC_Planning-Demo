"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Calendar,
  ShoppingCart,
  Package,
  LineChart,
  Building2,
  Stethoscope,
  Globe
} from "lucide-react"

interface DemandSignal {
  category: string
  icon: React.ReactNode
  signals: {
    name: string
    value: string
    change: string
    trend: "up" | "down" | "flat"
    weight: number
    description: string
  }[]
}

const demandSignals: DemandSignal[] = [
  {
    category: "Order Intake",
    icon: <ShoppingCart className="h-4 w-4" />,
    signals: [
      {
        name: "Current Month Orders",
        value: "$48.2M",
        change: "+12.4%",
        trend: "up",
        weight: 85,
        description: "vs same period last month"
      },
      {
        name: "Order Backlog",
        value: "$124M",
        change: "+8.2%",
        trend: "up",
        weight: 92,
        description: "Total unfulfilled orders"
      },
    ]
  },
  {
    category: "Pipeline & Bookings",
    icon: <Calendar className="h-4 w-4" />,
    signals: [
      {
        name: "EHR Procedure Bookings",
        value: "2,847",
        change: "+15.3%",
        trend: "up",
        weight: 78,
        description: "Next 30 days scheduled"
      },
      {
        name: "Sales Pipeline",
        value: "$89M",
        change: "+5.1%",
        trend: "up",
        weight: 65,
        description: "Weighted Q4 opportunities"
      },
    ]
  },
  {
    category: "Market Intelligence",
    icon: <Globe className="h-4 w-4" />,
    signals: [
      {
        name: "Procedure Volume Index",
        value: "108.5",
        change: "+3.2",
        trend: "up",
        weight: 72,
        description: "vs baseline 100"
      },
      {
        name: "Competitor Activity",
        value: "Medium",
        change: "Stable",
        trend: "flat",
        weight: 45,
        description: "Market share movement"
      },
    ]
  },
]

const leadingIndicators = [
  { 
    name: "Surgeon Training Completions", 
    value: 156, 
    change: "+23%", 
    trend: "up" as const,
    icon: Stethoscope,
    timeframe: "Last 30 days"
  },
  { 
    name: "Hospital Capital Approvals", 
    value: 42, 
    change: "+8%", 
    trend: "up" as const,
    icon: Building2,
    timeframe: "Q4 commitments"
  },
  { 
    name: "New Account Activations", 
    value: 28, 
    change: "+15%", 
    trend: "up" as const,
    icon: Package,
    timeframe: "MTD"
  },
]

export default function DemandSignalsPanel() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Demand Signals</h2>
            <p className="text-sm text-muted-foreground">Leading indicators feeding the forecast</p>
          </div>
        </div>
        <Badge className="bg-green-100 text-green-700 border border-green-200">
          <TrendingUp className="h-3 w-3 mr-1" />
          Overall Positive
        </Badge>
      </div>

      {/* Signal Categories */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {demandSignals.map((category, idx) => (
          <div key={idx} className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                {category.icon}
              </div>
              <span className="font-semibold text-foreground text-sm">{category.category}</span>
            </div>
            
            <div className="space-y-4">
              {category.signals.map((signal, signalIdx) => (
                <div key={signalIdx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{signal.name}</span>
                    <div className="flex items-center gap-1">
                      {signal.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-green-600" />
                      ) : signal.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                      ) : (
                        <LineChart className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className={`text-xs font-medium ${
                        signal.trend === "up" ? "text-green-600" :
                        signal.trend === "down" ? "text-red-600" : "text-muted-foreground"
                      }`}>
                        {signal.change}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-lg font-bold text-foreground">{signal.value}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Signal Weight</span>
                        <span className="font-medium text-foreground">{signal.weight}%</span>
                      </div>
                      <Progress value={signal.weight} className="h-1.5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Leading Indicators Row */}
      <div className="border-t border-border pt-5">
        <div className="flex items-center gap-2 mb-4">
          <LineChart className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground">Leading Indicators</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {leadingIndicators.map((indicator, idx) => {
            const Icon = indicator.icon
            return (
              <div 
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200"
              >
                <div className="p-2 rounded-lg bg-blue-100">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground truncate">{indicator.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-foreground">{indicator.value}</span>
                    <Badge className={`${
                      indicator.trend === "up" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}>
                      {indicator.change}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">{indicator.timeframe}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
