"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, AlertCircle, Info } from "lucide-react"

interface ActivityItem {
  action: string
  reason: string
  time: string
  impact: "positive" | "alert" | "neutral"
}

interface AIActivityTimelineProps {
  activities: ActivityItem[]
  totalAdjustments?: number
}

export default function AIActivityTimeline({
  activities,
  totalAdjustments = 10,
}: AIActivityTimelineProps) {
  const getIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <div className="h-3 w-3 rounded-full bg-green-500" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Card className="p-6 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            AI Agent Activity & Insights
          </h2>
        </div>
        <Badge className="bg-blue-100 text-blue-700 font-medium">
          {totalAdjustments} adjustments this week
        </Badge>
      </div>

      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200"
          >
            <div className="flex-shrink-0 pt-1">
              {getIcon(activity.impact)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm leading-tight">{activity.action}</div>
              <div className="text-xs text-gray-600 mt-1">{activity.reason}</div>
              <div className="text-xs text-gray-400 mt-2">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
