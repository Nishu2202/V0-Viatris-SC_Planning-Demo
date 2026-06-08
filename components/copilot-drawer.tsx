"use client"

import { useState, useEffect, useRef } from "react"
import { Paperclip, Mic, ArrowUp, RotateCw, Copy, Square, ThumbsUp, ThumbsDown, Mail, Download, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import PlanningAgentDemo from "@/components/planning-agent-demo"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isThinking?: boolean
}

interface CopilotDrawerProps {
  isOpen: boolean
  onClose: () => void
  currentPage?: string
}

function generateChatTitle(): string {
  const now = new Date()
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `Jake Jacobson - ${date} at ${time}`
}

export default function CopilotDrawer({ isOpen, onClose, currentPage }: CopilotDrawerProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [showDataExplorer, setShowDataExplorer] = useState(false)
  const [chatTitle, setChatTitle] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim()
    }

    const currentMessage = message.trim()
    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsThinking(true)

    const isFirstMessage = messages.length === 0
    const isOrthoTrendQuery = currentMessage.toLowerCase().includes("show me the trends") && 
                              currentMessage.toLowerCase().includes("inventory") &&
                              currentMessage.toLowerCase().includes("service level") &&
                              currentMessage.toLowerCase().includes("fert")

    if (isFirstMessage) {
      setChatTitle(generateChatTitle())
    }

    setTimeout(() => {
      setIsThinking(false)
      
      if (isOrthoTrendQuery) {
        // Special handling for the Ortho trend analysis demo
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'demo-trend-analysis' // Special flag to render the demo component
        }
        setMessages(prev => [...prev, aiMessage])
      } else if (isFirstMessage) {
        // Context-aware greeting based on current page
        let contextHint = "for your current workflow"
        if (currentPage?.includes("demand")) contextHint = "for demand planning"
        else if (currentPage?.includes("supply")) contextHint = "for supply chain optimization"
        else if (currentPage?.includes("capacity")) contextHint = "for capacity analysis"
        else if (currentPage?.includes("execution")) contextHint = "for execution tracking"
        
        const aiContent = "There is a –3.6% deviation in total shipped volume vs. forecast, driven primarily by mix shifts in grade and regional demand.\n\nReduced profit/hour by $2M/month resulted from negative throughput efficiency & schedule compliance\n\nDeviation driver: Caused by mix shifts toward higher-margin AHSS and coated products and weaker commodity demand in the South.\n\nEffect: Throughput inefficiency and overutilization of coating assets reduced schedule compliance and yield.\n\nRecommendation: Adjust pricing and routing to rebalance demand toward underutilized HSM capacity, re-sequence coating campaigns, and protect high-value minutes " + contextHint + ".\n\nExpected outcome: +10 kt/month recovered volume and +$2.5M incremental EBITDA, while maintaining premium product commitments.\n\nRecommended actions\n\n1. Move Fast on Pricing Levers - Add +$25/t AHSS surcharge to capture margin on low-elasticity grades (e.g., Grade 55), offer –$15/t freight-inclusive HRC incentive to clear backlog and fill HSM to 90%, and tighten coating-line scheduling to prioritize high-margin OEM runs.\n\n2. Fix Scheduling and Routing Now - Run one dedicated AHSS shift/week on coating lines to cut transitions and lift +3 kt throughput, and re-route standard HRC orders to Mill1 HSM to balance load and maximize profit/hour per mill."
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiContent
        }
        setMessages(prev => [...prev, aiMessage])
        setShowDataExplorer(true)
      } else {
        const aiContent = "This is a placeholder response. I understand your question and will provide a detailed answer once configured."
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiContent
        }
        setMessages(prev => [...prev, aiMessage])
      }
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleStartNewChat = () => {
    setMessages([])
    setMessage("")
    setIsThinking(false)
    setShowDataExplorer(false)
    setChatTitle(null)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-background z-50 flex flex-col border-l border-border shadow-lg">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold" style={{ color: '#1677FF' }}>
            AI Copilot
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Controls */}
        {messages.length > 0 && (
          <div className="border-b px-6 py-3 flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {chatTitle || 'Chat'}
            </div>
            <button
              onClick={handleStartNewChat}
              className="px-3 py-1.5 rounded-md border text-xs font-medium transition-all"
              style={{
                borderColor: '#D9D9D9',
                color: '#595959',
                backgroundColor: '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1677FF'
                e.currentTarget.style.color = '#1677FF'
                e.currentTarget.style.backgroundColor = '#E6F0FF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D9D9D9'
                e.currentTarget.style.color = '#595959'
                e.currentTarget.style.backgroundColor = '#FFFFFF'
              }}
            >
              New chat
            </button>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  Hi, I'm your AI Copilot
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ask me anything about supply chain planning
                </p>
              </div>
              <div className="w-full max-w-xs pt-4 border-t border-border">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Try this example:</p>
                <button
                  onClick={() => {
                    setMessage("Show me the trends on inventory and service level for FERT category for last 12 weeks")
                    setTimeout(() => {
                      handleSendMessage()
                    }, 0)
                  }}
                  className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
                >
                  <p className="text-xs text-blue-900 font-medium">Show me the trends on inventory and service level for FERT category for last 12 weeks</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'user' ? (
                    <div
                      className="rounded-lg px-4 py-3 max-w-[85%]"
                      style={{ backgroundColor: '#E6F0FF' }}
                    >
                      <p className="text-sm text-foreground">{msg.content}</p>
                    </div>
                  ) : msg.content === 'demo-trend-analysis' ? (
                    <div className="max-w-full w-full">
                      <PlanningAgentDemo 
                        onAskQuestion={(question) => {
                          setMessage(question)
                          setTimeout(() => {
                            handleSendMessage()
                          }, 0)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="max-w-[85%]">
                      <div 
                        className="bg-card rounded-lg border border-input overflow-hidden"
                      >
                        <div className="px-4 py-3">
                          <p className="text-sm text-foreground whitespace-pre-line">{msg.content}</p>
                        </div>
                        <div
                          className="h-1"
                          style={{
                            background: 'linear-gradient(90deg, #F96833 0%, #D4537A 22%, #B33FB0 42%, #9B66CF 62%, #6BA1F2 81%, #50B3FB 99%)'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="text-sm text-muted-foreground italic flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '0ms', animationDuration: '1s' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '150ms', animationDuration: '1s' }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                        style={{ animationDelay: '300ms', animationDuration: '1s' }}
                      />
                    </div>
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 space-y-3">
          {messages.length > 0 && (
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-muted-foreground">
                <RotateCw className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-muted-foreground">
                <Copy className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-muted-foreground">
                <Square className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors text-muted-foreground">
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="bg-card border border-input rounded-lg shadow-sm flex items-center gap-3 px-4 py-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            
            <input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
            />

            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
