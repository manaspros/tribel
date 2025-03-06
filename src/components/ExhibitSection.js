import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const ExhibitContainer = styled.section`
  min-height: 100vh;
  padding: 100px 0;
  background: linear-gradient(to bottom, #1a1410, #2a231c);
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: #d3a164;
  margin-bottom: 80px;
  font-family: "Playfair Display", serif;
`;

const ExhibitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  padding: 0 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const ExhibitCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.7);
  border-radius: 15px;
  overflow: hidden;
  height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  position: relative; /* Add this to make sure z-index works */
  z-index: 1; /* Add a base z-index */

  &:hover {
    z-index: 10; /* Increase z-index on hover to ensure it stays above others */
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  }
`;

const ExhibitImage = styled.div`
  height: 250px;
  position: relative;
  background: #1a1410;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ArtifactImage = styled.div`
  width: 80%;
  height: 80%;
  background-color: #d3a164;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s ease;

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

const ExhibitInfo = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const ExhibitTitle = styled.h3`
  font-size: 1.5rem;
  color: #d3a164;
  margin-bottom: 10px;
`;

const exhibits = [
  {
    id: 1,
    title: "Tribal War Axe",
    description:
      "An ornate ceremonial war axe used by tribal chieftains in battle.",
    shape: "hexagon",
  },
  {
    id: 2,
    title: "Dhokra Art",
    description:
      "Traditional lost-wax metal casting technique dating back over 4,000 years.",
    shape: "circle",
  },
  {
    id: 3,
    title: "Tribal Mask",
    description:
      "Ceremonial mask used during harvest festivals and spiritual rituals.",
    shape: "triangle",
  },
  // More exhibits
];

// Shape components for different artifacts
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
    default:
      return <ArtifactImage />;
  }
};

const ExhibitSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

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
      <SectionTitle>Virtual Exhibit Gallery</SectionTitle>

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
              <ExhibitTitle>{exhibit.title}</ExhibitTitle>
              <p>{exhibit.description}</p>
            </ExhibitInfo>
          </ExhibitCard>
        ))}
      </ExhibitsGrid>
    </ExhibitContainer>
  );
};

export default ExhibitSection;
