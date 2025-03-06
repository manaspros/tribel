import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import forestBg from "../assets/forest-bg.jpg";
import villageSilhouette from "../assets/village-silhouette.png";
import foregroundElements from "../assets/foreground-elements.png";

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
`;

// Add an overlay to improve text visibility
const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(26, 20, 16, 0.4),
    rgba(26, 20, 16, 0.7)
  );
  z-index: 5;
`;

const TitleContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  color: #f5efe7;
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(4px);
  background: rgba(26, 20, 16, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-width: 90%;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 7rem);
  margin: 0;
  font-family: "Playfair Display", serif;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6),
    0 0 40px rgba(0, 0, 0, 0.4);
  color: #f5efe7;
  font-weight: 700;

  span {
    display: inline-block;
  }
`;

const Tagline = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-top: 1.5rem;
  font-family: "Poppins", sans-serif;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  line-height: 1.6;
`;

const FireAnimation = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  height: 20vh;
  z-index: 5;
`;

// Add this new component for a call-to-action button
const ScrollDownIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
    fill: #d3a164;
    margin-top: 10px;
  }

  span {
    color: #d3a164;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();
    tl.from(".title-char", {
      opacity: 0,
      y: 100,
      duration: 1,
      stagger: 0.08,
      ease: "back.out(1.7)",
    });

    tl.from(
      ".tagline",
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Add animation for scroll indicator
    tl.from(
      ".scroll-indicator",
      {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.2"
    );

    // Setup fire animation
    gsap.to(".fire-animation", {
      backgroundPosition: "0 100%",
      duration: 15,
      ease: "linear",
      repeat: -1,
    });

    return () => {
      // Cleanup animations
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <HeroContainer ref={containerRef}>
      <ParallaxLayer
        style={{
          backgroundImage: `url(${forestBg})`,
          y: backgroundY,
        }}
      />
      <ParallaxLayer
        style={{
          backgroundImage: `url(${villageSilhouette})`,
          y: midgroundY,
        }}
      />
      <ParallaxLayer
        style={{
          backgroundImage: `url(${foregroundElements})`,
          y: foregroundY,
        }}
      />

      <DarkOverlay />

      <FireAnimation className="fire-animation">
        {/* Fire and dancers animation will be inserted here */}
      </FireAnimation>

      <TitleContainer>
        <Title aria-label="Tribal Heritage Museum">
          {"Tribal Heritage Museum".split("").map((char, i) => (
            <motion.span className="title-char" key={i}>
              {char}
            </motion.span>
          ))}
        </Title>
        <Tagline className="tagline">
          Journey through time and experience the vibrant culture and resilient
          spirit of indigenous communities
        </Tagline>
      </TitleContainer>

      <ScrollDownIndicator
        className="scroll-indicator"
        onClick={handleScrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span>Explore</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
