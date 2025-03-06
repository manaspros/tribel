import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import halbaRebellionImg from "../assets/halba-rebellion.jpg";
import bhumkalRevoltImg from "../assets/bhumkal-revolt.jpg";

gsap.registerPlugin(ScrollTrigger);

const TimelineContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 0;
  background: #1a1410;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: #d3a164;
  margin-bottom: 80px;
  font-family: "Playfair Display", serif;
`;

const TimelineTrack = styled.div`
  display: flex;
  width: max-content;
  position: relative;
  padding: 0 10vw;
`;

const TimelineEvent = styled(motion.div)`
  width: 400px;
  height: 500px;
  margin-right: 120px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    z-index: 1;
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${TimelineEvent}:hover & {
    transform: scale(1.05);
  }
`;

const EventInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 25px;
  color: #f5efe7;
  z-index: 2;
`;

const EventYear = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #d3a164;
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  margin: 5px 0;
`;

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
  background: #2a231c;
  border-radius: 15px;
  padding: 40px;
  color: #f5efe7;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

const timelineEvents = [
  {
    id: 1,
    year: 1830,
    title: "Halba Rebellion",
    image: halbaRebellionImg,
    description:
      "Led by Halba tribes against British colonial rule in Central India.",
    artifacts: ["Tribal weapons", "British records", "Maps of the uprising"],
  },
  {
    id: 2,
    year: 1910,
    title: "Bhumkal Revolt",
    image: bhumkalRevoltImg,
    description:
      "A major tribal uprising in Bastar region against exploitation.",
    artifacts: ["Traditional drums", "Gond paintings", "Revolutionary letters"],
  },
  // Add more events
];

const TimelineSection = () => {
  const trackRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const track = trackRef.current;

    // Horizontal scroll animation
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: "top top",
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <TimelineContainer id="timeline">
      <SectionTitle>Tribal Uprisings Timeline</SectionTitle>

      <TimelineTrack ref={trackRef}>
        {timelineEvents.map((event) => (
          <TimelineEvent
            key={event.id}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSelectedEvent(event)}
          >
            <EventImage src={event.image} alt={event.title} />
            <EventInfo>
              <EventYear>{event.year}</EventYear>
              <EventTitle>{event.title}</EventTitle>
            </EventInfo>
          </TimelineEvent>
        ))}
      </TimelineTrack>

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
              <h2>{selectedEvent.title}</h2>
              <h3>{selectedEvent.year}</h3>
              <p>{selectedEvent.description}</p>
              {/* Add more detailed content, artifacts, audio narrations, etc. */}
            </PopupContent>
          </DetailPopup>
        )}
      </AnimatePresence>
    </TimelineContainer>
  );
};

export default TimelineSection;
