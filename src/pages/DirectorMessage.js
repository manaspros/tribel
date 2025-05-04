import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import translation data
import directorTranslations from "../data/directorMessageTranslations.json";

// Placeholder images - replace with actual images
import directorImage from "../assets/minister-placeholder.jpg";
import cmImage from "../assets/cm-placeholder.jpg";
import deputyCmImage from "../assets/minister-placeholder.jpg";
import ministerImage from "../assets/minister-placeholder.jpg";

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
    url(${directorImage});
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
  font-size: 3rem;
  margin-bottom: 20px;
  margin-top: 80px;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
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

const MessageSection = styled.div`
  margin: 60px 0;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(42, 35, 28, 0.5);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
`;

const MessageHeader = styled.div`
  background: rgba(211, 161, 100, 0.2);
  padding: 20px 30px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(211, 161, 100, 0.3);
`;

const MessageTitle = styled.h2`
  color: #d3a164;
  font-size: 1.8rem;
  margin: 0;
  font-family: "Playfair Display", serif;
`;

const MessageContent = styled.div`
  display: flex;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MessageImageContainer = styled.div`
  width: 300px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const MessageImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const MessageText = styled.div`
  padding: 30px;
  flex-grow: 1;

  p {
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
`;

const MessageSignature = styled.div`
  font-family: "Playfair Display", serif;
  font-style: italic;
  margin-top: 30px;

  .name {
    font-size: 1.2rem;
    color: #d3a164;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

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

  // ...existing code...

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

        {/* Chief Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("cmMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={cmImage} />
            </MessageImageContainer>
            <MessageText>
              <p>{getContent("cmMessage1")}</p>
              <p>{getContent("cmMessage2")}</p>
              <p>{getContent("cmMessage3")}</p>
              <MessageSignature>
                <div className="name">{getContent("cmName")}</div>
                <div className="title">{getContent("cmTitle")}</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("ministerMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={ministerImage} />
            </MessageImageContainer>
            <MessageText>
              <p>{getContent("ministerMessage1")}</p>
              <p>{getContent("ministerMessage2")}</p>
              <p>{getContent("ministerMessage3")}</p>
              <MessageSignature>
                <div className="name">{getContent("ministerName")}</div>
                <div className="title">{getContent("ministerTitle")}</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Director's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("directorMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            {/* <MessageImageContainer>
              <MessageImage image={directorImage} />
            </MessageImageContainer> */}
            <MessageText>
              <p>{getContent("directorMessage1")}</p>
              <p>{getContent("directorMessage2")}</p>
              <p>{getContent("directorMessage3")}</p>
              <MessageSignature>
                <div className="name">{getContent("directorName")}</div>
                <div className="title">{getContent("directorTitle")}</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default DirectorMessage;
