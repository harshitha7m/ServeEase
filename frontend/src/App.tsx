import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Booking from "./pages/Booking.tsx";
import Providers from "./pages/Providers.tsx";
import ProviderDetails from "./pages/ProviderDetails.tsx";
import Services from "./pages/Services.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProvidersList from "./pages/ProvidersList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/:providerId" element={<Booking />} />
          <Route path="/providers/:serviceName" element={<Providers />} />
          <Route path="/provider/:providerId" element={<ProviderDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/providers/:serviceName" element={<ProvidersList />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
