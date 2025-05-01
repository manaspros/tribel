import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import artifactDescriptions from "../data/artifactDescriptions.json";

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
  margin-bottom: 30px;
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

const CollectionIntro = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${(props) =>
    props.active ? "#d3a164" : "rgba(211, 161, 100, 0.2)"};
  color: ${(props) => (props.active ? "#1a1410" : "#d3a164")};
  border: 1px solid #d3a164;
  border-radius: 30px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${(props) =>
      props.active ? "#e0b175" : "rgba(211, 161, 100, 0.3)"};
  }
`;

const ArtifactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const ArtifactCard = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  transition: all 0.3s ease;
`;

const ArtifactImage = styled.div`
  height: 220px;
  background-color: #2c231c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d3a164;
  font-size: 5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(211, 161, 100, 0.2),
      transparent 70%
    );
    pointer-events: none;
  }
`;

const ArtifactInfo = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ArtifactTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-family: "Playfair Display", serif;
`;

const ArtifactDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ArtifactTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const ArtifactTag = styled.span`
  background-color: rgba(211, 161, 100, 0.15);
  color: #d3a164;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailImageSection = styled.div`
  background-color: #2c231c;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 300px;

  .emoji {
    font-size: 9rem;
  }
`;

const DetailInfoSection = styled.div`
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

const FreedomArtifacts = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const getArtifactTranslation = (artifactKey, field) => {
    if (
      artifactDescriptions.freedomArtifacts[artifactKey] &&
      artifactDescriptions.freedomArtifacts[artifactKey][field] &&
      artifactDescriptions.freedomArtifacts[artifactKey][field][language]
    ) {
      return artifactDescriptions.freedomArtifacts[artifactKey][field][
        language
      ];
    }
    return `Translation missing for ${artifactKey}.${field}`;
  };

  const getCategoryTranslation = (category) => {
    const lowerCategory = category.toLowerCase();
    if (
      artifactDescriptions.categoryLabels[lowerCategory] &&
      artifactDescriptions.categoryLabels[lowerCategory][language]
    ) {
      return artifactDescriptions.categoryLabels[lowerCategory][language];
    }
    return category;
  };

  const getDetailTranslation = (detail) => {
    if (
      artifactDescriptions.detailLabels[detail] &&
      artifactDescriptions.detailLabels[detail][language]
    ) {
      return artifactDescriptions.detailLabels[detail][language];
    }
    return detail;
  };

  const artifacts = [
    {
      id: 1,
      artifactKey: "revolutionaryFlag",
      emoji: "🚩",
      tags: ["Historical", "Symbolic"],
      origin: "Bastar Region",
      age: "Circa 1910",
      materials: "Hand-spun cotton, natural dyes",
    },
    {
      id: 2,
      artifactKey: "warDrum",
      emoji: "🥁",
      tags: ["Communication", "Cultural"],
      origin: "Multiple tribal regions",
      age: "19th Century",
      materials: "Hollowed tree trunk, animal hide, natural fibers",
    },
    {
      id: 3,
      title: "Revolutionary Correspondence",
      description:
        "Rare letters exchanged between tribal leaders planning resistance strategies against colonial oppression.",
      emoji: "📜",
      tags: ["Document", "Historical"],
      origin: "Central India",
      age: "Early 20th Century",
      materials: "Handmade paper, natural inks",
      significance:
        "This collection of letters reveals the sophisticated organizational networks that tribal resistance leaders developed. Written in indigenous languages and often using coded language to avoid detection, these documents detail planned uprisings, resource distribution, and alliance-building between different tribal communities. They provide crucial evidence that tribal resistance was strategically coordinated rather than spontaneous.",
    },
  ];

  const filteredArtifacts =
    filter === "all"
      ? artifacts
      : artifacts.filter((artifact) => artifact.tags.includes(filter));

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
          {t("Our Collection")}
        </PageTitle>

        <CollectionIntro>
          {artifactDescriptions.freedomArtifactsIntro[language]}
        </CollectionIntro>

        <FilterContainer>
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {getCategoryTranslation("all")}
          </FilterButton>
          <FilterButton
            active={filter === "Historical"}
            onClick={() => setFilter("Historical")}
          >
            {getCategoryTranslation("historical")}
          </FilterButton>
          <FilterButton
            active={filter === "Symbolic"}
            onClick={() => setFilter("Symbolic")}
          >
            {getCategoryTranslation("symbolic")}
          </FilterButton>
          <FilterButton
            active={filter === "Weapon"}
            onClick={() => setFilter("Weapon")}
          >
            {getCategoryTranslation("weapon")}
          </FilterButton>
          <FilterButton
            active={filter === "Document"}
            onClick={() => setFilter("Document")}
          >
            {getCategoryTranslation("document")}
          </FilterButton>
          <FilterButton
            active={filter === "Protest"}
            onClick={() => setFilter("Protest")}
          >
            {getCategoryTranslation("protest")}
          </FilterButton>
        </FilterContainer>

        <ArtifactsGrid>
          {filteredArtifacts.map((artifact, index) => (
            <ArtifactCard
              key={`artifact-${artifact.id}-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedArtifact(artifact)}
            >
              <ArtifactImage>{artifact.emoji}</ArtifactImage>
              <ArtifactInfo>
                <ArtifactTitle>
                  {artifact.artifactKey
                    ? getArtifactTranslation(artifact.artifactKey, "title")
                    : artifact.title}
                </ArtifactTitle>
                <ArtifactDescription>
                  {artifact.artifactKey
                    ? getArtifactTranslation(
                        artifact.artifactKey,
                        "description"
                      )
                    : artifact.description}
                </ArtifactDescription>
                <ArtifactTags>
                  {artifact.tags.map((tag) => (
                    <ArtifactTag key={tag}>
                      {getCategoryTranslation(tag)}
                    </ArtifactTag>
                  ))}
                </ArtifactTags>
              </ArtifactInfo>
            </ArtifactCard>
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
                transition={{ type: "spring", damping: 20 }}
              >
                <DetailImageSection>
                  <div className="emoji">{selectedArtifact.emoji}</div>
                </DetailImageSection>
                <DetailInfoSection>
                  <DetailTitle>
                    {selectedArtifact.artifactKey
                      ? getArtifactTranslation(
                          selectedArtifact.artifactKey,
                          "title"
                        )
                      : selectedArtifact.title}
                  </DetailTitle>
                  <DetailDescription>
                    {selectedArtifact.artifactKey
                      ? getArtifactTranslation(
                          selectedArtifact.artifactKey,
                          "significance"
                        )
                      : selectedArtifact.significance}
                  </DetailDescription>

                  <DetailProperty>
                    <strong>{getDetailTranslation("origin")}:</strong>{" "}
                    {selectedArtifact.origin}
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

export default FreedomArtifacts;
