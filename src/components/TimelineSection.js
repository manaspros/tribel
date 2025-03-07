import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import halbaRebellionImg from "../assets/halba-rebellion.jpeg";
import bhumkalRevoltImg from "../assets/bhumkal-revolt.webp";

gsap.registerPlugin(ScrollTrigger);

const TimelineContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 0;
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

const TimelineWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 70vh;
`;

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
`;

const TimelineTrack = styled.div`
  display: flex;
  width: max-content;
  position: relative;
  padding: 0 10vw;
`;

const TimelineDot = styled.div`
  width: 16px;
  height: 16px;
  background: #d3a164;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 10px #d3a164;
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
  transition: all 0.3s ease;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: ${(props) => (props.index % 2 === 0 ? "50%" : "50%")};
    width: 2px;
    height: ${(props) => (props.index % 2 === 0 ? "70px" : "70px")};
    background: #d3a164;
    transform: ${(props) =>
      props.index % 2 === 0 ? "translateX(-50%)" : "translateX(-50%)"};
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const EventInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 25px;
  color: #f5efe7;
  z-index: 2;
  width: 100%;
`;

const EventYear = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #d3a164;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  margin-bottom: 10px;
`;

const EventTitle = styled.h3`
  font-size: 1.8rem;
  margin: 5px 0;
  font-family: "Playfair Display", serif;
  color: #f5efe7;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
`;

const EventDescription = styled.p`
  font-size: 1rem;
  margin-top: 5px;
  opacity: 0.8;
  max-height: 80px; // Always show the description instead of hiding it
  overflow: hidden;
`;

const TimelineNavigation = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 10;
`;

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
  background: linear-gradient(135deg, #2a231c 0%, #1a1410 100%);
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

const TimelineSection = () => {
  const { t } = useLanguage();
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Handle horizontal scroll animation
  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    const events = Array.from(track.children);

    // Fix: Position each event properly along the timeline
    events.forEach((event, i) => {
      const yOffset = i % 2 === 0 ? -220 : 220;
      gsap.set(event, {
        y: yOffset,
      });
    });

    // Horizontal scroll animation with fixed ID
    let ctx = gsap.context(() => {
      const scrollTrigger = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          id: "timelineScroll", // Add specific ID for reference
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Calculate current index based on scroll progress
            const progress = self.progress;
            const newIndex = Math.min(
              Math.floor(progress * timelineEvents.length),
              timelineEvents.length - 1
            );
            setCurrentIndex(newIndex);
          },
        },
      });

      return () => scrollTrigger.kill();
    }, containerRef);

    return () => {
      ctx.revert();
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => trigger.kill());
    };
  }, [timelineEvents.length]);

  // Fix the scroll function to work properly with ScrollTrigger
  const scrollToEvent = (index) => {
    if (index < 0 || index >= timelineEvents.length) return;

    const allTriggers = ScrollTrigger.getAll();
    const timelineTrigger = allTriggers.find(
      (t) =>
        t.vars.id === "timelineScroll" ||
        t.vars.trigger === containerRef.current
    );

    if (timelineTrigger) {
      const progress = index / (timelineEvents.length - 1);
      const scrollPos =
        timelineTrigger.start +
        (timelineTrigger.end - timelineTrigger.start) * progress;

      gsap.to(window, {
        scrollTo: scrollPos,
        duration: 1,
        ease: "power2.inOut",
      });

      setCurrentIndex(index);
    } else {
      // Fallback method
      const container = containerRef.current;
      if (container) {
        const eventWidth = 520; // Event width + margin
        container.scrollTo({
          left: index * eventWidth,
          behavior: "smooth",
        });
        setCurrentIndex(index);
      }
    }
  };

  return (
    <TimelineContainer ref={containerRef} id="timeline">
      <SectionTitle>{t("tribalUprisingsTimeline")}</SectionTitle>

      <TimelineWrapper>
        <TimelineBelt />
        <TimelineTrack ref={trackRef}>
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              index={index}
              // Remove the whileHover animation for more stability
              onClick={() => setSelectedEvent(event)}
            >
              <TimelineDot style={{ left: `${50}%` }} />
              <EventImage src={event.image} alt={event.title} />
              <EventInfo>
                <EventYear>{event.year}</EventYear>
                <EventTitle>{event.title}</EventTitle>
                <EventDescription>{event.description}</EventDescription>
              </EventInfo>
            </TimelineEvent>
          ))}
        </TimelineTrack>
      </TimelineWrapper>

      <TimelineNavigation>
        <NavButton
          onClick={() => scrollToEvent(currentIndex - 1)}
          disabled={currentIndex === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </NavButton>
        <NavButton
          onClick={() => scrollToEvent(currentIndex + 1)}
          disabled={currentIndex === timelineEvents.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </NavButton>
      </TimelineNavigation>

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
