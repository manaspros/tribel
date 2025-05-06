import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";

// Placeholder images - replace with actual Minister and CM images
import cmImage from "../assets/cm-placeholder.jpg";
import ministerImage from "../assets/minister-placeholder.jpg";

const SectionContainer = styled.section`
  padding: 70px 0;
  background-color: rgba(40, 30, 22, 0.7);
  position: relative;
  overflow: hidden;
  
  /* Add decorative SVG background pattern */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d3a164' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  color: #d3a164;
  font-size: 2.2rem;
  margin-bottom: 2rem;
  font-family: "Playfair Display", serif;
  text-align: center;
`;

const LeadersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
`;

const LeaderCard = styled(motion.div)`
  width: 280px;
  text-align: center;
  
  @media (max-width: 768px) {
    width: 240px;
  }
`;

const LeaderImageContainer = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid #d3a164;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LeaderName = styled.h3`
  color: #d3a164;
  font-size: 1.4rem;
  margin-bottom: 5px;
  font-family: "Playfair Display", serif;
`;

const LeaderTitle = styled.p`
  color: #f5efe7;
  font-size: 1rem;
  margin-bottom: 15px;
  opacity: 0.9;
`;

const LeaderButton = styled(motion.button)`
  background-color: transparent;
  color: #d3a164;
  border: 1px solid #d3a164;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(211, 161, 100, 0.2);
  }
`;

// New styled components for quotes
const QuotesContainer = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  
  /* Decorative top border with gradient */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background: linear-gradient(90deg, rgba(211, 161, 100, 0) 0%, rgba(211, 161, 100, 0.7) 50%, rgba(211, 161, 100, 0) 100%);
  }
  
  /* Decorative tribal-inspired corner elements */
  &::after {
    content: "";
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0,40 L 40,0 L 80,40 L 40,80 Z' stroke='%23d3a164' stroke-width='1' stroke-opacity='0.2' fill='none' /%3E%3C/svg%3E");
    background-position: top right, bottom left;
    background-repeat: no-repeat;
    background-size: 80px;
    pointer-events: none;
    z-index: -1;
  }
`;

// Redesigned QuoteCard with a more stylish layout
const QuoteCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(50, 40, 30, 0.7) 0%, rgba(60, 45, 30, 0.5) 100%);
  border-radius: 16px;
  padding: 30px;
  text-align: left;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  display: flex;
  align-items: center;
  gap: 40px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  position: relative;
  
  /* Subtle glow effect on hover */
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35),
                0 0 30px rgba(211, 161, 100, 0.15);
  }
  
  /* Decorative corner elements */
  &::before, &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(211, 161, 100, 0.3);
    border-radius: 2px;
    z-index: 1;
  }
  
  &::before {
    top: 10px;
    left: 10px;
    border-right: none;
    border-bottom: none;
  }
  
  &::after {
    bottom: 10px;
    right: 10px;
    border-left: none;
    border-top: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 25px;
    gap: 20px;
  }
`;

// More styled image container with subtle border glow
const QuoteAuthorImage = styled.div`
  width: 180px;
  height: 180px;
  min-width: 180px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #d3a164;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4),
              0 0 0 5px rgba(211, 161, 100, 0.1);
  position: relative;
  
  /* Add subtle radial gradient overlay */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%);
    pointer-events: none;
  }
  
  /* Subtle hover animation */
  ${QuoteCard}:hover & {
    transform: scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4),
                0 0 0 8px rgba(211, 161, 100, 0.15),
                0 0 20px rgba(211, 161, 100, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    min-width: 150px;
  }
`;

// Updated QuoteContent with better styling
const QuoteContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 20px;
`;

// More decorative author info with subtle gradients
const QuoteAuthor = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  padding-bottom: 15px;
  position: relative;
  
  /* Gradient border bottom instead of solid line */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(211, 161, 100, 0.1) 0%, rgba(211, 161, 100, 0.6) 50%, rgba(211, 161, 100, 0.1) 100%);
  }
`;

const QuoteAuthorName = styled.span`
  color: #d3a164;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
`;

const QuoteAuthorTitle = styled.span`
  color: #f5efe7;
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 5px;
`;

// More stylish quote with enhanced quotation marks
const QuoteText = styled.blockquote`
  color: #f5efe7;
  font-size: 1.1rem;
  line-height: 1.7;
  margin: 0;
  font-style: italic;
  position: relative;
  padding: 0 10px;
  
  /* Decorative quotation marks with gradient colors */
  &::before, &::after {
    font-family: "Playfair Display", serif;
    position: absolute;
    opacity: 0.9;
    background: linear-gradient(135deg, #d3a164 0%, rgba(211, 161, 100, 0.4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  &::before {
    content: """;
    font-size: 4rem;
    left: -25px;
    top: -30px;
    z-index: 0;
  }
  
  &::after {
    content: """;
    font-size: 4rem;
    right: -15px;
    bottom: -60px;
  }
  
  /* Add subtle highlight to important phrases */
  strong, em {
    color: #d3a164;
    font-weight: 600;
  }
`;

const MinisterSection = () => {
  const { t } = useLanguage();
  
  return (
    <SectionContainer>
      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {t("Our Leadership")}
        </SectionTitle>
        
        
        {/* Updated Quotes Section */}
        <QuotesContainer>
          
            <QuoteCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <QuoteAuthorImage>
                <LeaderImage src={cmImage} alt={t("cmName")} />
              </QuoteAuthorImage>
              
              <QuoteContent>
                <QuoteAuthor>
                  <QuoteAuthorName>{t("cmName")}</QuoteAuthorName>
                  <QuoteAuthorTitle>{t("cmTitle")}</QuoteAuthorTitle>
                </QuoteAuthor>
                <QuoteText>
                  {t("cmQuote1")}
                </QuoteText>
              </QuoteContent>
            </QuoteCard>
            
            {/* Ramvichar Netam's Quote */}
            <QuoteCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <QuoteAuthorImage>
                <LeaderImage src={ministerImage} alt={t("ministerName")} />
              </QuoteAuthorImage>
              
              <QuoteContent>
                <QuoteAuthor>
                  <QuoteAuthorName>{t("ministerName")}</QuoteAuthorName>
                  <QuoteAuthorTitle>{t("ministerTitle")}</QuoteAuthorTitle>
                </QuoteAuthor>
                <QuoteText>
                  {t("ministerQuote1")}
                </QuoteText>
              </QuoteContent>
            </QuoteCard>
           
        </QuotesContainer>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default MinisterSection;
