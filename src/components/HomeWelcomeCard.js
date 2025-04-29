import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const CardContainer = styled(motion.div)`
  position: absolute;
  right: 40px;
  top: 95vh; // Position at the bottom of hero section
  transform: translateY(-50%);
  width: 420px; /* Increased width from 350px to 420px */
  background: rgba(26, 20, 16, 0.95);
  border-radius: 10px; /* Slightly larger radius */
  padding: 20px 25px; /* Increased padding for more space */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(211, 161, 100, 0.3);
  text-align: center;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px; /* Slightly thicker top border */
    background: linear-gradient(to right, #d3a164, #e4b87f);
    border-radius: 10px 10px 0 0;
  }

  /* Only display on laptops/desktops, hide on tablets and mobile */
  @media (max-width: 1024px) {
    display: none;
  }
`;

const WelcomeTitle = styled.h2`
  color: #d3a164;
  font-size: 1.4rem; /* Increased font size */
  margin-bottom: 8px;
  font-family: "Playfair Display", serif;
`;

const StatusAndHoursContainer = styled.div`
  display: flex;
  margin: 12px 0; /* Increased margin */
  align-items: flex-start;
  gap: 20px; /* Increased gap between status and hours */
`;

const Status = styled.div`
  background: rgba(211, 161, 100, 0.15);
  padding: 10px 15px; /* Increased padding */
  border-radius: 8px;
  border-left: 3px solid ${(props) => (props.isOpen ? "#4CAF50" : "#e74c3c")};
  text-align: left;
  flex: 1;
  min-width: 140px; /* Increased min-width */

  span {
    font-weight: bold;
    color: ${(props) => (props.isOpen ? "#4CAF50" : "#e74c3c")};
    font-size: 0.95rem; /* Increased font size */
    display: block;
    margin-bottom: 2px;
  }
`;

const StatusMessage = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.85rem; /* Increased font size */
  opacity: 0.9;
`;

const OperatingHours = styled.div`
  margin: 0;
  font-size: 0.9rem; /* Increased font size */
  color: #f5efe7;
  line-height: 1.5; /* Increased line height */
  flex: 1;
  text-align: left;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px; /* Increased gap */
  margin-top: 15px; /* Increased margin */
  justify-content: center;
`;

const PrimaryButton = styled(motion.a)`
  background: #d3a164;
  color: #1a1410;
  padding: 8px 16px; /* Increased padding */
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  display: block;
  box-shadow: 0 4px 15px rgba(211, 161, 100, 0.3);
  font-size: 0.9rem; /* Increased font size */

  &:hover {
    background: #e4b87f;
  }
`;

const SecondaryButton = styled(motion.a)`
  background: transparent;
  color: #d3a164;
  padding: 7px 16px; /* Increased padding */
  border-radius: 20px;
  border: 1px solid #d3a164;
  font-weight: 600;
  text-decoration: none;
  flex: 1;
  display: block;
  font-size: 0.9rem; /* Increased font size */

  &:hover {
    background: rgba(211, 161, 100, 0.15);
  }
`;

// Helper function to check if the museum is open today
const isMuseumOpenToday = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hours = now.getHours();

  // If Monday, museum is closed
  if (day === 1) return false;

  // For Tuesday-Friday (2-5)
  if (day >= 2 && day <= 5) {
    return hours >= 10 && hours < 18; // 10 AM - 6 PM
  }

  // For weekends (0, 6)
  if (day === 0 || day === 6) {
    return hours >= 9 && hours < 19; // 9 AM - 7 PM
  }

  return false;
};

const HomeWelcomeCard = () => {
  const { t } = useLanguage();
  const isOpen = isMuseumOpenToday();

  // Get current day name
  const getDayName = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  };

  return (
    <CardContainer
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <WelcomeTitle>{t("Welcome to the Museum")}</WelcomeTitle>

      <StatusAndHoursContainer>
        <Status isOpen={isOpen}>
          <span>{isOpen ? t("Open Now") : t("Closed")}</span>
          <StatusMessage>
            {isOpen
              ? t("Currently open for visitors")
              : t(`Closed ${getDayName() === "Monday" ? "(Monday)" : "now"}`)}
          </StatusMessage>
        </Status>

        <OperatingHours>
          {t("Tue-Fri: 10:00 AM - 6:00 PM")}
          <br />
          {t("Sat-Sun: 9:00 AM - 7:00 PM")}
          <br />
          <strong>{t("Monday: Closed")}</strong>
        </OperatingHours>
      </StatusAndHoursContainer>

      <ButtonsContainer>
        <PrimaryButton
          href="#booking"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("Book Ticket")}
        </PrimaryButton>
        <SecondaryButton
          as={Link}
          to="/plan-visit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t("Plan Visit")}
        </SecondaryButton>
      </ButtonsContainer>
    </CardContainer>
  );
};

export default HomeWelcomeCard;
