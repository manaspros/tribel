import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import QuoteSection from "../components/QuoteSection";
import StatisticsSection from "../components/StatisticsSection";
// Remove ExhibitSection import since we're removing Virtual Exhibit Gallery
import VisitSection from "../components/VisitSection";
import CTASection from "../components/CTASection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoading } from "../contexts/LoadingContext";
import { useLanguage } from "../contexts/LanguageContext"; // Add language context

const PageWrapper = styled(motion.div)`
  background: #1a1410;
  color: #f5efe7;
  width: 100%;
  overflow-x: hidden;
`;

// Define the missing styled components
const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-family: "Playfair Display", serif;
`;

const VisitContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const VisitInfo = styled.div`
  flex: 1;

  h3 {
    color: #d3a164;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
`;

const VisitButton = styled(motion.button)`
  background-color: #d3a164;
  color: #1a1410;
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e0b175;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Home = () => {
  const { setLoaded } = useLoading();
  const { t } = useLanguage(); // Add the t function from language context

  useEffect(() => {
    // Start loading sequence
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, [setLoaded]);

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Navbar />
      <HeroSection />
      <QuoteSection />
      <TimelineSection />
      <StatisticsSection />
      <VisitSection>
        <SectionTitle>{t("Share Your Experience")}</SectionTitle>
        <VisitContainer>
          <VisitInfo>
            <h3>{t("We Value Your Feedback")}</h3>
            <p>
              {t(
                "Your thoughts about our museums help us improve the experience for everyone. Share what you enjoyed, what moved you, or what you learned during your visit."
              )}
            </p>
            <VisitButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Write a Review")}
            </VisitButton>
          </VisitInfo>
          <ReviewsContainer>
            <ReviewCard>
              <ReviewStars>★★★★★</ReviewStars>
              <ReviewText>
                "The tribal artifacts exhibition was breathtaking. I gained a
                new appreciation for indigenous craftsmanship and cultural
                heritage."
              </ReviewText>
              <ReviewAuthor>- Priya S.</ReviewAuthor>
            </ReviewCard>
            <ReviewCard>
              <ReviewStars>★★★★★</ReviewStars>
              <ReviewText>
                "The Freedom Fighters Museum tells such powerful stories. Every
                Indian should visit to understand our struggle for
                independence."
              </ReviewText>
              <ReviewAuthor>- Rahul M.</ReviewAuthor>
            </ReviewCard>
          </ReviewsContainer>
        </VisitContainer>
      </VisitSection>
      <CTASection />
      <Footer />
    </PageWrapper>
  );
};

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
`;

const ReviewCard = styled.div`
  background-color: rgba(255, 255, 255, 0.08);
  padding: 20px;
  border-radius: 10px;
  border-left: 3px solid #d3a164;
`;

const ReviewStars = styled.div`
  color: #d3a164;
  margin-bottom: 8px;
  font-size: 1.2rem;
`;

const ReviewText = styled.p`
  font-style: italic;
  margin-bottom: 10px;
`;

const ReviewAuthor = styled.p`
  text-align: right;
  color: #d3a164;
  font-weight: 500;
`;

export default Home;
