"use client"

import { Card } from "@/components/ui/card"
import { Package, Activity, Zap } from "lucide-react"

interface DemandSignal {
  signal: string
  value: string
  trend: "up" | "down"
  description: string
}

interface DemandSignalsPanelProps {
  baselineValue?: string
  signals: DemandSignal[]
  aiAdjustment?: string
}

export default function DemandSignalsPanel({
  baselineValue = "2.32B",
  signals,
  aiAdjustment = "+8.2%",
}: DemandSignalsPanelProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Demand Signals - AI-Enriched Inputs
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Baseline Forecast */}
        <Card className="p-6 border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Baseline Forecast</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Statistical model based on 24-month historical pattern
          </p>
          <div className="text-2xl font-bold text-gray-900 mb-1">{baselineValue}</div>
          <div className="text-xs text-gray-500">Units projected</div>
        </Card>

        {/* External Signals */}
        <Card className="p-6 border-gray-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">External Signals</h3>
          </div>
          <div className="space-y-3">
            {signals.map((signal, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2">
                <span className="text-xs text-gray-700 flex-1">{signal.signal}</span>
                <div className="text-right">
                  <div
                    className={`text-xs font-semibold ${
                      signal.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {signal.value}
                  </div>
                  <div className="text-xs text-gray-500">{signal.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Adjustments */}
        <Card className="p-6 border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">AI Adjustments</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Cumulative impact from ML model refinements
          </p>
          <div className="text-2xl font-bold text-blue-600 mb-1">{aiAdjustment}</div>
          <div className="text-xs text-gray-500">vs baseline forecast</div>
        </Card>
      </div>
    </div>
  )
}
