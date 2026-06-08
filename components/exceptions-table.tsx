"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, AlertTriangle } from "lucide-react"

interface Exception {
  product: string
  issue: string
  recommendation: string
  severity: "high" | "medium" | "low"
}

interface ExceptionsTableProps {
  exceptions: Exception[]
}

export default function ExceptionsTable({ exceptions }: ExceptionsTableProps) {
  return (
    <Card className="p-6 border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-orange-600" />
        Exceptions & Recommended Actions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-700 pb-3">Product / Region</th>
              <th className="text-left text-xs font-semibold text-gray-700 pb-3">Issue</th>
              <th className="text-left text-xs font-semibold text-gray-700 pb-3">AI Recommendation</th>
              <th className="text-left text-xs font-semibold text-gray-700 pb-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {exceptions.map((exception, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 text-sm font-medium text-gray-900">
                  {exception.product}
                </td>
                <td className="py-4">
                  <Badge
                    className={
                      exception.severity === "high"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : exception.severity === "medium"
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                    }
                  >
                    {exception.issue}
                  </Badge>
                </td>
                <td className="py-4 text-sm text-gray-700">{exception.recommendation}</td>
                <td className="py-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Review <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
