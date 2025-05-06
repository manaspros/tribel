import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import translation data
import visionTranslations from "../data/visionPageTranslations.json";

import forestBg from "../assets/tribel/Tree2.png"; // Import the same background image as HeroSection

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 50vh;
  padding-top: 80px; /* Add padding to account for the navbar height */
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.7),
      rgba(26, 20, 16, 0.9)
    ),
    url(${forestBg}); /* Use the same background image as HeroSection */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-top: 0; /* Ensure no additional margin is pushing content down */

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
    background: linear-gradient(to top, #1a1410, transparent);
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px 80px; /* Reduced top padding from 60px to 30px */
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3.5rem;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px; /* Reduced from 30px to 20px */
  color: #d3a164;
  text-decoration: none;
  font-weight: 500;

  svg {
    margin-right: 8px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin: 50px 0 20px;
  position: relative;
  padding-left: 20px;
  font-family: "Playfair Display", serif;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 30px;
    background: #d3a164;
    border-radius: 4px;
  }
`;

const Section = styled(motion.div)`
  margin-bottom: 40px; /* Reduced from 50px to 40px */
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const ValuesList = styled.ul`
  margin: 20px 0;
  padding-left: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.li`
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 15px;
  position: relative;

  &::before {
    content: "•";
    color: #d3a164;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    font-size: 1.5rem;
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: #f5efe7;
  border-left: 4px solid #d3a164;
  padding: 15px 30px;
  margin: 30px 0;
  font-size: 1.2rem;
  background: rgba(211, 161, 100, 0.1);
  border-radius: 0 15px 15px 0;
`;

const VisionPage = () => {
  const { language } = useLanguage();

  // Function to get translations
  const getContent = (key) => {
    if (visionTranslations[language] && visionTranslations[language][key]) {
      return visionTranslations[language][key];
    }
    // Fallback to English if translation is missing
    return visionTranslations.en[key] || key;
  };

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <div style={{ textAlign: "center" }}>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getContent("pageTitle")}
          </PageTitle>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {getContent("pageSubtitle")}
          </Subtitle>
        </div>
      </HeroSection>

      <ContentContainer>
        <BackLink to="/museum-stats">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {getContent("backToAbout")}
        </BackLink>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>{getContent("visionSectionTitle")}</SectionTitle>
          <Paragraph>{getContent("visionDescription1")}</Paragraph>
          <Quote>{getContent("visionQuote")}</Quote>
          <Paragraph>{getContent("visionDescription2")}</Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>{getContent("missionSectionTitle")}</SectionTitle>
          <Paragraph>{getContent("missionDescription1")}</Paragraph>
          <Paragraph>{getContent("missionDescription2")}</Paragraph>
          <ValuesList>
            <ValueItem>{getContent("missionValue1")}</ValueItem>
            <ValueItem>{getContent("missionValue2")}</ValueItem>
            <ValueItem>{getContent("missionValue3")}</ValueItem>
            <ValueItem>{getContent("missionValue4")}</ValueItem>
            <ValueItem>{getContent("missionValue5")}</ValueItem>
            <ValueItem>{getContent("missionValue6")}</ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>{getContent("valuesSectionTitle")}</SectionTitle>
          <ValuesList>
            <ValueItem>{getContent("value1")}</ValueItem>
            <ValueItem>{getContent("value2")}</ValueItem>
            <ValueItem>{getContent("value3")}</ValueItem>
            <ValueItem>{getContent("value4")}</ValueItem>
            <ValueItem>{getContent("value5")}</ValueItem>
            <ValueItem>{getContent("value6")}</ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SectionTitle>{getContent("objectivesSectionTitle")}</SectionTitle>
          <Paragraph>{getContent("objectivesIntro")}</Paragraph>
          <ValuesList>
            <ValueItem>{getContent("objective1")}</ValueItem>
            <ValueItem>{getContent("objective2")}</ValueItem>
            <ValueItem>{getContent("objective3")}</ValueItem>
            <ValueItem>{getContent("objective4")}</ValueItem>
            <ValueItem>{getContent("objective5")}</ValueItem>
            <ValueItem>{getContent("objective6")}</ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SectionTitle>{getContent("futureSectionTitle")}</SectionTitle>
          <Paragraph>{getContent("futureDescription1")}</Paragraph>
          <Paragraph>{getContent("futureDescription2")}</Paragraph>
          <Quote>{getContent("futureQuote")}</Quote>
        </Section>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default VisionPage;
