"use client"

import { Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FloatingAIButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/chat')}
      className="fixed right-0 top-[120px] z-50 flex items-center gap-2 px-4 py-2.5 rounded-l-full text-white font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
      style={{ 
        background: "linear-gradient(135deg, #4096FF 0%, #1677FF 100%)" 
      }}
    >
      <Zap className="w-4 h-4 fill-white" />
      Ask AI Agent
    </button>
  )
}
