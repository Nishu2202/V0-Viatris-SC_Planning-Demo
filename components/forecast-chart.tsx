"use client"

import {
  ComposedChart,
  Chart as RechartsChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ForecastChartProps {
  data: Array<{
    month: string
    historical?: number | null
    baseline?: number
    aiAdjusted?: number
    plannerAdjusted?: number
    confidence?: number
  }>
}

export default function ForecastChart({ data }: ForecastChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Legend wrapperStyle={{ paddingTop: "20px" }} />
        <Area
          type="monotone"
          dataKey="confidence"
          fill="url(#colorConfidence)"
          stroke="none"
          name="Confidence Band"
        />
        <Line
          type="monotone"
          dataKey="historical"
          stroke="#6b7280"
          strokeWidth={2}
          name="Historical Demand"
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="baseline"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Baseline Forecast"
        />
        <Line
          type="monotone"
          dataKey="aiAdjusted"
          stroke="#3b82f6"
          strokeWidth={2.5}
          name="AI-Adjusted Forecast"
        />
        <Line
          type="monotone"
          dataKey="plannerAdjusted"
          stroke="#8b5cf6"
          strokeWidth={2}
          strokeDasharray="3 3"
          name="Planner-Adjusted"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
