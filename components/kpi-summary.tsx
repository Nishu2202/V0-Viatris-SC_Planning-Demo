"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface KPISummaryProps {
  items: Array<{
    label: string
    value: string
    delta: string
    vs: string
    positive: boolean
  }>
}

export default function KPISummary({ items }: KPISummaryProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="p-4 border-gray-200 hover:shadow-md transition-all bg-gradient-to-br from-gray-50 to-white hover:border-gray-300 cursor-pointer group"
        >
          {/* Subtle accent bar on hover */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="text-xs text-gray-600 font-medium mb-3 leading-tight">{item.label}</div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-2xl font-bold text-gray-900 tracking-tight">{item.value}</div>
            </div>

            <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
              {item.positive ? (
                <TrendingUp className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-600 flex-shrink-0" />
              )}
              <span className={`text-xs font-semibold ${item.positive ? "text-green-600" : "text-red-600"}`}>
                {item.delta}
              </span>
              <span className="text-xs text-gray-500 ml-0.5">{item.vs}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
