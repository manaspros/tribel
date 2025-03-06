import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gsap from "gsap";
import tribalPattern from "../assets/tribal-pattern.svg";

const CTAContainer = styled.section`
  min-height: 60vh;
  padding: 100px 0;
  background: #1a1410;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const PatternOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${tribalPattern});
  opacity: 0.1;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: #f5efe7;
  position: relative;
  z-index: 2;
  max-width: 800px;
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
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
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
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50px;
    background: transparent;
    z-index: -1;
    pointer-events: none;
  }
`;

const PrimaryButton = styled(CTAButton)`
  background: #d3a164;
  color: #1a1410;
`;

const CTASection = () => {
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Tribal motif animation around the primary button
    const btn = buttonRef.current;

    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    tl.to(btn.querySelector("::before"), {
      duration: 2,
      boxShadow: "0 0 20px 5px rgba(211, 161, 100, 0.6)",
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <CTAContainer ref={sectionRef}>
      <PatternOverlay />

      <ContentWrapper>
        <Title>Experience Our Rich Heritage</Title>
        <Description>
          Step into a world of ancient traditions, resilient spirits, and
          cultural wonders. Our guided tours offer an immersive journey through
          the heart of tribal history.
        </Description>

        <ButtonGroup>
          <PrimaryButton
            ref={buttonRef}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Guided Tour
          </PrimaryButton>

          <CTAButton
            as={Link}
            to="/virtual-tour"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Virtual Tour
          </CTAButton>
        </ButtonGroup>
      </ContentWrapper>
    </CTAContainer>
  );
};

export default CTASection;
