import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import freedom fighter images
import freedomBanner from "../assets/tribel/banner.jpg"; // Assumed filename
import freedomTimeline from "../assets/tribel/IMG-20250408-WA0016.jpg"; // Assumed filename

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

const FreedomMuseumPage = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [mapHovered, setMapHovered] = useState(false);

  const locationAddress = t("Tribal Freedom Fighter Museum, Naya Raipur");
  const mapLocationQuery = encodeURIComponent(locationAddress);

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
          {t("Freedom Fighter Museum")}
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Description>
            {t(
              "The National Tribal Freedom Fighter Museum in Naya Raipur honors the courage, sacrifices, and unwavering spirit of tribal freedom fighters who fought for India's independence. This state-of-the-art museum, inaugurated in 2023, preserves and showcases the powerful stories of tribal communities' significant contributions to the freedom struggle against colonial rule."
            )}
          </Description>

          <Description>
            {t(
              "Our exhibits document the remarkable contributions of tribal leaders like Birsa Munda, Komaram Bheem, Tantya Bhil, Rani Gaidinliu, Laxman Naik, Talakkal Chandu, and many others who led resistance movements across different parts of India. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore how tribal identity and resistance movements shaped our nation's journey to freedom."
            )}
          </Description>

          <FeaturedRevolt>
            <FeaturedTitle>
              {t("Spotlight: The Bhumkal Revolt of 1910")}
            </FeaturedTitle>
            <Description>
              {t(
                "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of history's most significant tribal uprisings against British colonial rule in India. Led by the charismatic tribal leader Gunda Dhur, this powerful resistance movement united multiple tribal communities including the Muria, Maria, and Bhattra peoples of the Bastar region."
              )}
            </Description>
            <Description>
              {t(
                "Sparked by exploitative taxation, forced labor, and restrictions on traditional forest rights, the revolt spread rapidly across Bastar. The tribal warriors, armed primarily with traditional weapons, mounted fierce attacks on colonial outposts and successfully disrupted British control of the region for several months. Though eventually suppressed through brutal military force, the Bhumkal Revolt remains a testament to indigenous resistance and is commemorated annually as a symbol of tribal identity and courage."
              )}
            </Description>
          </FeaturedRevolt>

          <SectionTitle>{t("tribalUprisingsTimeline")}</SectionTitle>

          <TimelineSection>
            <TimelineImage />
            <TimelineContent>
              <Description>
                {t(
                  "The struggle for freedom by indigenous communities spans centuries, with organized resistance movements arising in response to colonial encroachment on tribal lands, cultures, and autonomy. Each uprising represents a crucial chapter in the story of indigenous resilience and self-determination."
                )}
              </Description>

              <TimelineEvents>
                <TimelineEvent>
                  <EventYear>1830</EventYear>
                  <EventTitle>{t("Halba Rebellion")}</EventTitle>
                  <p>
                    {t(
                      "Led by the Halba tribes against oppressive British East India Company policies in Central India."
                    )}
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1910</EventYear>
                  <EventTitle>{t("Bhumkal Revolt")}</EventTitle>
                  <p>
                    {t(
                      "A major tribal uprising in the Bastar region against exploitation and cultural suppression."
                    )}
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1942</EventYear>
                  <EventTitle>
                    {t("Tribal Participation in Quit India Movement")}
                  </EventTitle>
                  <p>
                    {t(
                      "Indigenous communities joined the nationwide struggle for independence from British colonial rule."
                    )}
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1970s</EventYear>
                  <EventTitle>{t("Jharkhand Movement")}</EventTitle>
                  <p>
                    {t(
                      "Sustained campaign for tribal autonomy and separate statehood in eastern India, ultimately successful in 2000."
                    )}
                  </p>
                </TimelineEvent>
              </TimelineEvents>
            </TimelineContent>
          </TimelineSection>

          <SectionTitle>{t("Visiting the Museum")}</SectionTitle>
          <Description>
            {t(
              "Our Freedom Fighter Museum offers an immersive journey through the courageous struggles of tribal communities fighting for sovereignty and dignity. Through artifacts, historical documents, photographs, and first-hand accounts, we honor the sacrifices made in the pursuit of independence."
            )}
          </Description>

          <LinksSection>
            <StyledLink to="/freedom/gallery">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4H4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
              </svg>
              {t("Galleries")}
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
              {t("Our Collection")}
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
              {t("virtualTour")}
            </StyledLink>
          </LinksSection>

          <InfoGrid>
            <InfoCard>
              <InfoTitle>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                {t("Museum Location")}
              </InfoTitle>
              <Description>
                {t(
                  "Explore the museum's location and learn about its significance in preserving the history of tribal freedom fighters."
                )}
              </Description>
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
                  {t("Click to view directions")}
                </MapOverlay>
              </MapContainer>
              <p
                style={{
                  marginTop: "10px",
                  fontSize: "0.9rem",
                  color: "#d3a164",
                }}
              >
                {locationAddress}
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
