import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import forestBg from "../assets/forest-bg.jpeg";
import villageSilhouette from "../assets/village-silhouette.jpg";
import foregroundElements from "../assets/tribel/freedom-banner.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroContainer = styled.section`
  height: 110vh; /* Increased from 100vh to 110vh to make the section taller */
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

const TitleContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  text-align: center;
  color: #f5efe7;
  padding: 200px 20px 40px; /* Increased top padding from 150px to 200px */
  border-radius: 15px;
  background: rgba(26, 20, 16, 0);
  width: 100%;
  max-width: 90%;

  @media (max-width: 768px) {
    padding: 170px 15px 20px; /* Increased from 120px to 170px */
    width: 95%;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* Extra small screens may need even more padding adjustment */
  @media (max-width: 480px) {
    padding-top: 150px; /* Increased from 100px to 150px */
  }
`;

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

  @media (max-width: 768px) {
    height: 25vh;
    transform: translateY(20%);
  }
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

  @media (max-width: 768px) {
    height: 35vh;
  }
`;

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
  background: rgba(26, 20, 16, 0.4);
  padding: 12px 20px 8px;
  border-radius: 30px;
  border: 1px solid rgba(211, 161, 100, 0.3);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(26, 20, 16, 0.6);
    border-color: rgba(211, 161, 100, 0.6);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    padding: 8px 16px 6px;
    transform: translateX(-50%) scale(0.9);
  }

  span {
    color: #d3a164;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: #d3a164;
    filter: drop-shadow(0 0 5px rgba(211, 161, 100, 0.5));
  }
`;

const MuseumSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 80px;
  perspective: 1200px;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 50px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
`;

const MuseumOption = styled(motion.div)`
  position: relative;
  cursor: pointer;
  padding: 0;
  border-radius: 20px;
  overflow: hidden;
  width: 460px;
  height: 520px;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  box-shadow: ${(props) =>
    props.isActive
      ? "0 25px 50px rgba(211, 161, 100, 0.4), 0 0 0 3px rgba(211, 161, 100, 0.5) inset"
      : "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(211, 161, 100, 0.2) inset"};
  border-bottom: 8px solid rgba(211, 161, 100, 0.8);

  @media (max-width: 992px) {
    width: 420px;
    height: 450px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 320px;
    max-width: 360px;
    margin-bottom: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(
      circle at center,
      rgba(211, 161, 100, 0.2),
      transparent 70%
    );
    opacity: ${(props) => (props.isActive ? 0.8 : 0)};
    z-index: 1;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-15px) rotateX(5deg);
    box-shadow: 0 25px 50px rgba(211, 161, 100, 0.4),
      0 0 0 3px rgba(211, 161, 100, 0.6) inset;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const MuseumBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: ${(props) =>
    props.type === "tribal"
      ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${forestBg})`
      : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${villageSilhouette})`};
  background-size: cover;
  background-position: ${(props) =>
    props.type === "tribal" ? "center" : "center 30%"};
  transform: scale(1.05);
  transition: transform 0.8s ease, filter 0.5s ease;
  filter: ${(props) =>
    props.isActive
      ? "brightness(1) saturate(1.1)"
      : "brightness(0.7) saturate(0.8)"};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(props) =>
      props.isActive
        ? `radial-gradient(circle at center, rgba(211, 161, 100, 0.15), transparent 70%)`
        : "none"};
    mix-blend-mode: overlay;
    opacity: ${(props) => (props.isActive ? 1 : 0)};
    transition: opacity 0.5s ease;
  }

  ${MuseumOption}:hover & {
    transform: scale(1.15);
    filter: brightness(1) saturate(1.2);

    &::after {
      opacity: 1;
    }
  }
`;

const MuseumContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  height: 100%;
  justify-content: space-between;
  text-align: center;
  background: linear-gradient(
    to top,
    rgba(26, 20, 16, 0.95) 0%,
    rgba(26, 20, 16, 0.7) 40%,
    rgba(26, 20, 16, 0.4) 70%,
    rgba(26, 20, 16, 0) 100%
  );

  @media (max-width: 768px) {
    padding: 25px 20px;
    justify-content: space-around;
  }
`;

const MuseumIconBox = styled(motion.div)`
  width: 90px;
  height: 90px;
  border-radius: 25px;
  background: rgba(211, 161, 100, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: auto;
  border: 2px solid rgba(211, 161, 100, 0.3);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  margin-top: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    border-radius: 15px;
    margin-top: 5px;
  }

  svg {
    width: 45px;
    height: 45px;
    fill: #d3a164;

    @media (max-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const MuseumTitle = styled.h2`
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  font-family: "Playfair Display", serif;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin: 0 0 15px 0;
  color: #f5efe7;
  position: relative;

  @media (max-width: 768px) {
    font-size: clamp(1.5rem, 4vw, 2rem);
    margin: 0 0 5px 0;
  }

  span {
    color: #d3a164;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      height: 3px;
      width: 100%;
      bottom: -5px;
      left: 0;
      background: #d3a164;
      transform: scaleX(${(props) => (props.isActive ? 1 : 0.4)});
      transform-origin: left;
      transition: transform 0.5s ease;

      ${MuseumOption}:hover & {
        transform: scaleX(1);
      }
    }
  }
`;

const MuseumDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 20px 0 30px;
  text-align: center;
  max-width: 90%;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  transform: translateY(0);
  opacity: 0.9;
  transition: transform 0.5s ease, opacity 0.5s ease, border-color 0.3s ease;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px;
    margin: 10px 0 15px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ExploreIndicator = styled(motion.div)`
  background: #d3a164;
  color: #1a1410;
  font-size: 1rem;
  font-weight: 600;
  padding: 14px 28px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.5s ease, opacity 0.5s ease, background-color 0.3s ease;
  margin-top: auto;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: #1a1410;
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const MuseumTypeTag = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(211, 161, 100, 0.9);
  color: #1a1410;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d3a164;
  box-shadow: 0 0 15px rgba(211, 161, 100, 0.6);
  opacity: ${(props) => (props.isActive ? 1 : 0.3)};
  z-index: 3;
  transition: opacity 0.3s ease;
`;

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [hoveredMuseum, setHoveredMuseum] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const fireRef = useRef(null);
  const fireGlowRef = useRef(null);

  const handleMouseEnter = (museum) => {
    setHoveredMuseum(museum);
  };

  const handleMouseLeave = () => {
    setHoveredMuseum(null);
  };

  const getIsActive = (museum) => {
    if (hoveredMuseum) {
      return hoveredMuseum === museum;
    }
    return selectedMuseum === museum;
  };

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setHoveredMuseum("tribal");
      setTimeout(() => {
        setInitialLoad(false);
      }, 2000);
    }
  }, [initialLoad]);

  useEffect(() => {
    const fire = fireRef.current;
    const fireGlow = fireGlowRef.current;

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

    let fireAnim1, fireAnim2;
    if (fire) {
      fireAnim1 = gsap.to(fire, {
        opacity: gsap.utils.wrap([0.6, 0.9]),
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        repeatRefresh: true,
      });

      fireAnim2 = gsap.to(fire, {
        backgroundPosition: "-800px 0",
        duration: 30,
        repeat: -1,
        ease: "linear",
      });
    }

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

    const createSmoothTransition = () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        "#timeline",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: "#timeline",
            start: "top bottom-=100",
            end: "top center",
            scrub: true,
          },
        }
      );
    };

    setTimeout(() => {
      createSmoothTransition();
    }, 500);

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      if (fire) {
        gsap.to(fire, {
          opacity: gsap.utils.wrap([0.5, 0.8]),
          duration: 1,
          repeat: -1,
          yoyo: true,
        });
      }

      gsap.to(".museum-option", {
        scale: 1,
        duration: 0.5,
        stagger: 0.2,
        delay: 0.5,
      });
    }

    return () => {
      if (fireAnim1) fireAnim1.kill();
      if (fireAnim2) fireAnim2.kill();
      if (fireGlowAnim) fireGlowAnim.kill();

      gsap.killTweensOf([".title-char", ".tagline", ".scroll-indicator"]);

      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const handleMuseumSelect = (museum) => {
    setSelectedMuseum(museum);

    setTimeout(() => {
      navigate(`/${museum}`);
    }, 300);
  };

  const handleTouchEnd = (museum) => {
    setHoveredMuseum(museum);
    setTimeout(() => {
      navigate(`/${museum}`);
    }, 300);
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

      <FireGlow ref={fireGlowRef} />
      <FireAnimation ref={fireRef} />

      <TitleContainer>
        <MuseumSelector>
          <MuseumOption
            className="museum-option"
            isActive={getIsActive("tribal")}
            onClick={() => handleMuseumSelect("tribal")}
            onMouseEnter={() => handleMouseEnter("tribal")}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={() => handleTouchEnd("tribal")}
            whileHover={{ scale: window.innerWidth <= 768 ? 1.01 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MuseumTypeTag>Tribal Museum</MuseumTypeTag>
            <MuseumBackground type="tribal" isActive={getIsActive("tribal")} />
            <MuseumContent>
              <MuseumIconBox
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
              </MuseumIconBox>

              <ActiveIndicator
                isActive={getIsActive("tribal")}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <MuseumTitle isActive={getIsActive("tribal")}>
                <span>{t("tribal")}</span> {t("heritageMuseum")}
              </MuseumTitle>

              <MuseumDescription>
                {t(
                  "Explore the rich cultural heritage of indigenous tribal communities through artifacts, art, and stories."
                )}
              </MuseumDescription>

              <ExploreIndicator>
                {t("Begin Journey")}
                <svg viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </ExploreIndicator>
            </MuseumContent>
          </MuseumOption>

          <MuseumOption
            className="museum-option"
            isActive={getIsActive("freedom")}
            onClick={() => handleMuseumSelect("freedom")}
            onMouseEnter={() => handleMouseEnter("freedom")}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={() => handleTouchEnd("freedom")}
            whileHover={{ scale: window.innerWidth <= 768 ? 1.01 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MuseumTypeTag>Freedom Museum</MuseumTypeTag>
            <MuseumBackground
              type="freedom"
              isActive={getIsActive("freedom")}
            />
            <MuseumContent>
              <MuseumIconBox
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></MuseumIconBox>

              <ActiveIndicator
                isActive={getIsActive("freedom")}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <MuseumTitle isActive={getIsActive("freedom")}>
                <span>{t("freedom")}</span> {t("fighterMuseum")}
              </MuseumTitle>

              <MuseumDescription>
                {t(
                  "Discover the powerful stories of courage and resistance in the struggle for independence."
                )}
              </MuseumDescription>

              <ExploreIndicator>
                {t("Begin Journey")}
                <svg viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </ExploreIndicator>
            </MuseumContent>
          </MuseumOption>
        </MuseumSelector>
      </TitleContainer>

      <ScrollDownIndicator
        className="scroll-indicator"
        onClick={handleScrollDown}
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
        whileHover={{ y: 5, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: window.innerWidth <= 500 ? "none" : "flex" }}
      >
        <span>{t("scrollDown")}</span>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ScrollDownIndicator>
    </HeroContainer>
  );
};

export default HeroSection;
