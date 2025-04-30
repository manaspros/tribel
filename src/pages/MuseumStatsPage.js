import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import museumStatsTranslations from "../data/museumStatsTranslations.json";

// Import a background image
import museumBg from "../assets/tribel/Picture3.jpg";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 50vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.7),
      rgba(26, 20, 16, 0.9)
    ),
    url(${museumBg});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

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
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3.5rem;
  margin-bottom: 30px;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const Introduction = styled.div`
  max-width: 900px;
  margin: 0 auto 60px;
  text-align: center;
`;

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin: 50px 0 20px;
  position: relative;
  padding-left: 20px;

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

const MuseumInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const InfoCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 10px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(211, 161, 100, 0.5);
  }
`;

const InfoTitle = styled.h3`
  color: #d3a164;
  font-size: 1.5rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const MuseumStatsPage = () => {
  const { language } = useLanguage();

  // Get translations from the JSON file
  const t = (key) => {
    return (
      museumStatsTranslations[language]?.[key] ||
      museumStatsTranslations.en[key]
    );
  };

  return (
    <PageContainer>
      <Navbar hideDepartmentNames={true} />

      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("pageTitle")}
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Introduction>
            <Description>{t("introduction")}</Description>
          </Introduction>
          <SectionTitle>{t("missionTitle")}</SectionTitle>
          <Description>{t("missionText")}</Description>

          <SectionTitle>{t("overviewTitle")}</SectionTitle>
          <MuseumInfoGrid>
            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" />
                </svg>
                {t("exhibitionTitle")}
              </InfoTitle>
              <p>{t("exhibitionText")}</p>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {t("locationTitle")}
              </InfoTitle>
              <p>{t("locationText")}</p>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
                {t("programsTitle")}
              </InfoTitle>
              <p>{t("programsText")}</p>
            </InfoCard>
          </MuseumInfoGrid>

          <SectionTitle>{t("conservationTitle")}</SectionTitle>
          <Description>{t("conservationText")}</Description>

          <Description>{t("conclusionText")}</Description>
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default MuseumStatsPage;
