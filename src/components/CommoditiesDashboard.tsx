
import { useState } from 'react';
import { BarChart3, Calendar, TrendingUp, TrendingDown, Clock, DollarSign, Info, Download, Bell, Filter } from 'lucide-react';
import Card from './ui/Card';
import AnimatedNumber from './ui/AnimatedNumber';
import LineChart from './charts/LineChart';

interface CommodityData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  lastUpdated: string;
  data: {
    date: string;
    price: number;
    volume?: number;
  }[];
}

const CommoditiesDashboard = () => {
  const [timeframe, setTimeframe] = useState<'1m' | '6m' | '1y' | '5y' | 'all'>('1y');
  const [selectedCommodity, setSelectedCommodity] = useState<string>('uranium');
  
  // Mock commodities data
  const commodities: CommodityData[] = [
    {
      id: 'uranium',
      name: 'Uranium',
      symbol: 'U₃O₈',
      price: 86.40,
      unit: 'lb',
      change: 4.5,
      trend: 'up',
      lastUpdated: '2 hours ago',
      data: [
        { date: 'Jan', price: 48.5, volume: 120 },
        { date: 'Feb', price: 49.8, volume: 135 },
        { date: 'Mar', price: 53.2, volume: 145 },
        { date: 'Apr', price: 57.6, volume: 160 },
        { date: 'May', price: 59.3, volume: 175 },
        { date: 'Jun', price: 63.8, volume: 190 },
        { date: 'Jul', price: 68.2, volume: 205 },
        { date: 'Aug', price: 70.5, volume: 215 },
        { date: 'Sep', price: 74.9, volume: 230 },
        { date: 'Oct', price: 79.3, volume: 245 },
        { date: 'Nov', price: 82.7, volume: 255 },
        { date: 'Dec', price: 86.4, volume: 275 }
      ]
    },
    {
      id: 'zirconium',
      name: 'Zirconium',
      symbol: 'Zr',
      price: 32.15,
      unit: 'kg',
      change: 2.2,
      trend: 'up',
      lastUpdated: '3 hours ago',
      data: [
        { date: 'Jan', price: 27.8, volume: 95 },
        { date: 'Feb', price: 28.1, volume: 100 },
        { date: 'Mar', price: 28.5, volume: 105 },
        { date: 'Apr', price: 29.2, volume: 110 },
        { date: 'May', price: 29.8, volume: 115 },
        { date: 'Jun', price: 30.2, volume: 120 },
        { date: 'Jul', price: 30.5, volume: 125 },
        { date: 'Aug', price: 30.9, volume: 130 },
        { date: 'Sep', price: 31.3, volume: 135 },
        { date: 'Oct', price: 31.6, volume: 140 },
        { date: 'Nov', price: 31.9, volume: 145 },
        { date: 'Dec', price: 32.15, volume: 150 }
      ]
    },
    {
      id: 'hafnium',
      name: 'Hafnium',
      symbol: 'Hf',
      price: 1450.00,
      unit: 'kg',
      change: -2.1,
      trend: 'down',
      lastUpdated: '5 hours ago',
      data: [
        { date: 'Jan', price: 1520, volume: 45 },
        { date: 'Feb', price: 1515, volume: 48 },
        { date: 'Mar', price: 1510, volume: 50 },
        { date: 'Apr', price: 1505, volume: 53 },
        { date: 'May', price: 1500, volume: 55 },
        { date: 'Jun', price: 1495, volume: 58 },
        { date: 'Jul', price: 1490, volume: 60 },
        { date: 'Aug', price: 1485, volume: 63 },
        { date: 'Sep', price: 1480, volume: 65 },
        { date: 'Oct', price: 1470, volume: 68 },
        { date: 'Nov', price: 1460, volume: 70 },
        { date: 'Dec', price: 1450, volume: 72 }
      ]
    },
    {
      id: 'lithium7',
      name: 'Lithium-7',
      symbol: '⁷Li',
      price: 12500.00,
      unit: 'kg',
      change: 5.3,
      trend: 'up',
      lastUpdated: '1 day ago',
      data: [
        { date: 'Jan', price: 10800, volume: 25 },
        { date: 'Feb', price: 11000, volume: 28 },
        { date: 'Mar', price: 11200, volume: 30 },
        { date: 'Apr', price: 11300, volume: 32 },
        { date: 'May', price: 11500, volume: 35 },
        { date: 'Jun', price: 11700, volume: 38 },
        { date: 'Jul', price: 11900, volume: 40 },
        { date: 'Aug', price: 12100, volume: 42 },
        { date: 'Sep', price: 12200, volume: 45 },
        { date: 'Oct', price: 12350, volume: 48 },
        { date: 'Nov', price: 12400, volume: 50 },
        { date: 'Dec', price: 12500, volume: 52 }
      ]
    },
    {
      id: 'beryllium',
      name: 'Beryllium',
      symbol: 'Be',
      price: 850.00,
      unit: 'kg',
      change: 1.8,
      trend: 'up',
      lastUpdated: '2 days ago',
      data: [
        { date: 'Jan', price: 790, volume: 65 },
        { date: 'Feb', price: 795, volume: 68 },
        { date: 'Mar', price: 800, volume: 70 },
        { date: 'Apr', price: 805, volume: 73 },
        { date: 'May', price: 810, volume: 75 },
        { date: 'Jun', price: 815, volume: 78 },
        { date: 'Jul', price: 820, volume: 80 },
        { date: 'Aug', price: 825, volume: 83 },
        { date: 'Sep', price: 830, volume: 85 },
        { date: 'Oct', price: 835, volume: 88 },
        { date: 'Nov', price: 845, volume: 90 },
        { date: 'Dec', price: 850, volume: 92 }
      ]
    },
    {
      id: 'graphite',
      name: 'Nuclear Graphite',
      symbol: 'C',
      price: 24.75,
      unit: 'kg',
      change: 0.5,
      trend: 'up',
      lastUpdated: '3 days ago',
      data: [
        { date: 'Jan', price: 23.2, volume: 150 },
        { date: 'Feb', price: 23.4, volume: 155 },
        { date: 'Mar', price: 23.5, volume: 160 },
        { date: 'Apr', price: 23.7, volume: 165 },
        { date: 'May', price: 23.9, volume: 170 },
        { date: 'Jun', price: 24.0, volume: 175 },
        { date: 'Jul', price: 24.2, volume: 180 },
        { date: 'Aug', price: 24.3, volume: 185 },
        { date: 'Sep', price: 24.5, volume: 190 },
        { date: 'Oct', price: 24.6, volume: 195 },
        { date: 'Nov', price: 24.7, volume: 200 },
        { date: 'Dec', price: 24.75, volume: 205 }
      ]
    }
  ];
  
  // Get the selected commodity data
  const selectedCommodityData = commodities.find(c => c.id === selectedCommodity);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-nuclear-900 dark:text-white">
          Commodities Price Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Monitor, track, and analyze prices of critical nuclear materials
        </p>
      </div>
      
      {/* Commodities Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {commodities.map((commodity, index) => (
          <Card 
            key={commodity.id}
            className={`cursor-pointer transition-all duration-300 ${
              selectedCommodity === commodity.id 
                ? 'ring-2 ring-nuclear-500 dark:ring-nuclear-400' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
            onClick={() => setSelectedCommodity(commodity.id)}
            animation="fade"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500">{commodity.symbol}</span>
                <div 
                  className={`px-2 py-0.5 rounded text-xs font-medium flex items-center ${
                    commodity.trend === 'up' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : commodity.trend === 'down'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {commodity.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : commodity.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : null}
                  {commodity.change > 0 ? '+' : ''}{commodity.change}%
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold">
                  ${commodity.price.toLocaleString(undefined, {
                    minimumFractionDigits: commodity.price < 100 ? 2 : 0,
                    maximumFractionDigits: commodity.price < 100 ? 2 : 0
                  })}
                </h3>
                <p className="text-xs text-gray-500">per {commodity.unit}</p>
              </div>
              
              <div className="mt-2">
                <p className="text-sm font-medium">{commodity.name}</p>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Updated {commodity.lastUpdated}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Main Chart Panel */}
      {selectedCommodityData && (
        <Card className="p-6" glassEffect>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold flex items-center">
                {selectedCommodityData.name} ({selectedCommodityData.symbol})
                <div className="ml-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Info className="w-4 h-4 text-gray-500" />
                </div>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Price history and market trends
              </p>
            </div>
            
            <div className="flex gap-2">
              {(['1m', '6m', '1y', '5y', 'all'] as const).map((period) => (
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Current Price</p>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-nuclear-600 mr-1" />
                <span className="text-2xl font-bold">
                  <AnimatedNumber 
                    value={selectedCommodityData.price} 
                    formatFn={(val) => val.toLocaleString(undefined, {
                      minimumFractionDigits: val < 100 ? 2 : 0,
                      maximumFractionDigits: val < 100 ? 2 : 0
                    })}
                  />
                </span>
                <span className="text-sm ml-1">/{selectedCommodityData.unit}</span>
              </div>
              <div 
                className={`mt-1 text-sm font-medium flex items-center ${
                  selectedCommodityData.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {selectedCommodityData.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {selectedCommodityData.change > 0 ? '+' : ''}{selectedCommodityData.change}% change
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Market Information</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Market Cap</span>
                  <span className="text-sm font-medium">$3.8B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">24h Volume</span>
                  <span className="text-sm font-medium">$42.3M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">YTD Change</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">+78.1%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Price Alerts</p>
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Above $90.00</span>
                    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
                      <Bell className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Below $70.00</span>
                    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
                      <Bell className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
                <button className="mt-2 text-sm text-nuclear-600 hover:text-nuclear-700 dark:text-nuclear-400 dark:hover:text-nuclear-300">
                  + Add new alert
                </button>
              </div>
            </div>
          </div>
          
          <div className="h-[400px]">
            <LineChart 
              data={selectedCommodityData.data}
              lines={[
                { dataKey: 'price', color: '#4C7DAC', name: `Price ($/lb)` },
                { dataKey: 'volume', color: '#24A08D', name: 'Volume' }
              ]}
            />
          </div>
          
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </button>
            
            <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </Card>
      )}
      
      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card animation="slide">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-nuclear-600" />
            Supply vs Demand Overview
          </h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Uranium</span>
                <span className="text-sm font-medium">Deficit</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Supply: 140M lbs</span>
                <span>Demand: 180M lbs</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Zirconium</span>
                <span className="text-sm font-medium">Balanced</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Supply: 85K tons</span>
                <span>Demand: 84K tons</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Hafnium</span>
                <span className="text-sm font-medium">Surplus</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Supply: 70 tons</span>
                <span>Demand: 62 tons</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Lithium-7</span>
                <span className="text-sm font-medium">High Deficit</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Supply: 8 tons</span>
                <span>Demand: 12 tons</span>
              </div>
            </div>
          </div>
        </Card>
        
        <Card animation="slide">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-nuclear-600" />
            Upcoming Events & Announcements
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">World Nuclear Fuel Cycle Conference</span>
                <span className="text-xs bg-nuclear-100 text-nuclear-800 dark:bg-nuclear-800 dark:text-nuclear-100 px-2 py-0.5 rounded">3 weeks</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Annual conference covering the nuclear fuel market, with presentations from major producers and utilities.
              </p>
              <p className="text-xs text-gray-500 mt-1">April 12-14, 2023 • Toronto, Canada</p>
            </div>
            
            <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Cameco Q1 Earnings Call</span>
                <span className="text-xs bg-atom-100 text-atom-800 dark:bg-atom-800 dark:text-atom-100 px-2 py-0.5 rounded">2 weeks</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Quarterly financial results from one of the world's largest uranium producers.
              </p>
              <p className="text-xs text-gray-500 mt-1">April 5, 2023 • Virtual</p>
            </div>
            
            <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">DOE HALEU Availability Program Update</span>
                <span className="text-xs bg-energy-100 text-energy-800 dark:bg-energy-800 dark:text-energy-100 px-2 py-0.5 rounded">Tomorrow</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                U.S. Department of Energy update on the High-Assay Low-Enriched Uranium program to support advanced reactors.
              </p>
              <p className="text-xs text-gray-500 mt-1">March 15, 2023 • Washington, D.C.</p>
            </div>
            
            <div className="p-3 border border-gray-100 dark:border-gray-800 rounded-lg">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">UxC Monthly Uranium Price Report</span>
                <span className="text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 px-2 py-0.5 rounded">6 days</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Release of monthly spot price indicators for uranium and conversion services.
              </p>
              <p className="text-xs text-gray-500 mt-1">March 20, 2023 • Publication</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Market Insights */}
      <Card className="p-6" animation="slide">
        <h3 className="text-lg font-semibold mb-4">Market Insights & Analysis</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Supply Chain Disruptions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Recent sanctions on Russian nuclear fuel exports could impact global uranium supply, particularly for enrichment services where Russia holds ~35% of global capacity.
              </p>
              <p className="text-xs text-gray-500 mt-2">Updated: 2 days ago</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Demand Forecast</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Projected 27% increase in uranium demand by 2030 as new reactors come online in China, India, and the UAE, plus growing interest in SMRs from Western utilities.
              </p>
              <p className="text-xs text-gray-500 mt-2">Updated: 1 week ago</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Price Forecast</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Analysts projecting uranium spot prices to reach $95-105/lb by year end, driven by utility contracting and production discipline from major miners.
              </p>
              <p className="text-xs text-gray-500 mt-2">Updated: 3 days ago</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Long-term Outlook (2023-2030)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  The global nuclear fuel market is entering a structural supply deficit period, with demand expected to outpace current production capacity for at least the next 5-7 years. Key factors include:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                  <li>Mine closures during 2016-2020 price depression</li>
                  <li>Limited investment in new production</li>
                  <li>Growing reactor fleet, especially in China</li>
                  <li>Strategic inventory building by utilities</li>
                  <li>Emerging demand for HALEU for advanced reactors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Critical materials beyond uranium are also facing challenges:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc list-inside">
                  <li>Zirconium: Tied to titanium production, facing moderate pressure</li>
                  <li>Hafnium: Limited global production, strategic mineral status</li>
                  <li>Lithium-7: Highly specialized isotope with few producers</li>
                  <li>Beryllium: Concentrated production in US and Kazakhstan</li>
                  <li>Nuclear-grade graphite: Specialized manufacturing constraints</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommoditiesDashboard;
