
import { useState } from 'react';
import { Calculator, DollarSign, Clock, ArrowRight, Download, Plus, Minus, Calendar, BarChart } from 'lucide-react';
import Card from './ui/Card';
import AnimatedNumber from './ui/AnimatedNumber';

interface Reactor {
  type: string;
  cost: {
    min: number;
    max: number;
  };
  buildTime: {
    min: number;
    max: number;
  };
  fuelCost: number;
  capacity: number;
}

interface FuelCycle {
  step: string;
  duration: {
    min: number;
    max: number;
  };
  cost: {
    min: number;
    max: number;
  };
  unit: string;
}

const CostCalculator = () => {
  // Reactor data
  const reactors: Record<string, Reactor> = {
    'smr': {
      type: 'Small Modular Reactor (SMR)',
      cost: {
        min: 3000,
        max: 5000
      },
      buildTime: {
        min: 3,
        max: 5
      },
      fuelCost: 45,
      capacity: 300
    },
    'large': {
      type: 'Large PWR Reactor',
      cost: {
        min: 6000,
        max: 12000
      },
      buildTime: {
        min: 7,
        max: 10
      },
      fuelCost: 40,
      capacity: 1100
    },
    'microreactor': {
      type: 'Microreactor',
      cost: {
        min: 100,
        max: 300
      },
      buildTime: {
        min: 1,
        max: 2
      },
      fuelCost: 65,
      capacity: 10
    }
  };
  
  // Fuel cycle data
  const fuelCycleSteps: FuelCycle[] = [
    {
      step: 'Uranium Mining & Milling',
      duration: { min: 1, max: 3 },
      cost: { min: 50, max: 80 },
      unit: 'per lb U₃O₈'
    },
    {
      step: 'Conversion to UF₆',
      duration: { min: 1, max: 2 },
      cost: { min: 22, max: 30 },
      unit: 'per kgU as UF₆'
    },
    {
      step: 'Enrichment',
      duration: { min: 2, max: 4 },
      cost: { min: 80, max: 120 },
      unit: 'per SWU'
    },
    {
      step: 'Fuel Fabrication (UO₂)',
      duration: { min: 6, max: 12 },
      cost: { min: 300, max: 400 },
      unit: 'per kgU'
    },
    {
      step: 'HALEU Production (for SMRs)',
      duration: { min: 8, max: 18 },
      cost: { min: 700, max: 1200 },
      unit: 'per kgU'
    }
  ];
  
  const [selectedReactorType, setSelectedReactorType] = useState<string>('smr');
  const [reactorCount, setReactorCount] = useState<number>(1);
  const [includeDecommissioning, setIncludeDecommissioning] = useState<boolean>(false);
  const [includeFuel, setIncludeFuel] = useState<boolean>(true);
  const [countryFactor, setCountryFactor] = useState<number>(1.0); // Multiplier for different countries
  
  // Calculate total cost based on selections
  const calculateTotalCost = () => {
    const reactor = reactors[selectedReactorType];
    const baseCost = {
      min: reactor.cost.min * reactorCount,
      max: reactor.cost.max * reactorCount
    };
    
    let fuelCost = 0;
    if (includeFuel) {
      // Simplified calculation - in reality would consider capacity, enrichment, burnup, etc.
      fuelCost = reactor.fuelCost * reactor.capacity * reactorCount * 0.1;
    }
    
    let decommissioningCost = 0;
    if (includeDecommissioning) {
      // Typically 10-15% of capital cost
      decommissioningCost = {
        min: baseCost.min * 0.1,
        max: baseCost.max * 0.15
      };
    }
    
    const totalMinCost = (baseCost.min + (decommissioningCost ? decommissioningCost.min : 0) + fuelCost) * countryFactor;
    const totalMaxCost = (baseCost.max + (decommissioningCost ? decommissioningCost.max : 0) + fuelCost) * countryFactor;
    
    return {
      min: totalMinCost,
      max: totalMaxCost,
      perMW: {
        min: totalMinCost / (reactor.capacity * reactorCount),
        max: totalMaxCost / (reactor.capacity * reactorCount)
      }
    };
  };
  
  // Calculate timeline
  const calculateTimeline = () => {
    const reactor = reactors[selectedReactorType];
    
    // Simplified timeline calculations
    let totalMinTime = reactor.buildTime.min;
    let totalMaxTime = reactor.buildTime.max;
    
    // Add time for licensing and permitting
    totalMinTime += 1;
    totalMaxTime += 3;
    
    // Multiple reactors might add some time, but with overlap
    if (reactorCount > 1) {
      totalMinTime += 0.5;
      totalMaxTime += 1;
    }
    
    return {
      min: totalMinTime,
      max: totalMaxTime
    };
  };
  
  const totalCost = calculateTotalCost();
  const timeline = calculateTimeline();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
          Cost & Timeline Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Calculate costs and timelines for nuclear reactor projects and fuel cycles
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Panel */}
        <Card className="lg:row-span-2">
          <div className="flex items-center mb-6">
            <Calculator className="w-5 h-5 mr-2 text-nuclear-600" />
            <h2 className="text-xl font-semibold">Project Parameters</h2>
          </div>
          
          <div className="space-y-6">
            {/* Reactor Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reactor Type
              </label>
              <div className="space-y-2">
                {Object.keys(reactors).map(reactorType => (
                  <div 
                    key={reactorType}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedReactorType === reactorType
                        ? 'border-nuclear-500 bg-nuclear-50 dark:bg-nuclear-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedReactorType(reactorType)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{reactors[reactorType].type}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {reactors[reactorType].capacity} MWe
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 text-right">
                        <p>${reactors[reactorType].cost.min}M - ${reactors[reactorType].cost.max}M</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {reactors[reactorType].buildTime.min}-{reactors[reactorType].buildTime.max} years
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Number of Reactors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Reactors
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setReactorCount(Math.max(1, reactorCount - 1))}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-l-lg"
                >
                  <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="px-6 py-2 bg-white dark:bg-gray-700 border-y border-gray-200 dark:border-gray-600 text-center flex-1">
                  <span className="text-lg font-medium">{reactorCount}</span>
                </div>
                <button
                  onClick={() => setReactorCount(reactorCount + 1)}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-r-lg"
                >
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
            
            {/* Country Factor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Construction Location
              </label>
              <select
                value={countryFactor}
                onChange={(e) => setCountryFactor(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-nuclear-500 focus:border-nuclear-500"
              >
                <option value="1.0">United States (base cost)</option>
                <option value="0.95">Canada (5% lower)</option>
                <option value="1.1">United Kingdom (10% higher)</option>
                <option value="1.15">European Union (15% higher)</option>
                <option value="0.8">China (20% lower)</option>
                <option value="0.85">South Korea (15% lower)</option>
                <option value="0.9">Japan (10% lower)</option>
                <option value="1.05">Australia (5% higher)</option>
              </select>
            </div>
            
            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Costs
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Include Fuel Costs</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Initial core loading and first cycle
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={includeFuel}
                      onChange={() => setIncludeFuel(!includeFuel)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nuclear-300 dark:peer-focus:ring-nuclear-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nuclear-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Include Decommissioning</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      End-of-life costs (10-15% of capex)
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={includeDecommissioning}
                      onChange={() => setIncludeDecommissioning(!includeDecommissioning)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nuclear-300 dark:peer-focus:ring-nuclear-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-nuclear-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Results Panel */}
        <Card className="col-span-1 lg:col-span-2" glassEffect>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-nuclear-600" />
            Cost Estimation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Total Project Cost</p>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">$</span>
                <AnimatedNumber 
                  value={totalCost.min} 
                  formatFn={(val) => val.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                  className="text-3xl font-bold mx-1"
                />
                <span className="text-xl font-semibold">-</span>
                <AnimatedNumber 
                  value={totalCost.max} 
                  formatFn={(val) => val.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                  className="text-3xl font-bold mx-1"
                />
                <span className="text-xl">M</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>Cost per MWe:</p>
                <p className="font-medium">
                  $<AnimatedNumber 
                    value={totalCost.perMW.min / 1000} 
                    formatFn={(val) => val.toFixed(2)}
                  /> - $<AnimatedNumber 
                    value={totalCost.perMW.max / 1000} 
                    formatFn={(val) => val.toFixed(2)}
                  /> million / MWe
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Project Timeline</p>
              <div className="flex items-baseline">
                <AnimatedNumber 
                  value={timeline.min} 
                  formatFn={(val) => val.toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  })}
                  className="text-3xl font-bold mr-1"
                />
                <span className="text-xl font-semibold">-</span>
                <AnimatedNumber 
                  value={timeline.max} 
                  formatFn={(val) => val.toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                  })}
                  className="text-3xl font-bold mx-1"
                />
                <span className="text-xl">years</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                <p>Total Power Capacity:</p>
                <p className="font-medium">
                  <AnimatedNumber 
                    value={reactors[selectedReactorType].capacity * reactorCount} 
                    formatFn={(val) => val.toLocaleString()}
                  /> MWe
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-x-auto mb-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Cost Category</th>
                  <th scope="col" className="px-6 py-3">Percentage</th>
                  <th scope="col" className="px-6 py-3">Amount ($M)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                    Direct Construction
                  </th>
                  <td className="px-6 py-3">60-65%</td>
                  <td className="px-6 py-3">
                    ${Math.round(totalCost.min * 0.6)} - ${Math.round(totalCost.max * 0.65)}M
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                    Engineering & Design
                  </th>
                  <td className="px-6 py-3">10-15%</td>
                  <td className="px-6 py-3">
                    ${Math.round(totalCost.min * 0.1)} - ${Math.round(totalCost.max * 0.15)}M
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                    Project Management
                  </th>
                  <td className="px-6 py-3">8-10%</td>
                  <td className="px-6 py-3">
                    ${Math.round(totalCost.min * 0.08)} - ${Math.round(totalCost.max * 0.1)}M
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                    Licensing & Permitting
                  </th>
                  <td className="px-6 py-3">5-8%</td>
                  <td className="px-6 py-3">
                    ${Math.round(totalCost.min * 0.05)} - ${Math.round(totalCost.max * 0.08)}M
                  </td>
                </tr>
                {includeFuel && (
                  <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                      Initial Fuel Load
                    </th>
                    <td className="px-6 py-3">~{Math.round((reactors[selectedReactorType].fuelCost * reactors[selectedReactorType].capacity * reactorCount * 0.1 / totalCost.min) * 100)}%</td>
                    <td className="px-6 py-3">
                      ~${Math.round(reactors[selectedReactorType].fuelCost * reactors[selectedReactorType].capacity * reactorCount * 0.1)}M
                    </td>
                  </tr>
                )}
                {includeDecommissioning && (
                  <tr className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                      Decommissioning Reserve
                    </th>
                    <td className="px-6 py-3">10-15%</td>
                    <td className="px-6 py-3">
                      ${Math.round(totalCost.min * 0.1)} - ${Math.round(totalCost.max * 0.15)}M
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex justify-between">
            <button className="px-4 py-2 bg-nuclear-600 text-white rounded-lg hover:bg-nuclear-700 transition-colors flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Generate Detailed Report
            </button>
            
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </Card>
        
        {/* Fuel Cycle Timeline */}
        <Card className="col-span-1 lg:col-span-2" animation="slide">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-nuclear-600" />
            Fuel Cycle Timeline
          </h2>
          
          <div className="space-y-6">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">Process Step</th>
                    <th scope="col" className="px-6 py-3">Duration</th>
                    <th scope="col" className="px-6 py-3">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelCycleSteps.map((step, index) => (
                    <tr key={index} className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap">
                        {step.step}
                      </th>
                      <td className="px-6 py-3">
                        {step.duration.min}-{step.duration.max} {
                          step.duration.max <= 3 ? 'months' : 'months'
                        }
                      </td>
                      <td className="px-6 py-3">
                        ${step.cost.min}-${step.cost.max} {step.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3">Simplified Fuel Cycle Timeline</h3>
              
              <div className="relative">
                <div className="absolute top-4 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                
                <div className="flex justify-between relative pt-8">
                  <div className="text-center">
                    <div className="absolute top-3 left-0 w-4 h-4 bg-nuclear-600 rounded-full"></div>
                    <p className="text-xs font-medium">Mining</p>
                    <p className="text-xs text-gray-500">0 months</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="absolute top-3 left-[20%] w-4 h-4 bg-nuclear-600 rounded-full"></div>
                    <div className="absolute -translate-x-1/2 left-[20%]">
                      <p className="text-xs font-medium">Conversion</p>
                      <p className="text-xs text-gray-500">3 months</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="absolute top-3 left-[40%] w-4 h-4 bg-nuclear-600 rounded-full"></div>
                    <div className="absolute -translate-x-1/2 left-[40%]">
                      <p className="text-xs font-medium">Enrichment</p>
                      <p className="text-xs text-gray-500">6 months</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="absolute top-3 left-[70%] w-4 h-4 bg-nuclear-600 rounded-full"></div>
                    <div className="absolute -translate-x-1/2 left-[70%]">
                      <p className="text-xs font-medium">Fabrication</p>
                      <p className="text-xs text-gray-500">12 months</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="absolute top-3 right-0 w-4 h-4 bg-nuclear-600 rounded-full"></div>
                    <p className="text-xs font-medium">Delivery</p>
                    <p className="text-xs text-gray-500">18 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Comparison Section */}
      <Card className="p-6" animation="slide">
        <h2 className="text-xl font-semibold mb-6">Comparison - SMR vs Large Reactor</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3">
                <h3 className="text-sm font-medium">Key Metrics Comparison</h3>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm font-medium">Metric</div>
                  <div className="text-sm font-medium">Small Modular Reactor</div>
                  <div className="text-sm font-medium">Large PWR Reactor</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">Capital Cost ($/kW)</div>
                  <div className="text-sm">$5,000 - $7,000</div>
                  <div className="text-sm">$5,500 - $8,000</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">Construction Time</div>
                  <div className="text-sm">3-5 years</div>
                  <div className="text-sm">7-10 years</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">Licensing Timeline</div>
                  <div className="text-sm">2-3 years</div>
                  <div className="text-sm">3-5 years</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">Financing Complexity</div>
                  <div className="text-sm">Medium</div>
                  <div className="text-sm">High</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">Capacity Factor</div>
                  <div className="text-sm">90-95%</div>
                  <div className="text-sm">90-92%</div>
                </div>
                
                <div className="grid grid-cols-3 px-6 py-3">
                  <div className="text-sm">LCOE ($/MWh)</div>
                  <div className="text-sm">$60 - $90</div>
                  <div className="text-sm">$65 - $85</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg h-full">
              <h3 className="text-sm font-medium mb-3">Key Takeaways</h3>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-nuclear-100 dark:bg-nuclear-900 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-nuclear-800 dark:text-nuclear-200 text-xs">1</span>
                  </div>
                  <p>SMRs offer faster deployment and lower initial capital requirements, making them more accessible for smaller utilities and developing markets.</p>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-nuclear-100 dark:bg-nuclear-900 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-nuclear-800 dark:text-nuclear-200 text-xs">2</span>
                  </div>
                  <p>Large reactors benefit from economies of scale for long-term operation, but face higher financing hurdles and longer construction timelines.</p>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-nuclear-100 dark:bg-nuclear-900 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-nuclear-800 dark:text-nuclear-200 text-xs">3</span>
                  </div>
                  <p>Fuel costs represent a smaller percentage of total costs for both technologies compared to fossil fuel plants (5-10% vs 60-70%).</p>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-nuclear-100 dark:bg-nuclear-900 rounded-full flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-nuclear-800 dark:text-nuclear-200 text-xs">4</span>
                  </div>
                  <p>Modular construction approaches are beginning to benefit both SMR and large reactor economics, with factory builds reducing on-site work.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CostCalculator;
