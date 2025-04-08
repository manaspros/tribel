import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 1.8rem;
  margin: 30px 0 15px;
`;

const Description = styled.p`
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const StatCard = styled.div`
  background-color: #241c17;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const StatNumber = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #d3a164;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 1rem;
`;

const AboutPage = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: "📚",
      number: "10,000+",
      label: t("Preserved Artifacts"),
    },
    {
      icon: "🌍",
      number: "50+",
      label: t("Tribal Communities"),
    },
    {
      icon: "👥",
      number: "250,000+",
      label: t("Annual Visitors"),
    },
    {
      icon: "🎓",
      number: "500+",
      label: t("Educational Programs"),
    },
  ];

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("aboutMuseum")}
        </PageTitle>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Description>{t("aboutDesc")}</Description>

          <SectionTitle>{t("Our Mission")}</SectionTitle>
          <Description>
            The Tribal Heritage Museum is dedicated to preserving and promoting
            the rich cultural heritage of indigenous tribal communities. We
            strive to educate visitors about the unique traditions, art, and
            historical significance of tribal cultures while fostering respect
            and appreciation for their contributions to our shared human
            heritage.
          </Description>

          <SectionTitle>{t("Museum Impact")}</SectionTitle>

          <StatsContainer>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsContainer>

          <SectionTitle>{t("visitUs")}</SectionTitle>
          <Description>{t("Step into the captivating world")}</Description>
          <Description>
            <strong>{t("hours")}:</strong> {t("Open Tuesday through Sunday")}
            <br />
            <strong>{t("contact")}:</strong> {t("+1 (555) 123-4567")}
            <br />
            <strong>{t("Email")}:</strong> {t("contact@tribalmuseum.org")}
          </Description>
        </motion.div>
      </ContentContainer>
    </PageContainer>
  );
};

export default AboutPage;
