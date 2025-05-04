import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Some placeholder image
import visionBanner from "../assets/tribel/Picture3.jpg";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 50vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.7),
      rgba(26, 20, 16, 0.9)
    ),
    url(${visionBanner});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
    background: linear-gradient(to top, #1a1410, transparent);
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  color: #d3a164;
  text-decoration: none;
  font-weight: 500;

  svg {
    margin-right: 8px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin: 50px 0 20px;
  position: relative;
  padding-left: 20px;
  font-family: "Playfair Display", serif;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 30px;
    background: #d3a164;
    border-radius: 4px;
  }
`;

const Section = styled(motion.div)`
  margin-bottom: 50px;
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
`;

const Paragraph = styled.p`
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const ValuesList = styled.ul`
  margin: 20px 0;
  padding-left: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ValueItem = styled.li`
  line-height: 1.6;
  font-size: 1.1rem;
  margin-bottom: 15px;
  position: relative;

  &::before {
    content: "•";
    color: #d3a164;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    font-size: 1.5rem;
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: #f5efe7;
  border-left: 4px solid #d3a164;
  padding: 15px 30px;
  margin: 30px 0;
  font-size: 1.2rem;
  background: rgba(211, 161, 100, 0.1);
  border-radius: 0 15px 15px 0;
`;

const VisionPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <div style={{ textAlign: "center" }}>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("Our Vision")}
          </PageTitle>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Preserving the past, embracing the present, inspiring the future
          </Subtitle>
        </div>
      </HeroSection>

      <ContentContainer>
        <BackLink to="/museum-stats">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {t("Back to About Museum")}
        </BackLink>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Vision Statement</SectionTitle>
          <Paragraph>
            Our vision is to create a dynamic cultural institution that
            preserves, celebrates, and promotes the rich heritage of tribal
            communities and freedom fighters, fostering understanding and
            appreciation across generations and cultures.
          </Paragraph>
          <Quote>
            "To be a world-class museum that serves as a cultural bridge between
            past and future, honoring indigenous wisdom and the spirit of
            freedom through engaging experiences that educate, inspire, and
            transform."
          </Quote>
          <Paragraph>
            We envision a museum that not only preserves artifacts but also
            serves as a living cultural center where traditions are kept alive,
            stories are shared, and new generations can connect with their roots
            while building a more inclusive future.
          </Paragraph>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle>Mission</SectionTitle>
          <Paragraph>
            Our mission is to collect, preserve, research, exhibit, and
            interpret the material culture and historical narratives of tribal
            communities and freedom fighters, creating meaningful connections
            between our heritage and contemporary society.
          </Paragraph>
          <Paragraph>We are committed to:</Paragraph>
          <ValuesList>
            <ValueItem>
              Preserving the tangible and intangible heritage of indigenous
              communities
            </ValueItem>
            <ValueItem>
              Documenting and honoring the legacy of freedom fighters who shaped
              our nation
            </ValueItem>
            <ValueItem>
              Creating inclusive and accessible educational experiences for
              diverse audiences
            </ValueItem>
            <ValueItem>
              Fostering dialogue and understanding across cultures and
              generations
            </ValueItem>
            <ValueItem>
              Supporting research that enhances knowledge about tribal history
              and independence movements
            </ValueItem>
            <ValueItem>
              Engaging with communities to ensure authentic representation and
              shared authority
            </ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SectionTitle>Core Values</SectionTitle>
          <ValuesList>
            <ValueItem>
              <strong>Respect:</strong> Honoring the diversity and dignity of
              all cultures, perspectives, and individuals
            </ValueItem>
            <ValueItem>
              <strong>Authenticity:</strong> Ensuring truthful and accurate
              representation of historical narratives and cultural practices
            </ValueItem>
            <ValueItem>
              <strong>Community:</strong> Working collaboratively with
              indigenous communities and stakeholders
            </ValueItem>
            <ValueItem>
              <strong>Innovation:</strong> Embracing new ideas and technologies
              to enhance the visitor experience
            </ValueItem>
            <ValueItem>
              <strong>Accessibility:</strong> Making our collections and
              programs available to all people
            </ValueItem>
            <ValueItem>
              <strong>Stewardship:</strong> Responsibly caring for cultural
              heritage for future generations
            </ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <SectionTitle>Strategic Objectives</SectionTitle>
          <Paragraph>
            To fulfill our vision and mission, we have established the following
            strategic objectives:
          </Paragraph>
          <ValuesList>
            <ValueItem>
              Expand and diversify our collections to ensure comprehensive
              representation of tribal cultures and freedom movements
            </ValueItem>
            <ValueItem>
              Develop innovative exhibition strategies that engage visitors
              through immersive and interactive experiences
            </ValueItem>
            <ValueItem>
              Strengthen educational programs that promote cultural
              understanding and historical awareness
            </ValueItem>
            <ValueItem>
              Build sustainable partnerships with communities, educational
              institutions, and cultural organizations
            </ValueItem>
            <ValueItem>
              Enhance digital presence to reach broader audiences and create
              virtual access to collections
            </ValueItem>
            <ValueItem>
              Establish the museum as a center for research and scholarship in
              tribal studies and freedom movement history
            </ValueItem>
          </ValuesList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SectionTitle>Future Direction</SectionTitle>
          <Paragraph>
            Looking ahead, our museum aims to become a globally recognized
            cultural institution that sets new standards in presenting
            indigenous heritage and historical narratives. We envision expanding
            our physical and digital footprint, developing innovative community
            engagement programs, and establishing a robust research center.
          </Paragraph>
          <Paragraph>
            Through these efforts, we hope to inspire future generations to
            value cultural diversity, understand the complexities of history,
            and apply the wisdom of the past to create a more inclusive and
            equitable future for all.
          </Paragraph>
          <Quote>
            "A museum is not just a collection of artifacts; it is a living
            testament to human creativity, resilience, and aspiration. Our role
            is to ensure that these stories continue to inspire and educate for
            generations to come."
          </Quote>
        </Section>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default VisionPage;
