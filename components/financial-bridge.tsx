"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, Activity, Target, ChevronRight } from "lucide-react"

export default function FinancialBridge() {
  const bridges = [
    {
      title: "Financial Bridge",
      icon: DollarSign,
      items: [
        { label: "Revenue", value: "$2.4B", delta: "-3% vs plan", color: "text-blue-600", bgColor: "from-blue-50" },
        { label: "Margin", value: "42%", delta: "-1.5pts gap", color: "text-red-600", bgColor: "from-red-50" },
      ],
    },
    {
      title: "Cash Impact",
      icon: Activity,
      items: [
        { label: "Inventory Required", value: "$485M", delta: "+15% vs baseline", color: "text-orange-600", bgColor: "from-orange-50" },
        { label: "E&O Risk", value: "$18M", delta: "3 SKUs flagged", color: "text-red-600", bgColor: "from-red-50" },
      ],
    },
    {
      title: "Scenarios Impact",
      icon: Target,
      items: [
        { label: "Gap Close Revenue", value: "$2.6B", delta: "+8.3% vs base", color: "text-green-600", bgColor: "from-green-50" },
        { label: "Required Investment", value: "$15M", delta: "Product launch", color: "text-gray-600", bgColor: "from-gray-50" },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {bridges.map((bridge, idx) => {
        const Icon = bridge.icon
        return (
          <Card key={idx} className="p-6 border-gray-200 hover:shadow-lg transition-all bg-white">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-gray-900">{bridge.title}</h3>
              <Icon className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {bridge.items.map((item, itemIdx) => (
                <div key={itemIdx} className={`p-3 rounded-lg bg-gradient-to-r ${item.bgColor} to-white`}>
                  <div className="text-xs text-gray-600 mb-1 font-medium">{item.label}</div>
                  <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.delta}</div>
                </div>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
