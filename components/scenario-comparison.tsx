"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Check } from "lucide-react"

interface Scenario {
  name: string
  revenue: string
  margin: string
  gap: string
  actions: string
  investment: string
  recommended?: boolean
}

interface ScenarioComparisonProps {
  scenarios: Scenario[]
}

export default function ScenarioComparison({ scenarios }: ScenarioComparisonProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        IBP Scenarios
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {scenarios.map((scenario, idx) => (
          <Card
            key={idx}
            className={`p-6 border-2 hover:shadow-lg transition-all relative ${
              scenario.recommended
                ? "border-green-400 bg-gradient-to-br from-green-50 to-white"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {scenario.recommended && (
              <div className="absolute -top-3 -right-3">
                <Badge className="bg-green-500 text-white flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Recommended
                </Badge>
              </div>
            )}

            <h3 className="text-base font-semibold text-gray-900 mb-5">{scenario.name}</h3>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-600 mb-1 font-medium">Revenue</div>
                <div className="text-2xl font-bold text-gray-900">{scenario.revenue}</div>
              </div>

              <div>
                <div className="text-xs text-gray-600 mb-1 font-medium">Margin</div>
                <div className="text-2xl font-bold text-gray-900">{scenario.margin}</div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1 font-medium">Gap vs AOP</div>
                <div
                  className={`text-lg font-bold ${
                    scenario.gap.startsWith("-") ? "text-red-600" : scenario.gap === "0%" ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {scenario.gap}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-2 font-medium">Key Actions</div>
                <div className="text-xs text-gray-700 leading-relaxed">{scenario.actions}</div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-1 font-medium">Investment</div>
                <div className="font-semibold text-gray-900">{scenario.investment}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
