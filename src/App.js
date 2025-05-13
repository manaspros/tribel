import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./styles/global.css";

// Use React.lazy for code splitting
const Home = React.lazy(() => import("./pages/Home"));
const VirtualTour = React.lazy(() => import("./pages/VirtualTour"));
const TribalMuseumPage = React.lazy(() => import("./pages/TribalMuseumPage"));
const TribalArtifacts = React.lazy(() => import("./pages/TribalArtifacts"));
const FreedomMuseumPage = React.lazy(() => import("./pages/FreedomMuseumPage"));
const FreedomArtifacts = React.lazy(() => import("./pages/FreedomArtifacts"));
const MuseumStatsPage = React.lazy(() => import("./pages/MuseumStatsPage"));
const PlanYourVisitPage = React.lazy(() => import("./pages/PlanYourVisitPage"));
const BookNowPage = React.lazy(() => import("./pages/BookNowPage"));
const DirectorMessage = React.lazy(() => import("./pages/DirectorMessage"));
const VisionPage = React.lazy(() => import("./pages/VisionPage"));
const NearbyPlacesPage = React.lazy(() => import("./pages/NearbyPlacesPage"));

// Add imports for the new gallery pages
const GalleryImage = React.lazy(() => import("./pages/GalleryImage"));

// Add imports for the Tribal gallery pages
const TribalGalleryImage = React.lazy(() => import("./pages/TribalGalleryImage"));

// Context-aware loading component that uses the same LoadingContext
const ContextAwareLoader = () => {
  const { progress } = useLoading();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Don't show loader on home page
  if (isHomePage) {
    return null;
  }

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
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            margin: "0 0 30px",
            color: "#d3a164",
            lineHeight: 1.3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Welcome to</span>
          <span style={{ 
            fontSize: "clamp(1.4rem, 4vw, 2.6rem)",
            marginTop: "0.4rem" 
          }}>
            Chhattisgarh Tribal Museum and Freedom Fighter Museum
          </span>
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

// Wrapper for suspense that provides location awareness
const LocationAwareSuspense = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <Suspense fallback={isHomePage ? null : <ContextAwareLoader />}>
      {children}
    </Suspense>
  );
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/virtual-tour" element={<VirtualTour />} />
      <Route path="/tribal" element={<TribalMuseumPage />} />
      <Route path="/tribal/gallery" element={<TribalGalleryImage />} />
      <Route path="/tribal/artifacts" element={<TribalArtifacts />} />
      <Route path="/freedom" element={<FreedomMuseumPage />} />
      <Route path="/freedom/gallery" element={<GalleryImage />} />
      <Route path="/freedom/artifacts" element={<FreedomArtifacts />} />
      <Route path="/about" element={<MuseumStatsPage />} />
      <Route path="/about/director" element={<DirectorMessage />} />
      <Route path="/about/vision" element={<VisionPage />} />
      <Route path="/museum-stats" element={<MuseumStatsPage />} />
      <Route path="/plan-visit" element={<PlanYourVisitPage />} />
      <Route path="/book-now" element={<BookNowPage />} />
      <Route path="/nearby-places" element={<NearbyPlacesPage />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <>
      <Cursor />
      <Loader />
      <AnimatePresence mode="wait">
        <Router>
          <LocationAwareSuspense>
            <AppRoutes />
          </LocationAwareSuspense>
        </Router>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
      <LoadingProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </LoadingProvider>
  );
}

export default App;
