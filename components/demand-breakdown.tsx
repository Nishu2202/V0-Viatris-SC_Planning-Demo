"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

interface DemandCategory {
  category: string
  volume: string
  growth: string
  variability: "Low" | "Medium" | "High"
}

interface DemandBreakdownProps {
  items: DemandCategory[]
}

export default function DemandBreakdown({ items }: DemandBreakdownProps) {
  const getVariabilityColor = (variability: string) => {
    switch (variability) {
      case "Low":
        return "bg-green-100 text-green-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "High":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Package className="h-5 w-5 text-blue-600" />
        Demand Breakdown - Medtech Specific
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <Card key={idx} className="p-6 border-gray-200 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-5">{item.category}</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-600 mb-1 font-medium">Volume</div>
                <div className="text-2xl font-bold text-gray-900">{item.volume}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-1 font-medium">Growth</div>
                <div className="text-lg font-semibold text-green-600">{item.growth}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-2 font-medium">Variability</div>
                <Badge className={getVariabilityColor(item.variability)}>
                  {item.variability}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
