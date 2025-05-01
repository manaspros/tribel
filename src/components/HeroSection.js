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
    height: 340px; // Increased from 320px to 340px for more space
    max-width: 360px;
    margin-bottom: 10px;
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
  padding: 20px 30px 40px; // Reduced from 70px to 50px top padding
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

  // Add laptop-specific media query
  @media (min-width: 769px) and (max-width: 1366px) {
    padding: 40px 30px 40px; // Even less padding for laptops
  }

  @media (max-width: 768px) {
    padding: 60px 20px 25px;
    justify-content: space-around;
  }
`;

// Update the InfoContainer to support side-by-side layout
const InfoContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 85%;
  margin-top: 5px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  display: flex;
  justify-content: space-between;

  @media (min-width: 769px) and (max-width: 1366px) {
    padding: 8px;
    margin-top: 3px;
    margin-bottom: 8px;
  }

  @media (max-width: 768px) {
    display: none; // Hide on mobile to save space
  }
`;

const InfoSection = styled.div`
  margin-bottom: ${(props) => (props.last ? "0" : "6px")};
  padding-bottom: ${(props) => (props.last ? "0" : "6px")};
  border-bottom: ${(props) =>
    props.last ? "none" : "1px solid rgba(211, 161, 100, 0.1)"};
  flex: 1;
`;

const InfoTitle = styled.div`
  color: #d3a164;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 3px;
`;

const InfoText = styled.div`
  color: #f5efe7;
  font-size: 0.75rem;
  line-height: 1.4;
`;

const PriceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2px;
`;

const PriceLabel = styled.span`
  min-width: 65px;
  margin-right: 5px;
`;

const PriceValue = styled.span`
  color: #d3a164;
  font-weight: 500;
`;

const MuseumTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.6rem); // Slightly reduced font size
  font-family: "Playfair Display", serif;
  letter-spacing: 2px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin: 30px 0 15px 0; // Increased top margin from 0 to 30px
  color: #f5efe7;
  position: relative;
  max-width: 100%; // Ensure title doesn't overflow
  line-height: 1.3; // Improved line height for better readability

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 4vw, 1.8rem); // Reduced font size on mobile
    margin: 20px 0 5px 0; // Adjusted margin
  }

  span {
    color: #d3a164;
    position: relative;
    display: inline-block; // Helps with line wrapping

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
  margin: 25px 0 20px; // Reduced bottom margin from 30px to 20px
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

  @media (min-width: 769px) and (max-width: 1366px) {
    padding: 15px; // Less padding for laptop screens
    margin: 15px 0 15px; // Less margin for laptop screens
    font-size: 1rem; // Slightly smaller font for laptop screens
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px;
    margin: 15px 0 15px; // Increased top margin from 10px to 15px
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
  top: 15px; // Adjusted from 20px to 15px
  left: 15px; // Adjusted from 20px to 15px
  background: rgba(211, 161, 100, 0.9);
  color: #1a1410;
  padding: 6px 14px; // Slightly smaller padding
  border-radius: 20px;
  font-size: 0.8rem; // Reduced font size
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 3;
  max-width: 70%; // Ensure it doesn't get too wide
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1, // Ensure full opacity
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
            <MuseumTypeTag>{t("Tribal Museum")}</MuseumTypeTag>
            <MuseumBackground type="tribal" isActive={getIsActive("tribal")} />
            <MuseumContent>
              <ActiveIndicator
                isActive={getIsActive("tribal")}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <MuseumTitle isActive={getIsActive("tribal")}>
                <span>{t("tribal")}</span> {t("heritageMuseum")}
              </MuseumTitle>

              <MuseumDescription>
                {t("heritageMuseumDescription")}
              </MuseumDescription>

              <InfoContainer>
                <InfoSection last>
                  <InfoTitle>{t("Admission")}</InfoTitle>
                  <InfoText>
                    <PriceRow>
                      <PriceLabel>{t("Adults")}</PriceLabel>
                      <PriceValue>{t("price20")}</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      <PriceLabel>{t("Students")}</PriceLabel>
                      <PriceValue>{t("price10")}</PriceValue>
                    </PriceRow>
                  </InfoText>
                </InfoSection>

                <InfoSection last>
                  <InfoTitle>{t("Hours")}</InfoTitle>
                  <InfoText>
                    <PriceRow>
                      <PriceLabel>{t("tuesdayToSunday")}</PriceLabel>
                      <PriceValue>10AM-6PM</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      <PriceLabel>{t("mondayClosed")}</PriceLabel>
                      <PriceValue>{t("Closed")}</PriceValue>
                    </PriceRow>
                  </InfoText>
                </InfoSection>
              </InfoContainer>

              <ExploreIndicator>
                {t("beginJourney")}
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
            <MuseumTypeTag>{t("freedomMuseum")}</MuseumTypeTag>
            <MuseumBackground
              type="freedom"
              isActive={getIsActive("freedom")}
            />
            <MuseumContent>
              <ActiveIndicator
                isActive={getIsActive("freedom")}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <MuseumTitle isActive={getIsActive("freedom")}>
                <span>{t("freedom")}</span> {t("fighterMuseum")}
              </MuseumTitle>

              <MuseumDescription>
                {t("freedomMuseumDescription")}
              </MuseumDescription>

              <InfoContainer>
                <InfoSection last>
                  <InfoTitle>{t("Admission")}</InfoTitle>
                  <InfoText>
                    <PriceRow>
                      <PriceLabel>{t("Adults")}</PriceLabel>
                      <PriceValue>{t("price20")}</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      <PriceLabel>{t("Students")}</PriceLabel>
                      <PriceValue>{t("price10")}</PriceValue>
                    </PriceRow>
                  </InfoText>
                </InfoSection>

                <InfoSection last>
                  <InfoTitle>{t("Hours")}</InfoTitle>
                  <InfoText>
                    <PriceRow>
                      <PriceLabel>{t("tuesdayToSunday")}</PriceLabel>
                      <PriceValue>10AM-6PM</PriceValue>
                    </PriceRow>
                    <PriceRow>
                      <PriceLabel>{t("mondayClosed")}</PriceLabel>
                      <PriceValue>{t("Closed")}</PriceValue>
                    </PriceRow>
                  </InfoText>
                </InfoSection>
              </InfoContainer>

              <ExploreIndicator>
                {t("beginJourney")}
                <svg viewBox="0 0 24 24">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                </svg>
              </ExploreIndicator>
            </MuseumContent>
          </MuseumOption>
        </MuseumSelector>
      </TitleContainer>
    </HeroContainer>
  );
};

export default HeroSection;
