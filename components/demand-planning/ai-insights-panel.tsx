"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight,
  Lightbulb,
  BarChart3
} from "lucide-react"

interface AIDriver {
  factor: string
  impact: string
  direction: "up" | "down"
  confidence: number
  description: string
}

interface AIAnomaly {
  sku: string
  issue: string
  severity: "high" | "medium" | "low"
  recommendation: string
}

const aiDrivers: AIDriver[] = [
  {
    factor: "Seasonal Pattern",
    impact: "+8.2%",
    direction: "up",
    confidence: 92,
    description: "Q4 surgical volume increase aligned with historical patterns"
  },
  {
    factor: "EHR Procedure Bookings",
    impact: "+5.4%",
    direction: "up",
    confidence: 87,
    description: "Strong booking signals from FL, TX, and CA hospital networks"
  },
  {
    factor: "Surgeon Preference Shift",
    impact: "+3.1%",
    direction: "up",
    confidence: 78,
    description: "Increased adoption of Triathlon TKA system"
  },
  {
    factor: "Regulatory Delays",
    impact: "-2.8%",
    direction: "down",
    confidence: 85,
    description: "EMEA approval delays for new spine products"
  },
]

const anomalies: AIAnomaly[] = [
  {
    sku: "TKA-001-XL",
    issue: "Demand spike 3x normal",
    severity: "high",
    recommendation: "Verify with sales - potential data quality issue"
  },
  {
    sku: "SPINE-042",
    issue: "Forecast confidence < 60%",
    severity: "medium",
    recommendation: "Review recent signals and adjust manually"
  },
  {
    sku: "BIO-T-015",
    issue: "New product - limited history",
    severity: "low",
    recommendation: "Monitor closely for first 3 months"
  },
]

const severityColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-blue-100 text-blue-700 border-blue-200"
}

export default function AIInsightsPanel() {
  const overallConfidence = 82
  const forecastRange = { low: "$312M", mid: "$324M", high: "$338M" }

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* AI Drivers & Confidence */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI Forecast Drivers</h2>
          </div>
          <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
            Model v3.2
          </Badge>
        </div>

        {/* Overall Confidence */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-foreground">Overall Confidence Score</span>
            </div>
            <span className="text-2xl font-bold text-blue-600">{overallConfidence}%</span>
          </div>
          <Progress value={overallConfidence} className="h-2" />
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Forecast Range:</span>
            <span>
              <span className="text-red-600">{forecastRange.low}</span>
              {" - "}
              <span className="font-semibold text-foreground">{forecastRange.mid}</span>
              {" - "}
              <span className="text-green-600">{forecastRange.high}</span>
            </span>
          </div>
        </div>

        {/* Driver List */}
        <div className="space-y-3">
          {aiDrivers.map((driver, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {driver.direction === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium text-foreground text-sm">{driver.factor}</span>
                    <span className={`text-sm font-bold ${
                      driver.direction === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      {driver.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {driver.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-muted-foreground">Confidence</div>
                  <div className="text-sm font-semibold text-foreground">{driver.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explainability Link */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="text-primary">
            <Info className="h-4 w-4 mr-2" />
            View Full Model Explanation
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>

      {/* Flagged Anomalies */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-semibold text-foreground">Flagged Anomalies</h2>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
            {anomalies.length} Items
          </Badge>
        </div>

        {/* Anomaly List */}
        <div className="space-y-3">
          {anomalies.map((anomaly, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border ${
                anomaly.severity === "high" 
                  ? "bg-red-50 border-red-200" 
                  : anomaly.severity === "medium"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className={`${severityColors[anomaly.severity]} text-xs`}>
                      {anomaly.severity.toUpperCase()}
                    </Badge>
                    <span className="font-mono text-sm font-medium text-foreground">
                      {anomaly.sku}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mt-2">{anomaly.issue}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-medium text-muted-foreground">AI Recommendation</div>
                    <p className="text-sm text-foreground mt-0.5">{anomaly.recommendation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs h-7">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Investigate
                </Button>
                <Button size="sm" variant="ghost" className="text-xs h-7 text-muted-foreground">
                  Dismiss
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-purple-700">AI Assessment Summary</div>
              <p className="text-sm text-purple-600 mt-1">
                3 SKUs flagged for review. High-severity item TKA-001-XL shows unusual demand 
                pattern - recommend manual verification before proceeding. Overall forecast 
                quality is stable with 82% confidence.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
