
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Pickaxe, 
  Atom, 
  GitBranch, 
  BarChart3, 
  Calculator,
  Menu,
  X,
  Home
} from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/mining', icon: <Pickaxe className="w-5 h-5" />, label: 'Mining Simulator' },
    { path: '/supply-chain', icon: <GitBranch className="w-5 h-5" />, label: 'Supply Chain' },
    { path: '/commodities', icon: <BarChart3 className="w-5 h-5" />, label: 'Commodities' },
    { path: '/calculator', icon: <Calculator className="w-5 h-5" />, label: 'Cost Calculator' },
  ];

  const getNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-nuclear-100 text-nuclear-900 dark:bg-nuclear-900 dark:text-nuclear-100 font-medium' 
        : 'text-gray-600 dark:text-gray-300 hover:bg-nuclear-50 dark:hover:bg-nuclear-900/50'
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Atom className="w-8 h-8 text-nuclear-600 dark:text-nuclear-400 atom-spin" />
            <h1 className="text-xl font-bold text-nuclear-900 dark:text-nuclear-100">
              Nuclear<span className="text-nuclear-600">Calc</span>
            </h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Supply Chain & Commodities</p>
        </div>
        
        <nav className="mt-2 flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getNavLinkClasses}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="glass-card p-3 text-xs text-center text-gray-500 dark:text-gray-400">
            <p>Presented by</p>
            <p className="font-medium text-gray-700 dark:text-gray-300">David T Phung</p>
          </div>
        </div>
      </aside>
      
      {/* Mobile header and menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Atom className="w-6 h-6 text-nuclear-600 dark:text-nuclear-400 atom-spin" />
            <h1 className="text-lg font-bold text-nuclear-900 dark:text-nuclear-100">
              Nuclear<span className="text-nuclear-600">Calc</span>
            </h1>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={getNavLinkClasses}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}
      </div>
      
      {/* Main content */}
      <main className="flex-1 md:ml-0 pt-16 md:pt-0">
        <div className="container py-6 md:py-10 px-4 md:px-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
