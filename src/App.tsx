import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { FeatureFlagsProvider } from "./contexts/FeatureFlagsContext";
import { FeedbackProvider } from "./contexts/FeedbackContext";
import { CBCProvider } from "./contexts/CBCContext";
import PersonalizedWelcome from "./components/PersonalizedWelcome";
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
import ResponsibleAIPage from "./pages/ResponsibleAIPage";
import { NotificationProvider } from "./contexts/NotificationContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CBC Career Vision...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <PersonalizedWelcome />;
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
        <Route path="/responsible-ai" element={<ResponsibleAIPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FeatureFlagsProvider>
          <FeedbackProvider>
            <NotificationProvider>
              <CBCProvider>
                <Toaster />
                <Sonner />
                <AppContent />
              </CBCProvider>
            </NotificationProvider>
          </FeedbackProvider>
        </FeatureFlagsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
