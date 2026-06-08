"use client"

import type React from "react"
import { Search, Bell } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Sidebar from "@/components/sidebar"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import NotificationsDrawer from "@/components/notifications-drawer"

const pageInfo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Process Orchestration",
    description: "End-to-end patient therapy planning lifecycle with agent-automated actions, escalations and decision flows"
  },
  "/executive-overview": {
    title: "Executive Overview",
    description: "Business performance snapshot, forward outlook, priorities and scenario simulation for executive decisions"
  },
  "/process-orchestration": {
    title: "Process Orchestration",
    description: "End-to-end supply chain planning lifecycle with agent-automated actions, escalations and decision flows"
  },
  "/opportunity-orchestration": {
    title: "Opportunity Orchestration",
    description: "Monitor and act on inventory, safety stock, lead time, MOQ, and phase in/out opportunities across planning, sales, and sourcing"
  },
  "/baseline-sc-plan": {
    title: "Baseline SC Plan",
    description: "Foundational supply chain plan benchmarks, constraints and approved baseline metrics"
  },
  "/demand-planning": {
    title: "Demand Planning",
    description: "Statistical forecasts, market signals, consensus demand and regional demand insights"
  },
  "/supply-planning": {
    title: "Supply Planning",
    description: "Supply network balancing, procurement recommendations and fulfilment optimisation"
  },
  "/capacity-planning": {
    title: "Capacity Planning",
    description: "Manufacturing capacity analysis, constraint identification and production feasibility"
  },
  "/logistics-planning": {
    title: "Logistics Planning",
    description: "Distribution network planning, freight optimisation and inbound/outbound logistics"
  },
  "/financial-planning": {
    title: "Financial Planning",
    description: "Scenario simulation, P&L impact analysis and financial trade-off evaluation"
  },
  "/performance-tracking": {
    title: "Performance Tracking",
    description: "KPI dashboards, actuals vs plan variance and supply chain health metrics"
  },
  "/policies-engine-settings": {
    title: "Policies & Engine Settings",
    description: "Planning engine configuration, policy rules, automation thresholds and governance settings"
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSubnavCollapsed, setIsSubnavCollapsed] = useState(false)
  const [isTopnavCollapsed, setIsTopnavCollapsed] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const lastScrollY = useRef(0)
  const mainRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const currentPage = pageInfo[pathname] ?? pageInfo["/"]

  useEffect(() => {
    const mainElement = mainRef.current
    if (!mainElement) return

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsSubnavCollapsed(true)
        setIsTopnavCollapsed(true)
      } else if (currentScrollY < lastScrollY.current) {
        setIsSubnavCollapsed(false)
        setIsTopnavCollapsed(false)
      }
      lastScrollY.current = currentScrollY
    }

    mainElement.addEventListener("scroll", handleScroll, { passive: true })
    return () => mainElement.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <NotificationsDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header
          className={`border-b bg-card flex items-center justify-between px-6 transition-all duration-300 ease-in-out ${
            isTopnavCollapsed ? "h-12 py-2" : "h-14 py-3"
          }`}
        >
          <div className="flex items-center gap-2">
            <div>
              <h1 className="font-semibold text-lg leading-tight">
                Agent-Led Supply Chain Planning &amp; Orchestration
              </h1>
              <p
                className={`text-xs text-muted-foreground transition-all duration-300 ease-in-out ${
                  isTopnavCollapsed ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-6"
                }`}
              >
                Fresenius — AI-powered supply chain planning, autonomous execution and decision support
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`relative transition-opacity duration-300 ease-in-out ${
                isTopnavCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <Input
                placeholder="Search"
                className="pl-3 pr-10 w-80 h-9 bg-background border-input rounded-md"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Sub Navigation */}
        <div
          className={`border-b px-6 flex items-center justify-between transition-all duration-300 ease-in-out ${
            isSubnavCollapsed ? "h-10 py-1" : "h-14 py-2"
          }`}
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {/* Left: page title */}
          <div className="overflow-hidden flex-shrink-0">
            <h2 className="text-base font-semibold leading-tight text-gray-900">{currentPage.title}</h2>
            <p
              className={`text-xs text-gray-500 transition-all duration-300 ease-in-out ${
                isSubnavCollapsed ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-5"
              }`}
            >
              {currentPage.description}
            </p>
          </div>

          {/* Right: Filters + Bell + Sarah Mitchell — all with consistent gap */}
          <div
            className={`flex items-center gap-3 flex-shrink-0 transition-all duration-300 ease-in-out ${
              isSubnavCollapsed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
            }`}
          >
            <Select defaultValue="all-regions">
              <SelectTrigger className="h-8 min-w-[130px] text-xs border-border data-[state=open]:border-primary data-[state=open]:text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-regions">All Regions</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="emea">EMEA</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
                <SelectItem value="latam">LATAM</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-categories">
              <SelectTrigger className="h-8 min-w-[155px] text-xs border-border data-[state=open]:border-primary data-[state=open]:text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="fert">FERT (Finished Pharma)</SelectItem>
                <SelectItem value="hawa">HAWA (Consumables)</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all-products">
              <SelectTrigger className="h-8 min-w-[145px] text-xs border-border data-[state=open]:border-primary data-[state=open]:text-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-products">All Products</SelectItem>
                <SelectItem value="phosphate-binder">Phosphate Binder</SelectItem>
                <SelectItem value="dialyzer">Dialyzer (High-Flux)</SelectItem>
                <SelectItem value="bloodlines">Bloodlines</SelectItem>
                <SelectItem value="nxstage-system">NxStage System</SelectItem>
                <SelectItem value="gauze-linens">Gauze & Linens</SelectItem>
                <SelectItem value="dialysis-concentrate">Dialysis Concentrate</SelectItem>
              </SelectContent>
            </Select>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 flex items-center justify-center text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
                21
              </span>
            </button>

            {/* Sarah Mitchell */}
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200">
              <Image
                src="/images/design-mode/sarah-mitchell-avatar.jpg"
                alt="Sarah Mitchell"
                width={28}
                height={28}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-gray-900 whitespace-nowrap">Sarah Mitchell</span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">VP Supply Chain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main ref={mainRef} className="flex-1 overflow-auto p-6">
          <div className="max-w-[1440px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
