import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeritageNftProvider } from "@/context/HeritageNftContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import HeritageDetail from "./pages/HeritageDetail";
import Contribute from "./pages/Contribute";
import About from "./pages/About";
import OcrDemo from "./pages/OcrDemo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HeritageNftProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/heritage/:id" element={<HeritageDetail />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/about" element={<About />} />
            <Route path="/ocr" element={<OcrDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </HeritageNftProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
