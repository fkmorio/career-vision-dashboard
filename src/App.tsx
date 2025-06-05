
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Institutions from "./pages/Institutions";
import Pathways from "./pages/Pathways";
import BiddingPage from "./pages/BiddingPage";
import Tracking from "./pages/Tracking";
import AIAssessment from "./pages/AIAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/bidding" element={<BiddingPage />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/ai-assessment" element={<AIAssessment />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
