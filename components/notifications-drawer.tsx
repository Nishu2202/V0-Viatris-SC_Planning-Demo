"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  TrendingUp,
  Settings,
  Target
} from "lucide-react"

interface Notification {
  id: number
  title: string
  description: string
  timestamp: string
  status: "done" | "pending" | "alert" | "escalated" | "insight" | "policy"
  group: string
  icon: any
}

const notificationsData: Notification[] = [
  // System / Agent Actions
  {
    id: 1,
    title: "Forecast auto-adjusted for Cardiac Monitors (+11%)",
    description: "Auto-execution completed",
    timestamp: "2 min ago",
    status: "done",
    group: "System Actions",
    icon: CheckCircle2
  },
  {
    id: 2,
    title: "Inventory rebalanced across APAC DCs",
    description: "Optimization completed",
    timestamp: "5 min ago",
    status: "done",
    group: "System Actions",
    icon: CheckCircle2
  },
  {
    id: 3,
    title: "Production shifted from Plant A to Memphis",
    description: "Capacity reallocation completed",
    timestamp: "8 min ago",
    status: "done",
    group: "System Actions",
    icon: CheckCircle2
  },
  {
    id: 4,
    title: "Safety stock recalibrated for high-demand SKUs",
    description: "Risk mitigation completed",
    timestamp: "12 min ago",
    status: "done",
    group: "System Actions",
    icon: CheckCircle2
  },
  {
    id: 5,
    title: "Logistics route optimized for EU shipments",
    description: "Cost optimization completed",
    timestamp: "15 min ago",
    status: "done",
    group: "System Actions",
    icon: CheckCircle2
  },

  // Planner Reviews
  {
    id: 6,
    title: "Demand uplift validation for EU hospital onboarding",
    description: "Awaiting your review and approval",
    timestamp: "Now",
    status: "pending",
    group: "Planner Reviews",
    icon: Clock
  },
  {
    id: 7,
    title: "Capacity allocation adjustment for Q2 orthopedic implants",
    description: "Requires planner validation",
    timestamp: "1 min ago",
    status: "pending",
    group: "Planner Reviews",
    icon: Clock
  },
  {
    id: 8,
    title: "Margin trade-off scenario approval required",
    description: "Decision needed on cost vs service",
    timestamp: "3 min ago",
    status: "pending",
    group: "Planner Reviews",
    icon: Clock
  },
  {
    id: 9,
    title: "Forecast cap rule exceeded for SKU IMP-23",
    description: "Rule breach detected - review recommended",
    timestamp: "6 min ago",
    status: "pending",
    group: "Planner Reviews",
    icon: Clock
  },
  {
    id: 10,
    title: "New product launch demand spike validation",
    description: "Forecast accuracy confirmation needed",
    timestamp: "10 min ago",
    status: "pending",
    group: "Planner Reviews",
    icon: Clock
  },

  // S&OP Escalations
  {
    id: 11,
    title: "Capacity expansion vs service trade-off decision",
    description: "VP approval required for capital decision",
    timestamp: "Now",
    status: "escalated",
    group: "S&OP Escalations",
    icon: Target
  },
  {
    id: 12,
    title: "Inventory write-off vs holding cost decision",
    description: "Escalated for executive review",
    timestamp: "4 min ago",
    status: "escalated",
    group: "S&OP Escalations",
    icon: Target
  },
  {
    id: 13,
    title: "Supply shortage for titanium alloy supplier",
    description: "Sourcing crisis - immediate attention needed",
    timestamp: "7 min ago",
    status: "escalated",
    group: "S&OP Escalations",
    icon: Target
  },
  {
    id: 14,
    title: "Cross-region inventory reallocation (EU → US)",
    description: "Strategic rebalancing approval needed",
    timestamp: "11 min ago",
    status: "escalated",
    group: "S&OP Escalations",
    icon: Target
  },

  // Performance / Risk Alerts
  {
    id: 15,
    title: "Service level risk detected in EU (projected 94% vs 97% target)",
    description: "Risk mitigation action recommended",
    timestamp: "1 min ago",
    status: "alert",
    group: "Performance Alerts",
    icon: AlertTriangle
  },
  {
    id: 16,
    title: "Demand over-forecast in LATAM by 8%",
    description: "Forecast accuracy trending down",
    timestamp: "3 min ago",
    status: "alert",
    group: "Performance Alerts",
    icon: AlertTriangle
  },
  {
    id: 17,
    title: "Capacity utilization at Hull plant exceeded 98%",
    description: "Bottleneck detected - overflow needed",
    timestamp: "9 min ago",
    status: "alert",
    group: "Performance Alerts",
    icon: AlertTriangle
  },

  // Cross-Functional Insights
  {
    id: 18,
    title: "New hospital onboarding driving sustained EU demand growth",
    description: "Strategic insight: +15% growth trajectory",
    timestamp: "5 min ago",
    status: "insight",
    group: "Cross-Functional Insights",
    icon: TrendingUp
  },
  {
    id: 19,
    title: "Capex delay in LATAM impacting Q3 revenue realization",
    description: "Risk insight: Revenue at risk",
    timestamp: "13 min ago",
    status: "insight",
    group: "Cross-Functional Insights",
    icon: TrendingUp
  },

  // Governance / Policy
  {
    id: 20,
    title: "Autonomy threshold triggered: manual review required (>2x revenue impact)",
    description: "Policy protection: action requires review",
    timestamp: "2 min ago",
    status: "policy",
    group: "Governance & Policy",
    icon: Settings
  },
  {
    id: 21,
    title: "Priority rule applied: SKU IMP-42 prioritized over IMP-45",
    description: "Policy executed: allocation completed",
    timestamp: "4 min ago",
    status: "policy",
    group: "Governance & Policy",
    icon: Settings
  }
]

const statusStyles = {
  done: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  alert: "bg-orange-100 text-orange-700",
  escalated: "bg-red-100 text-red-700",
  insight: "bg-blue-100 text-blue-700",
  policy: "bg-purple-100 text-purple-700"
}

const statusLabels = {
  done: "Done",
  pending: "Pending Review",
  alert: "Alert",
  escalated: "Escalated",
  insight: "Insight",
  policy: "Policy"
}

const groupOrder = [
  "System Actions",
  "Planner Reviews",
  "S&OP Escalations",
  "Performance Alerts",
  "Cross-Functional Insights",
  "Governance & Policy"
]

interface NotificationsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const groupedNotifications = notificationsData.reduce(
    (acc, notification) => {
      if (!acc[notification.group]) {
        acc[notification.group] = []
      }
      acc[notification.group].push(notification)
      return acc
    },
    {} as Record<string, Notification[]>
  )

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg z-50 flex flex-col border-l">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Notifications</h2>
            <p className="text-xs text-muted-foreground">21 updates for Sarah Mitchell</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y">
            {groupOrder.map((group) => {
              const notifications = groupedNotifications[group]
              if (!notifications) return null

              return (
                <div key={group}>
                  {/* Group Header */}
                  <div className="sticky top-0 px-6 py-3 bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                        {group}
                      </h3>
                      <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                        {notifications.length}
                      </span>
                    </div>
                  </div>

                  {/* Notifications in group */}
                  <div className="divide-y">
                    {notifications.map((notification) => {
                      const Icon = notification.icon
                      return (
                        <div
                          key={notification.id}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-1">
                              <Icon className="h-5 w-5 text-gray-400" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-medium text-foreground leading-snug flex-1">
                                  {notification.title}
                                </h4>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 whitespace-nowrap ${statusStyles[notification.status]}`}>
                                  {statusLabels[notification.status]}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-400">{notification.timestamp}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </>
  )
}
