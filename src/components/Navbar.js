import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import logo from "../assets/logo.svg";
import gsap from "gsap"; // Add this import for gsap

// Enhanced container with transparent to solid transition
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 100;
  transition: background-color 0.3s ease;

  background-color: ${(props) =>
    props.isScrolled || !props.transparent
      ? "rgba(26, 20, 16, 0.95)"
      : "transparent"};
  backdrop-filter: ${(props) =>
    props.isScrolled || !props.transparent ? "blur(10px)" : "none"};

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

// Simplified logo container without animation markup
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

// Simple logo image without animations
const LogoImage = styled.img`
  height: 45px;
  margin-right: 15px;
`;

// Simple logo text without animations
const LogoText = styled.span`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #d3a164;
  text-decoration: none;
`;

// Enlarged mid-section for menu items
const NavLinks = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// Enhanced nav link styling
const NavLink = styled(motion.a)`
  color: #f5efe7;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 5px 0;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #d3a164;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

// Special CTA button
const BookTicketButton = styled(motion.a)`
  background: #d3a164;
  color: #1a1410;
  padding: 10px 18px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(211, 161, 100, 0.3);

  &:hover {
    background: #e4b87f;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

// Special Virtual Tour button styled like CTA
const VirtualTourButton = styled(motion.a)`
  background: rgba(211, 161, 100, 0.2);
  border: 2px solid #d3a164;
  color: #d3a164;
  padding: 8px 16px;
  border-radius: 30px;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    background: rgba(211, 161, 100, 0.3);
  }
`;

// Language toggle
const LanguageToggle = styled(motion.button)`
  background: none;
  border: 2px solid #d3a164;
  border-radius: 20px;
  color: #f5efe7;
  font-size: 0.9rem;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    background: rgba(211, 161, 100, 0.2);
  }

  @media (max-width: 1024px) {
    margin-right: 15px;
  }
`;

// Mobile menu toggle
const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #f5efe7;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

// Mobile menu
const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: #1a1410;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  z-index: 90;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
`;

// Mobile nav link
const MobileNavLink = styled(NavLink)`
  font-size: 1.2rem;
  padding: 10px 0;
  border-bottom: 1px solid rgba(211, 161, 100, 0.1);
`;

// Mobile book ticket button
const MobileBookButton = styled(motion.a)`
  background: #d3a164;
  color: #1a1410;
  padding: 15px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
  box-shadow: 0 4px 15px rgba(211, 161, 100, 0.3);

  &:hover {
    background: #e4b87f;
  }
`;

const Navbar = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle language toggle and provide visual feedback
  const handleLanguageToggle = () => {
    toggleLanguage();

    // Optional: Add some visual feedback when language is changed
    const languageButtons = document.querySelectorAll(".language-toggle-btn");
    languageButtons.forEach((btn) => {
      gsap.fromTo(
        btn,
        { scale: 0.95 },
        { scale: 1, duration: 0.3, ease: "back.out" }
      );
    });
  };

  return (
    <>
      <NavContainer
        isScrolled={scrolled}
        transparent={transparent}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link to="/">
          <LogoContainer>
            <LogoImage src={logo} alt={t("Tribal Museum")} />
            <LogoText>{t("Tribal Museum")}</LogoText>
          </LogoContainer>
        </Link>

        <NavLinks>
          <NavLink href="#about">{t("About Museum")}</NavLink>
          <NavLink href="#galleries">{t("Galleries")}</NavLink>
          <NavLink href="#collection">{t("Our Collection")}</NavLink>
          <NavLink href="#visiting">{t("Visiting the Museum")}</NavLink>
          <VirtualTourButton
            as={Link}
            to="/virtual-tour"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("Virtual Tour")}
          </VirtualTourButton>

          <LanguageToggle
            onClick={handleLanguageToggle}
            whileTap={{ scale: 0.95 }}
            className="language-toggle-btn"
          >
            {language === "en" ? "हिंदी" : "English"}
          </LanguageToggle>

          <BookTicketButton
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("Book the Ticket")}
          </BookTicketButton>
        </NavLinks>

        <div style={{ display: "flex", alignItems: "center" }}>
          <LanguageToggle
            onClick={handleLanguageToggle}
            whileTap={{ scale: 0.95 }}
            style={{ display: "none" }}
            className="mobile-only language-toggle-btn"
          >
            {language === "en" ? "हिंदी" : "English"}
          </LanguageToggle>

          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            ☰
          </MobileMenuButton>
        </div>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <MobileMenuButton
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              ✕
            </MobileMenuButton>

            <MobileNavLink
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("About Museum")}
            </MobileNavLink>
            <MobileNavLink
              href="#galleries"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Galleries")}
            </MobileNavLink>
            <MobileNavLink
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Our Collection")}
            </MobileNavLink>
            <MobileNavLink
              href="#visiting"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Visiting the Museum")}
            </MobileNavLink>
            <MobileNavLink
              as={Link}
              to="/virtual-tour"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Virtual Tour")}
            </MobileNavLink>

            <LanguageToggle
              onClick={handleLanguageToggle}
              whileTap={{ scale: 0.95 }}
              style={{ alignSelf: "flex-start" }}
              className="language-toggle-btn"
            >
              {language === "en" ? "हिंदी" : "English"}
            </LanguageToggle>

            <MobileBookButton
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Book the Ticket")}
            </MobileBookButton>
          </MobileMenu>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (min-width: 1025px) {
          .mobile-only {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .mobile-only {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
