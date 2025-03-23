
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Calendar, 
  DollarSign,
  Atom,
  Pickaxe,
  GitBranch
} from 'lucide-react';
import Card from './ui/Card';
import AnimatedNumber from './ui/AnimatedNumber';
import LineChart from './charts/LineChart';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState<'1m' | '6m' | '1y' | 'all'>('6m');
  
  // Mock data for uranium price
  const uraniumPriceData = [
    { date: 'Jan', price: 48.5, demand: 180 },
    { date: 'Feb', price: 49.8, demand: 185 },
    { date: 'Mar', price: 53.2, demand: 190 },
    { date: 'Apr', price: 57.6, demand: 195 },
    { date: 'May', price: 59.3, demand: 200 },
    { date: 'Jun', price: 63.8, demand: 210 },
    { date: 'Jul', price: 68.2, demand: 215 },
    { date: 'Aug', price: 70.5, demand: 220 },
    { date: 'Sep', price: 74.9, demand: 225 },
    { date: 'Oct', price: 79.3, demand: 230 },
    { date: 'Nov', price: 82.7, demand: 235 },
    { date: 'Dec', price: 86.4, demand: 240 },
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
            Nuclear Supply Chain & Commodities
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Monitor, analyze, and simulate the nuclear materials supply chain
          </p>
        </div>
        
        <div className="flex gap-2">
          {(['1m', '6m', '1y', 'all'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeframe === period
                  ? 'bg-nuclear-100 text-nuclear-800 dark:bg-nuclear-800 dark:text-nuclear-100'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="fade-in-element" animation="fade">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Uranium Spot Price
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                $<AnimatedNumber 
                  value={86.4} 
                  formatFn={(val) => val.toFixed(2)} 
                  className="mr-1"
                />
                <span className="text-lg">/lb</span>
              </h3>
              <p className="flex items-center text-energy-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+4.5%</span>
              </p>
            </div>
            <div className="bg-nuclear-50 dark:bg-nuclear-900/50 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-nuclear-500" />
            </div>
          </div>
        </Card>
        
        <Card className="fade-in-element" animation="fade" style={{ animationDelay: '100ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Enrichment Capacity
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                <AnimatedNumber 
                  value={63.1} 
                  formatFn={(val) => val.toFixed(1)} 
                  className="mr-1"
                />
                <span className="text-lg">M SWU</span>
              </h3>
              <p className="flex items-center text-energy-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.3%</span>
              </p>
            </div>
            <div className="bg-atom-50 dark:bg-atom-900/50 p-3 rounded-lg">
              <Atom className="w-6 h-6 text-atom-500" />
            </div>
          </div>
        </Card>
        
        <Card className="fade-in-element" animation="fade" style={{ animationDelay: '200ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Reactor Construction
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                <AnimatedNumber 
                  value={58} 
                  formatFn={(val) => Math.round(val)} 
                  className="mr-1"
                />
                <span className="text-lg">Units</span>
              </h3>
              <p className="flex items-center text-energy-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+15.2%</span>
              </p>
            </div>
            <div className="bg-energy-50 dark:bg-energy-900/50 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-energy-500" />
            </div>
          </div>
        </Card>
        
        <Card className="fade-in-element" animation="fade" style={{ animationDelay: '300ms' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Market Size
              </p>
              <h3 className="text-2xl font-bold mt-1 flex items-center">
                <span className="text-lg">$</span>
                <AnimatedNumber 
                  value={14.2} 
                  formatFn={(val) => val.toFixed(1)} 
                  className="mr-1"
                />
                <span className="text-lg">B</span>
              </h3>
              <p className="flex items-center text-energy-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+8.7%</span>
              </p>
            </div>
            <div className="bg-nuclear-50 dark:bg-nuclear-900/50 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-nuclear-500" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Chart */}
        <Card className="lg:col-span-2" glassEffect animation="slide">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100">
              Uranium Price Trend ($/lb U₃O₈)
            </h3>
            <Link to="/commodities" className="text-sm text-nuclear-600 hover:text-nuclear-700 dark:text-nuclear-400 dark:hover:text-nuclear-300 flex items-center">
              View detailed analysis
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          <div className="h-[300px]">
            <LineChart 
              data={uraniumPriceData}
              lines={[
                { dataKey: 'price', color: '#4C7DAC', name: 'Price ($/lb)' },
                { dataKey: 'demand', color: '#24A08D', name: 'Demand (k/lbs)' }
              ]}
            />
          </div>
        </Card>
        
        {/* Features section */}
        <Card animation="slide" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100 mb-4">
            Mining & Enrichment Simulator
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Simulate mining operations for uranium, zirconium, hafnium, and other critical materials. 
            Model full enrichment processes from yellowcake to HALEU.
          </p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-nuclear-100 dark:bg-nuclear-900 rounded-full">
                <Pickaxe className="w-5 h-5 text-nuclear-600 dark:text-nuclear-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Active Simulations</p>
                <p className="text-2xl font-bold text-nuclear-900 dark:text-nuclear-100">3</p>
              </div>
            </div>
            <Link 
              to="/mining" 
              className="px-4 py-2 bg-nuclear-600 text-white rounded-lg hover:bg-nuclear-700 transition-colors"
            >
              Launch Simulator
            </Link>
          </div>
        </Card>
        
        <Card animation="slide" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100 mb-4">
            Supply Chain Visualizer
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Visualize the global movement of nuclear materials and components with interactive maps and Sankey diagrams.
          </p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-atom-100 dark:bg-atom-900 rounded-full">
                <GitBranch className="w-5 h-5 text-atom-600 dark:text-atom-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Supply Routes</p>
                <p className="text-2xl font-bold text-nuclear-900 dark:text-nuclear-100">24</p>
              </div>
            </div>
            <Link 
              to="/supply-chain" 
              className="px-4 py-2 bg-atom-600 text-white rounded-lg hover:bg-atom-700 transition-colors"
            >
              View Supply Chain
            </Link>
          </div>
        </Card>
      </div>
      
      {/* Component sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card animation="slide" style={{ animationDelay: '300ms' }}>
          <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100 mb-3">
            <Link to="/commodities" className="flex items-center justify-between hover:text-nuclear-600 transition-colors">
              Commodities Price Dashboard
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Monitor prices of uranium, zirconium, hafnium, and other nuclear materials with historical data and forecasts.
          </p>
          <div className="flex flex-col space-y-3 mt-4">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">Uranium (U₃O₈)</span>
              <span className="font-semibold flex items-center">
                $86.40
                <TrendingUp className="ml-1 w-4 h-4 text-green-500" />
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">Zirconium</span>
              <span className="font-semibold flex items-center">
                $32.15
                <TrendingUp className="ml-1 w-4 h-4 text-green-500" />
              </span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">Hafnium</span>
              <span className="font-semibold flex items-center">
                $1,450
                <TrendingDown className="ml-1 w-4 h-4 text-red-500" />
              </span>
            </div>
          </div>
        </Card>
        
        <Card animation="slide" style={{ animationDelay: '400ms' }}>
          <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100 mb-3">
            <Link to="/calculator" className="flex items-center justify-between hover:text-nuclear-600 transition-colors">
              Cost & Timeline Calculator
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
            Calculate costs and timelines for nuclear projects, from fuel procurement to reactor construction.
          </p>
          <div className="flex flex-col space-y-3 mt-4">
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">SMR Construction</span>
              <span className="font-semibold">4-6 years</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">HALEU Production</span>
              <span className="font-semibold">18-24 months</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-sm">Fuel Assembly</span>
              <span className="font-semibold">8-12 months</span>
            </div>
          </div>
        </Card>
        
        <Card animation="slide" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100 mb-3">
            Recent Updates
          </h3>
          <div className="space-y-4 mt-3">
            <div className="border-l-2 border-nuclear-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New uranium mining project in Kazakhstan added to database
              </p>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
            <div className="border-l-2 border-nuclear-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Updated enrichment capacities for global facilities
              </p>
              <p className="text-xs text-gray-500 mt-1">1 week ago</p>
            </div>
            <div className="border-l-2 border-nuclear-500 pl-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                New disruption scenario for rare-earth shortages
              </p>
              <p className="text-xs text-gray-500 mt-1">2 weeks ago</p>
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-nuclear-600 hover:text-nuclear-700 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                View all updates
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
