"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const PROMPT_SUGGESTIONS = [
  "Show me the top execution risks for this week",
  "Explain the demand uplift in EU region",
  "Compare baseline vs current scenario impact",
  "Identify critical supply bottlenecks",
  "Analyze cost impacts of recent changes",
]

interface PlanningAgentCardProps {
  onClick: () => void
}

export default function PlanningAgentCard({ onClick }: PlanningAgentCardProps) {
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentSuggestion = PROMPT_SUGGESTIONS[currentSuggestionIndex]
    
    if (isTyping) {
      // Typing effect
      if (displayedText.length < currentSuggestion.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentSuggestion.slice(0, displayedText.length + 1))
        }, 40) // Speed of typing
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000) // Pause at full text
        return () => clearTimeout(timeout)
      }
    } else {
      // Erasing effect
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, 25) // Speed of erasing
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next suggestion
        setCurrentSuggestionIndex((prev) => (prev + 1) % PROMPT_SUGGESTIONS.length)
        setIsTyping(true)
      }
    }
  }, [displayedText, isTyping, currentSuggestionIndex])

  return (
    <Card 
      onClick={onClick}
      className="w-full h-full border-2 border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-purple-50/60 p-3 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] planning-agent-glow flex flex-col overflow-hidden"
    >
      <div className="flex flex-col flex-1 gap-2 min-h-0 overflow-hidden">
        {/* Header with Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-200 shadow-sm">
              <Image 
                src="/images/planning-agent-avatar.jpg"
                alt="Planning Agent"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="text-sm font-bold text-gray-900 truncate">Planning Agent</h3>
            <p className="text-[10px] text-gray-500 truncate">AI-powered supply chain assistant</p>
          </div>
        </div>

        {/* Typewriter Suggestion - Responsive */}
        <div className="flex-1 bg-white/70 backdrop-blur-sm border border-blue-100 rounded-lg p-3 flex flex-col justify-center min-h-0 overflow-hidden">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5 flex-shrink-0">Try asking</p>
          <div className="flex items-start gap-1 min-h-0 overflow-hidden">
            <span className="text-xs text-gray-700 leading-relaxed break-words overflow-hidden">
              {displayedText}
            </span>
            <span className="inline-block w-0.5 h-3.5 bg-blue-500 animate-pulse ml-0.5 flex-shrink-0" />
          </div>
        </div>

        {/* CTA hint - Positioned at bottom */}
        <div className="flex items-center justify-center gap-2 pt-1 flex-shrink-0">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <span className="text-[9px] font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">Click to chat</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>
    </Card>
  )
}
