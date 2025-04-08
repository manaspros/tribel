import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import MuseumCard from "../components/MuseumCard";
import MuseumIcon from "../components/MuseumIcon";
import MuseumTitle from "../components/MuseumTitle";
import MuseumDescription from "../components/MuseumDescription";
import MuseumLink from "../components/MuseumLink";
import SectionTitle from "../components/SectionTitle";
import VisitSection from "../components/VisitSection";
import VisitContainer from "../components/VisitContainer";
import VisitInfo from "../components/VisitInfo";
import VisitButton from "../components/VisitButton";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      {/* Modified section for museum cards */}
      <MuseumSection>
        <SectionTitle>{t("ourMuseums")}</SectionTitle>
        <MuseumsContainer>
          <MuseumCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MuseumIcon>🏺</MuseumIcon>
            <MuseumTitle>
              {t("tribal")} {t("heritageMuseum")}
            </MuseumTitle>
            <MuseumDescription>{t("tribalMuseumDesc")}</MuseumDescription>
            <MuseumLink to="/tribal">{t("explore")} →</MuseumLink>
          </MuseumCard>

          <MuseumCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MuseumIcon>⚔️</MuseumIcon>
            <MuseumTitle>
              {t("freedom")} {t("fighterMuseum")}
            </MuseumTitle>
            <MuseumDescription>{t("freedomMuseumDesc")}</MuseumDescription>
            <MuseumLink to="/freedom">{t("explore")} →</MuseumLink>
          </MuseumCard>

          {/* Removed Virtual Exhibit Gallery card */}
        </MuseumsContainer>
      </MuseumSection>

      {/* Replace Plan Your Visit with Leave a Review section */}
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
            <VisitButton>{t("Write a Review")}</VisitButton>
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
    </PageContainer>
  );
};

const MuseumSection = styled.section`
  padding: 40px 0;
`;

const MuseumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

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

export default HomePage;
