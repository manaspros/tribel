import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  margin-bottom: 30px;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const ArtifactsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
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

const ArtifactsDescription = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
`;

const ArtifactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArtifactCard = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const ArtifactImage = styled.div`
  height: 280px;
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
`;

const ArtifactTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 12px;
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
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const artifacts = [
    {
      id: 1,
      title: "Ceremonial War Axe",
      description:
        "An ornate ceremonial war axe used by tribal chieftains in battle and important tribal ceremonies.",
      emoji: "🪓",
      tags: ["Weapon", "Ceremonial"],
      culture: "Gond Tribe",
      age: "Circa 1750",
      materials: "Iron, Wood, Leather, Semi-precious stones",
      significance:
        "This ceremonial axe represents the authority of tribal chiefs and was used in both warfare and ritual ceremonies. The intricate carvings depict ancestral spirits and hunting scenes that tell the story of the tribe's history.",
    },
    {
      id: 2,
      title: "Dhokra Horse Figurine",
      description:
        "Traditional lost-wax metal casting technique dating back over 4,000 years, showcasing exceptional craftsmanship.",
      emoji: "🏺",
      tags: ["Crafts", "Ancient"],
      culture: "Bastar Region",
      age: "Contemporary (using ancient techniques)",
      materials: "Bronze alloy",
      significance:
        "Dhokra is one of the oldest traditional metal casting techniques still practiced today. This horse figurine demonstrates the precision and artistic expression of tribal artisans who have preserved this ancient craft for millennia.",
    },
    {
      id: 3,
      title: "Ritual Harvest Mask",
      description:
        "Ceremonial mask used during harvest festivals and spiritual rituals to invoke blessings from nature deities.",
      emoji: "🎭",
      tags: ["Ritual", "Spiritual"],
      culture: "Warli Tribe",
      age: "Early 20th Century",
      materials: "Wood, Natural pigments, Feathers",
      significance:
        "This mask embodies the spiritual connection between tribal communities and natural forces. Worn by shamans during harvest ceremonies, it's believed to channel ancestral spirits who ensure abundant crops and community prosperity.",
    },
    {
      id: 4,
      title: "Medicinal Herb Collection",
      description:
        "Collection of medicinal herbs used by tribal healers to treat various ailments, based on knowledge passed down for generations.",
      emoji: "🌿",
      tags: ["Medicine", "Natural"],
      culture: "Multiple Tribal Groups",
      age: "Contemporary (ongoing tradition)",
      materials: "Various dried herbs, roots, and leaves",
      significance:
        "This collection represents the sophisticated pharmacological knowledge of tribal healers. These plants have been used for centuries to treat ailments ranging from common infections to chronic conditions, many containing compounds now validated by modern medicine.",
    },
    {
      id: 5,
      title: "Ceremonial Necklace",
      description:
        "Ornate jewelry pieces made from natural materials like seeds, bones, and metals, signifying social status and tribal affiliations.",
      emoji: "💍",
      tags: ["Adornment", "Cultural"],
      culture: "Banjara Tribe",
      age: "Mid-19th Century",
      materials: "Silver, Glass beads, Coins, Cotton thread",
      significance:
        "This elaborate necklace was traditionally worn by women during important ceremonies and festivals. The silver coins and intricate beadwork not only displayed family wealth but also served as portable assets in nomadic communities.",
    },
    {
      id: 6,
      title: "Tribal Drum",
      description:
        "Traditional percussive instrument used in celebrations, rituals and storytelling sessions, creating unique rhythms and melodies.",
      emoji: "🥁",
      tags: ["Music", "Performance"],
      culture: "Santhal Tribe",
      age: "Early 20th Century",
      materials: "Wood, Animal hide, Natural fibers",
      significance:
        "This ceremonial drum formed the heartbeat of tribal gatherings, used to communicate across distances and to accompany traditional dances. The specific rhythmic patterns played on this drum were integral to tribal identity and oral history transmission.",
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
          {t(
            "Our curated collection features authentic tribal artifacts that showcase the remarkable craftsmanship, cultural significance, and artistic traditions of indigenous communities. Each piece tells a story of heritage, spiritual beliefs, and the profound connection between tribal peoples and their environment."
          )}
        </ArtifactsDescription>

        <ArtifactsHeader>
          <FilterContainer>
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              {t("All Categories")}
            </FilterButton>
            <FilterButton
              active={filter === "Weapon"}
              onClick={() => setFilter("Weapon")}
            >
              {t("Weapons")}
            </FilterButton>
            <FilterButton
              active={filter === "Ceremonial"}
              onClick={() => setFilter("Ceremonial")}
            >
              {t("Ceremonial")}
            </FilterButton>
            <FilterButton
              active={filter === "Crafts"}
              onClick={() => setFilter("Crafts")}
            >
              {t("Crafts")}
            </FilterButton>
            <FilterButton
              active={filter === "Ritual"}
              onClick={() => setFilter("Ritual")}
            >
              {t("Ritual")}
            </FilterButton>
            <FilterButton
              active={filter === "Music"}
              onClick={() => setFilter("Music")}
            >
              {t("Music")}
            </FilterButton>
          </FilterContainer>
        </ArtifactsHeader>

        <ArtifactsGrid>
          {filteredArtifacts.map((artifact, index) => (
            <ArtifactCard
              key={artifact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedArtifact(artifact)}
              whileHover={{ y: -10 }}
            >
              <ArtifactImage>{artifact.emoji}</ArtifactImage>
              <ArtifactInfo>
                <ArtifactTitle>{artifact.title}</ArtifactTitle>
                <ArtifactDescription>
                  {artifact.description}
                </ArtifactDescription>
                <ArtifactTags>
                  {artifact.tags.map((tag) => (
                    <ArtifactTag key={tag}>{t(tag)}</ArtifactTag>
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
              >
                <DetailImageSection>
                  <div className="emoji">{selectedArtifact.emoji}</div>
                </DetailImageSection>
                <DetailInfoSection>
                  <DetailTitle>{selectedArtifact.title}</DetailTitle>
                  <DetailDescription>
                    {selectedArtifact.significance}
                  </DetailDescription>

                  <DetailProperty>
                    <strong>{t("Origin")}:</strong> {selectedArtifact.culture}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{t("Age")}:</strong> {selectedArtifact.age}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{t("Materials")}:</strong>{" "}
                    {selectedArtifact.materials}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>{t("Category")}:</strong>{" "}
                    {selectedArtifact.tags.map((tag) => t(tag)).join(", ")}
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
