"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from "recharts"
import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"

interface TrendAnalysisResponse {
  chart: Array<{
    week: string
    inventoryDOS: number
    serviceLevel: number
  }>
  insights: string[]
  recommendations: string[]
  followUpQuestions: string[]
}

// Generate 12-week trend data aligned with FERT's current Performance Intelligence values
// Current values from Performance Intelligence:
// - Inventory DOS: Current Qtr ~92 days (q1Outlook), trending to 89 days (yearOutlook), then 88 days (18M outlook)
// - Service Level: Current Qtr 92.2%, Year 94.10%, 18M 96.90%
function generateTrendData(): TrendAnalysisResponse {
  const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`)
  
  // Create realistic trend leading to current snapshot
  // Service level recovering from dip, inventory DOS normalizing downward
  const chart = weeks.map((week, index) => {
    const progress = (index + 1) / 12
    
    // Inventory DOS: trending down from ~108 to current ~92
    const inventoryDOS = Math.round(108 - (progress * 18) + (Math.random() * 4 - 2))
    
    // Service Level: trending up from ~88% to current ~92.2%
    const serviceLevel = Math.round((88 + progress * 4.2) * 100) / 100 + (Math.random() * 0.5 - 0.25)
    
    return {
      week,
      inventoryDOS,
      serviceLevel
    }
  })

  return {
    chart,
    insights: [
      "Inventory DOS has trended downward over the last 12 weeks, indicating positive stock normalization from peak overstock situations in FERT.",
      "Service level has steadily recovered from 88% to 92.2%, reflecting improved supply-demand alignment for finished pharma goods.",
      "The pattern suggests successful inventory rebalancing across dialysis drug markets, though recent stabilization may need continued monitoring.",
      "Latest weeks show service level pressure stabilizing but DOS remaining elevated relative to optimal targets for FERT segment."
    ],
    recommendations: [
      "Rebalance dialysis concentrate inventory across FERT markets to reduce excess concentration in slow-moving phosphate binder SKUs.",
      "Implement demand-driven replenishment for fast-moving dialysis drug SKUs to protect service levels while reducing DOS.",
      "Tighten supply planning in lower-demand regions to free up capital for strategic dialysis markets.",
      "Review forecast accuracy for the next 4–6 weeks and adjust safety stock parameters for finished pharma goods.",
      "Trigger planner review for markets showing persistent high DOS or service level risk in FERT segment."
    ],
    followUpQuestions: [
      "What is driving the increase in Inventory DOS across dialysis drug (FERT) regions?",
      "Which dialysis markets are contributing most to the finished pharma goods inventory imbalance?",
      "What actions can the supply agent take to reduce FERT DOS by next month?",
      "Show me service level risk by region within FERT category.",
      "How much excess dialysis concentrate inventory can we redeploy without hurting service?",
      "Recommend a scenario to optimize FERT inventory and service level together."
    ]
  }
}

interface PlanningAgentDemoProps {
  onAskQuestion?: (question: string) => void
}

export default function PlanningAgentDemo({ onAskQuestion }: PlanningAgentDemoProps) {
  const [response] = useState<TrendAnalysisResponse>(generateTrendData())
  const [expandedSection, setExpandedSection] = useState<string | null>("insights")

  const handleQuestionClick = (question: string) => {
    if (onAskQuestion) {
      onAskQuestion(question)
    }
  }

  return (
    <div className="space-y-4">
      {/* Chart Section */}
      <Card className="p-4 border border-input bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">12-Week Trend Analysis: FERT (Finished Pharma Goods)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={response.chart}>
            <defs>
              <linearGradient id="serviceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="week" 
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              label={{ value: "DOS (days)", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6b7280"
              label={{ value: "Service Level (%)", angle: 90, position: "insideRight" }}
              tick={{ fontSize: 12 }}
              domain={[85, 98]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value: any) => {
                if (typeof value === "number") {
                  return value.toFixed(1)
                }
                return value
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }} />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="serviceLevel"
              fill="url(#serviceGradient)"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Service Level %"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="inventoryDOS"
              stroke="#ef4444"
              strokeWidth={2.5}
              name="Inventory DOS (days)"
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Insights Section */}
      <Card className="p-4 border border-input bg-card">
        <button
          onClick={() => setExpandedSection(expandedSection === "insights" ? null : "insights")}
          className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
        >
          <h3 className="text-sm font-semibold text-foreground">Key Insights</h3>
          <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === "insights" ? "rotate-90" : ""}`} />
        </button>
        {expandedSection === "insights" && (
          <div className="space-y-2">
            {response.insights.map((insight, idx) => (
              <p key={idx} className="text-xs text-muted-foreground leading-relaxed">
                • {insight}
              </p>
            ))}
          </div>
        )}
      </Card>

      {/* Recommendations Section */}
      <Card className="p-4 border border-input bg-card">
        <button
          onClick={() => setExpandedSection(expandedSection === "recommendations" ? null : "recommendations")}
          className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition-opacity"
        >
          <h3 className="text-sm font-semibold text-foreground">Recommended Actions</h3>
          <ChevronRight className={`h-4 w-4 transition-transform ${expandedSection === "recommendations" ? "rotate-90" : ""}`} />
        </button>
        {expandedSection === "recommendations" && (
          <div className="space-y-2">
            {response.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-xs font-semibold text-blue-600 min-w-fit pt-0.5">{idx + 1}.</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Follow-up Questions Section */}
      <Card className="p-4 border border-input bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">What would you like to explore next?</h3>
        <div className="space-y-2 flex flex-col">
          {response.followUpQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleQuestionClick(question)}
              className="flex items-start gap-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-left group"
            >
              <ChevronRight className="h-4 w-4 text-blue-600 mt-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              <span className="text-xs text-blue-900 leading-snug">{question}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
