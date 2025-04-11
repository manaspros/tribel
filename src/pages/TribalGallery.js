import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import tribal gallery images (assuming these files exist)
import warAxeImg from "../assets/tribel/BAIGA2.jpg";
import dhokraImg from "../assets/tribel/GHOTPAL.jpg";
import maskImg from "../assets/tribel/DHURWA.jpg";
import herbsImg from "../assets/tribel/KAMAR.jpg";
import jewelryImg from "../assets/tribel/GOTUL.jpg";
import musicImg from "../assets/tribel/MURIYA.jpg";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
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
  const { t } = useLanguage();

  const galleries = [
    {
      id: 1,
      title: "tribalWarAxe",
      description:
        "Explore our collection of ceremonial and hunting weapons used by tribal chieftains in battles and rituals. These intricately decorated pieces tell stories of bravery, leadership, and cultural significance.",
      image: warAxeImg,
    },
    {
      id: 2,
      title: "dhokraArt",
      description:
        "Discover the ancient Dhokra metalworking technique that dates back over 4,000 years. These exquisite metal artifacts showcase the remarkable craftsmanship and artistic tradition passed down through generations.",
      image: dhokraImg,
    },
    {
      id: 3,
      title: "tribalMask",
      description:
        "Witness our impressive collection of ceremonial masks used during harvest festivals, spiritual rituals, and important tribal ceremonies. Each mask embodies the spiritual connection to ancestors and natural forces.",
      image: maskImg,
    },
    {
      id: 4,
      title: "Healing Herbs",
      description:
        "Learn about traditional medicinal practices through our diverse collection of healing herbs and plants. This exhibit highlights the profound botanical knowledge developed by tribal healers over thousands of years.",
      image: herbsImg,
    },
    {
      id: 5,
      title: "Tribal Jewelry",
      description:
        "Admire the beautiful ornamental pieces crafted from natural materials including seeds, bones, metals, and precious stones. These adornments signify social status, tribal affiliations, and important life stages.",
      image: jewelryImg,
    },
    {
      id: 6,
      title: "Musical Instruments",
      description:
        "Experience the rhythmic soul of tribal communities through our collection of traditional musical instruments. These pieces have been central to cultural celebrations, storytelling sessions, and spiritual ceremonies.",
      image: musicImg,
    },
  ];

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <BackLink to="/tribal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {t("backToHome")}
        </BackLink>

        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("Galleries")}
        </PageTitle>

        <GalleryIntro>
          {t(
            "Our specialized galleries offer immersive experiences into different aspects of tribal life and culture. Each carefully curated space presents artifacts within their cultural context, allowing visitors to gain deeper insights into the significance and stories behind these remarkable objects."
          )}
        </GalleryIntro>

        <GalleryGrid>
          {galleries.map((gallery, index) => (
            <GalleryItem
              key={gallery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GalleryImage image={gallery.image} />
              <GalleryInfo>
                <div>
                  <GalleryTitle>{t(gallery.title)}</GalleryTitle>
                  <GalleryDescription>{gallery.description}</GalleryDescription>
                </div>
                <ExploreButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("Explore Gallery →")}
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
