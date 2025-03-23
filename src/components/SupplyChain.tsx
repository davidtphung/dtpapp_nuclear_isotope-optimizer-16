
import { useState } from 'react';
import { 
  MapPin, 
  GitBranch, 
  Filter, 
  Eye, 
  EyeOff, 
  Ship, 
  Truck, 
  ArrowRight,
  Pickaxe,
  Atom,
  Activity
} from 'lucide-react';
import Card from './ui/Card';
import FlowChart from './charts/FlowChart';

interface RegionFilter {
  usa: boolean;
  canada: boolean;
  eu: boolean;
  russia: boolean;
  china: boolean;
  other: boolean;
}

interface MaterialFilter {
  uranium: boolean;
  zirconium: boolean;
  hafnium: boolean;
  components: boolean;
}

const SupplyChain = () => {
  const [regionFilters, setRegionFilters] = useState<RegionFilter>({
    usa: true,
    canada: true,
    eu: true,
    russia: true,
    china: true,
    other: true
  });
  
  const [materialFilters, setMaterialFilters] = useState<MaterialFilter>({
    uranium: true,
    zirconium: true,
    hafnium: true,
    components: true
  });
  
  const [showLegend, setShowLegend] = useState(true);
  
  // Mock data for Sankey diagram
  const sankeyData = {
    nodes: [
      { name: 'Canada Mining' },      // 0
      { name: 'Australia Mining' },   // 1
      { name: 'Kazakhstan Mining' },  // 2
      { name: 'USA Mining' },         // 3
      { name: 'Namibia Mining' },     // 4
      { name: 'Russia Mining' },      // 5
      { name: 'USA Conversion' },     // 6
      { name: 'Canada Conversion' },  // 7
      { name: 'France Conversion' },  // 8
      { name: 'Russia Conversion' },  // 9
      { name: 'USA Enrichment' },     // 10
      { name: 'EU Enrichment' },      // 11
      { name: 'Russia Enrichment' },  // 12
      { name: 'China Enrichment' },   // 13
      { name: 'Fuel Fabrication' },   // 14
      { name: 'SMR Reactors' },       // 15
      { name: 'Large Reactors' },     // 16
      { name: 'Research Reactors' }   // 17
    ],
    links: [
      // Mining to Conversion
      { source: 0, target: 6, value: 150 },
      { source: 0, target: 7, value: 250 },
      { source: 1, target: 6, value: 120 },
      { source: 1, target: 8, value: 180 },
      { source: 2, target: 8, value: 120 },
      { source: 2, target: 9, value: 280 },
      { source: 3, target: 6, value: 130 },
      { source: 4, target: 8, value: 110 },
      { source: 5, target: 9, value: 320 },
      
      // Conversion to Enrichment
      { source: 6, target: 10, value: 350 },
      { source: 7, target: 10, value: 150 },
      { source: 7, target: 11, value: 100 },
      { source: 8, target: 11, value: 380 },
      { source: 9, target: 12, value: 350 },
      { source: 9, target: 13, value: 250 },
      
      // Enrichment to Fuel Fabrication
      { source: 10, target: 14, value: 450 },
      { source: 11, target: 14, value: 400 },
      { source: 12, target: 14, value: 280 },
      { source: 13, target: 14, value: 200 },
      
      // Fuel Fabrication to Reactors
      { source: 14, target: 15, value: 400 },
      { source: 14, target: 16, value: 700 },
      { source: 14, target: 17, value: 230 }
    ]
  };
  
  // Filter the data based on user selections
  const getFilteredData = () => {
    // Clone the original data to avoid mutation
    const filteredNodes = [...sankeyData.nodes];
    let filteredLinks = [...sankeyData.links];
    
    const nodesToRemove: number[] = [];
    
    // Handle region filters
    if (!regionFilters.usa) {
      nodesToRemove.push(3, 6, 10);
    }
    if (!regionFilters.canada) {
      nodesToRemove.push(0, 7);
    }
    if (!regionFilters.eu) {
      nodesToRemove.push(8, 11);
    }
    if (!regionFilters.russia) {
      nodesToRemove.push(5, 9, 12);
    }
    if (!regionFilters.china) {
      nodesToRemove.push(13);
    }
    if (!regionFilters.other) {
      nodesToRemove.push(1, 2, 4);
    }
    
    // Filter links based on removed nodes
    filteredLinks = filteredLinks.filter(link => 
      !nodesToRemove.includes(link.source as number) && 
      !nodesToRemove.includes(link.target as number)
    );
    
    // This is a simplified approach - in a real application, 
    // you would need to renumber the indices in the filtered data
    
    return {
      nodes: filteredNodes,
      links: filteredLinks
    };
  };
  
  const toggleRegionFilter = (region: keyof RegionFilter) => {
    setRegionFilters(prev => ({
      ...prev,
      [region]: !prev[region]
    }));
  };
  
  const toggleMaterialFilter = (material: keyof MaterialFilter) => {
    setMaterialFilters(prev => ({
      ...prev,
      [material]: !prev[material]
    }));
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
          Supply Chain Visualizer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Visualize the global flow of nuclear materials and components
        </p>
      </div>
      
      {/* Control Panel */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-nuclear-600" />
              Regions
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(regionFilters).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleRegionFilter(key as keyof RegionFilter)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    value
                      ? 'bg-nuclear-100 text-nuclear-800 dark:bg-nuclear-800 dark:text-nuclear-100'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Filter className="w-4 h-4 mr-1 text-nuclear-600" />
              Materials
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(materialFilters).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleMaterialFilter(key as keyof MaterialFilter)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    value
                      ? 'bg-atom-100 text-atom-800 dark:bg-atom-800 dark:text-atom-100'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="ml-auto">
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="px-3 py-1.5 text-sm rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
            >
              {showLegend ? (
                <>
                  <EyeOff className="w-4 h-4 mr-1" />
                  Hide Legend
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Show Legend
                </>
              )}
            </button>
          </div>
        </div>
      </Card>
      
      {/* Main Visualization */}
      <Card className="p-6" glassEffect>
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <GitBranch className="w-5 h-5 mr-2 text-nuclear-600" />
          Nuclear Material Flow
        </h3>
        
        <div className="h-[500px]">
          <FlowChart data={getFilteredData()} height={500} />
        </div>
        
        {showLegend && (
          <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="text-sm font-semibold mb-3">Supply Chain Legend</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Mining & Extraction</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-nuclear-600 rounded-full mr-2"></div>
                    <span>Uranium Mining</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-nuclear-700 rounded-full mr-2"></div>
                    <span>Processing Plants</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Conversion & Enrichment</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-atom-600 rounded-full mr-2"></div>
                    <span>Conversion Facilities</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-atom-700 rounded-full mr-2"></div>
                    <span>Enrichment Plants</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Fabrication & Deployment</h5>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-energy-600 rounded-full mr-2"></div>
                    <span>Fuel Fabrication</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-energy-700 rounded-full mr-2"></div>
                    <span>Reactor Applications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      
      {/* Supply Chain Phases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="slide-up-element" animation="slide">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full mr-3">
              <Pickaxe className="w-5 h-5 text-nuclear-600 dark:text-nuclear-400" />
            </div>
            <h3 className="text-lg font-semibold">Mining & Extraction</h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            The process begins with mining uranium ore from deposits around the world, followed by milling to produce uranium concentrate (U₃O₈), commonly known as yellowcake.
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Top Producer</span>
              <span className="font-medium">Kazakhstan (41%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Annual Production</span>
              <span className="font-medium">48,300 tonnes U</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Common Method</span>
              <span className="font-medium">In-Situ Leach (ISL)</span>
            </div>
          </div>
        </Card>
        
        <Card className="slide-up-element" animation="slide" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 bg-atom-100 dark:bg-atom-900/50 rounded-full mr-3">
              <Atom className="w-5 h-5 text-atom-600 dark:text-atom-400" />
            </div>
            <h3 className="text-lg font-semibold">Conversion & Enrichment</h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Yellowcake is converted to uranium hexafluoride (UF₆) for enrichment. Centrifuges increase the concentration of U-235 from natural levels (0.7%) to 3-5% for reactor fuel.
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Major Converters</span>
              <span className="font-medium">Cameco, Orano, Rosatom</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Enrichment Capacity</span>
              <span className="font-medium">63.1M SWU/year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">HALEU Requirement</span>
              <span className="font-medium">10-19.75% U-235</span>
            </div>
          </div>
        </Card>
        
        <Card className="slide-up-element" animation="slide" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center mb-4">
            <div className="p-2 bg-energy-100 dark:bg-energy-900/50 rounded-full mr-3">
              <Activity className="w-5 h-5 text-energy-600 dark:text-energy-400" />
            </div>
            <h3 className="text-lg font-semibold">Fabrication & Deployment</h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Enriched UF₆ is converted to uranium dioxide powder, pressed into pellets, and assembled into fuel rods and assemblies. These assemblies are then loaded into reactors for electricity generation.
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Major Fabricators</span>
              <span className="font-medium">Westinghouse, TVEL, Framatome</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Reactor Types</span>
              <span className="font-medium">PWR, BWR, VVER, SMR</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Refueling Cycle</span>
              <span className="font-medium">18-24 months</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Key Shipping Routes */}
      <Card className="p-6" animation="slide">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Ship className="w-5 h-5 mr-2 text-nuclear-600" />
          Key Shipping Routes
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="w-full md:w-1/4">
              <p className="text-sm font-medium">Kazakhstan to Europe</p>
              <p className="text-xs text-gray-500">Uranium Yellowcake</p>
            </div>
            <div className="w-full md:w-2/4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Truck className="w-4 h-4 mr-2 text-gray-500" />
              <span>Kazakhstan</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <Ship className="w-4 h-4 mr-2 text-gray-500" />
              <span>St. Petersburg, Russia</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <span>EU Conversion Facilities</span>
            </div>
            <div className="w-full md:w-1/4 text-right">
              <p className="text-sm font-medium">3-4 weeks</p>
              <p className="text-xs text-gray-500">Transit Time</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="w-full md:w-1/4">
              <p className="text-sm font-medium">Canada to USA</p>
              <p className="text-xs text-gray-500">Uranium Concentrate</p>
            </div>
            <div className="w-full md:w-2/4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Truck className="w-4 h-4 mr-2 text-gray-500" />
              <span>Saskatchewan, Canada</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <span>Illinois, USA</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <span>Conversion Facilities</span>
            </div>
            <div className="w-full md:w-1/4 text-right">
              <p className="text-sm font-medium">1-2 weeks</p>
              <p className="text-xs text-gray-500">Transit Time</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <div className="w-full md:w-1/4">
              <p className="text-sm font-medium">Enrichment to Fabrication</p>
              <p className="text-xs text-gray-500">Enriched UF₆</p>
            </div>
            <div className="w-full md:w-2/4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Truck className="w-4 h-4 mr-2 text-gray-500" />
              <span>Enrichment Plants</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <span>Specialized Transport</span>
              <ArrowRight className="mx-2 w-3 h-3" />
              <span>Fuel Fabrication Facilities</span>
            </div>
            <div className="w-full md:w-1/4 text-right">
              <p className="text-sm font-medium">2-3 weeks</p>
              <p className="text-xs text-gray-500">Transit Time</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SupplyChain;
