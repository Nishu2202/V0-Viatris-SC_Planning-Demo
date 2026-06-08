"use client"

import { Card } from "@/components/ui/card"

interface WorkInProgressPageProps {
  title: string
  description?: string
}

export default function WorkInProgressPage({ title, description }: WorkInProgressPageProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md border border-gray-200 p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <div className="text-2xl">🚀</div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground">Work in Progress</h2>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description || "This planning workspace is being prepared and will be available soon."}
              </p>
              
              <div className="pt-4">
                <p className="text-xs text-muted-foreground">
                  Check back soon for this feature
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
