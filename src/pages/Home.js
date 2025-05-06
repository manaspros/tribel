import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import HeroSection from "../components/HeroSection";
import TimelineSection from "../components/TimelineSection";
import QuoteSection from "../components/QuoteSection";
import StatisticsSection from "../components/StatisticsSection";
import VisitSection from "../components/VisitSection";
import CTASection from "../components/CTASection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLoading } from "../contexts/LoadingContext";
import { useLanguage } from "../contexts/LanguageContext";
import DirectorMessage from "../components/MinisterSection";

const PageWrapper = styled(motion.div)`
  background: #1a1410;
  color: #f5efe7;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

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
  gap: 60px;
  padding: 0 40px;

  @media (max-width: 992px) {
    flex-direction: column;
    padding: 0 20px;
  }
`;

const VisitInfo = styled.div`
  flex: 1;
  padding-right: 20px;

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

  @media (max-width: 992px) {
    padding-right: 0;
    margin-bottom: 30px;
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

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  width: 100%;

  @media (max-width: 992px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ReviewCard = styled.div`
  background-color: rgba(255, 255, 255, 0.08);
  padding: 25px;
  border-radius: 10px;
  border-left: 3px solid #d3a164;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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

const Home = () => {
  const { setLoaded } = useLoading();
  const { t } = useLanguage();
  const reviewsRef = useRef(null);
  const inViewReviews = useInView(reviewsRef, { once: false, amount: 0.3 });

  useEffect(() => {
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
      <DirectorMessage
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />
      <QuoteSection />
      <TimelineSection />
      <StatisticsSection />
      <VisitSection style={{ padding: "100px 0" }}>
        <SectionTitle
          as={motion.h2}
          initial={{ opacity: 0, y: 30 }}
          animate={inViewReviews ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {t("shareExperience")}
        </SectionTitle>
        <VisitContainer ref={reviewsRef}>
          <VisitInfo>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={inViewReviews ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t("reviewContainerTitle")}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inViewReviews ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("reviewContainerCmd")}
            </motion.p>
            <VisitButton
              initial={{ opacity: 0, y: 20 }}
              animate={inViewReviews ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(211, 161, 100, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t("writeAReview")}
            </VisitButton>
          </VisitInfo>
          <ReviewsContainer>
            <ReviewCard
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={inViewReviews ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                borderLeft: "5px solid #d3a164",
              }}
            >
              <ReviewStars>{t("fiveStars")}</ReviewStars>
              <ReviewText>{t("review1")}</ReviewText>
              <ReviewAuthor>{t("reviewAuthor1")}</ReviewAuthor>
            </ReviewCard>
            <ReviewCard
              as={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={inViewReviews ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                borderLeft: "5px solid #d3a164",
              }}
            >
              <ReviewStars>{t("fiveStars")}</ReviewStars>
              <ReviewText>{t("review2")}</ReviewText>
              <ReviewAuthor>{t("reviewAuthor2")}</ReviewAuthor>
            </ReviewCard>
          </ReviewsContainer>
        </VisitContainer>
      </VisitSection>
      <CTASection />
      <Footer />
    </PageWrapper>
  );
};

export default Home;
