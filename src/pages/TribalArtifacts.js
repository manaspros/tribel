import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArtifactCard from "../components/ArtifactCard";
import LazyLoad from "../components/LazyLoad";
import artifactDescriptions from "../data/artifactDescriptions.json";
import backgroundImage from "../assets/RUID75f5bbabcf5843eda2d9fafa639f5b56.jpg";

const PageContainer = styled.div`
  background-image: linear-gradient(rgba(155, 119, 89, 0.85), rgba(169, 130, 99, 0.85)), 
                    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #f5efe7; /* Changed from #fff to a softer off-white for better reading */
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
  margin-bottom: 30px;
  margin-top: 80px; // Added top margin for better spacing
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const ArtifactsDescription = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
`;

const ArtifactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArtifactEmoji = styled.div`
  font-size: 7rem;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: rgba(211, 161, 100, 0.1);
  border-radius: 50%;
  border: 2px solid rgba(211, 161, 100, 0.3);
`;

const ArtifactDetail = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(26, 20, 16, 0.95);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const DetailContent = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    max-height: 80vh;
  }
`;

const DetailImageSection = styled.div`
  flex: 1;
  background-color: #2c231c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (min-width: 1024px) {
    min-height: 500px;
  }

  .emoji {
    font-size: 9rem;
  }
`;

const DetailInfoSection = styled.div`
  flex: 1;
  padding: 40px;
`;

const DetailTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin-bottom: 20px;
  font-family: "Playfair Display", serif;
`;

const DetailDescription = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
`;

const DetailProperty = styled.div`
  margin-bottom: 15px;

  strong {
    color: #d3a164;
    margin-right: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(211, 161, 100, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #d3a164;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(211, 161, 100, 0.4);
    transform: rotate(90deg);
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

const TribalArtifacts = () => {
  const { t, language } = useLanguage();
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const getArtifactTranslation = useCallback(
    (artifactKey, field) => {
      if (
        artifactDescriptions.tribalArtifacts[artifactKey] &&
        artifactDescriptions.tribalArtifacts[artifactKey][field] &&
        artifactDescriptions.tribalArtifacts[artifactKey][field][language]
      ) {
        return artifactDescriptions.tribalArtifacts[artifactKey][field][
          language
        ];
      }
      return `Translation missing for ${artifactKey}.${field}`;
    },
    [language]
  );

  const getCategoryTranslation = useCallback(
    (category) => {
      const lowerCategory = category.toLowerCase();
      if (
        artifactDescriptions.categoryLabels[lowerCategory] &&
        artifactDescriptions.categoryLabels[lowerCategory][language]
      ) {
        return artifactDescriptions.categoryLabels[lowerCategory][language];
      }
      return category;
    },
    [language]
  );

  const getDetailTranslation = useCallback(
    (detail) => {
      if (
        artifactDescriptions.detailLabels[detail] &&
        artifactDescriptions.detailLabels[detail][language]
      ) {
        return artifactDescriptions.detailLabels[detail][language];
      }
      return detail;
    },
    [language]
  );

  const artifacts = useMemo(
    () => [
      {
        id: 1,
        artifactKey: "ceremonialWarAxe",
        emoji: "🪓",
        tags: ["Weapon", "Ceremonial"],
        culture: "Gond Tribe",
        age: "Circa 1750",
        materials: "Iron, Wood, Leather, Semi-precious stones",
      },
      {
        id: 2,
        artifactKey: "dhokraHorse",
        emoji: "🏺",
        tags: ["Crafts", "Ancient"],
        culture: "Bastar Region",
        age: "Contemporary (using ancient techniques)",
        materials: "Bronze alloy",
      },
      {
        id: 3,
        artifactKey: "ritualMask",
        emoji: "🎭",
        tags: ["Ritual", "Spiritual"],
        culture: "Warli Tribe",
        age: "Early 20th Century",
        materials: "Wood, Natural pigments, Feathers",
      },
      {
        id: 4,
        artifactKey: "medicinalHerbs",
        emoji: "🌿",
        tags: ["Medicine", "Natural"],
        culture: "Multiple Tribal Groups",
        age: "Contemporary (ongoing tradition)",
        materials: "Various dried herbs, roots, and leaves",
      },
      {
        id: 5,
        artifactKey: "ceremonialNecklace",
        emoji: "💍",
        tags: ["Adornment", "Cultural"],
        culture: "Banjara Tribe",
        age: "Mid-19th Century",
        materials: "Silver, Glass beads, Coins, Cotton thread",
      },
      {
        id: 6,
        artifactKey: "tribalDrum",
        emoji: "🥁",
        tags: ["Music", "Performance"],
        culture: "Santhal Tribe",
        age: "Early 20th Century",
        materials: "Wood, Animal hide, Natural fibers",
      },
    ],
    []
  );

  const filteredArtifacts = useMemo(() => artifacts, [artifacts]);

  const handleArtifactClick = useCallback((artifact) => {
    setSelectedArtifact(artifact);
  }, []);

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
          {t("Our Collection")}
        </PageTitle>

        <ArtifactsDescription>
          {artifactDescriptions.tribalArtifactsIntro[language]}
        </ArtifactsDescription>

        <ArtifactsGrid>
          {filteredArtifacts.map((artifact, index) => (
            <LazyLoad
              key={`artifact-${artifact.id}-${language}`}
              minHeight="400px"
            >
              <ArtifactCard
                artifact={artifact}
                title={getArtifactTranslation(artifact.artifactKey, "title")}
                description={getArtifactTranslation(
                  artifact.artifactKey,
                  "description"
                )}
                emoji={<ArtifactEmoji>{artifact.emoji}</ArtifactEmoji>}
                tags={artifact.tags}
                onClick={() => handleArtifactClick(artifact)}
                translateTag={getCategoryTranslation}
                index={index}
              />
            </LazyLoad>
          ))}
        </ArtifactsGrid>

        <AnimatePresence>
          {selectedArtifact && (
            <ArtifactDetail
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtifact(null)}
            >
              <DetailContent
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <DetailImageSection>
                  <div className="emoji">{selectedArtifact.emoji}</div>
                </DetailImageSection>
                <DetailInfoSection>
                  <DetailTitle>
                    {getArtifactTranslation(
                      selectedArtifact.artifactKey,
                      "title"
                    )}
                  </DetailTitle>
                  <DetailDescription>
                    {getArtifactTranslation(
                      selectedArtifact.artifactKey,
                      "significance"
                    )}
                  </DetailDescription>

                  <DetailProperty>
                    <strong>{getDetailTranslation("origin")}:</strong>{" "}
                    {selectedArtifact.culture}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{getDetailTranslation("age")}:</strong>{" "}
                    {selectedArtifact.age}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{getDetailTranslation("materials")}:</strong>{" "}
                    {selectedArtifact.materials}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{getDetailTranslation("category")}:</strong>{" "}
                    {selectedArtifact.tags
                      .map((tag) => getCategoryTranslation(tag))
                      .join(", ")}
                  </DetailProperty>
                </DetailInfoSection>

                <CloseButton onClick={() => setSelectedArtifact(null)}>
                  ✕
                </CloseButton>
              </DetailContent>
            </ArtifactDetail>
          )}
        </AnimatePresence>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
};

export default TribalArtifacts;
