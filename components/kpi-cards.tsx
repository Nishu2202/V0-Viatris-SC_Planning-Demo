import { Card } from "@/components/ui/card"
import { TrendingUp, Target, Truck, Package, Factory, Zap, TrendingDown } from "lucide-react"

const kpis = [
  {
    label: "Revenue vs AOP",
    value: "$2.4B",
    badge: "+3.2% vs plan",
    positive: true,
    icon: TrendingUp,
    trend: "up",
    trendValue: "+3.2%"
  },
  {
    label: "Margin vs Target",
    value: "42.3%",
    badge: "+1.8% vs target",
    positive: true,
    icon: Target,
    trend: "up",
    trendValue: "+1.8%"
  },
  {
    label: "Service Level (OTIF)",
    value: "96.2%",
    badge: "+2.1% vs target",
    positive: true,
    icon: Truck,
    trend: "up",
    trendValue: "+2.1%"
  },
  {
    label: "Inventory DOS",
    value: "45 days",
    badge: "-3 days vs target",
    positive: true,
    icon: Package,
    trend: "down",
    trendValue: "-3 days"
  },
  {
    label: "Capacity Utilization",
    value: "87.5%",
    badge: "Within tolerance",
    positive: true,
    icon: Factory,
    trend: "up",
    trendValue: "+2.1%"
  },
  {
    label: "Auto-Executed Actions",
    value: "847",
    badge: "Last 7 days",
    positive: true,
    icon: Zap,
    trend: "up",
    trendValue: "+12%"
  },
]

export default function KPICards() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Planning KPIs</h3>
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
          return (
            <Card key={index} className="p-4 border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all group cursor-pointer relative overflow-hidden">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-gray-700">{kpi.label}</div>
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</div>
                <div className="flex items-center gap-1.5">
                  <TrendIcon className={`h-3.5 w-3.5 ${kpi.trend === "up" ? "text-green-600" : "text-blue-600"}`} />
                  <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-green-600" : "text-blue-600"}`}>
                    {kpi.trendValue}
                  </span>
                </div>
              </div>
              
              <div>
                <span
                  className={`inline-flex items-center text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                    kpi.positive
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-600 border border-red-200"
                  }`}
                >
                  {kpi.badge}
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
