import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import timelineData from '../data/timelineEvents';

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

// Main wrapper for the timeline - adjusted height for better visibility
const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 550px; // Reduced height to fit both cards better
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

// Each event card with a consistent design - reduced size
const TimelineEvent = styled(motion.div)`
  width: 350px; // Smaller width
  height: 220px; // Reduced height to make both cards visible
  margin-right: 120px; // Space between cards
  position: absolute; // Absolute positioning for precise placement
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // Position from the top depends on if it's an odd or even card
  // Adjusted positions for better visibility of both cards
  top: ${(props) => (props.position === "top" ? "40px" : "auto")};
  bottom: ${(props) => (props.position === "bottom" ? "40px" : "auto")};
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

  // Connection line to timeline belt - adjusted for shorter distance
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: 2px;
    height: ${(props) => (props.position === "top" ? "30px" : "30px")};
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

// Adjust event info to fit in smaller card
const EventInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px; // Smaller padding
  color: #f5efe7;
  z-index: 2;
  width: 100%;
`;

// Year display - adjusted size
const EventYear = styled.div`
  font-size: 1.8rem; // Smaller font size
  font-weight: bold;
  color: #d3a164;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 3px; // Less margin
`;

// Event title - adjusted size
const EventTitle = styled.h3`
  font-size: 1.3rem; // Smaller font size
  margin: 3px 0;
  font-family: "Playfair Display", serif;
  color: #f5efe7;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
`;

// Event description - adjusted size
const EventDescription = styled.p`
  font-size: 0.8rem; // Smaller font size
  margin-top: 3px;
  opacity: 0.8;
  line-height: 1.3;
  max-height: 60px; // Limit height
  overflow: hidden;
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
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const events = timelineData[language];

  // Timeline events data with translation
  const translatedEvents = events.map(event => ({
    ...event,
    title: t(event.titleKey),
    description: t(event.descriptionKey),
    content: t(event.contentKey),
    artifacts: event.artifacts.map(artifact => t(artifact))
  }));

  // Calculate visible width for the timeline
  const getVisibleWidth = () => {
    return typeof window !== "undefined" ? window.innerWidth - 100 : 500;
  };

  // Calculate total width of all events
  const getTotalWidth = () => {
    const eventWidth = 380; // Width of each event card
    const marginRight = 120; // Right margin of each card
    return translatedEvents.length * (eventWidth + marginRight) - marginRight;
  };

  // Calculate max scroll position
  const getMaxScroll = () => {
    return Math.max(0, getTotalWidth() - getVisibleWidth());
  };

  // Handle navigation buttons
  const handleNavigation = (direction) => {
    const newIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, translatedEvents.length - 1)
        : Math.max(currentIndex - 1, 0);

    scrollToTimelinePosition(newIndex);
  };

  // Handle dot navigation
  const handleDotClick = (index) => {
    scrollToTimelinePosition(index);
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
  }, [translatedEvents.length]);

  // Fix the timeline scrolling behavior
  useEffect(() => {
    if (!timelineRef.current || !containerRef.current) return;

    // Reset position at start
    gsap.set(timelineRef.current, { x: 0 });
    setScrollPosition(0);
    setCurrentIndex(0);

    // Calculate the total scroll distance needed for the timeline
    const totalScrollDistance = getTotalWidth() - getVisibleWidth();

    // Create a timeline with ScrollTrigger for proper pinning
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start pinning when the top of section hits top of viewport
        end: `+=${totalScrollDistance + 100}`, // Use the calculated scroll distance plus some buffer
        pin: true, // Pin the section
        anticipatePin: 1, // Improve pin performance
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    // Add the horizontal scrolling animation to the timeline
    tl.to(timelineRef.current, {
      x: -totalScrollDistance,
      ease: "none",
      onUpdate: function () {
        // Update current index based on progress
        const progress = this.progress();
        const newIndex = Math.min(
          translatedEvents.length - 1,
          Math.floor(progress * translatedEvents.length)
        );
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      },
    });

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, [translatedEvents.length]);

  // Function to smoothly scroll to the timeline section when dot navigation is used
  const scrollToTimelinePosition = (index) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const allTriggers = ScrollTrigger.getAll();
    const timelineTrigger = allTriggers.find(
      (t) => t.vars.trigger === containerRef.current
    );

    if (timelineTrigger) {
      // Calculate the scroll position for this index
      const progress = index / (translatedEvents.length - 1);

      // First scroll to the section if needed
      if (rect.top > 0) {
        window.scrollTo({
          top: window.pageYOffset + rect.top,
          behavior: "smooth",
        });
      }

      // Then scroll within the timeline to the correct position
      timelineTrigger.scroll(
        timelineTrigger.start +
          (timelineTrigger.end - timelineTrigger.start) * progress
      );
    }

    // Update the current index
    setCurrentIndex(index);
  };

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
          {translatedEvents.map((event, index) => {
            const position = index % 2 === 0 ? "bottom" : "top";
            const leftPosition = index * 500; // Position each card with enough space

            return (
              <TimelineEvent
                key={index}
                position={position}
                left={leftPosition}
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.03 }}
              >
                <TimelineDot position={position} />
                <EventImage src={`/timelineSection/${event.image}`} alt={event.title} />
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
          disabled={currentIndex >= translatedEvents.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </NavButton>
      </TimelineNavigation>

      {/* Progress indicator dots */}
      <TimelineProgress>
        {translatedEvents.map((_, index) => (
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
                <ArtifactTitle>{t("Related Artifacts")}</ArtifactTitle>
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
