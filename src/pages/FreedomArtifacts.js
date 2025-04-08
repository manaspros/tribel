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
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  const artifacts = [
    {
      id: 1,
      title: "Revolutionary Flag",
      description:
        "Handcrafted flags carried by tribal freedom fighters during resistance movements against colonial rule.",
      emoji: "🚩",
      tags: ["Historical", "Symbolic"],
      origin: "Bastar Region",
      age: "Circa 1910",
      materials: "Hand-spun cotton, natural dyes",
      significance:
        "This flag was carried by tribal warriors during the Bhumkal Revolt of 1910. The distinctive red color represents the blood shed for freedom, while the triangular shape symbolizes the mountains that sheltered rebel forces. It served both as a rallying symbol and a means of communication during coordinated attacks against colonial outposts.",
    },
    {
      id: 2,
      title: "War Drum",
      description:
        "Ceremonial drum used to rally tribal communities and coordinate resistance movements during uprisings.",
      emoji: "🥁",
      tags: ["Communication", "Cultural"],
      origin: "Multiple tribal regions",
      age: "19th Century",
      materials: "Hollowed tree trunk, animal hide, natural fibers",
      significance:
        "These drums played a crucial role in tribal uprisings, serving as a sophisticated communication system that could relay messages across vast distances. Each rhythm pattern conveyed specific information: calls to assemble, warnings of approaching enemy forces, or signals to begin coordinated attacks. Colonial authorities frequently confiscated and destroyed these drums, recognizing their strategic importance to resistance movements.",
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
    {
      id: 4,
      title: "Tribal Declaration of Rights",
      description:
        "Written proclamations asserting tribal autonomy, land rights, and self-governance during freedom struggles.",
      emoji: "📝",
      tags: ["Political", "Document"],
      origin: "Jharkhand Movement",
      age: "1970s",
      materials: "Paper, printed text",
      significance:
        "This declaration articulates the demands for tribal self-determination that formed the foundation of the Jharkhand Movement. The document establishes the historical, cultural, and legal bases for tribal autonomy, explicitly challenging both colonial-era policies and post-independence governance that marginalized indigenous communities. It represents an important assertion of tribal political identity and rights consciousness.",
    },
    {
      id: 5,
      title: "Traditional Bow and Arrows",
      description:
        "Weapons used by tribal resistance fighters during uprisings against colonial forces and oppressive authorities.",
      emoji: "🏹",
      tags: ["Weapon", "Resistance"],
      origin: "Halba Rebellion",
      age: "Early 19th Century",
      materials: "Bamboo, iron tips, plant-based poisons",
      significance:
        "These weapons exemplify how tribal communities adapted traditional hunting tools for warfare against technologically superior colonial forces. The arrows feature specialized iron tips designed to penetrate the leather armor worn by company soldiers, while some were tipped with poison extracted from local plants. Despite being outgunned, tribal fighters used their intimate knowledge of terrain and guerrilla tactics to mount effective resistance campaigns.",
    },
    {
      id: 6,
      title: "Gandhi's Correspondence with Tribal Leaders",
      description:
        "Letters documenting Gandhi's support for and engagement with tribal freedom movements across India.",
      emoji: "👓",
      tags: ["National", "Symbolic"],
      origin: "Various regions",
      age: "1930s-1940s",
      materials: "Paper, handwritten text",
      significance:
        "This rare collection demonstrates how tribal resistance movements connected with the broader national independence struggle. The correspondence reveals Gandhi's recognition of the unique challenges facing tribal communities and his efforts to incorporate their concerns into the Congress platform. These documents challenge the common perception that tribal resistance existed in isolation from the mainstream independence movement.",
    },
    {
      id: 7,
      title: "Protest Headband",
      description:
        "Distinctive headbands worn by tribal protesters during the Narmada Bachao Andolan resistance movement.",
      emoji: "👑",
      tags: ["Protest", "Identity"],
      origin: "Narmada Valley",
      age: "1990s",
      materials: "Cotton, natural dyes, embroidery",
      significance:
        "These headbands emerged as powerful symbols of tribal identity and resistance during the Narmada Bachao Andolan. The distinctive patterns and colors identified protesters' tribal affiliations while creating visual solidarity during demonstrations. The embroidered slogans combined traditional tribal motifs with contemporary protest messages, embodying the movement's blend of indigenous rights advocacy and environmental justice.",
    },
    {
      id: 8,
      title: "Movement Photographs",
      description:
        "Rare photographic documentation of tribal freedom struggles, resistance activities, and movement leaders.",
      emoji: "📷",
      tags: ["Historical", "Documentation"],
      origin: "Multiple regions",
      age: "20th Century",
      materials: "Silver gelatin prints, photographic paper",
      significance:
        "This photographic collection provides crucial visual documentation of tribal resistance movements that were often deliberately excluded from official historical records. The images capture both dramatic moments of confrontation and everyday aspects of movement organizing, offering insights into the scale, diversity, and human dimension of tribal freedom struggles across different regions and time periods.",
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
          Our collection features authentic artifacts from tribal freedom
          struggles across India, each telling a powerful story of resistance,
          sacrifice, and determination. These objects provide tangible
          connections to indigenous communities' fight for dignity, autonomy,
          and justice throughout history—from early rebellions against colonial
          powers to modern movements for self-determination and environmental
          justice.
        </CollectionIntro>

        <FilterContainer>
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All Artifacts
          </FilterButton>
          <FilterButton
            active={filter === "Historical"}
            onClick={() => setFilter("Historical")}
          >
            Historical
          </FilterButton>
          <FilterButton
            active={filter === "Symbolic"}
            onClick={() => setFilter("Symbolic")}
          >
            Symbolic
          </FilterButton>
          <FilterButton
            active={filter === "Weapon"}
            onClick={() => setFilter("Weapon")}
          >
            Weapons
          </FilterButton>
          <FilterButton
            active={filter === "Document"}
            onClick={() => setFilter("Document")}
          >
            Documents
          </FilterButton>
          <FilterButton
            active={filter === "Protest"}
            onClick={() => setFilter("Protest")}
          >
            Protest Items
          </FilterButton>
        </FilterContainer>

        <ArtifactsGrid>
          {filteredArtifacts.map((artifact, index) => (
            <ArtifactCard
              key={artifact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setSelectedArtifact(artifact)}
            >
              <ArtifactImage>{artifact.emoji}</ArtifactImage>
              <ArtifactInfo>
                <ArtifactTitle>{artifact.title}</ArtifactTitle>
                <ArtifactDescription>
                  {artifact.description}
                </ArtifactDescription>
                <ArtifactTags>
                  {artifact.tags.map((tag) => (
                    <ArtifactTag key={tag}>{tag}</ArtifactTag>
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
                  <DetailTitle>{selectedArtifact.title}</DetailTitle>
                  <DetailDescription>
                    {selectedArtifact.significance}
                  </DetailDescription>

                  <DetailProperty>
                    <strong>Origin:</strong> {selectedArtifact.origin}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>Age:</strong> {selectedArtifact.age}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>Materials:</strong> {selectedArtifact.materials}
                  </DetailProperty>
                  <DetailProperty>
                    <strong>Category:</strong>{" "}
                    {selectedArtifact.tags.join(", ")}
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
