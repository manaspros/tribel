import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const StatsContainer = styled.section`
  padding: 100px 20px;
  background: #1a1410;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/assets/subtle-pattern.png") repeat;
    opacity: 0.02;
    z-index: 1;
  }
`;

const StatsHeading = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  color: #d3a164;
  margin-bottom: 50px;
  font-family: "Playfair Display", serif;
  position: relative;
  z-index: 2;

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(to right, transparent, #d3a164, transparent);
    margin: 15px auto 0;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.6);
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(211, 161, 100, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, #d3a164, transparent);
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(211, 161, 100, 0.3);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  }

  transition: all 0.3s ease;
`;

const StatNumber = styled.div`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #d3a164;
  margin-bottom: 15px;
  font-family: "Playfair Display", serif;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #f5efe7;
  line-height: 1.4;
  margin-bottom: 15px;
`;

const StatDescription = styled.p`
  font-size: 0.9rem;
  color: rgba(245, 239, 231, 0.7);
  margin-top: 10px;
  line-height: 1.6;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 15px;
  opacity: 0.8;

  svg {
    width: 100%;
    height: 100%;
    fill: #d3a164;
  }
`;

const statsData = {
  en: [
    {
      icon: "📚",
      number: "3000+",
      label: "Artifacts Preserved",
      description:
        "Carefully curated artifacts representing the rich heritage of indigenous communities",
    },
    {
      icon: "🌍",
      number: "43",
      label: "Tribal Communities",
      description:
        "Representing the diverse cultures and traditions of indigenous peoples",
    },
    {
      icon: "👥",
      number: "0",
      label: "Annual Visitors",
      description:
        "Engaging with our exhibits, workshops, and educational programs",
    },
    {
      icon: "🎓",
      number: "0",
      label: "Educational Programs",
      description:
        "Workshops, seminars, and outreach initiatives conducted annually",
    },
  ],
  hi: [
    {
      icon: "📚",
      number: "3000+",
      label: "संरक्षित कलाकृतियां",
      description:
        "स्वदेशी समुदायों की समृद्ध विरासत का प्रतिनिधित्व करने वाली सावधानीपूर्वक तैयार की गई कलाकृतियां",
    },
    {
      icon: "🌍",
      number: "43",
      label: "आदिवासी समुदाय",
      description:
        "स्वदेशी लोगों की विविध संस्कृतियों और परंपराओं का प्रतिनिधित्व करते हुए",
    },
    {
      icon: "👥",
      number: "0",
      label: "वार्षिक आगंतुक",
      description:
        "हमारी प्रदर्शनियों, कार्यशालाओं और शैक्षिक कार्यक्रमों के साथ जुड़ाव",
    },
    {
      icon: "🎓",
      number: "0",
      label: "शैक्षिक कार्यक्रम",
      description: "वार्षिक आयोजित कार्यशालाएं, संगोष्ठियां और आउटरीच पहल",
    },
  ],
};

const StatisticsSection = () => {
  const { language, t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const stats = statsData[language];

  useEffect(() => {
    if (isInView) {
      gsap.from(".stat-number", {
        textContent: "0",
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.25,
        onUpdate: function () {
          if (this.targets()[0]) {
            const target = this.targets()[0];
            const originalText = target.getAttribute("data-value");

            if (originalText.includes("+") || originalText.includes("%")) {
              const numericPart = parseInt(originalText);
              const suffix = originalText.replace(/[0-9]/g, "");

              const current = Math.ceil(
                gsap.getProperty(this.targets()[0], "textContent")
              );
              target.textContent = current + suffix;
            }
          }
        },
      });
    }
  }, [isInView]);

  return (
    <StatsContainer
      ref={sectionRef}
      id="museum-stats" // Add this ID for scrolling
    >
      <StatsHeading>{t("Museum Impact")}</StatsHeading>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatNumber className="stat-number" data-value={stat.number}>
              {stat.number}
            </StatNumber>
            <StatLabel>{stat.label}</StatLabel>
            <StatDescription>{stat.description}</StatDescription>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatisticsSection;
