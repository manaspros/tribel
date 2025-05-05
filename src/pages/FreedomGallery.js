import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleryDescriptions from "../data/galleryDescriptions.json";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px 80px; // Increased top padding from 40px to 100px
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  font-family: "Playfair Display", serif;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: #d3a164;
    margin: 20px auto 0;
  }
`;

const GalleryIntro = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin-top: 40px;
`;

const GalleryItem = styled(motion.div)`
  display: flex;
  background-color: rgba(36, 28, 23, 0.5);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  min-height: 350px;
  position: relative;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }

  @media (max-width: 992px) {
    flex-direction: column !important;
    min-height: auto;
  }
`;

const GalleryImage = styled.div`
  flex: 1;
  background-image: ${(props) => `url(/gallery/freedom/${props.image}.jpg)`};
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 350px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(36, 28, 23, 0.8), transparent);

    ${GalleryItem}:nth-child(even) & {
      background: linear-gradient(to left, rgba(36, 28, 23, 0.8), transparent);
    }

    @media (max-width: 992px) {
      background: linear-gradient(to top, rgba(36, 28, 23, 0.9), transparent);
    }
  }
`;

const GalleryInfo = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GalleryTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-family: "Playfair Display", serif;
`;

const GalleryDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 30px;
`;

const GalleryDetails = styled.div`
  display: flex;
  gap: 20px;
  margin-top: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const GalleryDetail = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #d3a164;
  }
`;

const ExploreButton = styled(motion.button)`
  background-color: #d3a164;
  color: #1a1410;
  border: none;
  border-radius: 30px;
  padding: 12px 25px;
  align-self: flex-start;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-top: 30px;
  transition: all 0.3s ease;

  svg {
    margin-left: 8px;
  }

  &:hover {
    background-color: #e0b175;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px; // Added top margin for better spacing
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

const LanguageIndicator = styled(motion.div)`
  position: fixed;
  top: 100px;
  right: 30px;
  background-color: rgba(211, 161, 100, 0.9);
  color: #1a1410;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    top: 70px;
    right: 20px;
    font-size: 0.9rem;
  }
`;

const FreedomGallery = () => {
  const { t, language, version } = useLanguage();
  const [showLanguageIndicator, setShowLanguageIndicator] = useState(false);
  const [prevLanguage, setPrevLanguage] = useState(language);

  // Show indicator when language changes
  useEffect(() => {
    // If language has changed
    if (language !== prevLanguage) {
      setShowLanguageIndicator(true);
      setPrevLanguage(language);

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setShowLanguageIndicator(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [language, version, prevLanguage]);

  // Generate gallery data directly from the JSON file
  const generateGalleryData = () => {
    // Get all rebellion keys (excluding titles, locations, durations, and galleryIntro)
    const rebellionKeys = Object.keys(galleryDescriptions).filter(
      (key) =>
        !["titles", "locations", "durations", "galleryIntro"].includes(key)
    );

    // Generate gallery items
    return rebellionKeys.map((key, index) => {
      return {
        id: index + 1,
        titleKey: key,
        descriptionKey: key,
        // Use the key name as image filename
        image: key.replace(/([A-Z])/g, "-$1").toLowerCase(),
        // For simplicity assigning locations and durations based on entries in JSON
        locationKey: index % 2 === 0 ? "centralIndia" : "bastarRegion",
        durationKey: index % 3 === 0 ? "overSixMonths" : "severalMonths",
      };
    });
  };

  const galleries = generateGalleryData();

  return (
    <PageContainer>
      <Navbar />

      <AnimatePresence>
        {showLanguageIndicator && (
          <LanguageIndicator
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
            </svg>
            {language === "en" ? "English" : "हिंदी"}
          </LanguageIndicator>
        )}
      </AnimatePresence>

      <ContentContainer>
        <BackLink to="/freedom">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {t("backToHome")}
        </BackLink>

        <PageTitle
          key={`title-${language}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("Galleries")}
        </PageTitle>

        <GalleryIntro>
          {galleryDescriptions.galleryIntro[language]}
        </GalleryIntro>

        <GalleryGrid>
          {galleries.map((gallery, index) => (
            <GalleryItem
              key={`gallery-${gallery.id}-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
            >
              <GalleryImage image={gallery.image} />
              <GalleryInfo>
                <GalleryTitle>
                  {galleryDescriptions.titles[gallery.titleKey][language]}
                </GalleryTitle>
                <GalleryDescription>
                  {galleryDescriptions[gallery.descriptionKey][language]}
                </GalleryDescription>

                <GalleryDetails>
                  <GalleryDetail>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    {
                      galleryDescriptions.locations[gallery.locationKey][
                        language
                      ]
                    }
                  </GalleryDetail>

                  <GalleryDetail>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 11.99 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    {
                      galleryDescriptions.durations[gallery.durationKey][
                        language
                      ]
                    }
                  </GalleryDetail>
                </GalleryDetails>

                <ExploreButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("exploreGallery")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                </ExploreButton>
              </GalleryInfo>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default FreedomGallery;
