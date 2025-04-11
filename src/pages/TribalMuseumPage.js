import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// Import tribal images
import tribalBanner from "../assets/tribel//Picture3.jpg"; // Assumed filename
import tribalDecoration from "../assets/TRTI CG english logo curve.jpg"; // Assumed filename

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
    url(${tribalBanner});
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
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 40px;
    right: 10%;
    width: 150px;
    height: 150px;
    background-image: url(${tribalDecoration});
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.1;
    z-index: 0;
  }
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
  max-width: 800px;
  position: relative;
  z-index: 1;
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 50px 0;
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

const TribalMuseumPage = () => {
  const { t } = useLanguage();
  const [mapHovered, setMapHovered] = useState(false);

  const locationAddress = "Tribal Freedom Fighter Museum, Naya Raipur";
  const mapLocationQuery = encodeURIComponent(locationAddress);

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps?q=${mapLocationQuery}`, "_blank");
  };

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("tribal")} {t("heritageMuseum")}
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
              "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions."
            )}
          </Description>

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
                {t("Admission Fees")}
              </InfoTitle>
              <p>
                {t("Adults")}: ₹12
                <br />
                {t("Students & Seniors")}: ₹8
                <br />
                {t("Children (under 12)")}: {t("Free")}
                <br />
                {t("Members")}: {t("Free")}
              </p>
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
                {t("Museum Hours")}
              </InfoTitle>
              <p>
                {t("Tuesday - Friday: 10:00 AM - 6:00 PM")}
                <br />
                {t("Saturday - Sunday: 9:00 AM - 7:00 PM")}
                <br />
                {t("Monday: Closed")}
              </p>
            </InfoCard>

            <InfoCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <InfoTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {t("Location")}
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

          <SectionTitle>{t("Our Collection")}</SectionTitle>
          <Description>
            {t(
              "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years."
            )}
          </Description>

          <SectionTitle>{t("Visiting Experience")}</SectionTitle>
          <Description>
            {t(
              "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life."
            )}
          </Description>

          <LinksSection>
            <StyledLink to="/tribal/gallery">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
              </svg>
              {t("Galleries")}
            </StyledLink>
            <StyledLink to="/tribal/artifacts">
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
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default TribalMuseumPage;
