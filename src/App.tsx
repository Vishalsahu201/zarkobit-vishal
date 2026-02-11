import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import Library from "./pages/Library";
import Watch from "./pages/Watch";
import Channel from "./pages/Channel";
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
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/library" element={<Library />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/channel/:id" element={<Channel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
