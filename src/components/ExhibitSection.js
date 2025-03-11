import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "../contexts/LanguageContext";

// Enhanced background with texture and depth
const ExhibitContainer = styled.section`
  min-height: 100vh;
  padding: 120px 0;
  background: linear-gradient(to bottom, #1a1410, #2a231c);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/assets/subtle-pattern.png");
    background-repeat: repeat;
    opacity: 0.05;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, #241c16, transparent);
  }
`;

// Enhanced title with decorative elements
const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: #d3a164;
  margin-bottom: 30px;
  font-family: "Playfair Display", serif;
  position: relative;
  z-index: 2;

  &::before,
  &::after {
    content: "❖";
    display: inline-block;
    vertical-align: middle;
    color: rgba(211, 161, 100, 0.5);
    margin: 0 15px;
    font-size: 0.8em;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 80px;
  color: #f5efe7;
  opacity: 0.8;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.6;
  z-index: 2;
  position: relative;
`;

// Improved grid layout with better spacing and responsive design
const ExhibitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 50px;
  padding: 0 5%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const ExhibitCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.7);
  border-radius: 15px;
  overflow: hidden;
  height: 450px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(211, 161, 100, 0.1);

  &:hover {
    z-index: 10;
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(211, 161, 100, 0.3);
    border-color: rgba(211, 161, 100, 0.3);
  }
`;

// Updated image container with improved lighting effects
const ExhibitImage = styled.div`
  height: 280px;
  position: relative;
  background: radial-gradient(circle at center, #2a231c, #1a1410);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(211, 161, 100, 0.2),
      transparent
    );
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle at center,
      rgba(211, 161, 100, 0.1),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  ${ExhibitCard}:hover &::after {
    opacity: 1;
  }
`;

const ArtifactImage = styled.div`
  width: 75%;
  height: 75%;
  background-color: #d3a164;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;

  ${ExhibitCard}:hover & {
    transform: rotate3d(1, 1, 0, 15deg);
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: rgba(211, 161, 100, 0.7);
  }

  &::before {
    width: 100%;
    height: 20px;
    bottom: -10px;
    left: 10px;
    transform: skewX(45deg);
  }

  &::after {
    width: 20px;
    height: 100%;
    top: 10px;
    right: -10px;
    transform: skewY(45deg);
  }
`;

// Enhanced info section with better typography and spacing
const ExhibitInfo = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(211, 161, 100, 0.1);
`;

const ExhibitTitle = styled.h3`
  font-size: 1.5rem;
  color: #d3a164;
  margin-bottom: 12px;
  font-family: "Playfair Display", serif;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: rgba(211, 161, 100, 0.5);
  }
`;

const ExhibitDescription = styled.p`
  color: #f5efe7;
  font-size: 0.95rem;
  line-height: 1.6;
  opacity: 0.9;
`;

// New component for exhibit tags
const ExhibitTags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 15px;
`;

const ExhibitTag = styled.span`
  background: rgba(211, 161, 100, 0.15);
  color: #d3a164;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  white-space: nowrap;
`;

// Shape components for different artifacts with enhanced designs
const ShapedArtifact = ({ shape }) => {
  switch (shape) {
    case "circle":
      return <ArtifactImage style={{ borderRadius: "50%" }} />;
    case "triangle":
      return (
        <ArtifactImage
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      );
    case "hexagon":
      return (
        <ArtifactImage
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        />
      );
    case "rectangle":
      return <ArtifactImage style={{ borderRadius: "5px" }} />;
    case "diamond":
      return (
        <ArtifactImage
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
        />
      );
    case "octagon":
      return (
        <ArtifactImage
          style={{
            clipPath:
              "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
          }}
        />
      );
    default:
      return <ArtifactImage />;
  }
};

const ExhibitSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { t, language } = useLanguage();

  // Define exhibits with translation keys
  const exhibits = [
    {
      id: 1,
      title: "tribalWarAxe",
      description: "tribalWarAxeDesc",
      shape: "hexagon",
      tags: ["Weapon", "Ceremonial"],
    },
    {
      id: 2,
      title: "dhokraArt",
      description: "dhokraArtDesc",
      shape: "circle",
      tags: ["Crafts", "Ancient"],
    },
    {
      id: 3,
      title: "tribalMask",
      description: "tribalMaskDesc",
      shape: "triangle",
      tags: ["Ritual", "Spiritual"],
    },
    {
      id: 4,
      title: "Healing Herbs",
      description: "Collection of medicinal herbs",
      shape: "rectangle",
      tags: ["Medicine", "Natural"],
    },
    {
      id: 5,
      title: "Tribal Jewelry",
      description: "Ornate jewelry pieces",
      shape: "diamond",
      tags: ["Adornment", "Cultural"],
    },
    {
      id: 6,
      title: "Musical Instruments",
      description: "Traditional instruments",
      shape: "octagon",
      tags: ["Music", "Performance"],
    },
  ];

  useEffect(() => {
    if (isInView) {
      gsap.to(".exhibit-card", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, [isInView]);

  return (
    <ExhibitContainer ref={sectionRef}>
      <SectionTitle>{t("virtualExhibitGallery")}</SectionTitle>
      <SectionSubtitle>{t("Explore our collection")}</SectionSubtitle>

      <ExhibitsGrid>
        {exhibits.map((exhibit) => (
          <ExhibitCard
            key={exhibit.id}
            className="exhibit-card"
            initial={{ y: 50, opacity: 0 }}
          >
            <ExhibitImage>
              <ShapedArtifact shape={exhibit.shape} />
            </ExhibitImage>
            <ExhibitInfo>
              <ExhibitTitle>{t(exhibit.title)}</ExhibitTitle>
              <ExhibitDescription>{t(exhibit.description)}</ExhibitDescription>
              <ExhibitTags>
                {exhibit.tags.map((tag, index) => (
                  <ExhibitTag key={index}>{t(tag)}</ExhibitTag>
                ))}
              </ExhibitTags>
            </ExhibitInfo>
          </ExhibitCard>
        ))}
      </ExhibitsGrid>
    </ExhibitContainer>
  );
};

export default ExhibitSection;
