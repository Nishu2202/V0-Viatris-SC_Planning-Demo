"use client"

import { BarChart3, TrendingUp, Package, Factory, Truck, DollarSign, TrendingDown, Settings, Workflow } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from 'next/navigation'
import CopilotDrawer from "@/components/copilot-drawer"
import PlanningAgentCard from "@/components/planning-agent-button"

const navItems = [
  { icon: BarChart3, label: "Executive Overview", description: "Performance snapshot", href: "/executive-overview" },
  { icon: Workflow, label: "Process Orchestration", description: "24/7 opportunity orchestration", href: "/process-orchestration" },
  { icon: TrendingUp, label: "Demand Planning", description: "Forecast management", href: "/demand-planning" },
  { icon: Package, label: "Supply Planning", description: "Inventory optimization", href: "/supply-planning" },
  { icon: Factory, label: "Capacity Planning", description: "Production scheduling", href: "/capacity-planning" },
  { icon: Truck, label: "Logistics Planning", description: "Distribution network", href: "/logistics-planning" },
  { icon: DollarSign, label: "Financial Planning", description: "Cost management", href: "/financial-planning" },
  { icon: TrendingDown, label: "Performance Tracking", description: "Real-time monitoring", href: "/performance-tracking" },
  { icon: Settings, label: "Policies and Engine Settings", description: "System configuration", href: "/policies-engine-settings" },
  { icon: DollarSign, label: "Decision Scenarios", description: "Scenario analysis", href: "/decision-scenarios" }
]

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Process Orchestration")
  const [isCopilotOpen, setIsCopilotOpen] = useState(false)
  const isExpanded = true
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Find the active nav item based on the current pathname
    const currentItem = navItems.find(item => item.href === pathname)
    if (currentItem) {
      setActiveItem(currentItem.label)
    } else if (pathname === '/') {
      // Root path defaults to Process Orchestration
      setActiveItem("Process Orchestration")
    }
  }, [pathname])

  return (
    <aside 
      className={cn(
        "border-r border-sidebar-border bg-sidebar flex flex-col transition-all duration-500 ease-in-out relative",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      <CopilotDrawer isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} currentPage={pathname} />
      <div className={cn(
        "h-16 flex items-center px-3 transition-all duration-500 relative",
        isExpanded && "pt-4 pb-3 h-24"
      )}>
        {isExpanded ? (
          <Image 
            src="/images/fresenius-logo.png"
            alt="Fresenius Logo"
            width={220}
            height={60}
            className="transition-opacity duration-500 w-full h-auto object-contain"
          />
        ) : (
          <div className="w-full flex justify-center">
            <Image 
              src="/images/fresenius-logo.png"
              alt="Fresenius Logo"
              width={48}
              height={48}
              className="transition-opacity duration-500 object-contain"
            />
          </div>
        )}
      </div>

      <nav className="pt-2 pb-3 flex flex-col px-3 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeItem === item.label
          return (
            <div key={index}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveItem(item.label)
                  router.push(item.href)
                }}
                className={cn(
                  "w-full py-2 px-2 flex items-start rounded-md transition-all duration-200",
                  isExpanded ? "justify-start gap-2.5" : "justify-center",
                  isActive
                    ? "bg-[#E6F4FF] text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
                title={!isExpanded ? item.label : undefined}
              >
                <Icon className={cn("h-3.5 w-3.5 flex-shrink-0 mt-0.5", isActive ? "text-blue-600" : "text-sidebar-foreground/50")} />
                {isExpanded && (
                  <div className="flex flex-col gap-0 flex-1 min-w-0 text-left">
                    <span className={cn(
                      "text-[13px] leading-snug",
                      isActive ? "font-bold text-sidebar-accent-foreground" : "font-semibold text-sidebar-foreground/80"
                    )}>
                      {item.label}
                    </span>
                    <span className="text-[10px] italic text-sidebar-foreground/45 leading-snug truncate">
                      {item.description}
                    </span>
                  </div>
                )}
              </button>
              {index < navItems.length - 1 && (
                <div className="mx-2 border-b border-sidebar-border/60" />
              )}
            </div>
          )
        })}
      </nav>

      {/* Planning Agent Card - Below navigation - Compact */}
      <div className="px-2 py-1.5 flex flex-col overflow-hidden min-h-0 flex-1">
        <PlanningAgentCard
          onClick={() => {
            setIsCopilotOpen(true)
          }}
        />
      </div>

      {/* Spacer to push footer to bottom */}
      <div className="flex-shrink-0 h-2" />
    </aside>
  )
}
