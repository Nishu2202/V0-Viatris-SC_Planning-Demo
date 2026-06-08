"use client"

import { Card } from "@/components/ui/card"
import { Alert } from "@/components/ui/alert"
import { AlertCircle, TrendingUp } from "lucide-react"

interface InventoryEOImpactProps {
  dos?: string
  inventoryIncrease?: string
  capitalRequired?: string
  eOAtRisk?: string
  problematicSKUs?: string
  category?: string
}

export default function InventoryEOImpact({
  dos = "48 days",
  inventoryIncrease = "+15%",
  capitalRequired = "$72M",
  eOAtRisk = "$18M",
  problematicSKUs = "3 products",
  category = "Aging inventory in spine and instruments",
}: InventoryEOImpactProps) {
  return (
    <Card className="p-6 border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        Inventory & E&O Impact
      </h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Inventory Profile */}
        <div>
          <div className="text-sm text-gray-600 mb-5 font-medium">Inventory Profile</div>
          <div className="space-y-5">
            <div>
              <div className="text-xs text-gray-600 mb-1 font-medium">Days of Supply</div>
              <div className="text-3xl font-bold text-gray-900">{dos}</div>
            </div>

            <div>
              <div className="text-xs text-gray-600 mb-1 font-medium">Required for Forecast</div>
              <div className="text-lg font-semibold text-orange-600">{inventoryIncrease} increase needed</div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <div className="text-xs text-blue-700 font-medium">
                Additional <span className="font-bold">{capitalRequired}</span> working capital required
              </div>
            </Alert>
          </div>
        </div>

        {/* Right: E&O Risk */}
        <div>
          <div className="text-sm text-gray-600 mb-5 font-medium">Excess & Obsolete Risk</div>
          <div className="space-y-5">
            <div>
              <div className="text-xs text-gray-600 mb-1 font-medium">E&O At Risk</div>
              <div className="text-3xl font-bold text-red-600">{eOAtRisk}</div>
            </div>

            <div>
              <div className="text-xs text-gray-600 mb-1 font-medium">Problematic SKUs</div>
              <div className="text-lg font-semibold text-gray-900">{problematicSKUs} flagged</div>
            </div>

            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <div className="text-xs text-red-700 font-medium">
                <span className="font-bold">Aging inventory</span> in {category}
              </div>
            </Alert>
          </div>
        </div>
      </div>
    </Card>
  )
}
