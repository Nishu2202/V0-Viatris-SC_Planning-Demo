"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from "react"

const productData = [
  { name: "Dialysis Concentrate", category: "FERT (Finished Pharma)", plan: "$142M", actual: "$148M", variance: "+4.2%", isPositive: true },
  { name: "Phosphate Binder", category: "FERT", plan: "$98M", actual: "$94M", variance: "-4.1%", isPositive: false },
  { name: "High-Flux Dialyzer", category: "HAWA (Consumables)", plan: "$76M", actual: "$79M", variance: "+3.9%", isPositive: true },
  { name: "Bloodlines & Connectors", category: "HAWA", plan: "$54M", actual: "$52M", variance: "-3.7%", isPositive: false },
  { name: "NxStage Dialysis System", category: "Equipment", plan: "$45M", actual: "$47M", variance: "+4.4%", isPositive: true },
]

const regionDrillDown = [
  {
    region: "North America",
    location: "USA & Canada",
    plan: "$892M",
    actual: "$918M",
    variance: "+2.9%",
    children: [
      { name: "East Region", actual: "$312M", variance: "+3.1%" },
      { name: "West Region", actual: "$298M", variance: "+2.4%" },
      { name: "Central Region", actual: "$308M", variance: "+3.2%" },
    ],
  },
  {
    region: "EMEA",
    location: "Europe, Middle East, Africa",
    plan: "$624M",
    actual: "$612M",
    variance: "-1.9%",
    children: [
      { name: "UK & Ireland", actual: "$156M", variance: "-2.1%" },
      { name: "Germany", actual: "$142M", variance: "-1.5%" },
      { name: "France", actual: "$118M", variance: "-2.3%" },
      { name: "Rest of EMEA", actual: "$196M", variance: "-1.8%" },
    ],
  },
  {
    region: "APAC",
    location: "Asia Pacific",
    plan: "$412M",
    actual: "$428M",
    variance: "+3.9%",
    children: [
      { name: "Australia/NZ", actual: "$124M", variance: "+4.2%" },
      { name: "Japan", actual: "$156M", variance: "+3.5%" },
      { name: "China", actual: "$98M", variance: "+4.8%" },
      { name: "Rest of APAC", actual: "$50M", variance: "+3.2%" },
    ],
  },
  {
    region: "LATAM",
    location: "Latin America",
    plan: "$186M",
    actual: "$182M",
    variance: "-2.2%",
    children: [
      { name: "Brazil", actual: "$78M", variance: "-1.8%" },
      { name: "Mexico", actual: "$62M", variance: "-2.5%" },
      { name: "Rest of LATAM", actual: "$42M", variance: "-2.6%" },
    ],
  },
]

export default function CostPerformance() {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="flex gap-6 items-stretch">
      <Card className="flex-1 p-0 flex flex-col h-[600px] overflow-hidden">
        <div className="px-6 pt-6 pb-1.5">
          <h3 className="text-lg font-semibold">Revenue vs Plan by Product</h3>
        </div>
        <div style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }} />
        <div className="px-6 pt-1.5 space-y-3 overflow-auto flex-1">
          {productData.map((product, index) => (
            <Card key={index} className="p-4 bg-background border shadow-none">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold">{product.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{product.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {product.actual} <span className="text-xs font-normal text-muted-foreground">actual</span>
                  </div>
                  <div
                    className={`text-xs flex items-center gap-1 justify-end mt-1 ${
                      product.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {product.variance} vs plan
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="flex-1 p-0 flex flex-col h-[600px] overflow-hidden">
        <div className="px-6 pt-6 pb-1.5">
          <h3 className="text-lg font-semibold">Regional Performance Drill-Down</h3>
        </div>
        <div style={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.06)" }} />
        <div className="px-6 pt-1.5 flex-1 overflow-auto">
          <div className="border border-border rounded-md overflow-hidden" style={{ borderWidth: "0.5px" }}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left text-xs font-semibold px-4 py-3 border-b">Region</th>
                  <th className="text-left text-xs font-semibold px-4 py-3 border-b">Scope</th>
                  <th className="text-center text-xs font-semibold px-4 py-3 border-b">Plan</th>
                  <th className="text-center text-xs font-semibold px-4 py-3 border-b">Actual</th>
                  <th className="text-right text-xs font-semibold px-4 py-3 border-b">Variance</th>
                </tr>
              </thead>
              <tbody>
                {regionDrillDown.map((row, index) => (
                  <>
                    <tr
                      key={index}
                      className="hover:bg-muted/20 cursor-pointer border-b"
                      onClick={() => row.children.length > 0 && toggleRow(index)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm">
                          {expandedRows.includes(index) ? (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                          {row.region}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{row.location}</td>
                      <td className="px-4 py-3 text-sm text-center">{row.plan}</td>
                      <td className="px-4 py-3 text-sm text-center font-medium">{row.actual}</td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${row.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {row.variance}
                      </td>
                    </tr>
                    {expandedRows.includes(index) &&
                      row.children.map((child, childIndex) => (
                        <tr key={`${index}-${childIndex}`} className="bg-muted/10 border-b">
                          <td className="px-4 py-2" colSpan={3}>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pl-6">
                              <ChevronRight className="h-3 w-3" />
                              {child.name}
                            </div>
                          </td>
                          <td className="px-4 py-2 text-sm text-center">{child.actual}</td>
                          <td className={`px-4 py-2 text-sm text-right ${child.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {child.variance}
                          </td>
                        </tr>
                      ))}
                  </>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/50 border-t-2">
                  <td className="px-4 py-3 text-sm font-bold">GLOBAL TOTAL</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">4 Regions</td>
                  <td className="px-4 py-3 text-sm font-bold text-center">$2.114B</td>
                  <td className="px-4 py-3 text-sm font-bold text-center">$2.140B</td>
                  <td className="px-4 py-3 text-sm font-bold text-right text-green-600">+1.2%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Card>
    </div>
  )
}
