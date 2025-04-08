import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import freedom fighter images
import freedomBanner from "../assets/logo.svg"; // Assumed filename
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

const FreedomMuseumPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
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
              "Honor the courage, sacrifices, and unwavering spirit of those who fought for India's independence. Our Freedom Fighter Museum preserves the powerful stories of tribal communities' contributions to the freedom struggle, from organized uprisings against colonial rule to participation in the nationwide movement for liberation."
            )}
          </Description>

          <Description>
            {t(
              "Our exhibits document the lesser-known but crucial role of indigenous peoples in shaping India's journey to independence. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore the remarkable intersection of tribal identity and national resistance movements that ultimately led to freedom."
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
                  <EventTitle>Halba Rebellion</EventTitle>
                  <p>
                    Led by the Halba tribes against oppressive British East
                    India Company policies in Central India.
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1910</EventYear>
                  <EventTitle>Bhumkal Revolt</EventTitle>
                  <p>
                    A major tribal uprising in the Bastar region against
                    exploitation and cultural suppression.
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1942</EventYear>
                  <EventTitle>
                    Tribal Participation in Quit India Movement
                  </EventTitle>
                  <p>
                    Indigenous communities joined the nationwide struggle for
                    independence from British colonial rule.
                  </p>
                </TimelineEvent>

                <TimelineEvent>
                  <EventYear>1970s</EventYear>
                  <EventTitle>Jharkhand Movement</EventTitle>
                  <p>
                    Sustained campaign for tribal autonomy and separate
                    statehood in eastern India, ultimately successful in 2000.
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
                <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
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
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default FreedomMuseumPage;
