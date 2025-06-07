
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider, useUser } from "./contexts/UserContext";
import { FeatureFlagsProvider } from "./contexts/FeatureFlagsContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import { CBCProvider } from "./contexts/CBCContext";
import WelcomeSetup from "./components/WelcomeSetup";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Institutions from "./pages/Institutions";
import Pathways from "./pages/Pathways";
import BiddingPage from "./pages/BiddingPage";
import Tracking from "./pages/Tracking";
import AIAssessment from "./pages/AIAssessment";
import InteractiveAIPage from "./pages/InteractiveAI";
import FeatureFlagsPage from "./pages/FeatureFlagsPage";
import FeedbackPage from "./pages/FeedbackPage";
import FeedbackManagementPage from "./pages/FeedbackManagementPage";
import CBCAssessmentPage from "./pages/CBCAssessmentPage";
import CBCPathwayPage from "./pages/CBCPathwayPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <WelcomeSetup />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/bidding" element={<BiddingPage />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/ai-assessment" element={<AIAssessment />} />
        <Route path="/interactive-ai" element={<InteractiveAIPage />} />
        <Route path="/feature-flags" element={<FeatureFlagsPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/feedback-management" element={<FeedbackManagementPage />} />
        <Route path="/cbc-assessment" element={<CBCAssessmentPage />} />
        <Route path="/cbc-pathways" element={<CBCPathwayPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <FeatureFlagsProvider>
          <FeedbackProvider>
            <CBCProvider>
              <Toaster />
              <Sonner />
              <AppContent />
            </CBCProvider>
          </FeedbackProvider>
        </FeatureFlagsProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
