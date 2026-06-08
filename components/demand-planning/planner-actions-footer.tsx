"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Edit3,
  MessageSquare,
  RefreshCw,
  ChevronRight,
  Clock,
  User,
  AlertTriangle,
  Send,
  FileText,
  Download
} from "lucide-react"

interface PlannerAction {
  id: string
  label: string
  description: string
  icon: React.ReactNode
  variant: "primary" | "secondary" | "outline" | "destructive"
  badge?: string
}

const primaryActions: PlannerAction[] = [
  {
    id: "accept_ai",
    label: "Accept AI Recommendations",
    description: "Apply 12 AI-suggested adjustments",
    icon: <CheckCircle className="h-4 w-4" />,
    variant: "primary",
    badge: "12 pending"
  },
  {
    id: "override",
    label: "Override Forecast",
    description: "Make manual adjustments to forecast",
    icon: <Edit3 className="h-4 w-4" />,
    variant: "secondary"
  },
  {
    id: "investigate",
    label: "Investigate Exceptions",
    description: "Review flagged items requiring attention",
    icon: <AlertTriangle className="h-4 w-4" />,
    variant: "outline",
    badge: "5 critical"
  },
]

const secondaryActions: PlannerAction[] = [
  {
    id: "collaborate",
    label: "Request Alignment",
    description: "Send to stakeholders for review",
    icon: <MessageSquare className="h-4 w-4" />,
    variant: "outline"
  },
  {
    id: "refresh",
    label: "Refresh Data",
    description: "Pull latest signals and recalculate",
    icon: <RefreshCw className="h-4 w-4" />,
    variant: "outline"
  },
  {
    id: "export",
    label: "Export Plan",
    description: "Download for offline review",
    icon: <Download className="h-4 w-4" />,
    variant: "outline"
  },
]

const recentActivity = [
  { user: "Sarah Chen", action: "Approved APAC forecast adjustment", time: "2 hours ago" },
  { user: "Mike Rodriguez", action: "Overrode TKA-001 forecast +5%", time: "4 hours ago" },
  { user: "AI Agent", action: "Auto-adjusted 8 SKUs based on signals", time: "6 hours ago" },
]

export default function PlannerActionsFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const pendingItems = {
    aiRecommendations: 12,
    exceptions: 5,
    alignmentRequests: 3,
  }

  const handleSubmitPlan = () => {
    setIsSubmitting(true)
    setTimeout(() => setIsSubmitting(false), 2000)
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-t-4 border-t-primary">
      <div className="flex items-start justify-between gap-6">
        {/* Left: Actions */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Planner Actions</h2>
            <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
              You are in control
            </Badge>
          </div>

          {/* Primary Actions */}
          <div className="flex items-center gap-3 mb-4">
            {primaryActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant === "primary" ? "default" : action.variant === "secondary" ? "secondary" : "outline"}
                className="relative"
              >
                {action.icon}
                <span className="ml-2">{action.label}</span>
                {action.badge && (
                  <Badge className={`ml-2 ${
                    action.id === "investigate" 
                      ? "bg-red-100 text-red-700" 
                      : "bg-primary-foreground/20 text-primary-foreground"
                  }`}>
                    {action.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2">
            {secondaryActions.map((action) => (
              <Button
                key={action.id}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                {action.icon}
                <span className="ml-1.5">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Center: Summary Stats */}
        <div className="flex items-center gap-6 px-6 border-l border-r border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{pendingItems.aiRecommendations}</div>
            <div className="text-xs text-muted-foreground">AI Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{pendingItems.exceptions}</div>
            <div className="text-xs text-muted-foreground">Open Exceptions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingItems.alignmentRequests}</div>
            <div className="text-xs text-muted-foreground">Alignment Requests</div>
          </div>
        </div>

        {/* Right: Submit & Activity */}
        <div className="w-72">
          {/* Submit Button */}
          <Button 
            className="w-full mb-4 h-12 text-base"
            onClick={handleSubmitPlan}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Demand Plan
              </>
            )}
          </Button>

          {/* Recent Activity */}
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Recent Activity
            </div>
            {recentActivity.slice(0, 2).map((activity, idx) => (
              <div key={idx} className="text-xs">
                <span className="font-medium text-foreground">{activity.user}</span>
                <span className="text-muted-foreground"> {activity.action}</span>
                <span className="text-muted-foreground/70"> - {activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Workflow Status */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-muted-foreground">Plan Status:</span>
            <Badge className="bg-green-100 text-green-700">In Progress</Badge>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Cycle:</span>
            <span className="font-medium text-foreground">October 2024 - Week 3</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Submission Due:</span>
            <span className="font-medium text-amber-600">Oct 18, 5:00 PM EST</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="text-primary">
          View Full Workflow
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </Card>
  )
}
