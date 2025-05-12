import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleryDescriptions from "../data/galleryDescriptions.json";
import backgroundImage from "../assets/RUID75f5bbabcf5843eda2d9fafa639f5b56.jpg";

const PageContainer = styled.div`
  background-image: linear-gradient(rgba(155, 119, 89, 0.85), rgba(169, 130, 99, 0.85)), 
                    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 200px;
  padding-bottom: 80px;
  padding-left: 20px;
  padding-right: 20px;
`;

const PageTitle = styled(motion.h1)`
  color: rgb(0, 0, 0);
  font-size: 2.5rem;
  margin-bottom: 20px;
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
  margin: 0 auto 30px;
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
  background-color: rgba(42, 32, 22, 0.7);
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
  background-image: ${(props) => `url(/gallery/freedom/${props.image}.png)`};
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
  margin-bottom: 20px;
  margin-top: 0;
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

const ImageBackgroundGallery = () => {
  const { t, language } = useLanguage();
  const [showLanguageIndicator, setShowLanguageIndicator] = useState(false);
  const [prevLanguage, setPrevLanguage] = useState(language);

  useEffect(() => {
    if (language !== prevLanguage) {
      setShowLanguageIndicator(true);
      setPrevLanguage(language);
      const timer = setTimeout(() => {
        setShowLanguageIndicator(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [language, prevLanguage]);

  const galleryKeys = Object.keys(galleryDescriptions.titles)
    .filter((key) => key.startsWith("freedomGallery"))
    .sort();

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
          {t("Freedom Fighter Gallery")}
        </PageTitle>

        <GalleryIntro>
          {galleryDescriptions.galleryIntro[language]}
        </GalleryIntro>

        <GalleryGrid>
          {galleryKeys.map((key, index) => (
            <GalleryItem
              key={`gallery-${index}-${language}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
            >
              <GalleryImage image={`${index + 3}`} />
              <GalleryInfo>
                <GalleryTitle>
                  {galleryDescriptions.titles[key][language]}
                </GalleryTitle>
                <GalleryDescription>
                  {galleryDescriptions.descriptions[key][language]}
                </GalleryDescription>
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

export default ImageBackgroundGallery;