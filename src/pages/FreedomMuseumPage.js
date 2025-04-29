import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import freedom fighter images
import freedomBanner from "../assets/tribel/banner.jpg";
import freedomTimeline from "../assets/tribel/IMG-20250408-WA0016.jpg";

// Import translations for this page
import translations from "../data/freedomMuseumTranslations.json";

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
    url(${freedomBanner});
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

const LanguageToggle = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 30px;
  background-color: rgba(211, 161, 100, 0.2);
  border: 1px solid #d3a164;
  color: #d3a164;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(211, 161, 100, 0.4);
    transform: translateY(-2px);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #d3a164;
  }

  @media (max-width: 768px) {
    top: 70px;
    right: 15px;
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

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const LinksSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  background-color: #d3a164;
  color: #1a1410;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0b175;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  svg {
    margin-right: 10px;
  }
`;

const TimelineSection = styled.div`
  margin: 60px 0;
  display: flex;
  align-items: center;
  gap: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const TimelineImage = styled.div`
  flex: 1;
  height: 400px;
  background-image: url(${freedomTimeline});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineEvents = styled.div`
  margin-top: 30px;
`;

const TimelineEvent = styled.div`
  margin-bottom: 25px;
  position: relative;
  padding-left: 30px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #d3a164;
  }

  &::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 25px;
    width: 2px;
    height: calc(100% - 5px);
    background: rgba(211, 161, 100, 0.4);
  }

  &:last-child::after {
    display: none;
  }
`;

const EventYear = styled.span`
  color: #d3a164;
  font-weight: bold;
  margin-right: 10px;
`;

const EventTitle = styled.h4`
  color: #fff;
  margin: 5px 0;
  font-size: 1.1rem;
`;

const FeaturedRevolt = styled.div`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  padding: 30px;
  margin: 40px 0;
  border: 1px solid rgba(211, 161, 100, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const FeaturedTitle = styled.h3`
  color: #d3a164;
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-family: "Playfair Display", serif;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 40px 0 60px;
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

const MapContainer = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid rgba(211, 161, 100, 0.3);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(211, 161, 100, 0.2);
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const MapOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background-color: rgba(211, 161, 100, 0.9);
  color: #1a1410;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  transform: translateY(${(props) => (props.isHovered ? "0" : "100%")});
  transition: transform 0.3s ease;
`;

const PriceTag = styled.div`
  display: inline-block;
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 0.95rem;
  margin-right: 10px;
`;

const PriceNote = styled.p`
  font-size: 0.85rem;
  color: rgba(245, 239, 231, 0.8);
  margin-top: 6px;
  font-style: italic;
`;

const TimingDetail = styled.p`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
    min-width: 16px;
    margin-top: 3px;
    color: #d3a164;
    opacity: 0.9;
  }
`;

const FreedomMuseumPage = () => {
  const { language, toggleLanguage } = useLanguage();
  const [mapHovered, setMapHovered] = useState(false);

  // Function to get translated content from the specific JSON file
  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    // Fallback to English if translation is missing
    return translations["en"][key] || key;
  };

  const mapLocationQuery = encodeURIComponent(t("museumAddress"));

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps?q=${mapLocationQuery}`, "_blank");
  };

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <LanguageToggle
          onClick={toggleLanguage}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
          </svg>
          {language === "en" ? "हिंदी" : "English"}
        </LanguageToggle>

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
          <Description>{t("introduction")}</Description>

          <Description>{t("exhibitDescription")}</Description>

          <FeaturedRevolt>
            <FeaturedTitle>{t("featuredRevoltTitle")}</FeaturedTitle>
            <Description>{t("featuredRevoltDesc1")}</Description>
            <Description>{t("featuredRevoltDesc2")}</Description>
          </FeaturedRevolt>

          <SectionTitle>{t("timelineTitle")}</SectionTitle>

          <TimelineSection>
            <TimelineImage />
            <TimelineContent>
              <Description>{t("timelineIntro")}</Description>

              <TimelineEvents>
                <TimelineEvent>
                  <EventYear>{t("timeline1Year")}</EventYear>
                  <EventTitle>{t("timeline1Title")}</EventTitle>
                  <p>{t("timeline1Desc")}</p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>{t("timeline2Year")}</EventYear>
                  <EventTitle>{t("timeline2Title")}</EventTitle>
                  <p>{t("timeline2Desc")}</p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>{t("timeline3Year")}</EventYear>
                  <EventTitle>{t("timeline3Title")}</EventTitle>
                  <p>{t("timeline3Desc")}</p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>{t("timeline4Year")}</EventYear>
                  <EventTitle>{t("timeline4Title")}</EventTitle>
                  <p>{t("timeline4Desc")}</p>
                </TimelineEvent>
              </TimelineEvents>
            </TimelineContent>
          </TimelineSection>

          <SectionTitle>{t("visitTitle")}</SectionTitle>
          <Description>{t("visitDesc")}</Description>

          <LinksSection>
            <StyledLink to="/freedom/gallery">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
              </svg>
              {t("galleriesLink")}
            </StyledLink>
            <StyledLink to="/freedom/artifacts">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
              </svg>
              {t("collectionLink")}
            </StyledLink>
            <StyledLink to="/virtual-tour">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z" />
              </svg>
              {t("virtualTourLink")}
            </StyledLink>
          </LinksSection>

          <InfoGrid>
            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.4 2.72 3.52 3.33 1.74.5 2.2 1.2 2.2 1.95 0 .8-.65 1.57-2.01 1.57-1.36 0-2.05-.59-2.15-1.57H8.01c.1 1.58 1.23 2.66 2.89 2.96V19h1.32v-1.67c1.56-.3 2.7-1.37 2.7-2.83-.01-2.24-1.85-3.09-3.61-3.36z" />
                </svg>
                {t("admissionTitle")}
              </InfoTitle>

              <div>
                <PriceTag>₹20 - {t("adults")}</PriceTag>
                <PriceTag>₹10 - {t("studentsAndSeniors")}</PriceTag>
                <PriceTag>
                  {t("free")} - {t("children")}
                </PriceTag>
                <PriceTag>
                  {t("free")} - {t("members")}
                </PriceTag>
              </div>

              <PriceNote>{t("specialDiscount")}</PriceNote>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                {t("hoursTitle")}
              </InfoTitle>

              <TimingDetail>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                </svg>
                {t("weekdayHours")}
              </TimingDetail>

              <TimingDetail>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                </svg>
                {t("weekendHours")}
              </TimingDetail>

              <TimingDetail>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9.31 17l2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                </svg>
                <span style={{ color: "#e74c3c" }}>{t("mondayClosed")}</span>
              </TimingDetail>

              <PriceNote style={{ marginTop: "10px" }}>
                {t("holidayNote")}
              </PriceNote>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <InfoTitle>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {t("locationTitle")}
              </InfoTitle>

              <MapContainer
                onMouseEnter={() => setMapHovered(true)}
                onMouseLeave={() => setMapHovered(false)}
                onClick={handleMapClick}
              >
                <MapIframe
                  src={`https://maps.google.com/maps?q=${mapLocationQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                />
                <MapOverlay isHovered={mapHovered}>
                  {t("viewDirections")}
                </MapOverlay>
              </MapContainer>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "0.9rem",
                  color: "#d3a164",
                }}
              >
                {t("museumAddress")}
              </p>
            </InfoCard>
          </InfoGrid>
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default FreedomMuseumPage;
