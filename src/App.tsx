import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import Services from "./pages/Services";
import Reels from "./pages/Reels";
import FaceScan from "./pages/FaceScan";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import ServiceDetail from "./pages/ServiceDetail";
import SalonPage from "./pages/SalonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/face-scan" element={<FaceScan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/salon/:id" element={<SalonPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
