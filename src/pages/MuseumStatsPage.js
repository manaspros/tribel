import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import images
import tribalBanner from "../assets/tribel/Picture3.jpg";
import freedomBanner from "../assets/tribel/banner.jpg";

// Import museum stats data from JSON
import museumStatsData from "../data/museumStatsTranslations.json";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 60vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.7),
      rgba(26, 20, 16, 0.9)
    ),
    url(${(props) => (props.isFreedom ? freedomBanner : tribalBanner)});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background-image 0.7s ease-in-out;

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
  padding: 60px 20px 80px;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3.5rem;
  margin-bottom: 30px;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MuseumToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  gap: 10px;
  position: relative;
  z-index: 10;
`;

const ToggleButton = styled.button`
  background: ${(props) => (props.active ? "#d3a164" : "transparent")};
  color: ${(props) => (props.active ? "#1a1410" : "#d3a164")};
  border: 2px solid #d3a164;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.active ? "#e0b175" : "rgba(211, 161, 100, 0.2)"};
    transform: translateY(-3px);
  }
`;

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin: 50px 0;
`;

const StatCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(211, 161, 100, 0.5);
  }
`;

const StatIconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(211, 161, 100, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 35px;
    height: 35px;
    color: #d3a164;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #d3a164;
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #f5efe7;
`;

const HighlightSection = styled.div`
  background: rgba(42, 35, 28, 0.3);
  border-radius: 15px;
  padding: 40px;
  margin: 50px 0;
  border: 1px solid rgba(211, 161, 100, 0.2);
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: #d3a164;
  }
`;

const HighlightsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  margin-top: 40px;
`;

const HighlightItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 15px;

  svg {
    min-width: 24px;
    width: 24px;
    height: 24px;
    color: #d3a164;
    margin-top: 3px;
  }
`;

const HighlightText = styled.div`
  font-size: 1.05rem;
  line-height: 1.6;
`;

const VisitButton = styled(Link)`
  display: inline-block;
  background: #d3a164;
  color: #1a1410;
  padding: 15px 30px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #e0b175;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ComparisonSection = styled.div`
  margin: 60px 0;
`;

const ComparisonTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonRowHeader = styled.div`
  font-weight: bold;
  color: #d3a164;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(211, 161, 100, 0.3);
  font-size: 1.1rem;

  &:first-child {
    text-align: right;

    @media (max-width: 768px) {
      text-align: center;
      background: rgba(211, 161, 100, 0.1);
      border-radius: 8px 8px 0 0;
    }
  }
`;

const ComparisonCell = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid rgba(211, 161, 100, 0.1);

  &:first-child {
    text-align: right;
    color: #d3a164;
    font-weight: 500;

    @media (max-width: 768px) {
      text-align: center;
      background: rgba(211, 161, 100, 0.1);
      border-bottom: none;
      padding-bottom: 5px;
    }
  }
`;

// New component for museum quote
const MuseumQuote = styled.blockquote`
  font-style: italic;
  font-size: 1.15rem;
  font-family: "Playfair Display", serif;
  line-height: 1.8;
  color: #f5efe7;
  margin: 40px auto;
  text-align: center;
  max-width: 700px;
  position: relative;
  padding: 0 40px;

  &::before,
  &::after {
    content: '"';
    font-size: 4rem;
    position: absolute;
    opacity: 0.2;
    color: #d3a164;
  }

  &::before {
    top: -30px;
    left: 0;
  }

  &::after {
    bottom: -60px;
    right: 0;
  }
`;

// Citation for quote
const QuoteCitation = styled.cite`
  display: block;
  color: #d3a164;
  font-size: 0.9rem;
  margin-top: 15px;
  font-style: normal;
  font-weight: 500;
`;

const MuseumStatsPage = () => {
  const { t, language } = useLanguage();
  const [activeMuseum, setActiveMuseum] = useState("tribal"); // Default to tribal museum

  // Function to get translated content from the museumStatsData
  const getContent = (key) => {
    if (museumStatsData[language] && museumStatsData[language][key]) {
      return museumStatsData[language][key];
    }
    // Fallback to English or key itself
    return museumStatsData.en ? museumStatsData.en[key] : key;
  };

  // Simple stats for each museum with enhanced descriptions
  const museumStats = {
    tribal: [
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        ),
        number: "50+",
        label: "Artifacts & Cultural Items",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        ),
        number: "7",
        label: "Tribal Communities Represented",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
          </svg>
        ),
        number: "150+",
        label: "Years of Preserved History",
      },
    ],
    freedom: [
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ),
        number: "75+",
        label: "Freedom Fighters Honored",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
          </svg>
        ),
        number: "38",
        label: "Historical Exhibitions",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </svg>
        ),
        number: "24",
        label: "Significant Historical Events",
      },
      {
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
          </svg>
        ),
        number: "200+",
        label: "Original Documents & Artifacts",
      },
    ],
  };

  // Improved highlights with more engaging content
  const museumHighlights = {
    tribal: [
      "Immersive dioramas recreating authentic tribal villages with traditional housing, tools, and daily activities of Chhattisgarh's indigenous communities.",
      "Extensive collection of rare tribal musical instruments with interactive audio stations allowing visitors to experience traditional sounds and rhythms.",
      "Detailed exhibits on traditional medicinal practices, sustainable farming techniques, and ecological knowledge systems preserved for generations.",
      "Gallery dedicated to tribal art forms including paintings, sculptures, pottery, and textiles, showcasing the artistic traditions of various communities.",
    ],
    freedom: [
      "Life-sized recreations of key moments in India's freedom struggle with interactive elements and multi-sensory experiences for visitors of all ages.",
      "Curated collection of personal belongings, letters, and artifacts from prominent freedom fighters of Chhattisgarh, many never displayed publicly before.",
      "Chronological journey through significant regional protests and rebellions that contributed to the national independence movement.",
      "Specially designed gallery honoring women freedom fighters and their often overlooked contributions to India's struggle for independence.",
    ],
  };

  return (
    <PageContainer>
      <Navbar />

      <HeroSection isFreedom={activeMuseum === "freedom"}>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Our Museums
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <MuseumToggle>
          <ToggleButton
            active={activeMuseum === "tribal"}
            onClick={() => setActiveMuseum("tribal")}
          >
            Tribal Museum
          </ToggleButton>
          <ToggleButton
            active={activeMuseum === "freedom"}
            onClick={() => setActiveMuseum("freedom")}
          >
            Freedom Fighters Museum
          </ToggleButton>
        </MuseumToggle>

        <Description>
          {activeMuseum === "tribal"
            ? "The Tribal Museum showcases the rich cultural heritage, traditional knowledge, and artistic expressions of indigenous communities of Chhattisgarh. Through carefully curated exhibits, artifacts, and interactive displays, we honor and preserve the vibrant living traditions that have been passed down through generations."
            : "The Freedom Fighters Museum commemorates the brave individuals who struggled for India's independence. Through historical exhibits, personal artifacts, and compelling narratives, we tell the story of courage, sacrifice, and determination that led to the birth of modern India."}
        </Description>

        {activeMuseum === "tribal" && (
          <MuseumQuote>
            Our tribal communities possess a profound understanding of
            sustainable living and harmonious coexistence with nature. Their
            cultural heritage is not just history—it's a living wisdom that
            offers valuable lessons for our contemporary world.
            <QuoteCitation>— Dr. Radhika Sharma, Museum Director</QuoteCitation>
          </MuseumQuote>
        )}

        {activeMuseum === "freedom" && (
          <MuseumQuote>
            The struggle for freedom was not just fought on battlefields and
            political arenas—it was carried in the hearts of countless ordinary
            citizens who dared to dream of an independent India.
            <QuoteCitation>
              — Prof. Vikram Mehta, Historical Adviser
            </QuoteCitation>
          </MuseumQuote>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeMuseum}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <StatsGrid>
              {museumStats[activeMuseum].map((stat, index) => (
                <StatCard
                  key={`stat-${index}-${language}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <StatIconContainer>{stat.icon}</StatIconContainer>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsGrid>

            <HighlightSection>
              <SectionTitle>
                {activeMuseum === "tribal"
                  ? "Experience Tribal Cultural Heritage"
                  : "Discover Freedom Struggle Highlights"}
              </SectionTitle>

              <Description>
                {activeMuseum === "tribal"
                  ? "Our museum offers a unique opportunity to explore the richness and diversity of tribal cultures through carefully curated exhibits that bring history to life."
                  : "Delve into the pivotal moments and untold stories of India's independence movement through our immersive and educational exhibits."}
              </Description>

              <HighlightsList>
                {museumHighlights[activeMuseum].map((highlight, index) => (
                  <HighlightItem
                    key={`highlight-${index}-${language}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <HighlightText>{highlight}</HighlightText>
                  </HighlightItem>
                ))}
              </HighlightsList>

              <ButtonsContainer>
                <VisitButton
                  to={activeMuseum === "tribal" ? "/tribal" : "/freedom"}
                  as={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit This Museum
                </VisitButton>

                <VisitButton
                  to={`/${activeMuseum}/gallery`}
                  as={motion.a}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Gallery
                </VisitButton>
              </ButtonsContainer>
            </HighlightSection>
          </motion.div>
        </AnimatePresence>

        <ComparisonSection>
          <SectionTitle>Our Dual Museum Experience</SectionTitle>

          <Description>
            Explore two distinct yet interconnected narratives of Chhattisgarh's
            rich heritage through our complementary museums. Discover how tribal
            communities and freedom fighters both contributed to the cultural
            and historical tapestry of our region.
          </Description>

          <ComparisonTable>
            <ComparisonRowHeader>Feature</ComparisonRowHeader>
            <ComparisonRowHeader>Tribal Museum</ComparisonRowHeader>
            <ComparisonRowHeader>Freedom Fighters Museum</ComparisonRowHeader>

            <ComparisonCell>Main Focus</ComparisonCell>
            <ComparisonCell>
              Cultural heritage, traditions, and indigenous knowledge systems
            </ComparisonCell>
            <ComparisonCell>
              Independence movement, resistance, and national identity formation
            </ComparisonCell>

            <ComparisonCell>Time Period</ComparisonCell>
            <ComparisonCell>
              Ancient to contemporary tribal life spanning centuries
            </ComparisonCell>
            <ComparisonCell>
              Primarily 1857 to 1947, with context from earlier rebellions
            </ComparisonCell>

            <ComparisonCell>Key Exhibits</ComparisonCell>
            <ComparisonCell>
              Artifacts, handicrafts, art forms, traditional tools, ceremonial
              items
            </ComparisonCell>
            <ComparisonCell>
              Historical documents, photographs, weapons, personal belongings of
              freedom fighters
            </ComparisonCell>

            <ComparisonCell>Visitor Experience</ComparisonCell>
            <ComparisonCell>
              Immersive cultural displays with demonstrations and interactive
              elements
            </ComparisonCell>
            <ComparisonCell>
              Chronological journey through pivotal moments of the independence
              struggle
            </ComparisonCell>
          </ComparisonTable>
        </ComparisonSection>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default MuseumStatsPage;
