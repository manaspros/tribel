import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import TribalMuseumPage from "./pages/TribalMuseumPage";
import TribalGallery from "./pages/TribalGallery";
import TribalArtifacts from "./pages/TribalArtifacts";
import FreedomMuseumPage from "./pages/FreedomMuseumPage";
import FreedomGallery from "./pages/FreedomGallery";
import FreedomArtifacts from "./pages/FreedomArtifacts";
import ContactPage from "./pages/ContactPage";
import MuseumStatsPage from "./pages/MuseumStatsPage";
import PlanYourVisitPage from "./pages/PlanYourVisitPage";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./styles/global.css";

function App() {
  return (
    <LoadingProvider>
      <LanguageProvider>
        <Cursor />
        <Loader />
        <AnimatePresence mode="wait">
          <Router>
            <ScrollToHashElement />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/tribal" element={<TribalMuseumPage />} />
              <Route path="/tribal/gallery" element={<TribalGallery />} />
              <Route path="/tribal/artifacts" element={<TribalArtifacts />} />
              <Route path="/freedom" element={<FreedomMuseumPage />} />
              <Route path="/freedom/gallery" element={<FreedomGallery />} />
              <Route path="/freedom/artifacts" element={<FreedomArtifacts />} />
              <Route path="/about" element={<MuseumStatsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/museum-stats" element={<MuseumStatsPage />} />
              <Route path="/plan-visit" element={<PlanYourVisitPage />} />
            </Routes>
          </Router>
        </AnimatePresence>
      </LanguageProvider>
    </LoadingProvider>
  );
}

export default App;
