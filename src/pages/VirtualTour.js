import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";

const TourContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: #1a1410;
  overflow: hidden;
`;

const MuseumRoom = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MuseumWalls = styled.div`
  width: 80%;
  height: 80%;
  position: relative;
  transform-style: preserve-3d;
  transform: ${(props) => `rotateY(${props.rotation}deg)`};
  transition: transform 0.5s ease;
`;

const Wall = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #2a231c;
  border: 2px solid #d3a164;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(211, 161, 100, 0.1), transparent);
  }
`;

const FrontWall = styled(Wall)`
  transform: translateZ(400px);
`;

const BackWall = styled(Wall)`
  transform: rotateY(180deg) translateZ(400px);
`;

const LeftWall = styled(Wall)`
  transform: rotateY(-90deg) translateZ(400px);
`;

const RightWall = styled(Wall)`
  transform: rotateY(90deg) translateZ(400px);
`;

const Floor = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  transform: rotateX(90deg) translateZ(-400px);
  background: #1a1410;
  border: 2px solid #d3a164;
`;

const Ceiling = styled.div`
  position: absolute;
  width: 800px;
  height: 800px;
  transform: rotateX(-90deg) translateZ(-400px);
  background: #1a1410;
  border: 2px solid #d3a164;
`;

// Enhanced hotspot with better visibility
const Hotspot = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: #d3a164;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px 5px rgba(211, 161, 100, 0.5);
  animation: pulse 2s infinite;

  /* Plus sign inside the hotspot */
  &::before {
    content: "+";
    color: #1a1410;
    font-size: 28px;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.3);
    box-shadow: 0 0 20px 8px rgba(211, 161, 100, 0.8);

    /* Show the label on hover */
    .hotspot-label {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 15px 5px rgba(211, 161, 100, 0.5);
    }
    50% {
      box-shadow: 0 0 20px 10px rgba(211, 161, 100, 0.8);
    }
    100% {
      box-shadow: 0 0 15px 5px rgba(211, 161, 100, 0.5);
    }
  }
`;

const HotspotLabel = styled.div`
  position: absolute;
  background: rgba(26, 20, 16, 0.8);
  color: #d3a164;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  border: 1px solid #d3a164;
  z-index: 11;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1a1410;
  color: #d3a164;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const InfoPanel = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(42, 35, 28, 0.8);
  border-radius: 10px;
  padding: 20px;
  color: #f5efe7;
  max-width: 350px;
  backdrop-filter: blur(10px);
`;

const DetailPanel = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(42, 35, 28, 0.9);
  border-radius: 15px;
  padding: 25px;
  width: 80%;
  max-width: 500px;
  color: #f5efe7;
  z-index: 20;
  backdrop-filter: blur(10px);
`;

const BackButton = styled(motion.button)`
  position: fixed;
  top: 80px;
  left: 20px;
  background: rgba(211, 161, 100, 0.8);
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  color: #1a1410;
  cursor: pointer;
  font-weight: bold;
  z-index: 10;
`;

const RotationControls = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  display: flex;
  gap: 10px;
`;

const RotateButton = styled.button`
  background: #d3a164;
  color: #1a1410;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: #e4b87f;
  }
`;

const WallImage = styled.img`
  width: 80%;
  height: 70%;
  object-fit: cover;
  border: 3px solid #d3a164;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const WallTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin-bottom: 15px;
  text-align: center;
`;

const WallContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const hotspots = [
  {
    id: 1,
    position: { wall: "front", top: "30%", left: "25%" },
    heading: "Tribal Introduction",
    title: "Indigenous Communities",
    content:
      "Explore the rich diversity of tribal communities that form an integral part of India's cultural heritage. This exhibit showcases the unique customs, traditions, and social structures that have been preserved through generations, highlighting the distinct identity of various tribal groups across different regions.",
  },
  {
    id: 2,
    position: { wall: "left", top: "40%", left: "60%" },
    heading: "Hunting Equipment",
    title: "Traditional Hunting Tools",
    content:
      "Discover the ingenious hunting tools and techniques developed by indigenous tribes for survival. From expertly crafted bows and arrows to specialized traps and spears, these artifacts demonstrate the deep knowledge of local ecosystems and sustainable hunting practices that have been passed down through generations.",
  },
  {
    id: 3,
    position: { wall: "right", top: "50%", left: "40%" },
    heading: "Life Cycle",
    title: "Birth to Afterlife Customs",
    content:
      "This exhibit illustrates the significant rituals and ceremonies that mark important transitions in tribal life - from birth celebrations and coming-of-age ceremonies to marriage customs and funeral rites. Each stage is accompanied by unique cultural practices that strengthen community bonds and preserve ancestral traditions.",
  },
  {
    id: 4,
    position: { wall: "back", top: "35%", left: "70%" },
    heading: "Housing and Home",
    title: "Traditional Dwellings",
    content:
      "Examine the traditional housing styles and living arrangements of various tribal communities. These dwellings reflect remarkable architectural knowledge using locally available materials and designs perfectly adapted to local climates and terrains. The spatial organization within homes also reveals social structures and daily life patterns.",
  },
];

const VirtualTour = () => {
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Start loading sequence without audio
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle keyboard events if a hotspot is selected (dialog open)
      if (selectedHotspot) return;

      switch (e.key) {
        case "ArrowLeft":
          rotateLeft();
          break;
        case "ArrowRight":
          rotateRight();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedHotspot]); // Dependency on selectedHotspot to disable when dialog is open

  const rotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const rotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const getHotspotPosition = (position) => {
    let style = { top: position.top, left: position.left };

    if (position.wall === "front" && rotation % 360 === 0) {
      return style;
    } else if (
      position.wall === "right" &&
      (rotation % 360 === -90 || rotation % 360 === 270)
    ) {
      return style;
    } else if (position.wall === "back" && Math.abs(rotation % 360) === 180) {
      return style;
    } else if (
      position.wall === "left" &&
      (rotation % 360 === 90 || rotation % 360 === -270)
    ) {
      return style;
    }

    return { display: "none" };
  };

  return (
    <TourContainer>
      <BackButton
        as="a"
        href="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {t("backToHome")}
      </BackButton>

      <MuseumRoom>
        <MuseumWalls rotation={rotation}>
          <FrontWall>
            <WallContent>
              <WallTitle>{t("Tribal Introduction")}</WallTitle>
              <WallImage
                src={"virtualtour/Picture3.jpg"}
                alt={t("tribalIntroduction")}
              />
            </WallContent>
          </FrontWall>
          <BackWall>
            <WallContent>
              <WallTitle>{t("Housing And Home")}</WallTitle>
              <WallImage
                src={"virtualtour/Picture5.jpg"}
                alt={t("housingAndHome")}
              />
            </WallContent>
          </BackWall>
          <LeftWall>
            <WallContent>
              <WallTitle>{t("Hunting Equipment")}</WallTitle>
              <WallImage
                src={"virtualtour/Picture6.jpg"}
                alt={t("huntingEquipment")}
              />
            </WallContent>
          </LeftWall>
          <RightWall>
            <WallContent>
              <WallTitle>{t("Life Cycle")}</WallTitle>
              <WallImage
                src={"virtualtour/Picture4.jpg"}
                alt={t("lifeCycle")}
              />
            </WallContent>
          </RightWall>
          <Floor />
          <Ceiling />
        </MuseumWalls>

        {hotspots.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            style={getHotspotPosition(hotspot.position)}
            onClick={() => setSelectedHotspot(hotspot)}
          >
            <HotspotLabel className="hotspot-label">
              {hotspot.title}
            </HotspotLabel>
          </Hotspot>
        ))}
      </MuseumRoom>

      <RotationControls>
        <RotateButton onClick={rotateLeft}>←</RotateButton>
        <RotateButton onClick={rotateRight}>→</RotateButton>
      </RotationControls>

      <InfoPanel
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>{t("museumTour")}</h2>
        <p>{t("navigationInfo")}</p>
        <p style={{ marginTop: "10px", fontSize: "0.9rem", opacity: 0.9 }}>
          {t("Use the arrow keys or buttons to navigate")}
        </p>
      </InfoPanel>

      <AnimatePresence>
        {selectedHotspot && (
          <DetailPanel
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h2 style={{ color: "#d3a164", marginBottom: "15px" }}>
              {selectedHotspot.title}
            </h2>
            <p>{selectedHotspot.content}</p>
            <button
              style={{
                background: "#d3a164",
                border: "none",
                padding: "8px 15px",
                marginTop: "20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedHotspot(null)}
            >
              {t("close")}
            </button>
          </DetailPanel>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <LoadingScreen
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>{t("loadingVirtualMuseum")}</h2>
            <p>{t("preparingExperience")}</p>
          </LoadingScreen>
        )}
      </AnimatePresence>
    </TourContainer>
  );
};

export default VirtualTour;
