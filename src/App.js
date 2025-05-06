import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import ScrollToHashElement from "./components/ScrollToHashElement";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/global.css";

// Use React.lazy for code splitting
const Home = React.lazy(() => import("./pages/Home"));
const VirtualTour = React.lazy(() => import("./pages/VirtualTour"));
const TribalMuseumPage = React.lazy(() => import("./pages/TribalMuseumPage"));
const TribalGallery = React.lazy(() => import("./pages/TribalGallery"));
const TribalArtifacts = React.lazy(() => import("./pages/TribalArtifacts"));
const FreedomMuseumPage = React.lazy(() => import("./pages/FreedomMuseumPage"));
const FreedomGallery = React.lazy(() => import("./pages/FreedomGallery"));
const FreedomArtifacts = React.lazy(() => import("./pages/FreedomArtifacts"));
const MuseumStatsPage = React.lazy(() => import("./pages/MuseumStatsPage"));
const PlanYourVisitPage = React.lazy(() => import("./pages/PlanYourVisitPage"));
const BookNowPage = React.lazy(() => import("./pages/BookNowPage"));
const DirectorMessage = React.lazy(() => import("./pages/DirectorMessage"));
const VisionPage = React.lazy(() => import("./pages/VisionPage"));
const NearbyPlacesPage = React.lazy(() => import("./pages/NearbyPlacesPage"));

// Add imports for the new gallery pages
const GalleryDefault = React.lazy(() => import("./pages/GalleryDefault"));
const GalleryImage = React.lazy(() => import("./pages/GalleryImage"));
const GallerySaffron = React.lazy(() => import("./pages/GallerySaffron"));
const GalleryLight = React.lazy(() => import("./pages/GalleryLight"));

// Context-aware loading component that uses the same LoadingContext
const ContextAwareLoader = () => {
  const { progress } = useLoading();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#1a1410",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            margin: "0 0 30px",
            color: "#d3a164",
          }}
        >
          Tribal Heritage Museum
        </h1>

        <div
          style={{
            width: "300px",
            height: "4px",
            background: "rgba(211, 161, 100, 0.2)",
            borderRadius: "2px",
            margin: "20px 0",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              background: "#d3a164",
              borderRadius: "2px",
              width: `${progress}%`,
            }}
          />
        </div>

        <p style={{ color: "#d3a164" }}>Loading content... {progress}%</p>
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <>
      <Cursor />
      <Loader />
      <AnimatePresence mode="wait">
        <Router>
          <ScrollToHashElement />
          <Suspense fallback={<ContextAwareLoader />}>
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
              <Route path="/about/director" element={<DirectorMessage />} />
              <Route path="/about/vision" element={<VisionPage />} />
              <Route path="/museum-stats" element={<MuseumStatsPage />} />
              <Route path="/plan-visit" element={<PlanYourVisitPage />} />
              <Route path="/book-now" element={<BookNowPage />} />
              <Route path="/nearby-places" element={<NearbyPlacesPage />} />
              
              {/* Add routes for the new gallery pages */}
              <Route path="/gallery/default" element={<GalleryDefault />} />
              <Route path="/gallery/image" element={<GalleryImage />} />
              <Route path="/gallery/saffron" element={<GallerySaffron />} />
              <Route path="/gallery/light" element={<GalleryLight />} />
            </Routes>
          </Suspense>
        </Router>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <LanguageProvider>
          <AppContent />
          <ThemeToggle />
        </LanguageProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
