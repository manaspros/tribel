import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import forestBg from "../assets/forest-bg.jpeg";
import villageSilhouette from "../assets/village-silhouette.jpg";
import foregroundElements from "../assets/foreground-elements.jpg";

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

// Improved overlay with stronger gradient
const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(26, 20, 16, 0.6),
    rgba(26, 20, 16, 0.8)
  );
  z-index: 5;
`;

// Enhanced title container with better contrast
const TitleContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  color: #f5efe7;
  padding: 40px;
  border-radius: 15px;
  backdrop-filter: blur(8px);
  background: rgba(26, 20, 16, 0.65);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(211, 161, 100, 0.3) inset;
  max-width: 90%;
`;

// Stronger text styling
const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 7rem);
  margin: 0;
  font-family: "Playfair Display", serif;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7),
    0 0 40px rgba(0, 0, 0, 0.5);
  color: #fff;
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
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.9);
  line-height: 1.6;
  color: #eee;
`;

// Enhanced Fire Animation with larger size and more visibility
const FireAnimation = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 35vh;
  z-index: 6;
  background: linear-gradient(to top, #ff6600, transparent);
  mask-image: url("/assets/fire-effect.jpeg");
  mask-size: 100% 100%;
  mask-repeat: repeat-x;
  opacity: 0.8;
  transform: translateY(30%);
`;

const FireGlow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background: radial-gradient(
    ellipse at center bottom,
    rgba(255, 102, 0, 0.5) 0%,
    transparent 70%
  );
  z-index: 5;
  pointer-events: none;
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
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Remove figure refs, keep only fire refs
  const fireRef = useRef(null);
  const fireGlowRef = useRef(null);

  useEffect(() => {
    // Store refs in variables to use in cleanup function
    const fire = fireRef.current;
    const fireGlow = fireGlowRef.current;

    // GSAP animations for text
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

    // Enhanced fire animations
    let fireAnim1, fireAnim2;
    if (fire) {
      // Create flickering effect with wider range
      fireAnim1 = gsap.to(fire, {
        opacity: gsap.utils.wrap([0.6, 0.9]),
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        repeatRefresh: true,
      });

      // Create horizontal movement
      fireAnim2 = gsap.to(fire, {
        backgroundPosition: "-800px 0",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
    }

    // Fire glow animation with more intensity
    let fireGlowAnim;
    if (fireGlow) {
      fireGlowAnim = gsap.to(fireGlow, {
        opacity: gsap.utils.wrap([0.4, 0.7]),
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      // Cleanup animations
      if (fireAnim1) fireAnim1.kill();
      if (fireAnim2) fireAnim2.kill();
      if (fireGlowAnim) fireGlowAnim.kill();

      gsap.killTweensOf([".title-char", ".tagline", ".scroll-indicator"]);
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
          backgroundSize: "cover",
          backgroundPosition: "center",
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

      {/* Enhanced fire effects only */}
      <FireGlow ref={fireGlowRef} />
      <FireAnimation ref={fireRef} />

      <TitleContainer>
        <Title aria-label={`${t("tribal")} ${t("heritageMuseum")}`}>
          <span style={{ color: "#d3a164" }}>{t("tribal")}</span>{" "}
          {t("heritageMuseum")}
        </Title>
        <Tagline className="tagline">{t("journeyText")}</Tagline>
      </TitleContainer>

      <ScrollDownIndicator
        className="scroll-indicator"
        onClick={handleScrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span>{t("explore")}</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
