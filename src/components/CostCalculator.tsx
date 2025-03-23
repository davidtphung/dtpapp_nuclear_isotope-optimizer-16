import { useState } from 'react';
import { Sliders, FileText, Download, FileBarChart2 } from 'lucide-react';
import Card from './ui/Card';
import { Button } from './ui/button';

interface CostParameters {
  reactorType: 'smr' | 'large';
  capacity: number;
  capacityFactor: number;
  constructionTime: number;
  fuelCost: number;
  omCost: number;
  carbonIntensity: number;
}

const CostCalculator = () => {
  const [parameters, setParameters] = useState<CostParameters>({
    reactorType: 'smr',
    capacity: 300,
    capacityFactor: 0.9,
    constructionTime: 5,
    fuelCost: 8,
    omCost: 12,
    carbonIntensity: 12
  });
  
  const [generatedReport, setGeneratedReport] = useState(false);
  
  const { 
    reactorType, 
    capacity, 
    capacityFactor, 
    constructionTime, 
    fuelCost, 
    omCost, 
    carbonIntensity 
  } = parameters;
  
  const capitalCost = reactorType === 'smr' ? 5500 : 4000;
  
  const handleParameterChange = (
    param: keyof CostParameters, 
    value: number | string
  ) => {
    setParameters(prev => ({
      ...prev,
      [param]: typeof value === 'number' ? value : value === '' ? 0 : parseFloat(value)
    }));
  };
  
  const calculateLevelizedCost = () => {
    const annualElectricity = capacity * 1000 * capacityFactor * 8760;
    const totalCost = (capitalCost * capacity * 1000) + 
                      (fuelCost + omCost) * annualElectricity / 1000000;
    return totalCost / (annualElectricity / 1000000);
  };
  
  const handleGenerateReport = () => {
    setGeneratedReport(true);
  };
  
  const handleExport = () => {
    // Implement export functionality here
    alert('Export functionality not implemented yet.');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
          Nuclear Cost Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Estimate costs for nuclear projects with detailed parameters
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Panel */}
        <Card className="lg:row-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-nuclear-600" />
              Project Parameters
            </h3>
          </div>
          
          <div className="space-y-5">
            {/* Reactor Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reactor Type
              </label>
              <select
                value={reactorType}
                onChange={(e) => handleParameterChange('reactorType', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-nuclear-500 focus:border-nuclear-500"
              >
                <option value="smr">Small Modular Reactor (SMR)</option>
                <option value="large">Large-Scale Reactor</option>
              </select>
            </div>
            
            {/* Capacity */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Capacity (MW)
                </label>
                <span className="text-sm text-gray-500">
                  {capacity.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={1600}
                step={50}
                value={capacity}
                onChange={(e) => handleParameterChange('capacity', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>1,600</span>
              </div>
            </div>
            
            {/* Capacity Factor */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Capacity Factor
                </label>
                <span className="text-sm text-gray-500">
                  {(capacityFactor * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={0.95}
                step={0.05}
                value={capacityFactor}
                onChange={(e) => handleParameterChange('capacityFactor', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>
            
            {/* Construction Time */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Construction Time (years)
                </label>
                <span className="text-sm text-gray-500">
                  {constructionTime.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                step={0.5}
                value={constructionTime}
                onChange={(e) => handleParameterChange('constructionTime', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>3</span>
                <span>8</span>
              </div>
            </div>
            
            {/* Fuel Cost */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fuel Cost ($/MWh)
                </label>
                <span className="text-sm text-gray-500">
                  ${fuelCost.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={1}
                value={fuelCost}
                onChange={(e) => handleParameterChange('fuelCost', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$5</span>
                <span>$25</span>
              </div>
            </div>
            
            {/* O&M Cost */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  O&M Cost ($/MWh)
                </label>
                <span className="text-sm text-gray-500">
                  ${omCost.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={40}
                step={1}
                value={omCost}
                onChange={(e) => handleParameterChange('omCost', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$8</span>
                <span>$40</span>
              </div>
            </div>
            
            {/* Carbon Intensity */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Carbon Intensity (g CO₂/kWh)
                </label>
                <span className="text-sm text-gray-500">
                  {carbonIntensity.toFixed(0)}
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={60}
                step={1}
                value={carbonIntensity}
                onChange={(e) => handleParameterChange('carbonIntensity', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>8</span>
                <span>60</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Results Panel */}
        <Card className="col-span-1 lg:col-span-2" glassEffect>
          <h3 className="text-lg font-semibold mb-4">
            Cost Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Capital Cost</p>
              <p className="text-xl font-bold mt-1">
                ${capitalCost.toLocaleString()}
                <span className="text-sm font-normal ml-1">/kW</span>
              </p>
            </div>
            
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Levelized Cost</p>
              <p className="text-xl font-bold mt-1">
                ${calculateLevelizedCost().toFixed(2)}
                <span className="text-sm font-normal ml-1">/MWh</span>
              </p>
            </div>
            
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Construction Time</p>
              <p className="text-xl font-bold mt-1">
                {constructionTime}
                <span className="text-sm font-normal ml-1">years</span>
              </p>
            </div>
          </div>
        </Card>
        
        {/* Report Section */}
        <Card className="col-span-1 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FileText className="w-5 h-5 mr-2 text-nuclear-600" />
              Detailed Cost Analysis
            </h3>
            <div className="flex items-center gap-2">
              <Button 
                onClick={handleGenerateReport}
                className="flex items-center gap-2 bg-nuclear-600 hover:bg-nuclear-700 text-white"
              >
                <FileBarChart2 className="w-4 h-4" />
                Generate Detailed Report
              </Button>
              <Button 
                onClick={handleExport}
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
          
          {generatedReport && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-bold mb-3">{reactorType} Cost Analysis Report</h4>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Capital cost: ${capitalCost.toLocaleString()} per kW</li>
                  <li>Total project cost: ${(capitalCost * capacity * 1000).toLocaleString()}</li>
                  <li>Construction time: {constructionTime} years</li>
                  <li>Fuel cost: ${fuelCost.toLocaleString()} per MWh</li>
                  <li>O&M cost: ${omCost.toLocaleString()} per MWh</li>
                  <li>Levelized cost: ${calculateLevelizedCost().toFixed(2)} per MWh</li>
                  <li>Carbon intensity: {carbonIntensity} g CO₂/kWh</li>
                  <li>Annual electricity generation: {(capacity * 1000 * capacityFactor * 8760).toLocaleString()} MWh</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 italic">
                Footnote: This platform is intended solely for simulations and analytical purposes. It does not offer or constitute financial, investment, trading, or professional advice of any kind.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CostCalculator;
