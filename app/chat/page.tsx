"use client"

import { useState, useEffect, useRef } from "react"
import { Paperclip, Mic, ArrowUp, Search, RotateCw, Copy, Square, ThumbsUp, ThumbsDown, Mail, Download, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Sidebar from "@/components/sidebar"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isThinking?: boolean
}

function generateChatTitle(): string {
  const now = new Date()
  const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  return `Jake Jacobson - ${date} at ${time}`
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const [showDataExplorer, setShowDataExplorer] = useState(false)
  const [chatTitle, setChatTitle] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsThinking(true)

    const isFirstMessage = messages.length === 0

    if (isFirstMessage) {
      setChatTitle(generateChatTitle())
    }

    setTimeout(() => {
      setIsThinking(false)
      
      let aiContent: string
      
      if (isFirstMessage) {
        aiContent = "There is a –3.6% deviation in total shipped volume vs. forecast, driven primarily by mix shifts in grade and regional demand.\n\nReduced profit/hour by $2M/month resulted from negative throughput efficiency & schedule compliance\n\nDeviation driver: Caused by mix shifts toward higher-margin AHSS and coated products and weaker commodity demand in the South.\n\nEffect: Throughput inefficiency and overutilization of coating assets reduced schedule compliance and yield.\n\nRecommendation: Adjust pricing and routing to rebalance demand toward underutilized HSM capacity, re-sequence coating campaigns, and protect high-value minutes.\n\nExpected outcome: +10 kt/month recovered volume and +$2.5M incremental EBITDA, while maintaining premium product commitments.\n\nRecommended actions\n\n1. Move Fast on Pricing Levers - Add +$25/t AHSS surcharge to capture margin on low-elasticity grades (e.g., Grade 55), offer –$15/t freight-inclusive HRC incentive to clear backlog and fill HSM to 90%, and tighten coating-line scheduling to prioritize high-margin OEM runs.\n\n2. Fix Scheduling and Routing Now - Run one dedicated AHSS shift/week on coating lines to cut transitions and lift +3 kt throughput, and re-route standard HRC orders to Mill1 HSM to balance load and maximize profit/hour per mill."
        setShowDataExplorer(true)
      } else {
        aiContent = "This is a placeholder response. I understand your question and will provide a detailed answer once configured."
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent
      }
      setMessages(prev => [...prev, aiMessage])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleCloseDataExplorer = () => {
    setShowDataExplorer(false)
  }

  const handleStartNewChat = () => {
    setMessages([])
    setMessage("")
    setIsThinking(false)
    setShowDataExplorer(false)
    setChatTitle(null)
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card h-14 py-3 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-lg font-semibold">
                Fresenius Supply Chain Orchestration
              </h1>
              <p className="text-xs text-muted-foreground">
                Agentic Supply Chain Planning & Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Input 
                placeholder="Search" 
                className="pl-3 pr-10 w-80 h-9 bg-background border-input rounded-md"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        <div
          className="border-b px-6 h-14 py-3 flex items-center justify-between bg-card"
        >
          <div>
            <h2 className="text-lg font-semibold" style={{ color: '#1677FF' }}>
              AI Copilot
            </h2>
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleStartNewChat}
              className="px-4 py-2 rounded-md border text-sm font-medium transition-all"
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
              onMouseDown={(e) => {
                e.currentTarget.style.borderColor = '#0958D9'
                e.currentTarget.style.color = '#0958D9'
                e.currentTarget.style.backgroundColor = '#BAE0FF'
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.borderColor = '#1677FF'
                e.currentTarget.style.color = '#1677FF'
                e.currentTarget.style.backgroundColor = '#E6F0FF'
              }}
            >
              Start new chat
            </button>
          )}
        </div>

        <main className="flex-1 overflow-auto flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-2xl px-6">
                <h2 className="text-2xl font-semibold mb-3 text-foreground">
                  Hi there, I'm your Research Agent!
                </h2>
                <p className="text-base text-muted-foreground">
                  I can help answer your questions or provide insights based on your data!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <div className="h-full p-6">
                <div className={`h-full ${showDataExplorer ? 'grid grid-cols-2 gap-6' : 'flex justify-center'}`}>
                  {showDataExplorer && (
                    <div className="bg-card rounded-lg border border-input shadow-sm flex flex-col overflow-hidden">
                      <div className="border-b px-4 py-3 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-foreground">Data Explorer</h3>
                        <div className="flex items-center gap-2">
                          <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors">
                            <Download className="h-4 w-4 text-muted-foreground" />
                          </button>
                          <button 
                            onClick={handleCloseDataExplorer}
                            className="h-8 w-8 rounded-md flex items-center justify-center hover:bg-sidebar-accent transition-colors"
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-auto p-6">
                        <h4 className="text-sm font-semibold text-foreground mb-4">Key Mix Shifts Detected</h4>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/30">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/30">Change vs. Forecast</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/30">Volume Δ (kt)</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/30">Value Δ ($M/month)</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground bg-muted/30">Comment</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="py-4 px-4 text-sm text-foreground">Auto – AHSS Grades (Midwest)</td>
                                <td className="py-4 px-4 text-sm text-foreground">+8%</td>
                                <td className="py-4 px-4 text-sm text-foreground">+5 kt</td>
                                <td className="py-4 px-4 text-sm text-foreground">+$2.5 M</td>
                                <td className="py-4 px-4 text-sm text-foreground">OEM pull-ins for model changeovers increased coating line utilization to 90%.</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-4 px-4 text-sm text-foreground">Commodity HRC (Southern)</td>
                                <td className="py-4 px-4 text-sm text-foreground">-9.5%</td>
                                <td className="py-4 px-4 text-sm text-foreground">-7.8 kt</td>
                                <td className="py-4 px-4 text-sm text-foreground">−$2.5M</td>
                                <td className="py-4 px-4 text-sm text-foreground">Service centers deferred orders due to cheaper imports (LATAM at −$25/t).</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-4 px-4 text-sm text-foreground">Energy/API Grades (Southern)</td>
                                <td className="py-4 px-4 text-sm text-foreground">-6%</td>
                                <td className="py-4 px-4 text-sm text-foreground">-2.5 kt</td>
                                <td className="py-4 px-4 text-sm text-foreground">−$1M</td>
                                <td className="py-4 px-4 text-sm text-foreground">Pipeline project delays; decreased demand from OCTG producers.</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-4 px-4 text-sm text-foreground">Construction/Coated (Eastern)</td>
                                <td className="py-4 px-4 text-sm text-foreground">+4.7%</td>
                                <td className="py-4 px-4 text-sm text-foreground">+2 kt</td>
                                <td className="py-4 px-4 text-sm text-foreground">+$1M</td>
                                <td className="py-4 px-4 text-sm text-foreground">Residential and infrastructure demand steady; downstream coated mix up.</td>
                              </tr>
                              <tr className="border-b">
                                <td className="py-4 px-4 text-sm text-foreground">Exports (LATAM)</td>
                                <td className="py-4 px-4 text-sm text-foreground">-5.8%</td>
                                <td className="py-4 px-4 text-sm text-foreground">-1.2 kt</td>
                                <td className="py-4 px-4 text-sm text-foreground">−$0.3M</td>
                                <td className="py-4 px-4 text-sm text-foreground">FX disadvantage and regional freight constraints.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-6 space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Net Impact</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                            <li>Volume variance = <strong>−3.6% (~4.5 kt/week shortfall)</strong></li>
                            <li>Mix value variance = <strong>+0.5 pts in avg. margin/t, but −1.8 pts in schedule compliance</strong></li>
                          </ul>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-foreground">Root Cause Analysis:</h4>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`bg-card rounded-lg border border-input shadow-sm flex flex-col overflow-hidden ${!showDataExplorer ? 'max-w-4xl w-full' : ''}`}>
                    <div className="border-b px-4 py-3 flex items-center justify-between">
                      <h3 className="text-base font-semibold" style={{ color: '#1677FF' }}>
                        {chatTitle || 'AI Copilot'}
                      </h3>
                      <div className="flex items-center gap-2">
                        {/* Icons removed from card header as they're now in the sub-nav */}
                      </div>
                    </div>

                    <div className="flex-1 overflow-auto p-4">
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
                            ) : (
                              <div className="max-w-[85%]">
                                <div 
                                  className="bg-background rounded-lg border border-input overflow-hidden"
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
                    </div>

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

                      <div className="bg-background border border-input rounded-lg shadow-sm flex items-center gap-3 px-4 py-3">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Paperclip className="h-5 w-5" />
                        </button>
                        
                        <input
                          type="text"
                          placeholder="Ask me anything..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
                        />

                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Mic className="h-5 w-5" />
                        </button>

                        <button 
                          onClick={handleSend}
                          disabled={!message.trim() || isThinking}
                          className="h-10 w-10 rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed"
                          style={{
                            background: 'linear-gradient(135deg, #4096FF 0%, #1677FF 100%)',
                            opacity: message.trim() && !isThinking ? 1 : 0.5
                          }}
                        >
                          <ArrowUp className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-3">
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
                    className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
                  />

                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Mic className="h-5 w-5" />
                  </button>

                  <button 
                    onClick={handleSend}
                    disabled={!message.trim() || isThinking}
                    className="h-10 w-10 rounded-full flex items-center justify-center transition-all disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, #4096FF 0%, #1677FF 100%)',
                      opacity: message.trim() && !isThinking ? 1 : 0.5
                    }}
                  >
                    <ArrowUp className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
