import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const CTAContainer = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #241c16 0%, #1a1410 100%);
  position: relative;
  overflow: hidden;
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d3a164' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.6;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 30px;
  color: #d3a164;
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 700px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;

const CTAButton = styled(motion.div)`
  position: relative;
  padding: 18px 36px;
  font-size: 1.1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: transparent;
  color: #f5efe7;
  border: 2px solid #d3a164;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background: rgba(211, 161, 100, 0.3);
    transition: all 0.3s ease;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }
`;

const PrimaryButton = styled(CTAButton)`
  background: #d3a164;
  color: #1a1410;
  border: none;

  &::before {
    background: #c08b51;
  }
`;

// Add animated decoration elements
const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(211, 161, 100, 0.15);
  filter: blur(5px);
  z-index: 1;
  pointer-events: none;
`;

// Add decorative elements for improved desktop alignment
const SideDecoration = styled.div`
  position: absolute;
  width: 150px;
  height: 300px;
  border: 2px solid rgba(211, 161, 100, 0.2);
  z-index: 1;

  &.left {
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    border-right: none;
    border-top-left-radius: 75px;
    border-bottom-left-radius: 75px;
  }

  &.right {
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    border-left: none;
    border-top-right-radius: 75px;
    border-bottom-right-radius: 75px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const CTASection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    // ... existing code ...
  }, []);

  // Floating decoration elements
  const floatingElements = [
    { size: 100, x: "10%", y: "20%", duration: 15 },
    { size: 70, x: "70%", y: "15%", duration: 12 },
    { size: 120, x: "80%", y: "70%", duration: 18 },
    { size: 50, x: "30%", y: "80%", duration: 10 },
  ];

  return (
    <CTAContainer ref={sectionRef}>
      <PatternOverlay />

      {/* Add side decorations for better desktop alignment */}
      <SideDecoration className="left" />
      <SideDecoration className="right" />

      {/* Add floating decorative elements */}
      {floatingElements.map((el, index) => (
        <FloatingElement
          key={index}
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
          }}
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -15, 15, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <ContentWrapper>
        <Title
          as={motion.h2}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t("experienceRichHeritage")}
        </Title>
        <Description
          as={motion.p}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("stepIntoWorld")}
        </Description>

        <ButtonGroup
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PrimaryButton
            ref={buttonRef}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(211, 161, 100, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            as={Link}
            to="/book-now"
          >
            {t("bookGuidedTour")}
          </PrimaryButton>

          <CTAButton
            as={Link}
            to="/virtual-tour"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(211, 161, 100, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t("virtualTour")}
          </CTAButton>
        </ButtonGroup>
      </ContentWrapper>
    </CTAContainer>
  );
};

export default CTASection;
