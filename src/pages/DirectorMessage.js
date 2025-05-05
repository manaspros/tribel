import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import translation data
import directorTranslations from "../data/directorMessageTranslations.json";

// Placeholder images - replace with actual images
import cmImage from "../assets/cm-placeholder.jpg";
import deputyCmImage from "../assets/minister-placeholder.jpg";
import ministerImage from "../assets/minister-placeholder.jpg";
import forestBg from "../assets/forest-bg.jpeg"; // Import the same background image as HeroSection

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 40vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.8),
      rgba(26, 20, 16, 0.9)
    ),
    url(${forestBg}); /* Use the same background image as HeroSection instead of directorImage */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Add padding to account for navbar height */

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
  padding: 30px 20px 80px;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3rem;
  margin-bottom: 10px;
  margin-top: 0;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
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

const MessageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MessageGridBottom = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MessageSection = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  background: rgba(42, 35, 28, 0.5);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageHeader = styled.div`
  background: rgba(211, 161, 100, 0.2);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid rgba(211, 161, 100, 0.3);
`;

const MessageTitle = styled.h2`
  color: #d3a164;
  font-size: 1.4rem;
  margin: 0;
  font-family: "Playfair Display", serif;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessageImageContainer = styled.div`
  width: 100%;
  height: 180px;
  flex-shrink: 0;
`;

const MessageImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const MessageText = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow: hidden;
  position: relative;

  p {
    line-height: 1.6;
    margin-bottom: 15px;
    font-size: 1rem;
  }
`;

const MessageSignature = styled.div`
  font-family: "Playfair Display", serif;
  font-style: italic;
  margin-top: 15px;

  .name {
    font-size: 1.1rem;
    color: #d3a164;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .title {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const ExpandButton = styled.button`
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  border: 1px solid #d3a164;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(211, 161, 100, 0.4);
  }
`;

const MessageTextContent = styled(motion.div)`
  max-height: ${props => props.isExpanded ? 'none' : '150px'};
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isExpanded ? '0' : '80px'};
    background: linear-gradient(to top, rgba(42, 35, 28, 1), rgba(42, 35, 28, 0));
    pointer-events: none;
    display: ${props => props.isExpanded ? 'none' : 'block'};
  }
`;

const MessageCard = ({ title, content, name, position, image, delay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language } = useLanguage();

  return (
    <MessageSection
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <MessageHeader>
        <MessageTitle>{title}</MessageTitle>
      </MessageHeader>
      <MessageContent>
        <MessageImageContainer>
          <MessageImage image={image} />
        </MessageImageContainer>
        <MessageText>
          <MessageTextContent isExpanded={isExpanded}>
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <MessageSignature>
              <div className="name">{name}</div>
              <div className="title">{position}</div>
            </MessageSignature>
          </MessageTextContent>
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded 
              ? (language === "en" ? "Show Less" : "कम दिखाएं") 
              : (language === "en" ? "Read More" : "अधिक पढ़ें")}
          </ExpandButton>
        </MessageText>
      </MessageContent>
    </MessageSection>
  );
};

const DirectorMessage = () => {
  const { language } = useLanguage();

  // Function to get translations
  const getContent = (key) => {
    if (directorTranslations[language] && directorTranslations[language][key]) {
      return directorTranslations[language][key];
    }
    // Fallback to English if translation is missing
    return directorTranslations.en[key] || key;
  };

  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {getContent("pageTitle")}
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <BackLink to="/museum-stats">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {getContent("backToAbout")}
        </BackLink>

        {/* Top row: Director and CM messages */}
        <MessageGrid>
          <MessageCard
            title={getContent("directorMessageTitle")}
            content={[
              getContent("directorMessage1"),
              getContent("directorMessage2"),
              getContent("directorMessage3")
            ]}
            name={getContent("directorName")}
            position={getContent("directorTitle")}
            image={forestBg}
            delay={0}
          />
          
          <MessageCard
            title={getContent("cmMessageTitle")}
            content={[
              getContent("cmMessage1"),
              getContent("cmMessage2"),
              getContent("cmMessage3")
            ]}
            name={getContent("cmName")}
            position={getContent("cmTitle")}
            image={cmImage}
            delay={0.1}
          />
        </MessageGrid>

        {/* Bottom row: Deputy CM and Ministers messages */}
        <MessageGridBottom>
          <MessageCard
            title={getContent("deputyCmMessageTitle")}
            content={[
              getContent("deputyCmMessage1"),
              getContent("deputyCmMessage2"),
              getContent("deputyCmMessage3")
            ]}
            name={getContent("deputyCmName")}
            position={getContent("deputyCmTitle")}
            image={deputyCmImage}
            delay={0.2}
          />
          
          <MessageCard
            title={getContent("ministerMessageTitle")}
            content={[
              getContent("ministerMessage1"),
              getContent("ministerMessage2"),
              getContent("ministerMessage3")
            ]}
            name={getContent("ministerName")}
            position={getContent("ministerTitle")}
            image={ministerImage}
            delay={0.3}
          />
          
          {/* Third card with proper translations */}
          <MessageCard
            title={getContent("additionalMessageTitle")}
            content={[
              getContent("additionalMessage1"),
              getContent("additionalMessage2")
            ]}
            name={getContent("additionalName")}
            position={getContent("additionalTitle")}
            image={ministerImage}
            delay={0.4}
          />
        </MessageGridBottom>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default DirectorMessage;
