import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Loader } from "./components/Loader";
import { Cursor } from "./components/Cursor";
import Home from "./pages/Home";
import VirtualTour from "./pages/VirtualTour";
import AudioProvider from "./contexts/AudioContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import "./styles/global.css";

function App() {
  useEffect(() => {
    // Preload assets
    // Initialize any global libraries
  }, []);

  return (
    <Router>
      <LoadingProvider>
        <AudioProvider>
          <Cursor />
          <Loader />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
            </Routes>
          </AnimatePresence>
        </AudioProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
