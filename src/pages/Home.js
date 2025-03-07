import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import QuoteSection from "../components/QuoteSection";
import StatisticsSection from "../components/StatisticsSection";
import ExhibitSection from "../components/ExhibitSection";
import CTASection from "../components/CTASection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoading } from "../contexts/LoadingContext";

const PageWrapper = styled(motion.div)`
  background: #1a1410;
  color: #f5efe7;
  width: 100%;
  overflow-x: hidden;
`;

const Home = () => {
  const { setLoaded } = useLoading();

  useEffect(() => {
    // Start loading sequence
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, [setLoaded]);

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <TimelineSection />
      <StatisticsSection />
      <ExhibitSection />
      <CTASection />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
