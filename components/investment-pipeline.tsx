"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react"

const sopCalendar = [
  {
    name: "Weekly Demand Review",
    date: "Apr 14, 2026",
    time: "9:00 AM EST",
    owner: "Sarah Mitchell",
    participants: "12 attendees",
    status: "Scheduled",
    statusIcon: Calendar,
    statusColor: "bg-blue-100 text-blue-700 border-blue-200",
    type: "recurring",
  },
  {
    name: "Supply Planning Sync",
    date: "Apr 15, 2026",
    time: "2:00 PM EST",
    owner: "James Chen",
    participants: "8 attendees",
    status: "Action Required",
    statusIcon: AlertCircle,
    statusColor: "bg-amber-100 text-amber-700 border-amber-200",
    type: "action",
  },
  {
    name: "Executive S&OP Review",
    date: "Apr 18, 2026",
    time: "10:00 AM EST",
    owner: "Michael Torres",
    participants: "6 attendees",
    status: "Pending Inputs",
    statusIcon: Clock,
    statusColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    type: "executive",
  },
  {
    name: "Capacity Planning Workshop",
    date: "Apr 20, 2026",
    time: "1:00 PM EST",
    owner: "Lisa Anderson",
    participants: "15 attendees",
    status: "Confirmed",
    statusIcon: CheckCircle2,
    statusColor: "bg-green-100 text-green-700 border-green-200",
    type: "workshop",
  },
]

export default function InvestmentPipeline() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="px-6 pt-6 pb-1.5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">S&OP Calendar & Execution Plan</h3>
        <Button variant="outline" size="sm" className="text-sm">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Calendar
        </Button>
      </div>
      <div style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }} />
      <div className="px-6 pt-1.5 pb-6">
        <div className="space-y-4">
          {sopCalendar.map((event, index) => {
            const StatusIcon = event.statusIcon
            return (
              <Card key={index} className="p-4 border bg-card shadow-none">
                <div className="flex items-center gap-6">
                  {/* Event Name */}
                  <div className="w-[260px] flex-shrink-0">
                    <h4 className="text-base font-medium text-foreground">{event.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      {event.participants}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-col items-start w-[140px] flex-shrink-0">
                    <span className="text-xs text-muted-foreground mb-1">Date & Time</span>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {event.date}
                    </div>
                    <span className="text-xs text-muted-foreground ml-5">{event.time}</span>
                  </div>

                  {/* Owner */}
                  <div className="flex flex-col items-start w-[140px] flex-shrink-0">
                    <span className="text-xs text-muted-foreground mb-1">Owner</span>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      {event.owner}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-start w-[140px] flex-shrink-0">
                    <span className="text-xs text-muted-foreground mb-1">Status</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded border ${event.statusColor}`}>
                      <StatusIcon className="h-3 w-3" />
                      {event.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="ml-auto flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      Prep Docs
                    </Button>
                    <Button variant="link" className="text-primary text-sm p-0 h-auto">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
