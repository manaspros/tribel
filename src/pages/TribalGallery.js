import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleries from "../data/galleries.json";
import galleryTranslations from "../data/galleryTranslations.json";

const PageContainer = styled.div`
  background-color: rgb(208, 161, 130);
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  height: 450px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
  }
`;

const GalleryImage = styled.div`
  height: 250px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, #241c17, transparent);
  }
`;

const GalleryInfo = styled.div`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GalleryTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
`;

const GalleryDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const ExploreButton = styled(motion.button)`
  background-color: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  border: 1px solid #d3a164;
  border-radius: 30px;
  padding: 10px 20px;
  align-self: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #d3a164;
    color: #1a1410;
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

const TribalGallery = () => {
  const { language } = useLanguage();

  // Function to get translation from gallery translations
  const gt = (key) => {
    if (galleryTranslations[language] && galleryTranslations[language][key]) {
      return galleryTranslations[language][key];
    }
    // Fallback to English if translation is missing
    return galleryTranslations.en[key] || key;
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <BackLink to="/tribal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {gt("backToHome")}
        </BackLink>

        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {gt("pageTitle")}
        </PageTitle>

        <GalleryIntro>{gt("pageIntro")}</GalleryIntro>

        <GalleryGrid>
          {galleries.map((gallery, index) => (
            <GalleryItem
              key={`gallery-${index}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GalleryImage image={`/gallery/${gallery.image}`} />
              <GalleryInfo>
                <div>
                  <GalleryTitle>{gt(gallery.titleKey)}</GalleryTitle>
                  <GalleryDescription>
                    {gt(gallery.descriptionKey)}
                  </GalleryDescription>
                </div>
                <ExploreButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {gt("exploreGallery")} →
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

export default TribalGallery;
