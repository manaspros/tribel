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
import cmImage from "../assets/cm-placeholder.jpg";
import deputyCmImage from "../assets/minister-placeholder.jpg";
import backgroundImage from "../assets/RUID75f5bbabcf5843eda2d9fafa639f5b56.jpg";
import directorImage from "../assets/DirectorPhoto.JPG";
import secretaryImage from "../assets/secretary-placeholder.jpg";
import commissionerImage from "../assets/commissioner-placeholder.jpg";

const PageContainer = styled.div`
  background-image: linear-gradient(rgba(155, 119, 89, 0.85), rgba(169, 130, 99, 0.85)), 
                    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #f5efe7; /* Changed from #fff to a softer off-white for better reading */
  min-height: 100vh;
`;
const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 20px 80px; /* Increased top padding from 60px to 110px to account for navbar */
  position: relative;
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
  margin: 30px 0; /* Reduced margin from 40px to 30px */
  border-radius: 15px;
  overflow: hidden;
  background: rgba(42, 35, 28, 0.5);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  max-width: 800px; /* Reduced max-width from 900px to 800px */
  margin-left: auto;
  margin-right: auto;
`;

const MessageHeader = styled.div`
  background: rgba(211, 161, 100, 0.2);
  padding: 15px 25px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(211, 161, 100, 0.3);
`;

const MessageTitle = styled.h2`
  color: #d3a164;
  font-size: 1.6rem;
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
  width: 200px; /* Reduced width from 250px to 200px */
  flex-shrink: 0;
  align-self: flex-start; /* Keep the image aligned to the top */
  height: 240px; /* Fixed height to prevent growing */
  overflow: hidden; /* Ensure image stays contained */

  @media (max-width: 768px) {
    width: 100%;
    height: 200px; /* Reduced height from 250px to 200px */
  }
`;

const MessageImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center top; /* Position from the top for better framing */
`;

const MessageText = styled.div`
  padding: 25px; /* Reduced padding from 30px to 25px */
  flex-grow: 1;
  position: relative; /* Added for positioning the expand button */
  overflow: visible; /* Allow content to expand without affecting container */

  p {
    line-height: 1.7; /* Reduced line height from 1.8 to 1.7 */
    margin-bottom: 15px; /* Reduced margin-bottom from 20px to 15px */
    font-size: 1rem; /* Reduced font size from 1.1rem to 1rem */
  }
  
  /* Added to create fading effect for truncated text */
  &.truncated::after {
    content: '';
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 100%;
    height: 60px;
    pointer-events: none;
  }
`;

const MessageSignature = styled.div`
  font-family: "Playfair Display", serif;
  font-style: italic;
  margin-top: 30px;
  margin-bottom: 15px; /* Added margin-bottom to create space for the button */

  .name {
    font-size: 1.2rem;
    color: #d3a164;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;

const ExpandButton = styled.button`
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  border: 1px solid #d3a164;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  display: block; /* Change from inline to block */
  clear: both; /* Ensure it's below other elements */
  position: relative; /* Ensure proper stacking */
  z-index: 2; /* Place above the gradient overlay */
  
  &:hover {
    background: rgba(211, 161, 100, 0.3);
  }
`;

const DirectorMessage = () => {
  const { language } = useLanguage();
  const [cmExpanded, setCmExpanded] = React.useState(false);
  const [deputyExpanded, setDeputyExpanded] = React.useState(false);
  const [secretaryExpanded, setSecretaryExpanded] = React.useState(false);
  const [commissionerExpanded, setCommissionerExpanded] = React.useState(false);
  const [directorExpanded, setDirectorExpanded] = React.useState(false);

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

      <ContentContainer>
        <BackLink to="/museum-stats">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {getContent("backToAbout")}
        </BackLink>

        {/* Chief Minister's Message - Now shown first */}
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
            <MessageText className={!cmExpanded ? "truncated" : ""}>
              <p>{getContent("cmMessage1")}</p>
              {cmExpanded && (
                <>
                  <p>{getContent("cmMessage2")}</p>
                  <p>{getContent("cmMessage3")}</p>
                </>
              )}
              <MessageSignature>
                <div className="name">{getContent("cmName")}</div>
              </MessageSignature>
              <div style={{ marginTop: "20px" }}>
                <ExpandButton onClick={() => setCmExpanded(!cmExpanded)}>
                  {cmExpanded ? getContent("showLess") : getContent("readMore")}
                </ExpandButton>
              </div>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Deputy Chief Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("deputyCmMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={deputyCmImage} />
            </MessageImageContainer>
            <MessageText className={!deputyExpanded ? "truncated" : ""}>
              <p>{getContent("deputyCmMessage1")}</p>
              {deputyExpanded && (
                <>
                  <p>{getContent("deputyCmMessage2")}</p>
                  <p>{getContent("deputyCmMessage3")}</p>
                </>
              )}
              <MessageSignature>
                <div className="name">{getContent("deputyCmName")}</div>
              </MessageSignature>
              <div style={{ marginTop: "20px" }}>
                <ExpandButton onClick={() => setDeputyExpanded(!deputyExpanded)}>
                  {deputyExpanded ? getContent("showLess") : getContent("readMore")}
                </ExpandButton>
              </div>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Principal Secretary's Message - Added after Deputy CM */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("secretaryMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={secretaryImage} />
            </MessageImageContainer>
            <MessageText className={!secretaryExpanded ? "truncated" : ""}>
              <p>{getContent("secretaryMessage1")}</p>
              {secretaryExpanded && (
                <>
                  <p>{getContent("secretaryMessage2")}</p>
                  <p>{getContent("secretaryMessage3")}</p>
                  <p>{getContent("secretaryMessage4")}</p>
                </>
              )}
              <MessageSignature>
                <div className="name">{getContent("secretaryName")}</div>
              </MessageSignature>
              <div style={{ marginTop: "20px" }}>
                <ExpandButton onClick={() => setSecretaryExpanded(!secretaryExpanded)}>
                  {secretaryExpanded ? getContent("showLess") : getContent("readMore")}
                </ExpandButton>
              </div>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Commissioner's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("commissionerMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={commissionerImage} />
            </MessageImageContainer>
            <MessageText className={!commissionerExpanded ? "truncated" : ""}>
              <p>{getContent("commissionerMessage1")}</p>
              {commissionerExpanded && (
                <>
                  <p>{getContent("commissionerMessage2")}</p>
                  <p>{getContent("commissionerMessage3")}</p>
                </>
              )}
              <MessageSignature>
                <div className="name">{getContent("commissionerName")}</div>
              </MessageSignature>
              <div style={{ marginTop: "20px" }}>
                <ExpandButton onClick={() => setCommissionerExpanded(!commissionerExpanded)}>
                  {commissionerExpanded ? getContent("showLess") : getContent("readMore")}
                </ExpandButton>
              </div>
            </MessageText>
          </MessageContent>
        </MessageSection>
        
        {/* Director's Message - First message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MessageHeader>
            <MessageTitle>{getContent("directorMessageTitle")}</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={directorImage} />
            </MessageImageContainer>
            <MessageText className={!directorExpanded ? "truncated" : ""}>
              <p>{getContent("directorMessage1")}</p>
              {directorExpanded && (
                <>
                  <p>{getContent("directorMessage2")}</p>
                  <p>{getContent("directorMessage3")}</p>
                  <p>{getContent("directorMessage4")}</p>
                  <p>{getContent("directorMessage5")}</p>
                  <p>{getContent("directorMessage6")}</p>
                </>
              )}
              <MessageSignature>
                <div className="name">{getContent("directorName")}</div>
              </MessageSignature>
              <div style={{ marginTop: "20px" }}>
                <ExpandButton onClick={() => setDirectorExpanded(!directorExpanded)}>
                  {directorExpanded ? getContent("showLess") : getContent("readMore")}
                </ExpandButton>
              </div>
            </MessageText>
          </MessageContent>
        </MessageSection>

      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default DirectorMessage;