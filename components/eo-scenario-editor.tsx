"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  Globe, 
  Tag, 
  Factory, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  RotateCcw,
  Check,
  X,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

// Default parameters for E&O scenario modification
export interface EOScenarioParams {
  redeploymentPercent: number      // 0-100: % of excess inventory to redeploy
  targetMarkets: string[]          // Selected target markets for redeployment
  discountRate: number             // 0-30: discount % for hospital campaigns
  productionAdjustment: number     // -50 to 0: % production reduction
  executionTimeline: number        // 2-12 weeks
  writeOffTolerance: number        // 0-100: % of E&O willing to write off
}

export interface EOScenarioImpact {
  totalEOExposure: number          // $3M base
  redeploymentCost: number         // Variable based on % redeployed
  discountingCost: number          // Variable based on discount rate
  productionCost: number           // Variable based on production adjustment
  netSavings: number               // Calculated savings
  recoveryPercent: number          // % of E&O recovered
  riskScore: "low" | "medium" | "high"
}

const AVAILABLE_MARKETS = [
  { id: "emea", label: "EMEA", flag: "EU" },
  { id: "apac", label: "APAC", flag: "AP" },
  { id: "latam", label: "LATAM", flag: "LA" },
  { id: "canada", label: "Canada", flag: "CA" }
]

const DEFAULT_PARAMS: EOScenarioParams = {
  redeploymentPercent: 75,
  targetMarkets: ["emea", "apac"],
  discountRate: 0,
  productionAdjustment: 0,
  executionTimeline: 5,
  writeOffTolerance: 10
}

// Calculate impacts based on parameters
function calculateImpact(params: EOScenarioParams): EOScenarioImpact {
  const BASE_EO_EXPOSURE = 3000000 // $3M
  const BASE_REDEPLOYMENT_COST_PER_PERCENT = 4667 // ~$350K for 75%
  const BASE_DISCOUNT_COST_PER_PERCENT = 20000 // $600K for 30%
  const BASE_PRODUCTION_COST_PER_PERCENT = 17000 // $850K for 50%
  
  // Calculate individual costs
  const redeploymentCost = params.redeploymentPercent * BASE_REDEPLOYMENT_COST_PER_PERCENT * (params.targetMarkets.length / 2)
  const discountingCost = params.discountRate * BASE_DISCOUNT_COST_PER_PERCENT
  const productionCost = Math.abs(params.productionAdjustment) * BASE_PRODUCTION_COST_PER_PERCENT
  
  // Calculate recovery based on actions
  const redeploymentRecovery = (params.redeploymentPercent / 100) * BASE_EO_EXPOSURE * 0.88 // 88% effectiveness
  const discountRecovery = (params.discountRate / 30) * BASE_EO_EXPOSURE * 0.3 // Discounting recovers up to 30%
  const productionRecovery = (Math.abs(params.productionAdjustment) / 50) * BASE_EO_EXPOSURE * 0.25 // Production cuts prevent 25%
  const writeOffLoss = (params.writeOffTolerance / 100) * BASE_EO_EXPOSURE
  
  const totalRecovery = Math.min(redeploymentRecovery + discountRecovery + productionRecovery, BASE_EO_EXPOSURE)
  const totalCost = redeploymentCost + discountingCost + productionCost
  const netSavings = totalRecovery - totalCost - writeOffLoss
  
  const recoveryPercent = Math.round((totalRecovery / BASE_EO_EXPOSURE) * 100)
  
  // Risk assessment
  let riskScore: "low" | "medium" | "high" = "low"
  if (params.discountRate > 15 || params.productionAdjustment < -30) {
    riskScore = "high"
  } else if (params.discountRate > 8 || params.productionAdjustment < -15 || params.writeOffTolerance > 20) {
    riskScore = "medium"
  }
  
  return {
    totalEOExposure: BASE_EO_EXPOSURE,
    redeploymentCost,
    discountingCost,
    productionCost,
    netSavings,
    recoveryPercent,
    riskScore
  }
}

function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`
  }
  return `$${(value / 1000).toFixed(0)}K`
}

interface EOScenarioEditorProps {
  onApply: (params: EOScenarioParams, impact: EOScenarioImpact) => void
  onCancel: () => void
  initialParams?: EOScenarioParams
}

export default function EOScenarioEditor({ onApply, onCancel, initialParams }: EOScenarioEditorProps) {
  const [params, setParams] = useState<EOScenarioParams>(initialParams || DEFAULT_PARAMS)
  const [impact, setImpact] = useState<EOScenarioImpact>(() => calculateImpact(initialParams || DEFAULT_PARAMS))
  
  // Recalculate impact when params change
  useEffect(() => {
    const newImpact = calculateImpact(params)
    setImpact(newImpact)
  }, [params])
  
  const handleReset = useCallback(() => {
    setParams(DEFAULT_PARAMS)
  }, [])
  
  const toggleMarket = (marketId: string) => {
    setParams(prev => ({
      ...prev,
      targetMarkets: prev.targetMarkets.includes(marketId)
        ? prev.targetMarkets.filter(m => m !== marketId)
        : [...prev.targetMarkets, marketId]
    }))
  }
  
  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-50 border-green-200"
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200"
      case "high": return "text-red-600 bg-red-50 border-red-200"
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-blue-200 p-5 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Modify Scenario Parameters</h3>
            <p className="text-xs text-gray-500">Adjust levers to see real-time impact on E&O recovery</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleReset}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Reset to Default
        </Button>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column - Controls */}
        <div className="space-y-5">
          {/* Redeployment Percent */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-4 w-4 text-blue-600" />
              <label className="text-xs font-semibold text-gray-700">Global Redeployment</label>
              <div className="ml-auto px-2 py-0.5 bg-blue-100 rounded text-xs font-bold text-blue-700">
                {params.redeploymentPercent}%
              </div>
            </div>
            <Slider
              value={[params.redeploymentPercent]}
              onValueChange={([val]) => setParams(prev => ({ ...prev, redeploymentPercent: val }))}
              min={0}
              max={100}
              step={5}
              className="mb-2"
            />
            <p className="text-[10px] text-gray-500">Percentage of excess inventory to redeploy globally</p>
          </div>
          
          {/* Target Markets */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-4 w-4 text-green-600" />
              <label className="text-xs font-semibold text-gray-700">Target Markets</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_MARKETS.map(market => (
                <button
                  key={market.id}
                  onClick={() => toggleMarket(market.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    params.targetMarkets.includes(market.id)
                      ? "bg-green-100 text-green-700 border-2 border-green-400"
                      : "bg-gray-100 text-gray-600 border-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  <span className="mr-1">{market.flag}</span>
                  {market.label}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Select regions for inventory transfer (more markets = higher transfer cost)</p>
          </div>
          
          {/* Discount Rate */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-amber-600" />
              <label className="text-xs font-semibold text-gray-700">Hospital Discount Rate</label>
              <div className="ml-auto px-2 py-0.5 bg-amber-100 rounded text-xs font-bold text-amber-700">
                {params.discountRate}%
              </div>
            </div>
            <Slider
              value={[params.discountRate]}
              onValueChange={([val]) => setParams(prev => ({ ...prev, discountRate: val }))}
              min={0}
              max={30}
              step={1}
              className="mb-2"
            />
            <p className="text-[10px] text-gray-500">Targeted discount for hospital procurement (impacts margin)</p>
          </div>
          
          {/* Production Adjustment */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Factory className="h-4 w-4 text-purple-600" />
              <label className="text-xs font-semibold text-gray-700">Production Adjustment</label>
              <div className="ml-auto px-2 py-0.5 bg-purple-100 rounded text-xs font-bold text-purple-700">
                {params.productionAdjustment}%
              </div>
            </div>
            <Slider
              value={[params.productionAdjustment]}
              onValueChange={([val]) => setParams(prev => ({ ...prev, productionAdjustment: val }))}
              min={-50}
              max={0}
              step={5}
              className="mb-2"
            />
            <p className="text-[10px] text-gray-500">Reduce EVOS production to prevent future excess</p>
          </div>
          
          {/* Execution Timeline */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-blue-600" />
              <label className="text-xs font-semibold text-gray-700">Execution Timeline</label>
              <div className="ml-auto px-2 py-0.5 bg-blue-100 rounded text-xs font-bold text-blue-700">
                {params.executionTimeline} weeks
              </div>
            </div>
            <Slider
              value={[params.executionTimeline]}
              onValueChange={([val]) => setParams(prev => ({ ...prev, executionTimeline: val }))}
              min={2}
              max={12}
              step={1}
              className="mb-2"
            />
            <p className="text-[10px] text-gray-500">Shorter timeline = faster execution but higher coordination cost</p>
          </div>
          
          {/* Write-off Tolerance */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <label className="text-xs font-semibold text-gray-700">Write-off Tolerance</label>
              <div className="ml-auto px-2 py-0.5 bg-red-100 rounded text-xs font-bold text-red-700">
                {params.writeOffTolerance}%
              </div>
            </div>
            <Slider
              value={[params.writeOffTolerance]}
              onValueChange={([val]) => setParams(prev => ({ ...prev, writeOffTolerance: val }))}
              min={0}
              max={50}
              step={5}
              className="mb-2"
            />
            <p className="text-[10px] text-gray-500">Acceptable E&O write-off percentage (remaining after recovery efforts)</p>
          </div>
        </div>
        
        {/* Right Column - Live Impact Summary */}
        <div className="space-y-4">
          {/* Impact Overview Card */}
          <div className="bg-white rounded-xl border-2 border-blue-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h4 className="text-sm font-bold text-gray-900">Live Impact Summary</h4>
            </div>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-[10px] text-gray-500 mb-1">E&O Exposure</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(impact.totalEOExposure)}</p>
              </div>
              <div className={`rounded-lg p-3 border ${impact.netSavings >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <p className="text-[10px] text-gray-500 mb-1">Net Savings</p>
                <p className={`text-lg font-bold ${impact.netSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(impact.netSavings)}
                </p>
              </div>
            </div>
            
            {/* Cost Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 flex items-center gap-1">
                  <Globe className="h-3 w-3 text-blue-500" />
                  Redeployment Cost
                </span>
                <span className="font-semibold text-gray-900">{formatCurrency(impact.redeploymentCost)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 flex items-center gap-1">
                  <Tag className="h-3 w-3 text-amber-500" />
                  Discounting Cost
                </span>
                <span className="font-semibold text-gray-900">{formatCurrency(impact.discountingCost)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 flex items-center gap-1">
                  <Factory className="h-3 w-3 text-purple-500" />
                  Production Impact
                </span>
                <span className="font-semibold text-gray-900">{formatCurrency(impact.productionCost)}</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 font-semibold">Total Cost</span>
                <span className="font-bold text-gray-900">
                  {formatCurrency(impact.redeploymentCost + impact.discountingCost + impact.productionCost)}
                </span>
              </div>
            </div>
            
            {/* Recovery Percent */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">E&O Recovery</span>
                <span className="text-xs font-bold text-blue-600">{impact.recoveryPercent}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                  style={{ width: `${Math.min(impact.recoveryPercent, 100)}%` }}
                />
              </div>
            </div>
            
            {/* Risk Assessment */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getRiskColor(impact.riskScore)}`}>
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-semibold">
                Risk Level: {impact.riskScore.charAt(0).toUpperCase() + impact.riskScore.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Strategy Comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="text-xs font-bold text-gray-900 mb-3 flex items-center gap-1">
              <Info className="h-3 w-3 text-gray-400" />
              Your Custom Scenario vs. Defaults
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Global Redeployment (default)</span>
                <span className="font-semibold text-green-600">$2.65M savings</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Discounting (default)</span>
                <span className="font-semibold text-amber-600">$2.40M savings</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Production Reduction (default)</span>
                <span className="font-semibold text-purple-600">$2.15M savings</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-900 font-bold flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  Your Custom Scenario
                </span>
                <span className={`font-bold ${impact.netSavings >= 2650000 ? "text-green-600" : impact.netSavings >= 2150000 ? "text-blue-600" : "text-amber-600"}`}>
                  {formatCurrency(impact.netSavings)} savings
                </span>
              </div>
            </div>
            
            {/* Comparison indicator */}
            {impact.netSavings >= 2650000 && (
              <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
                <p className="text-[10px] text-green-700 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Outperforming recommended strategy by {formatCurrency(impact.netSavings - 2650000)}
                </p>
              </div>
            )}
            {impact.netSavings < 2150000 && impact.netSavings >= 0 && (
              <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-[10px] text-amber-700 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  Below conservative baseline. Consider adjusting parameters.
                </p>
              </div>
            )}
            {impact.netSavings < 0 && (
              <div className="mt-3 p-2 bg-red-50 rounded-lg border border-red-200">
                <p className="text-[10px] text-red-700 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Negative net savings. Costs exceed recovery potential.
                </p>
              </div>
            )}
          </div>
          
          {/* Timeline Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="text-xs font-bold text-gray-900 mb-2">Execution Summary</h4>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-600">
                {params.executionTimeline} weeks to execute across {params.targetMarkets.length} market{params.targetMarkets.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Percent className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-600">
                {params.redeploymentPercent}% redeployment + {params.discountRate}% discount + {Math.abs(params.productionAdjustment)}% production cut
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-blue-200">
        <div className="text-xs text-gray-500">
          All calculations are estimates based on current E&O exposure data
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() => onApply(params, impact)}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Apply Custom Scenario
          </Button>
        </div>
      </div>
    </div>
  )
}
