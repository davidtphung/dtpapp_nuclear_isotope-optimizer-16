
import { useState, useEffect, useRef } from 'react';
import { Sliders, Play, RefreshCw, Download, Map, Compass, Clock } from 'lucide-react';
import Card from './ui/Card';
import AnimatedNumber from './ui/AnimatedNumber';
import LineChart from './charts/LineChart';
import { useToast } from './ui/use-toast';

// Define types for our mining simulation
interface MiningParameters {
  depositSize: number;
  concentration: number;
  extractionEfficiency: number;
  laborCost: number;
  processingTechnology: 'basic' | 'advanced' | 'cutting-edge';
  location: 'australia' | 'canada' | 'kazakhstan' | 'namibia' | 'usa';
  material: 'uranium' | 'zirconium' | 'hafnium' | 'lithium' | 'beryllium' | 'graphite';
}

interface SimulationResults {
  productionVolume: number;
  costPerKg: number;
  purity: number;
  carbonImpact: number;
  timestamp: string;
  timeline: { month: string; production: number; cost: number }[];
}

// Location data to show on the map
const locationImages = {
  australia: "https://images.unsplash.com/photo-1523482580063-e0ef081450ea?q=80&w=800&auto=format&fit=crop",
  canada: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
  kazakhstan: "https://images.unsplash.com/photo-1504615458222-979e04d69a27?q=80&w=800&auto=format&fit=crop",
  namibia: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
  usa: "https://images.unsplash.com/photo-1592409765643-c107e9110e17?q=80&w=800&auto=format&fit=crop"
};

const MiningSimulator = () => {
  // Default mining parameters
  const [parameters, setParameters] = useState<MiningParameters>({
    depositSize: 5000,
    concentration: 0.15,
    extractionEfficiency: 0.8,
    laborCost: 50,
    processingTechnology: 'advanced',
    location: 'canada',
    material: 'uranium'
  });
  
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [dataUpdateInterval, setDataUpdateInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const simulationRef = useRef<number>(0);
  
  // Update data in real-time (when commodities market is open)
  useEffect(() => {
    // Function to check if commodities market is open
    const isMarketOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      // Simplified check: Monday-Friday, 9 AM to 5 PM
      return day >= 1 && day <= 5 && hour >= 9 && hour <= 17;
    };
    
    // Function to update data at regular intervals
    const startDataUpdates = () => {
      // Clear existing interval if any
      if (dataUpdateInterval) {
        clearInterval(dataUpdateInterval);
      }
      
      // Set new interval - update every minute when market is open, every hour otherwise
      const intervalTime = isMarketOpen() ? 60 * 1000 : 60 * 60 * 1000;
      const interval = setInterval(() => {
        if (results) {
          // Apply small random fluctuations to simulate real-time market changes
          const fluctuation = 0.95 + (Math.random() * 0.1); // ±5% change
          
          setResults(prev => {
            if (!prev) return null;
            
            return {
              ...prev,
              costPerKg: prev.costPerKg * fluctuation,
              timestamp: new Date().toISOString(),
              timeline: prev.timeline.map((point, i) => {
                // Only update the most recent data points
                if (i > prev.timeline.length - 3) {
                  return {
                    ...point,
                    cost: point.cost * fluctuation,
                    production: point.production * (1 + (Math.random() * 0.04 - 0.02)) // ±2% change in production
                  };
                }
                return point;
              })
            };
          });
          
          // Show notification if market is open
          if (isMarketOpen()) {
            toast({
              title: "Data Updated",
              description: `Real-time data updated at ${new Date().toLocaleTimeString()}`,
              duration: 3000,
            });
          }
        }
      }, intervalTime);
      
      setDataUpdateInterval(interval);
    };
    
    // Start data updates when component mounts
    startDataUpdates();
    
    // Cleanup on unmount
    return () => {
      if (dataUpdateInterval) {
        clearInterval(dataUpdateInterval);
      }
    };
  }, [results, toast]);
  
  // Run the simulation when parameters change or on manual trigger
  const runSimulation = () => {
    setIsSimulating(true);
    
    // Increment simulation ID to track the current simulation
    simulationRef.current += 1;
    const currentSimulation = simulationRef.current;
    
    // Simulate a delay for processing
    setTimeout(() => {
      // Skip if another simulation was started
      if (currentSimulation !== simulationRef.current) return;
      
      // This is a simplified simulation model
      const efficiency = 
        parameters.processingTechnology === 'basic' ? 0.7 :
        parameters.processingTechnology === 'advanced' ? 0.85 : 0.95;
        
      const locationFactor = 
        parameters.location === 'australia' ? 1.1 :
        parameters.location === 'canada' ? 1.0 :
        parameters.location === 'kazakhstan' ? 0.8 :
        parameters.location === 'namibia' ? 0.75 : 1.2; // USA
        
      const materialFactor = 
        parameters.material === 'uranium' ? 1.0 :
        parameters.material === 'zirconium' ? 1.2 :
        parameters.material === 'hafnium' ? 2.5 :
        parameters.material === 'lithium' ? 1.8 :
        parameters.material === 'beryllium' ? 3.0 : 0.7; // Graphite
      
      // Calculate production volume
      const productionVolume = parameters.depositSize * 
        parameters.concentration * 
        parameters.extractionEfficiency * 
        efficiency;
      
      // Calculate cost per kg
      const costPerKg = (parameters.laborCost * locationFactor * materialFactor) / 
        (parameters.concentration * efficiency);
      
      // Calculate purity percentage
      const purity = (parameters.concentration * efficiency * 0.98) * 100;
      
      // Calculate carbon impact (tons CO2)
      const carbonImpact = productionVolume * 
        (parameters.processingTechnology === 'basic' ? 0.15 :
        parameters.processingTechnology === 'advanced' ? 0.08 : 0.04);
      
      // Generate timeline data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const timeline = months.map((month, i) => {
        // Add some variation to make the chart interesting
        const randomFactor = 0.85 + (Math.random() * 0.3);
        const monthlyProduction = (productionVolume / 12) * randomFactor;
        const monthlyCost = (costPerKg * monthlyProduction) * randomFactor;
        
        return {
          month,
          production: monthlyProduction,
          cost: monthlyCost / 1000 // Convert to thousands for better display
        };
      });
      
      setResults({
        productionVolume,
        costPerKg,
        purity,
        carbonImpact,
        timestamp: new Date().toISOString(),
        timeline
      });
      
      toast({
        title: "Simulation Complete",
        description: `New simulation results for ${parameters.material} mining in ${parameters.location}`,
        duration: 3000,
      });
      
      setIsSimulating(false);
    }, 1500);
  };
  
  // Run initial simulation on mount
  useEffect(() => {
    runSimulation();
  }, []);
  
  // Handle parameter changes
  const handleParameterChange = (
    param: keyof MiningParameters, 
    value: number | string
  ) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
          Mining Simulator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Simulate mining operations for nuclear materials with detailed parameters
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parameters Panel */}
        <Card className="lg:row-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-nuclear-600" />
              Simulation Parameters
            </h3>
            <button 
              onClick={() => runSimulation()}
              disabled={isSimulating}
              className="p-2 rounded-full bg-nuclear-100 text-nuclear-800 dark:bg-nuclear-800 dark:text-nuclear-100 hover:bg-nuclear-200 dark:hover:bg-nuclear-700 transition-colors"
            >
              {isSimulating ? 
                <RefreshCw className="w-5 h-5 animate-spin" /> : 
                <Play className="w-5 h-5" />
              }
            </button>
          </div>
          
          <div className="space-y-5">
            {/* Material Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Material
              </label>
              <select
                value={parameters.material}
                onChange={(e) => handleParameterChange('material', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-nuclear-500 focus:border-nuclear-500"
              >
                <option value="uranium">Uranium (U₃O₈)</option>
                <option value="zirconium">Zirconium</option>
                <option value="hafnium">Hafnium</option>
                <option value="lithium">Lithium-7</option>
                <option value="beryllium">Beryllium</option>
                <option value="graphite">Graphite</option>
              </select>
            </div>
            
            {/* Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mining Location
              </label>
              <select
                value={parameters.location}
                onChange={(e) => handleParameterChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-nuclear-500 focus:border-nuclear-500"
              >
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="kazakhstan">Kazakhstan</option>
                <option value="namibia">Namibia</option>
                <option value="usa">USA</option>
              </select>
            </div>
            
            {/* Processing Technology */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Processing Technology
              </label>
              <select
                value={parameters.processingTechnology}
                onChange={(e) => handleParameterChange('processingTechnology', e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-nuclear-500 focus:border-nuclear-500"
              >
                <option value="basic">Basic (Lower cost, lower efficiency)</option>
                <option value="advanced">Advanced (Balanced)</option>
                <option value="cutting-edge">Cutting-Edge (Higher cost, higher efficiency)</option>
              </select>
            </div>
            
            {/* Deposit Size */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Deposit Size (tons)
                </label>
                <span className="text-sm text-gray-500">
                  {parameters.depositSize.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={20000}
                step={500}
                value={parameters.depositSize}
                onChange={(e) => handleParameterChange('depositSize', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1,000</span>
                <span>20,000</span>
              </div>
            </div>
            
            {/* Ore Concentration */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ore Concentration
                </label>
                <span className="text-sm text-gray-500">
                  {(parameters.concentration * 100).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.5}
                step={0.01}
                value={parameters.concentration}
                onChange={(e) => handleParameterChange('concentration', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>50%</span>
              </div>
            </div>
            
            {/* Extraction Efficiency */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Extraction Efficiency
                </label>
                <span className="text-sm text-gray-500">
                  {(parameters.extractionEfficiency * 100).toFixed(0)}%
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={0.95}
                step={0.05}
                value={parameters.extractionEfficiency}
                onChange={(e) => handleParameterChange('extractionEfficiency', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>
            
            {/* Labor Cost */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Labor Cost ($/hour)
                </label>
                <span className="text-sm text-gray-500">
                  ${parameters.laborCost.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={parameters.laborCost}
                onChange={(e) => handleParameterChange('laborCost', Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$20</span>
                <span>$100</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => runSimulation()}
                disabled={isSimulating}
                className="flex-1 px-4 py-2 bg-nuclear-600 text-white rounded-lg hover:bg-nuclear-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </button>
              
              <button
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>
        
        {/* Results Panel */}
        <Card className="col-span-1 lg:col-span-2" glassEffect>
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-between">
            <span>
              Simulation Results for {parameters.material.charAt(0).toUpperCase() + parameters.material.slice(1)}
              {isSimulating && (
                <span className="ml-2 text-sm text-nuclear-600 animate-pulse">
                  Calculating...
                </span>
              )}
            </span>
            
            {results && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>
                  {results.timestamp 
                    ? `Last update: ${new Date(results.timestamp).toLocaleTimeString()}`
                    : 'Data updated in real-time'
                  }
                </span>
              </div>
            )}
          </h3>
          
          {results && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Production Volume</p>
                <p className="text-xl font-bold mt-1">
                  <AnimatedNumber value={results.productionVolume} formatFn={(val) => val.toFixed(0)} />
                  <span className="text-sm font-normal ml-1">kg</span>
                </p>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Cost per kg</p>
                <p className="text-xl font-bold mt-1">
                  $<AnimatedNumber value={results.costPerKg} formatFn={(val) => val.toFixed(2)} />
                </p>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Purity</p>
                <p className="text-xl font-bold mt-1">
                  <AnimatedNumber value={results.purity} formatFn={(val) => val.toFixed(1)} />%
                </p>
              </div>
              
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Carbon Impact</p>
                <p className="text-xl font-bold mt-1">
                  <AnimatedNumber value={results.carbonImpact} formatFn={(val) => val.toFixed(1)} />
                  <span className="text-sm font-normal ml-1">tons CO₂</span>
                </p>
              </div>
            </div>
          )}
          
          {results && (
            <div className="h-[300px]">
              <LineChart 
                data={results.timeline}
                lines={[
                  { dataKey: 'production', color: '#FF7D00', name: 'Production (kg)' },
                  { dataKey: 'cost', color: '#00C8FF', name: 'Cost ($000s)' }
                ]}
                xAxisDataKey="month"
              />
            </div>
          )}
        </Card>
        
        {/* Location Info */}
        <Card className="col-span-1 lg:col-span-2" animation="slide">
          <div className="flex items-center mb-4">
            <Map className="w-5 h-5 mr-2 text-nuclear-600" />
            <h3 className="text-lg font-semibold">
              Mining Location: {parameters.location.charAt(0).toUpperCase() + parameters.location.slice(1)}
            </h3>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-3">
                {locationImages[parameters.location] ? (
                  <img 
                    src={locationImages[parameters.location]} 
                    alt={`Mining operations in ${parameters.location}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Compass className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Geopolitical Risk</span>
                  <span className="text-sm font-medium">
                    {parameters.location === 'usa' || parameters.location === 'canada' ? 'Low' : 
                     parameters.location === 'australia' ? 'Very Low' : 
                     parameters.location === 'kazakhstan' ? 'Moderate' : 'Low-Moderate'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Infrastructure</span>
                  <span className="text-sm font-medium">
                    {parameters.location === 'usa' || parameters.location === 'canada' || parameters.location === 'australia' ? 'Excellent' : 
                     parameters.location === 'kazakhstan' ? 'Good' : 'Moderate'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Resource Quality</span>
                  <span className="text-sm font-medium">
                    {parameters.location === 'canada' ? 'Excellent' : 
                     parameters.location === 'australia' || parameters.location === 'kazakhstan' ? 'Very Good' : 
                     parameters.location === 'namibia' ? 'Good' : 'Good'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Regulatory Environment</span>
                  <span className="text-sm font-medium">
                    {parameters.location === 'usa' || parameters.location === 'canada' || parameters.location === 'australia' ? 'Strict' : 
                     parameters.location === 'kazakhstan' ? 'Moderate' : 'Moderate-Strict'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-medium mb-2">Location Notes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {parameters.location === 'canada' ? 
                  "Canada is home to some of the highest-grade uranium deposits in the world, particularly in Saskatchewan's Athabasca Basin. Strong infrastructure and political stability make it a premier mining location, though with higher labor costs and strict environmental regulations." : 
                parameters.location === 'australia' ? 
                  "Australia holds approximately 28% of the world's uranium reserves. Olympic Dam in South Australia is one of the world's largest uranium deposits. Australia has a stable regulatory environment but relatively high operating costs." :
                parameters.location === 'kazakhstan' ? 
                  "Kazakhstan is the world's largest uranium producer, using in-situ leach mining. It offers lower production costs, though with higher geopolitical considerations. The country has been increasing its role in nuclear fuel supply chains." :
                parameters.location === 'namibia' ? 
                  "Namibia is home to significant uranium resources, including the Rössing and Husab mines. It offers moderate operational costs with a stable mining regulatory framework. The country continues to develop its uranium industry with international partnerships." :
                  "The United States has substantial uranium reserves, particularly in Wyoming, Texas, and New Mexico. Higher operational costs are offset by excellent infrastructure and a stable regulatory environment, though permitting can be time-consuming."}
              </p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Top Producers in {parameters.location.charAt(0).toUpperCase() + parameters.location.slice(1)}</h4>
                <ul className="text-sm list-disc list-inside text-gray-600 dark:text-gray-300">
                  {parameters.location === 'canada' ? (
                    <>
                      <li>Cameco Corporation (McArthur River, Cigar Lake)</li>
                      <li>Orano Canada (McClean Lake)</li>
                      <li>Denison Mines</li>
                    </>
                  ) : parameters.location === 'australia' ? (
                    <>
                      <li>BHP (Olympic Dam)</li>
                      <li>Rio Tinto (Ranger - now in rehabilitation)</li>
                      <li>Boss Energy (Honeymoon)</li>
                    </>
                  ) : parameters.location === 'kazakhstan' ? (
                    <>
                      <li>Kazatomprom</li>
                      <li>Uranium One</li>
                      <li>Cameco-Kazatomprom JV</li>
                    </>
                  ) : parameters.location === 'namibia' ? (
                    <>
                      <li>China National Nuclear Corporation (Husab)</li>
                      <li>Rio Tinto (Rössing)</li>
                      <li>Paladin Energy (Langer Heinrich)</li>
                    </>
                  ) : (
                    <>
                      <li>Cameco (Smith Ranch-Highland)</li>
                      <li>Energy Fuels</li>
                      <li>Ur-Energy (Lost Creek)</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 italic">
              Footnote: This platform is intended solely for simulations and analytical purposes. It does not offer or constitute financial, investment, trading, or professional advice of any kind.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MiningSimulator;
