import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AIChatbot from "@/components/AIChatbot";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import Services from "./pages/Services";
import Reels from "./pages/Reels";
import FaceScan from "./pages/FaceScan";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Dashboard from "./pages/Dashboard";
import ServiceDetail from "./pages/ServiceDetail";
import SalonPage from "./pages/SalonPage";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import Subscriptions from "./pages/Subscriptions";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import MyBookings from "./pages/MyBookings";
import FavoriteSalons from "./pages/FavoriteSalons";
import BookingHistory from "./pages/BookingHistory";
import MyReviews from "./pages/MyReviews";
import SavedAddresses from "./pages/SavedAddresses";
import AccountSettings from "./pages/AccountSettings";
import NearbyMap from "./pages/NearbyMap";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/face-scan" element={<FaceScan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/salon/:id" element={<SalonPage />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/favorite-salons" element={<FavoriteSalons />} />
            <Route path="/booking-history" element={<BookingHistory />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/saved-addresses" element={<SavedAddresses />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/nearby" element={<NearbyMap />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
