import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import freedom gallery images (assuming these files exist)
import halbaImg from "../assets/tribel/IMG-20250408-WA0015.jpg";
import bhumkalImg from "../assets/tribel/IMG-20250408-WA0016.jpg";
import quitIndiaImg from "../assets/tribel/IMG-20250408-WA0018.jpg";
import jharkhandImg from "../assets/tribel/IMG-20250408-WA0019.jpg";
import narmadaImg from "../assets/tribel/childwhitebg.jpg";

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
  background-image: ${(props) => `url(${props.image})`};
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

const FreedomGallery = () => {
  const { t } = useLanguage();

  const galleries = [
    {
      id: 1,
      title: "Halba Rebellion (1830)",
      description:
        "The Halba Rebellion marked one of the earliest organized tribal resistances against British colonial rule in Central India. Led by tribal chieftain Shambu Singh, the Halba tribes rose up against excessive taxation, land appropriation, and the erosion of traditional tribal autonomy imposed by the British East India Company. This gallery showcases rare artifacts, maps, and accounts from this pivotal uprising that, despite its ultimate defeat, set a powerful precedent for indigenous resistance.",
      image: halbaImg,
      location: "Central India",
      duration: "Several months",
    },
    {
      id: 2,
      title: "Bhumkal Revolt (1910)",
      description:
        "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of the most significant tribal uprisings in Indian history. Led by tribal leader Gunda Dhur, this powerful movement united the Muria, Maria, and Bhattra communities against British colonial exploitation. Our gallery features original photographs, traditional weapons, and firsthand accounts that bring to life this extraordinary chapter of indigenous resistance that continues to inspire tribal identity and pride.",
      image: bhumkalImg,
      location: "Bastar Region",
      duration: "Over 6 months",
    },
    {
      id: 3,
      title: "Tribal Participation in Quit India Movement (1942)",
      description:
        "During the pivotal Quit India Movement of 1942, tribal communities across India made significant but often overlooked contributions to the independence struggle. This exhibit documents how indigenous groups in Jharkhand, Chhattisgarh, and Odisha organized protests, disrupted colonial infrastructure, and provided crucial support to underground freedom fighters. Displays include protest flags, correspondence between tribal leaders and national movement figures, and oral histories collected from movement participants.",
      image: quitIndiaImg,
      location: "Multiple regions",
      duration: "1942-1945",
    },
    {
      id: 4,
      title: "Jharkhand Movement (1970s)",
      description:
        "The Jharkhand Movement represents one of the most successful campaigns for tribal autonomy in modern India. This gallery chronicles the decades-long struggle led by tribal intellectuals and activists demanding recognition of Adivasi rights and separate statehood. Through photographs, movement banners, newspaper clippings, and video testimonials, visitors witness the remarkable journey that culminated in the formation of Jharkhand state in 2000, securing a historic victory for tribal self-determination.",
      image: jharkhandImg,
      location: "Eastern India",
      duration: "Over 30 years",
    },
    {
      id: 5,
      title: "Narmada Bachao Andolan (2000s)",
      description:
        "The Narmada Bachao Andolan (Save Narmada Movement) represents a powerful modern example of tribal communities fighting against displacement and environmental injustice. This exhibit documents how Adivasi peoples in the Narmada Valley organized to protect their ancestral lands from submergence by large dam projects. Through protest art, activist journals, documentary photographs, and interactive displays, visitors engage with this ongoing struggle that has raised global awareness about indigenous rights and environmental justice.",
      image: narmadaImg,
      location: "Narmada Valley",
      duration: "Ongoing since 1985",
    },
  ];

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <BackLink to="/freedom">
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
          Our specialized galleries chronicle pivotal moments in tribal
          resistance history, showcasing the extraordinary courage and
          determination of indigenous communities in their fight for freedom,
          dignity, and autonomy. Each carefully curated exhibit combines
          historical artifacts, documentary evidence, and personal testimonies
          to reveal these powerful yet often overlooked chapters in the struggle
          against colonialism.
        </GalleryIntro>

        <GalleryGrid>
          {galleries.map((gallery, index) => (
            <GalleryItem
              key={gallery.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
            >
              <GalleryImage image={gallery.image} />
              <GalleryInfo>
                <GalleryTitle>{gallery.title}</GalleryTitle>
                <GalleryDescription>{gallery.description}</GalleryDescription>

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
                    {gallery.location}
                  </GalleryDetail>

                  <GalleryDetail>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    {gallery.duration}
                  </GalleryDetail>
                </GalleryDetails>

                <ExploreButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Gallery
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
