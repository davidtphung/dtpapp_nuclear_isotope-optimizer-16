import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Atom, ArrowRight, Pickaxe, GitBranch, BarChart3, Calculator } from 'lucide-react';
import Card from '@/components/ui/card';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to show animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <div className="px-4 py-20 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-nuclear-500 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-fission-500 filter blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Atom className="w-16 h-16 text-nuclear-500 atom-spin" />
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full nuclear-glow"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-nuclear-900 dark:text-white mb-6">
            Nuclear Supply Chain & Commodities Calculator
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Model, analyze, and visualize the end-to-end nuclear supply chain from mining to deployment
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-nuclear-500 text-white rounded-lg hover:bg-nuclear-600 transition-colors flex items-center justify-center"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link
              to="/mining"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-nuclear-800 dark:text-nuclear-100 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              Start Simulation
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="px-4 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-nuclear-900 dark:text-white mb-12">
          Comprehensive Nuclear Supply Chain Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card 
            className="text-center px-6 py-8" 
            animation="slide" 
            style={{ animationDelay: '100ms' }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full">
                <Pickaxe className="w-8 h-8 text-nuclear-500 dark:text-nuclear-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Mining Simulator</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Simulate mining operations for uranium, zirconium, hafnium, and other critical materials.
            </p>
            <Link
              to="/mining"
              className="text-nuclear-500 hover:text-nuclear-700 dark:text-nuclear-400 dark:hover:text-nuclear-300 font-medium inline-flex items-center"
            >
              Launch Simulator
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Card>
          
          <Card 
            className="text-center px-6 py-8" 
            animation="slide" 
            style={{ animationDelay: '200ms' }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-fission-100 dark:bg-fission-900/50 rounded-full">
                <GitBranch className="w-8 h-8 text-fission-500 dark:text-fission-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Supply Chain Visualizer</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Map global flows of nuclear materials with interactive Sankey diagrams and disruption testing.
            </p>
            <Link
              to="/supply-chain"
              className="text-fission-500 hover:text-fission-700 dark:text-fission-400 dark:hover:text-fission-300 font-medium inline-flex items-center"
            >
              View Supply Chain
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Card>
          
          <Card 
            className="text-center px-6 py-8" 
            animation="slide" 
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-energy-100 dark:bg-energy-900/50 rounded-full">
                <BarChart3 className="w-8 h-8 text-energy-600 dark:text-energy-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Commodities Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Track prices, monitor trends, and analyze market conditions for nuclear materials.
            </p>
            <Link
              to="/commodities"
              className="text-energy-600 hover:text-energy-700 dark:text-energy-400 dark:hover:text-energy-300 font-medium inline-flex items-center"
            >
              Open Dashboard
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Card>
          
          <Card 
            className="text-center px-6 py-8" 
            animation="slide" 
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full">
                <Calculator className="w-8 h-8 text-nuclear-500 dark:text-nuclear-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Cost Calculator</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Calculate costs and timelines for nuclear projects from fuel procurement to construction.
            </p>
            <Link
              to="/calculator"
              className="text-nuclear-500 hover:text-nuclear-700 dark:text-nuclear-400 dark:hover:text-nuclear-300 font-medium inline-flex items-center"
            >
              Calculate Costs
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Card>
        </div>
      </div>
      
      {/* Overview Section */}
      <div className="px-4 py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-nuclear-900 dark:text-white mb-6">
                End-to-End Nuclear Supply Chain Modeling
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our comprehensive platform provides powerful tools for modeling the entire nuclear fuel cycle, from mining operations to reactor deployment.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full mt-1 mr-3">
                    <Atom className="w-5 h-5 text-nuclear-500 dark:text-nuclear-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100">Data-Driven Insights</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Access reliable data on nuclear material prices, production capacities, and market trends.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full mt-1 mr-3">
                    <Atom className="w-5 h-5 text-nuclear-500 dark:text-nuclear-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100">Scenario Testing</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Simulate disruptions, test alternative routes, and optimize your supply chain for resilience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-nuclear-100 dark:bg-nuclear-900/50 rounded-full mt-1 mr-3">
                    <Atom className="w-5 h-5 text-nuclear-500 dark:text-nuclear-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nuclear-900 dark:text-nuclear-100">Comprehensive Reporting</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Generate detailed reports, export data, and share custom scenarios with stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-10">
              <div className="glass-card rounded-xl p-6 nuclear-glow">
                <div className="aspect-video bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center text-center p-8">
                  <div>
                    <Atom className="w-16 h-16 text-nuclear-500 mx-auto mb-4 atom-spin" />
                    <p className="text-lg font-medium text-nuclear-900 dark:text-nuclear-100">
                      Interactive Supply Chain Visualization Demo
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      Launch the application to explore the full features
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-nuclear-50 dark:bg-nuclear-900/30 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-nuclear-900 dark:text-nuclear-100">+500</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Material Data Points</p>
                  </div>
                  
                  <div className="bg-nuclear-50 dark:bg-nuclear-900/30 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-nuclear-900 dark:text-nuclear-100">48</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Global Facilities</p>
                  </div>
                  
                  <div className="bg-nuclear-50 dark:bg-nuclear-900/30 p-3 rounded-lg text-center">
                    <p className="text-xl font-bold text-nuclear-900 dark:text-nuclear-100">24</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Supply Routes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-nuclear-500 filter blur-3xl"></div>
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-fission-500 filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-nuclear-900 dark:text-white mb-6">
            Ready to optimize your nuclear supply chain?
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start modeling, analyzing, and visualizing nuclear material flows with our comprehensive toolkit.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-nuclear-500 text-white rounded-lg hover:bg-nuclear-600 transition-colors flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
