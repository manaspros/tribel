import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import halbaRebellionImg from "../assets/halba-rebellion.jpeg";
import bhumkalRevoltImg from "../assets/bhumkal-revolt.webp";

gsap.registerPlugin(ScrollTrigger);

// Container with gradient background
const TimelineContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 80px 0 120px;
  background: linear-gradient(to bottom, #1a1410 0%, #241c16 100%);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #1a1410);
    z-index: 2;
  }
`;

// Title with decorative underline
const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: #d3a164;
  margin-bottom: 80px;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, transparent, #d3a164, transparent);
  }
`;

// Main wrapper for the timeline
const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 650px; // Fixed height to accommodate all cards
  margin-bottom: 60px;
`;

// Center line of the timeline
const TimelineBelt = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    transparent 0%,
    #d3a164 10%,
    #d3a164 90%,
    transparent 100%
  );
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
`;

// Container for all events that will be scrolled
const TimelineTrack = styled.div`
  display: flex;
  width: max-content;
  position: relative;
  padding: 0 10vw;
  height: 100%;
`;

// Dot on the timeline for each event
const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  background: #d3a164;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #d3a164;
  z-index: 2;

  // Position depends on if the card is above or below timeline
  top: ${(props) => (props.position === "top" ? "100%" : "0%")};
`;

// Each event card with a consistent design
const TimelineEvent = styled(motion.div)`
  width: 380px;
  height: 280px; // Reduced height for better visibility
  margin-right: 120px; // Space between cards
  position: absolute; // Absolute positioning for precise placement
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // Position from the top depends on if it's an odd or even card
  top: ${(props) => (props.position === "top" ? "0" : "auto")};
  bottom: ${(props) => (props.position === "bottom" ? "0" : "auto")};
  left: ${(props) => props.left}px;

  // Hover effects
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
  }

  // Gradient overlay for text readability
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    z-index: 1;
  }

  // Connection line to timeline belt
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: 2px;
    height: ${(props) => (props.position === "top" ? "40px" : "40px")};
    background: #d3a164;
    transform: translateX(-50%);
    z-index: 3;

    // Position depends on if the card is above or below timeline
    top: ${(props) => (props.position === "top" ? "calc(100% + 2px)" : "auto")};
    bottom: ${(props) =>
      props.position === "top" ? "auto" : "calc(100% + 2px)"};
  }
`;

// Event image with proper sizing
const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Information overlay for each event
const EventInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  color: #f5efe7;
  z-index: 2;
  width: 100%;
`;

// Year display
const EventYear = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #d3a164;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 5px;
`;

// Event title
const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin: 5px 0;
  font-family: "Playfair Display", serif;
  color: #f5efe7;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
`;

// Event description
const EventDescription = styled.p`
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.8;
  line-height: 1.4;
`;

// Navigation buttons
const TimelineNavigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  z-index: 10;
`;

// Button styling
const NavButton = styled(motion.button)`
  background: rgba(211, 161, 100, 0.2);
  border: 2px solid #d3a164;
  color: #d3a164;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(211, 161, 100, 0.4);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

// Progress indicator
const TimelineProgress = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  z-index: 10;
`;

const ProgressDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) =>
    props.active ? "#d3a164" : "rgba(211, 161, 100, 0.3)"};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

// Popup for detailed event view
const DetailPopup = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vw;
`;

const PopupContent = styled(motion.div)`
  width: 80%;
  max-width: 1000px;
  background: linear-gradient(135deg, #2a231c 0%, #1a1410 100%);
  border-radius: 15px;
  padding: 40px;
  color: #f5efe7;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  border: 1px solid rgba(211, 161, 100, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(211, 161, 100, 0.3);
  padding-bottom: 20px;
`;

const PopupTitle = styled.h2`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  color: #d3a164;
  margin: 0;
`;

const PopupYear = styled.div`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: #d3a164;
  opacity: 0.8;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #d3a164;
  font-size: 24px;
  cursor: pointer;
`;

const ArtifactSection = styled.div`
  margin-top: 30px;
`;

const ArtifactTitle = styled.h3`
  font-size: 1.3rem;
  color: #d3a164;
  margin-bottom: 15px;
`;

const ArtifactList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-left: 0;
  list-style: none;
`;

const ArtifactItem = styled.li`
  background: rgba(211, 161, 100, 0.1);
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid rgba(211, 161, 100, 0.3);
  color: #d3a164;
  font-size: 0.9rem;
`;

const PopupImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
  object-fit: cover;
  max-height: 400px;
`;

const DecorativeArrow = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 120px;
  z-index: 5;
  pointer-events: none;
  opacity: 0; // Start hidden, will be animated with GSAP

  svg {
    width: 100%;
    height: 100%;
  }
`;

const TimelineSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Timeline events data
  const timelineEvents = [
    {
      id: 1,
      year: 1830,
      title: t("halbaRebellion"),
      image: halbaRebellionImg,
      description:
        "Led by Halba tribes against British colonial rule in Central India.",
      artifacts: ["Tribal weapons", "British records", "Maps of the uprising"],
      content:
        "The Halba Rebellion of 1830 was a significant uprising led by the Halba tribal communities against the oppressive policies of the British East India Company. The rebellion was sparked by excessive taxation, land appropriation, and the erosion of traditional tribal autonomy. Led by tribal chieftain Shambu Singh, the Halbas organized a formidable resistance that lasted several months before being suppressed by British forces. Despite its ultimate defeat, the rebellion marked an important early instance of organized tribal resistance against colonial rule in Central India.",
    },
    {
      id: 2,
      year: 1910,
      title: t("bhumkalRevolt"),
      image: bhumkalRevoltImg,
      description:
        "A major tribal uprising in Bastar region against exploitation.",
      artifacts: [
        "Traditional drums",
        "Gond paintings",
        "Revolutionary letters",
      ],
      content:
        "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, was a major uprising by the indigenous tribal communities of Bastar region against British colonial rule and exploitation by local authorities. The uprising, led by tribal leader Gunda Dhur, was sparked by a series of policies that threatened tribal lands, cultural practices, and autonomy. The revolt witnessed participation from multiple tribal groups including Muria, Maria, and Bhattra communities who united against their oppressors. British authorities responded with brutal force, eventually suppressing the rebellion, but the Bhumkal Revolt remains a powerful symbol of indigenous resistance and is commemorated to this day.",
    },
    {
      id: 3,
      year: 1942,
      title: "Tribal Participation in Quit India Movement",
      image:
        "https://placehold.co/600x400/1a1410/d3a164?text=Tribal+Resistance",
      description:
        "Tribal communities joined the nationwide struggle for independence.",
      artifacts: ["Freedom flags", "Protest documents", "Gandhi memorabilia"],
      content:
        "During the Quit India Movement launched by Mahatma Gandhi in 1942, tribal communities across India played a significant but often overlooked role in the struggle for independence. In regions like Jharkhand, Chhattisgarh, and Odisha, tribal groups organized protests, disrupted colonial infrastructure, and provided support to underground freedom fighters. Their participation was motivated not only by nationalist sentiment but also by their ongoing struggles against forest laws, land alienation, and economic exploitation under British rule. The British response was severe, with many tribal villages facing collective punishment, but their contribution added crucial momentum to India's independence movement.",
    },
    {
      id: 4,
      year: 1970,
      title: "Jharkhand Movement",
      image: "https://placehold.co/600x400/1a1410/d3a164?text=Jharkhand",
      description:
        "Movement for tribal autonomy and separate statehood in eastern India.",
      artifacts: [
        "Movement banners",
        "Tribal declarations",
        "Documentary photographs",
      ],
      content:
        "The Jharkhand Movement intensified in the 1970s as a struggle for tribal autonomy, cultural preservation, and separate statehood in what was then part of Bihar. Led by tribal intellectuals and activists like Jaipal Singh Munda, the movement highlighted the marginalization of Adivasi communities and exploitation of tribal-dominated regions rich in mineral resources. The movement combined political activism, cultural renaissance, and grassroots mobilization to demand recognition of tribal rights and aspirations. After decades of persistent struggle, Jharkhand was finally carved out as a separate state in 2000, representing a significant victory for tribal self-determination and identity.",
    },
    {
      id: 5,
      year: 2000,
      title: "Narmada Bachao Andolan",
      image: "https://placehold.co/600x400/1a1410/d3a164?text=NBA",
      description: "Resistance against displacement due to dam projects.",
      artifacts: [
        "Protest art",
        "Medha Patkar's journals",
        "Environmental impact reports",
      ],
      content:
        "The Narmada Bachao Andolan (Save Narmada Movement) gained significant momentum around 2000 as a powerful example of tribal communities fighting for their rights against displacement caused by large dam projects. Led by activist Medha Patkar, the movement represented the struggle of Adivasi communities in the Narmada Valley who faced submergence of their ancestral lands due to the Sardar Sarovar Dam and other projects. Beyond opposing displacement, the movement raised fundamental questions about development models, environmental justice, and the rights of indigenous peoples. Despite facing considerable opposition from state authorities, the movement achieved significant victories including better rehabilitation policies and international recognition of the rights of people displaced by development projects.",
    },
  ];

  // Calculate visible width for the timeline
  const getVisibleWidth = () => {
    return typeof window !== "undefined" ? window.innerWidth - 100 : 500;
  };

  // Calculate total width of all events
  const getTotalWidth = () => {
    const eventWidth = 380; // Width of each event card
    const marginRight = 120; // Right margin of each card
    return timelineEvents.length * (eventWidth + marginRight) - marginRight;
  };

  // Calculate max scroll position
  const getMaxScroll = () => {
    return Math.max(0, getTotalWidth() - getVisibleWidth());
  };

  // Handle navigation buttons
  const handleNavigation = (direction) => {
    const visibleWidth = getVisibleWidth();
    const eventWidth = 380 + 120; // Card width + margin
    const eventsPerPage = Math.floor(visibleWidth / eventWidth);

    let newPosition;
    if (direction === "next") {
      newPosition = Math.min(
        getMaxScroll(),
        scrollPosition + eventsPerPage * eventWidth
      );
      setCurrentIndex(
        Math.min(timelineEvents.length - 1, currentIndex + eventsPerPage)
      );
    } else {
      newPosition = Math.max(0, scrollPosition - eventsPerPage * eventWidth);
      setCurrentIndex(Math.max(0, currentIndex - eventsPerPage));
    }

    setScrollPosition(newPosition);

    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        x: -newPosition,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  // Handle dot navigation
  const handleDotClick = (index) => {
    const eventWidth = 380 + 120; // Card width + margin
    const newPosition = Math.min(getMaxScroll(), index * eventWidth);

    setScrollPosition(newPosition);
    setCurrentIndex(index);

    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        x: -newPosition,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  // Initialize timeline
  useEffect(() => {
    if (timelineRef.current) {
      // Reset position
      gsap.set(timelineRef.current, { x: 0 });
      setScrollPosition(0);
      setCurrentIndex(0);
    }
  }, []);

  useEffect(() => {
    // Existing code for timeline animations...

    // Add animation for the decorative arrow
    gsap.to(".timeline-arrow", {
      y: 10,
      opacity: 1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ...rest of existing effect code...
  }, [timelineEvents.length]);

  return (
    <TimelineContainer ref={containerRef} id="timeline">
      <DecorativeArrow className="timeline-arrow">
        <svg
          width="60"
          height="120"
          viewBox="0 0 60 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 0V100M30 100L10 80M30 100L50 80"
            stroke="#d3a164"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="30" cy="0" r="4" fill="#d3a164" />
          <circle cx="30" cy="100" r="6" fill="#d3a164" />
        </svg>
      </DecorativeArrow>

      {/* Existing title and timeline content... */}
      <SectionTitle>{t("tribalUprisingsTimeline")}</SectionTitle>

      {/* Rest of existing component JSX... */}
      <TimelineWrapper>
        <TimelineBelt />
        <TimelineTrack ref={timelineRef}>
          {timelineEvents.map((event, index) => {
            const position = index % 2 === 0 ? "bottom" : "top";
            const leftPosition = index * 500; // Position each card with enough space

            return (
              <TimelineEvent
                key={event.id}
                position={position}
                left={leftPosition}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.03 }}
              >
                <TimelineDot position={position} />
                <EventImage src={event.image} alt={event.title} />
                <EventInfo>
                  <EventYear>{event.year}</EventYear>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                </EventInfo>
              </TimelineEvent>
            );
          })}
        </TimelineTrack>
      </TimelineWrapper>

      {/* Timeline navigation controls */}
      <TimelineNavigation>
        <NavButton
          onClick={() => handleNavigation("prev")}
          disabled={currentIndex === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </NavButton>
        <NavButton
          onClick={() => handleNavigation("next")}
          disabled={currentIndex >= timelineEvents.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </NavButton>
      </TimelineNavigation>

      {/* Progress indicator dots */}
      <TimelineProgress>
        {timelineEvents.map((_, index) => (
          <ProgressDot
            key={index}
            active={index === currentIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </TimelineProgress>

      {/* Event detail popup */}
      <AnimatePresence>
        {selectedEvent && (
          <DetailPopup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <PopupContent
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <PopupHeader>
                <PopupTitle>{selectedEvent.title}</PopupTitle>
                <PopupYear>{selectedEvent.year}</PopupYear>
              </PopupHeader>

              <PopupImage src={selectedEvent.image} alt={selectedEvent.title} />

              <p>{selectedEvent.content}</p>

              <ArtifactSection>
                <ArtifactTitle>Related Artifacts</ArtifactTitle>
                <ArtifactList>
                  {selectedEvent.artifacts.map((artifact, index) => (
                    <ArtifactItem key={index}>{artifact}</ArtifactItem>
                  ))}
                </ArtifactList>
              </ArtifactSection>

              <CloseButton
                onClick={() => setSelectedEvent(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
            </PopupContent>
          </DetailPopup>
        )}
      </AnimatePresence>
    </TimelineContainer>
  );
};

export default TimelineSection;
