import React, { useEffect } from "react"; // Remove useRef import
import { motion } from "framer-motion";
import styled from "styled-components";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import ExhibitSection from "../components/ExhibitSection";
import CTASection from "../components/CTASection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAudio } from "../contexts/AudioContext";
import { useLoading } from "../contexts/LoadingContext";

const PageWrapper = styled(motion.div)`
  background: #1a1410;
  color: #f5efe7;
  width: 100%;
  overflow-x: hidden;
`;

const Home = () => {
  const { playAmbientSound } = useAudio();
  const { setLoaded } = useLoading();

  useEffect(() => {
    // Start ambient sounds once page is loaded
    setTimeout(() => {
      setLoaded(true);
      playAmbientSound("nature");
    }, 2000);
  }, [playAmbientSound, setLoaded]);

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <HeroSection />
      <TimelineSection />
      <ExhibitSection />
      <CTASection />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
