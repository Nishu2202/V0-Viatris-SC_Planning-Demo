"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingDown, AlertCircle, ChevronRight } from "lucide-react"
import { useState } from "react"

type TimeHorizon = "12w" | "6m" | "1y"

const projections = {
  "12w": {
    revenue: { projected: 2.32, target: 2.4, gap: -28, unit: "$B" },
    margin: { projected: 41.8, target: 42.8, gap: -1.0, unit: "%" },
    serviceLevel: { projected: 95.1, target: 96.5, gap: -1.4, unit: "%" },
    inventory: { projected: 48, target: 45, gap: 3, unit: "days" },
    cash: { projected: 1.2, target: 1.45, gap: -0.25, unit: "$B" }
  },
  "6m": {
    revenue: { projected: 2.58, target: 2.65, gap: -35, unit: "$B" },
    margin: { projected: 42.1, target: 43.2, gap: -1.1, unit: "%" },
    serviceLevel: { projected: 94.8, target: 96.0, gap: -1.2, unit: "%" },
    inventory: { projected: 52, target: 46, gap: 6, unit: "days" },
    cash: { projected: 1.0, target: 1.35, gap: -0.35, unit: "$B" }
  },
  "1y": {
    revenue: { projected: 3.12, target: 3.45, gap: -102, unit: "$B" },
    margin: { projected: 41.5, target: 43.5, gap: -2.0, unit: "%" },
    serviceLevel: { projected: 94.2, target: 96.5, gap: -2.3, unit: "%" },
    inventory: { projected: 58, target: 47, gap: 11, unit: "days" },
    cash: { projected: 0.8, target: 1.5, gap: -0.7, unit: "$B" }
  }
}

const drivers = {
  "12w": [
    "Demand shortfall in EU market (-$18M)",
    "Capacity constraint at Hull plant",
    "Excess inventory in APAC region"
  ],
  "6m": [
    "Demand shortfall across regions (-$35M)",
    "Hull capacity limiting growth",
    "Inventory buildup in APAC & Asia",
    "Margin pressure from material costs"
  ],
  "1y": [
    "Structural demand gap vs forecast (-$102M)",
    "Hull plant capacity ceiling reached",
    "Inventory balancing challenges",
    "Margin erosion from cost inflation"
  ]
}

export default function ForwardOutlook() {
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>("12w")
  const data = projections[timeHorizon]

  const getGapColor = (gap: number) => {
    if (gap === 0) return "text-gray-600"
    if (Math.abs(gap) <= 1) return "text-amber-600"
    return "text-red-600"
  }

  const getGapBg = (gap: number) => {
    if (gap === 0) return "bg-gray-50"
    if (Math.abs(gap) <= 1) return "bg-amber-50"
    return "bg-red-50"
  }

  return (
    <div className="px-6 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-900">Forward Outlook</h2>
        
        {/* Time Horizon Selector */}
        <div className="flex gap-1.5">
          {[
            { key: "12w" as TimeHorizon, label: "12 Weeks" },
            { key: "6m" as TimeHorizon, label: "6 Months" },
            { key: "1y" as TimeHorizon, label: "1 Year" }
          ].map(horizon => (
            <button
              key={horizon.key}
              onClick={() => setTimeHorizon(horizon.key)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                timeHorizon === horizon.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {horizon.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-3">
        {/* Revenue */}
        <Card className="p-3 border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="text-xs font-medium text-gray-600 mb-1">Revenue</div>
          <div className="text-sm font-bold text-gray-900 mb-0.5">${data.revenue.projected}B</div>
          <div className="text-xs text-gray-600 mb-1">Target: ${data.revenue.target}B</div>
          <div className={`text-xs font-semibold ${getGapColor(data.revenue.gap)}`}>
            Gap: ${data.revenue.gap}M
          </div>
        </Card>

        {/* Margin */}
        <Card className={`p-3 border border-gray-200 ${getGapBg(data.margin.gap)}`}>
          <div className="text-xs font-medium text-gray-600 mb-1">Margin</div>
          <div className="text-sm font-bold text-gray-900 mb-0.5">{data.margin.projected}%</div>
          <div className="text-xs text-gray-600 mb-1">Target: {data.margin.target}%</div>
          <div className={`text-xs font-semibold ${getGapColor(data.margin.gap)}`}>
            Gap: {data.margin.gap > 0 ? "+" : ""}{data.margin.gap}%
          </div>
        </Card>

        {/* Service Level */}
        <Card className={`p-3 border border-gray-200 ${getGapBg(data.serviceLevel.gap)}`}>
          <div className="text-xs font-medium text-gray-600 mb-1">Service Level</div>
          <div className="text-sm font-bold text-gray-900 mb-0.5">{data.serviceLevel.projected}%</div>
          <div className="text-xs text-gray-600 mb-1">Target: {data.serviceLevel.target}%</div>
          <div className={`text-xs font-semibold ${getGapColor(data.serviceLevel.gap)}`}>
            Gap: {data.serviceLevel.gap > 0 ? "+" : ""}{data.serviceLevel.gap}%
          </div>
        </Card>

        {/* Inventory */}
        <Card className={`p-3 border border-gray-200 ${getGapBg(data.inventory.gap)}`}>
          <div className="text-xs font-medium text-gray-600 mb-1">Inventory</div>
          <div className="text-sm font-bold text-gray-900 mb-0.5">{data.inventory.projected} days</div>
          <div className="text-xs text-gray-600 mb-1">Target: {data.inventory.target} days</div>
          <div className={`text-xs font-semibold ${getGapColor(data.inventory.gap)}`}>
            Gap: +{data.inventory.gap} days
          </div>
        </Card>

        {/* Cash */}
        <Card className={`p-3 border border-gray-200 ${getGapBg(data.cash.gap)}`}>
          <div className="text-xs font-medium text-gray-600 mb-1">Cash Position</div>
          <div className="text-sm font-bold text-gray-900 mb-0.5">${data.cash.projected}B</div>
          <div className="text-xs text-gray-600 mb-1">Target: ${data.cash.target}B</div>
          <div className={`text-xs font-semibold ${getGapColor(data.cash.gap)}`}>
            Gap: ${data.cash.gap}B
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Gap Highlight */}
        <Card className="p-3 border border-red-200 bg-red-50">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <h3 className="text-xs font-semibold text-red-900">Gap to Plan</h3>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-red-700">Revenue gap:</span>
              <span className="font-bold text-red-600">${Math.abs(data.revenue.gap)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Margin gap:</span>
              <span className="font-bold text-red-600">{data.margin.gap}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Service gap:</span>
              <span className="font-bold text-red-600">{data.serviceLevel.gap}%</span>
            </div>
          </div>
        </Card>

        {/* Driver Breakdown */}
        <Card className="p-3 border border-amber-200 bg-amber-50">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <h3 className="text-xs font-semibold text-amber-900">What's Driving the Gap?</h3>
          </div>
          <div className="space-y-1 text-xs text-amber-700">
            {drivers[timeHorizon].slice(0, 2).map((driver, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{driver}</span>
              </div>
            ))}
            {drivers[timeHorizon].length > 2 && (
              <div className="text-amber-600 text-xs mt-1">+{drivers[timeHorizon].length - 2} more</div>
            )}
          </div>
        </Card>

        {/* CTA Button */}
        <div className="col-span-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 justify-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Simulate Decisions to Close Gap
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
