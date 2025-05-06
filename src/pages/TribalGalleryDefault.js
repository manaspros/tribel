import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleries from "../data/galleriesTribal.json";
import galleryTranslations from "../data/galleryTranslations.json";
const PageContainer = styled.div`
  background-color: #2a2018;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 180px; /* Increased to account for navbar */
  padding-bottom: 80px;
  padding-left: 20px;
  padding-right: 20px;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 2.5rem;
  margin-top: 20px; /* Added margin-top */
  margin-bottom: 20px; /* Added specific bottom margin */
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
  margin: 0 auto 30px; /* Reduced from 50px to 30px */
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const GalleryInfo = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.1) 100%);
`;

const GalleryTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
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
  margin-top: auto;

  &:hover {
    background-color: #d3a164;
    color: #1a1410;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px; /* Reduced from 30px to 20px */
  margin-top: 0; /* Removed top margin of 20px */
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

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: #241c17;
  border-radius: 15px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 20px 25px;
  border-bottom: 1px solid rgba(211, 161, 100, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  color: #d3a164;
  margin: 0;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #d3a164;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #fff;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  background: #1a1410;
`;

const GalleryImageLarge = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.image})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ImageCaption = styled.div`
  padding: 20px;
  background: rgba(26, 20, 16, 0.9);
  color: #fff;
  border-top: 1px solid rgba(211, 161, 100, 0.2);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(26, 20, 16, 0.7);
  border: 1px solid rgba(211, 161, 100, 0.5);
  color: #d3a164;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(211, 161, 100, 0.3);
  }

  &.prev {
    left: 15px;
  }

  &.next {
    right: 15px;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const ImageCounter = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(26, 20, 16, 0.7);
  color: #d3a164;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(211, 161, 100, 0.3);
`;

const TribalGallery = () => {
  const { language } = useLanguage();
  const [activeGallery, setActiveGallery] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gt = (key) => {
    if (galleryTranslations[language] && galleryTranslations[language][key]) {
      return galleryTranslations[language][key];
    }
    return galleryTranslations.en[key] || key;
  };

  const galleryItems = galleries.map((gallery, index) => ({
    ...gallery,
    title: gt(gallery.titleKey),
    imageIndex: index + 1
  }));

  const openGalleryModal = (galleryIndex) => {
    setActiveGallery(galleryIndex);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryModal = () => {
    setIsModalOpen(false);
    setActiveGallery(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (activeGallery !== null) {
      const images = galleries[activeGallery].exploreGalleryImages;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (activeGallery !== null) {
      const images = galleries[activeGallery].exploreGalleryImages;
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
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
          {galleryItems.map((gallery, index) => (
            <GalleryItem
              key={`gallery-${index}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GalleryImage image={`/gallery/tribal/${gallery.imageIndex}.png`} />
              <GalleryInfo>
                <div>
                  <GalleryTitle>{gallery.title}</GalleryTitle>
                </div>
                <ExploreButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openGalleryModal(index)}
                  disabled={gallery.exploreGalleryImages.length === 0}
                >
                  {gt("exploreGallery")} →
                </ExploreButton>
              </GalleryInfo>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </ContentContainer>

      <AnimatePresence>
        {isModalOpen && activeGallery !== null && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGalleryModal}
          >
            <ModalContent
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  {galleryItems[activeGallery]?.title}
                </ModalTitle>
                <CloseButton onClick={closeGalleryModal}>×</CloseButton>
              </ModalHeader>

              <CarouselContainer>
                {galleries[activeGallery]?.exploreGalleryImages.length > 0 && (
                  <ImageContainer>
                    <ImageWrapper>
                      <GalleryImageLarge 
                        image={galleries[activeGallery].exploreGalleryImages[currentImageIndex]?.imagePath}
                      />
                      
                      <NavButton className="prev" onClick={prevImage}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                      </NavButton>
                      
                      <NavButton className="next" onClick={nextImage}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                      </NavButton>
                      
                      <ImageCounter>
                        {currentImageIndex + 1} / {galleries[activeGallery].exploreGalleryImages.length}
                      </ImageCounter>
                    </ImageWrapper>
                    
                    <ImageCaption>
                      {gt(galleries[activeGallery].exploreGalleryImages[currentImageIndex]?.textKey) || 
                        "Discover the rich cultural heritage of tribal communities through this authentic artifact."}
                    </ImageCaption>
                  </ImageContainer>
                )}
              </CarouselContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      <Footer />
    </PageContainer>
  );
};

export default TribalGallery;