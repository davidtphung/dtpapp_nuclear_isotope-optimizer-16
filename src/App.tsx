
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/Dashboard";
import MiningSimulator from "./components/MiningSimulator";
import SupplyChain from "./components/SupplyChain";
import CommoditiesDashboard from "./components/CommoditiesDashboard";
import CostCalculator from "./components/CostCalculator";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="nuclear-calc-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="mining" element={<MiningSimulator />} />
              <Route path="supply-chain" element={<SupplyChain />} />
              <Route path="commodities" element={<CommoditiesDashboard />} />
              <Route path="calculator" element={<CostCalculator />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
