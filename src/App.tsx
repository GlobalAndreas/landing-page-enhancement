
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import PersonalData from "./pages/PersonalData";
import ErrorPage from "./pages/ErrorPage";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import Error504 from "./pages/Error504";
import { AdminPanel } from "@/components/AdminPanel";
import { AdminPanelLite } from "@/components/AdminPanelLite";
import { LeadsExportPanel } from "@/components/LeadsExportPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminPanel />
      <AdminPanelLite />
      <LeadsExportPanel />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/personal-data" element={<PersonalData />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/503" element={<Error503 />} />
          <Route path="/504" element={<Error504 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;