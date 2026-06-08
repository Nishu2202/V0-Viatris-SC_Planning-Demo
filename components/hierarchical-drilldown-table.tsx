"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  ChevronDown,
  Building2,
  Landmark,
  Globe,
  Warehouse,
  Hospital,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface HierarchyNode {
  id: string
  name: string
  type: "region" | "dc" | "customer"
  forecast: string
  variance: string
  variancePositive: boolean
  demandType: string
  growth: string
  growthPositive: boolean
  children?: HierarchyNode[]
}

const hierarchyData: HierarchyNode[] = [
  {
    id: "amer",
    name: "Americas (AMER)",
    type: "region",
    forecast: "1.2B",
    variance: "+3.2%",
    variancePositive: true,
    demandType: "Mixed",
    growth: "+5.8%",
    growthPositive: true,
    children: [
      {
        id: "amer-dc1",
        name: "Memphis DC",
        type: "dc",
        forecast: "520M",
        variance: "+4.1%",
        variancePositive: true,
        demandType: "Replenishment",
        growth: "+6.2%",
        growthPositive: true,
        children: [
          {
            id: "amer-dc1-h1",
            name: "Mayo Clinic Rochester",
            type: "customer",
            forecast: "85M",
            variance: "+8.2%",
            variancePositive: true,
            demandType: "Set Demand",
            growth: "+12.1%",
            growthPositive: true,
          },
          {
            id: "amer-dc1-h2",
            name: "Cleveland Clinic",
            type: "customer",
            forecast: "72M",
            variance: "+2.1%",
            variancePositive: true,
            demandType: "Replenishment",
            growth: "+4.5%",
            growthPositive: true,
          },
          {
            id: "amer-dc1-h3",
            name: "Johns Hopkins Hospital",
            type: "customer",
            forecast: "68M",
            variance: "-1.5%",
            variancePositive: false,
            demandType: "Instruments",
            growth: "+2.8%",
            growthPositive: true,
          },
        ],
      },
      {
        id: "amer-dc2",
        name: "Los Angeles DC",
        type: "dc",
        forecast: "380M",
        variance: "+2.8%",
        variancePositive: true,
        demandType: "Replenishment",
        growth: "+5.1%",
        growthPositive: true,
        children: [
          {
            id: "amer-dc2-h1",
            name: "Cedars-Sinai Medical",
            type: "customer",
            forecast: "62M",
            variance: "+5.5%",
            variancePositive: true,
            demandType: "Set Demand",
            growth: "+8.3%",
            growthPositive: true,
          },
        ],
      },
    ],
  },
  {
    id: "emea",
    name: "Europe, Middle East & Africa (EMEA)",
    type: "region",
    forecast: "680M",
    variance: "-2.1%",
    variancePositive: false,
    demandType: "Mixed",
    growth: "+2.4%",
    growthPositive: true,
    children: [
      {
        id: "emea-dc1",
        name: "Amsterdam DC",
        type: "dc",
        forecast: "320M",
        variance: "-1.8%",
        variancePositive: false,
        demandType: "Replenishment",
        growth: "+2.8%",
        growthPositive: true,
        children: [
          {
            id: "emea-dc1-h1",
            name: "Charité Berlin",
            type: "customer",
            forecast: "45M",
            variance: "-4.2%",
            variancePositive: false,
            demandType: "Instruments",
            growth: "+1.2%",
            growthPositive: true,
          },
        ],
      },
    ],
  },
  {
    id: "apac",
    name: "Asia Pacific (APAC)",
    type: "region",
    forecast: "450M",
    variance: "+8.5%",
    variancePositive: true,
    demandType: "Mixed",
    growth: "+12.3%",
    growthPositive: true,
    children: [
      {
        id: "apac-dc1",
        name: "Tokyo DC",
        type: "dc",
        forecast: "220M",
        variance: "+10.2%",
        variancePositive: true,
        demandType: "Set Demand",
        growth: "+14.5%",
        growthPositive: true,
        children: [
          {
            id: "apac-dc1-h1",
            name: "Tokyo University Hospital",
            type: "customer",
            forecast: "38M",
            variance: "+12.8%",
            variancePositive: true,
            demandType: "Set Demand",
            growth: "+18.2%",
            growthPositive: true,
          },
        ],
      },
    ],
  },
]

const typeIcons = {
  region: { amer: Building2, emea: Landmark, apac: Globe },
  dc: Warehouse,
  customer: Hospital,
}

const typeColors = {
  region: "bg-blue-100 text-blue-700",
  dc: "bg-purple-100 text-purple-700",
  customer: "bg-green-100 text-green-700",
}

function HierarchyRow({
  node,
  depth,
  expandedNodes,
  toggleNode,
}: {
  node: HierarchyNode
  depth: number
  expandedNodes: Set<string>
  toggleNode: (id: string) => void
}) {
  const isExpanded = expandedNodes.has(node.id)
  const hasChildren = node.children && node.children.length > 0

  const getIcon = () => {
    if (node.type === "region") {
      const regionKey = node.id as "amer" | "emea" | "apac"
      const IconComponent = typeIcons.region[regionKey] || Building2
      return <IconComponent className="h-4 w-4" />
    }
    const IconComponent = typeIcons[node.type]
    return <IconComponent className="h-4 w-4" />
  }

  return (
    <>
      <tr className={`border-b border-border hover:bg-muted/50 ${depth === 0 ? "bg-muted/30" : ""}`}>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 24}px` }}>
            {hasChildren ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => toggleNode(node.id)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            ) : (
              <div className="w-6" />
            )}
            <span className="text-muted-foreground">{getIcon()}</span>
            <span className={`text-sm ${depth === 0 ? "font-semibold" : "font-medium"} text-foreground`}>
              {node.name}
            </span>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className={`text-sm ${depth === 0 ? "font-semibold" : ""} text-foreground`}>{node.forecast}</span>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-1">
            {node.variancePositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${node.variancePositive ? "text-green-600" : "text-red-600"}`}>
              {node.variance}
            </span>
          </div>
        </td>
        <td className="py-3 px-4">
          <Badge variant="outline" className="text-xs">
            {node.demandType}
          </Badge>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-1">
            {node.growthPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
            )}
            <span className={`text-sm font-medium ${node.growthPositive ? "text-green-600" : "text-red-600"}`}>
              {node.growth}
            </span>
          </div>
        </td>
      </tr>
      {isExpanded &&
        node.children?.map((child) => (
          <HierarchyRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expandedNodes={expandedNodes}
            toggleNode={toggleNode}
          />
        ))}
    </>
  )
}

export default function HierarchicalDrilldownTable() {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["amer"]))

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    const allIds: string[] = []
    const collectIds = (nodes: HierarchyNode[]) => {
      nodes.forEach((node) => {
        allIds.push(node.id)
        if (node.children) collectIds(node.children)
      })
    }
    collectIds(hierarchyData)
    setExpandedNodes(new Set(allIds))
  }

  const collapseAll = () => {
    setExpandedNodes(new Set())
  }

  return (
    <Card className="border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold text-foreground">Demand Hierarchy Drill-Down</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs">
            Collapse All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4 w-[35%]">
                Region / DC / Customer
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4">Forecast</th>
              <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4">Variance vs Plan</th>
              <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4">Demand Type</th>
              <th className="text-left text-xs font-semibold text-muted-foreground py-3 px-4">Growth Rate</th>
            </tr>
          </thead>
          <tbody>
            {hierarchyData.map((node) => (
              <HierarchyRow
                key={node.id}
                node={node}
                depth={0}
                expandedNodes={expandedNodes}
                toggleNode={toggleNode}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
