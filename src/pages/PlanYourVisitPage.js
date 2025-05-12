import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import visitTranslations from "../data/visitPageTranslations.json";

// Import background image (use one from your assets)
import planVisitBg from "../assets/tribel/Picture3.jpg";
import backgroundImage from "../assets/RUID75f5bbabcf5843eda2d9fafa639f5b56.jpg";

const PageContainer = styled.div`
  background-image: linear-gradient(rgba(155, 119, 89, 0.85), rgba(169, 130, 99, 0.85)), 
                    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #f5efe7; /* Changed from #fff to a softer off-white for better reading */
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 50vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.7),
      rgba(26, 20, 16, 0.9)
    ),
    url(${planVisitBg});
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
`;

const PageTitle = styled(motion.h1)`
  color:rgb(0, 0, 0);
  font-size: 3.5rem;
  margin-top: 180px;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const SectionTitle = styled.h2`
  color:rgb(231, 171, 96);
  font-size: 2rem;
  margin: 50px 0 20px;
  position: relative;
  padding-left: 20px;

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

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const PlanningGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 50px 0;
`;

const PlanningCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 10px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(211, 161, 100, 0.5);
  }
`;

const CardTitle = styled.h3`
  color: #d3a164;
  font-size: 1.5rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;
    display: flex;
    align-items: flex-start;

    &:before {
      content: "•";
      color: #d3a164;
      font-weight: bold;
      margin-right: 10px;
    }
  }
`;

const Accordion = styled.div`
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(211, 161, 100, 0.2);
`;

const AccordionHeader = styled.div`
  background: rgba(42, 35, 28, 0.8);
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
    color: #d3a164;
    font-weight: 600;
  }
`;

const AccordionContent = styled(motion.div)`
  padding: 0;
  background: rgba(42, 35, 28, 0.4);
  overflow: hidden;
`;

const AccordionInner = styled.div`
  padding: 20px;
`;

const Button = styled(motion.a)`
  display: inline-block;
  background: #d3a164;
  color: #1a1410;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(211, 161, 100, 0.3);

  &:hover {
    background: #e4b87f;
  }
`;

const FAQItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Accordion>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <h4>{title}</h4>
        <span>{isOpen ? "−" : "+"}</span>
      </AccordionHeader>
      <AccordionContent
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <AccordionInner>{children}</AccordionInner>
      </AccordionContent>
    </Accordion>
  );
};

const AmenitiesGrid = styled(PlanningGrid)`
  margin-bottom: 50px;
`;

const AmenityCard = styled(PlanningCard)`
  text-align: center;
  padding: 30px 20px;
`;

const AmenityIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #d3a164;
`;

const AmenityTitle = styled.h3`
  color: #d3a164;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const AmenityDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const PlanYourVisitPage = () => {
  const { language } = useLanguage();

  // Function to get translations from visitTranslations file
  const t = (key) => {
    // Handle nested keys (for FAQ items)
    if (key.includes(".")) {
      const [section, item, property] = key.split(".");
      return visitTranslations[language][section][parseInt(item)][property];
    }

    return visitTranslations[language][key] || visitTranslations.en[key] || key;
  };

  return (
    <PageContainer>
      <Navbar hideDepartmentNames={true} />

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("pageTitle")}
        </PageTitle>
          <Description>{t("introduction")}</Description>

          <PlanningGrid>
            <PlanningCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                {t("openingHoursTitle")}
              </CardTitle>
              <InfoList>
                {t("openingHoursList").map((item, index) => (
                  <li key={`hours-${index}`}>{item}</li>
                ))}
              </InfoList>
            </PlanningCard>

            <PlanningCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.4 2.72 3.52 3.33 1.74.5 2.2 1.2 2.2 1.95 0 .8-.65 1.57-2.01 1.57-1.36 0-2.05-.59-2.15-1.57H8.01c.1 1.58 1.23 2.66 2.89 2.96V19h1.32v-1.67c1.56-.3 2.7-1.37 2.7-2.83-.01-2.24-1.85-3.09-3.61-3.36z" />
                </svg>
                {t("admissionTitle")}
              </CardTitle>
              <InfoList>
                {t("admissionList").map((item, index) => (
                  <li key={`admission-${index}`}>{item}</li>
                ))}
              </InfoList>
              <Button
                                  as={Link}
                                  to="/book-now"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("bookTickets")}
              </Button>
            </PlanningCard>

            <PlanningCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardTitle>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#d3a164">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {t("gettingHereTitle")}
              </CardTitle>
              <InfoList>
                {t("gettingHereList").map((item, index) => (
                  <li key={`getting-here-${index}`}>{item}</li>
                ))}
              </InfoList>
              <Button
                as="a"
                href="https://www.google.com/maps?q=Tribal+Freedom+Fighter+Museum+Naya+Raipur"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("getDirections")}
              </Button>
            </PlanningCard>
          </PlanningGrid>

          <SectionTitle>{t("amenitiesTitle") || "Amenities"}</SectionTitle>
          <Description>
            {t("amenitiesIntro") ||
              "For your comfort and convenience, our museum offers various amenities to enhance your visit experience."}
          </Description>

          <AmenitiesGrid>
            <AmenityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AmenityIcon>🍽️</AmenityIcon>
              <AmenityTitle>
                {t("restaurantTitle") || "Restaurant"}
              </AmenityTitle>
              <AmenityDescription>
                {t("restaurantDesc") ||
                  "Our restaurant offers a variety of local and international cuisine options. Enjoy refreshments, snacks, or a full meal in a comfortable setting."}
              </AmenityDescription>
            </AmenityCard>

            <AmenityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AmenityIcon>🚻</AmenityIcon>
              <AmenityTitle>{t("washroomsTitle") || "Washrooms"}</AmenityTitle>
              <AmenityDescription>
                {t("washroomsDesc") ||
                  "Clean and accessible washrooms are available throughout the museum. Facilities for persons with disabilities and baby changing stations are also provided."}
              </AmenityDescription>
            </AmenityCard>

            <AmenityCard
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AmenityIcon>🧒</AmenityIcon>
              <AmenityTitle>
                {t("playAreaTitle") || "Children's Play Area"}
              </AmenityTitle>
              <AmenityDescription>
                {t("playAreaDesc") ||
                  "A dedicated play area for children features interactive elements and educational activities. Let your kids have fun while learning about tribal heritage and culture."}
              </AmenityDescription>
            </AmenityCard>
          </AmenitiesGrid>

          <SectionTitle>{t("guidelinesTitle")}</SectionTitle>
          <Description>{t("guidelinesIntro")}</Description>

          <InfoList style={{ maxWidth: "800px" }}>
            {t("guidelinesList").map((item, index) => (
              <li key={`guideline-${index}`}>{item}</li>
            ))}
          </InfoList>

          <SectionTitle>{t("faqTitle")}</SectionTitle>

          <div style={{ maxWidth: "800px", margin: "30px 0" }}>
            {t("faqItems").map((faq, index) => (
              <FAQItem key={`faq-${index}`} title={faq.question}>
                <p>{faq.answer}</p>
              </FAQItem>
            ))}
          </div>

          <SectionTitle>{t("contactTitle")}</SectionTitle>
          <Description>{t("contactIntro")}</Description>

          <InfoList style={{ maxWidth: "800px" }}>
            {t("contactList").map((item, index) => (
              <li key={`contact-${index}`}>{item}</li>
            ))}
          </InfoList>

          <Button
            as={Link}
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: "30px" }}
          >
            {t("visitContactPage")}
          </Button>
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default PlanYourVisitPage;
