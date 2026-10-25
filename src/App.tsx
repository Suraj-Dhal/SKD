import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Impact from "./pages/Impact";
import Publications from "./pages/Publications";
import Books from "./pages/Books";
import Awards from "./pages/Awards";
import Scholars from "./pages/Scholars";
import Editorial from "./pages/Editorial";
import Consultancy from "./pages/Consultancy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// The Speaking map bundles world and India TopoJSON (~1 MB), so load it on demand.
const Speaking = lazy(() => import("./pages/Speaking"));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/about/overview" replace />} />
          <Route path="/about/overview" element={<About />} />
          <Route path="/about/experience" element={<Experience />} />
          <Route path="/about/awards" element={<Awards />} />
          <Route path="/work" element={<Navigate to="/work/impact" replace />} />
          <Route path="/work/impact" element={<Impact />} />
          <Route path="/work/consultancy" element={<Consultancy />} />
          <Route path="/work/editorial" element={<Editorial />} />
          <Route path="/publications" element={<Navigate to="/publications/research" replace />} />
          <Route path="/publications/research" element={<Publications />} />
          <Route path="/publications/books" element={<Books />} />
          <Route path="/publications/scholars" element={<Scholars />} />
          <Route
            path="/speaking"
            element={
              <Suspense fallback={null}>
                <Speaking />
              </Suspense>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/speaking/talks" element={<Navigate to="/speaking" replace />} />
          <Route path="/speaking/media-events" element={<Navigate to="/speaking" replace />} />
          <Route path="/contact/form" element={<Navigate to="/contact" replace />} />
          <Route path="/contact/collaboration" element={<Navigate to="/contact" replace />} />
          <Route path="/experience" element={<Navigate to="/about/experience" replace />} />
          <Route path="/awards" element={<Navigate to="/about/awards" replace />} />
          <Route path="/impact" element={<Navigate to="/work/impact" replace />} />
          <Route path="/consultancy" element={<Navigate to="/work/consultancy" replace />} />
          <Route path="/editorial" element={<Navigate to="/work/editorial" replace />} />
          <Route path="/books" element={<Navigate to="/publications/books" replace />} />
          <Route path="/scholars" element={<Navigate to="/publications/scholars" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
