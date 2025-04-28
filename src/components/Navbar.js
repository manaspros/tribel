import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import gsap from "gsap";

// Enhanced container with transparent to solid transition
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0; // Always stay at the top
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  z-index: 100; // Decreased from 101 to 100
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

// Enhanced LogoContainer to hold multiple logos
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

// Left-side logos container
const LogosGroupLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

// Main logo image with adjusted styling
const LogoImage = styled.img`
  height: 45px;
  margin-right: 15px;
`;

// Additional logo styling
const AdditionalLogo = styled.img`
  height: 35px;
  opacity: 0.85;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 30px;
  }

  @media (max-width: 480px) {
    display: none; // Hide on very small screens
  }
`;

// Simple logo text without animations
const LogoText = styled.span`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #d3a164;
  text-decoration: none;

  @media (max-width: 580px) {
    font-size: 1.2rem;
  }
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
  z-index: 102; // Increased from 90 to 102
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
`;

// Add an overlay to handle clicks outside the mobile menu
const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 101; // Increased from 80 to 101
  backdrop-filter: blur(3px);
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

// Add dropdown container and menu styling
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 20, 16, 0.95);
  backdrop-filter: blur(10px);
  min-width: 180px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  padding: 10px 0;
  margin-top: 10px;
  z-index: 110;
  border: 1px solid rgba(211, 161, 100, 0.2);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: rgba(26, 20, 16, 0.95);
    border-top: 1px solid rgba(211, 161, 100, 0.2);
    border-left: 1px solid rgba(211, 161, 100, 0.2);
  }
`;

const DropdownItem = styled(motion.div)`
  padding: 12px 20px;
  color: #f5efe7;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  svg {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    color: #d3a164;
  }

  &:hover {
    background: rgba(211, 161, 100, 0.15);
    color: #d3a164;
  }
`;

const MobileDropdownMenu = styled.div`
  margin: 0 0 0 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 1px solid rgba(211, 161, 100, 0.3);
`;

const MobileDropdownItem = styled(Link)`
  color: rgba(245, 239, 231, 0.8);
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  svg {
    margin-right: 10px;
    width: 16px;
    height: 16px;
    color: #d3a164;
  }

  &:hover {
    color: #d3a164;
  }
`;

const DropdownTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(180deg);
  }
`;

// Modified department names container to appear below navbar
const DepartmentNamesContainer = styled(motion.div)`
  width: 100%;
  padding: 15px 40px 10px;
  background-color: rgba(26, 20, 16, 0.98);
  text-align: center;
  position: fixed;
  top: 80px; // Position below the navbar height (adjust as needed based on your navbar height)
  left: 0;
  z-index: 99; // Decreased from 100 to 99 to ensure it's below the navbar
  border-bottom: 1px solid rgba(211, 161, 100, 0.2);

  @media (max-width: 768px) {
    top: 65px; // Adjust for smaller navbar height on mobile
  }
`;

// Convert to motion.span to properly support motion props
const DepartmentName = styled(motion.span)`
  display: block;
  color: #d3a164;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
  font-family: "Playfair Display", serif;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Create direct, hardcoded translations for department names
const departmentTranslations = {
  en: {
    "Department of Tribal": "Department of Tribal",
    "Department of Scheduled Caste": "Department of Scheduled Caste",
    "Department of Backword Classes and minorities":
      "Department of Backward Classes and Minorities",
  },
  hi: {
    "Department of Tribal": "आदिम जाति विभाग",
    "Department of Scheduled Caste": "अनुसूचित जाति विभाग",
    "Department of Backword Classes and minorities":
      "पिछड़ा वर्ग एवं अल्पसंख्यक विकास विभाग",
  },
};

// Create a special component for department names that will re-render correctly
const DepartmentNameTranslated = ({ translationKey }) => {
  const { language } = useLanguage();

  // Get translation directly from our hardcoded dictionary
  const translation =
    departmentTranslations[language][translationKey] || translationKey;

  console.log(
    `Rendering department ${translationKey} as: ${translation} (lang: ${language})`
  );

  return (
    <DepartmentName animate={{ opacity: 1 }}>{translation}</DepartmentName>
  );
};

const Navbar = ({ transparent = false, hideDepartmentNames = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t, version } = useLanguage();
  const mobileMenuRef = useRef(null);

  // Log when component re-renders due to language change
  useEffect(() => {
    console.log(
      "Navbar re-rendered with language:",
      language,
      "version:",
      version
    );
  }, [language, version]);

  // Add state for dropdown menu
  const [galleriesDropdownOpen, setGalleriesDropdownOpen] = useState(false);
  const [mobileGalleriesOpen, setMobileGalleriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Add state for collection dropdown
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const collectionDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Add body overflow control when mobile menu opens
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "auto"; // Reset on component unmount
    };
  }, [mobileMenuOpen]);

  // Handle clicks outside the mobile menu
  const handleClickOutside = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setMobileMenuOpen(false);
    }
  };

  // Add handler for clicks outside dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGalleriesDropdownOpen(false);
      }
      if (
        collectionDropdownRef.current &&
        !collectionDropdownRef.current.contains(event.target)
      ) {
        setCollectionDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLanguageToggle = () => {
    console.log("Language toggle button clicked, current language:", language);
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

  // Handle scrolling to museum stats section
  const scrollToStats = () => {
    const statsSection = document.getElementById("museum-stats");
    if (statsSection) {
      statsSection.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Container - always at the top */}
      <NavContainer
        isScrolled={scrolled}
        transparent={transparent}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Add a hidden debug element to verify current language */}
        <div style={{ display: "none" }}>Current language: {language}</div>

        {/* Modified left side with multiple logos */}
        <LogosGroupLeft>
          <AdditionalLogo
            src={logo2}
            alt="Partner Logo"
            as={motion.img}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.95 }}
          />

          <Link to="/">
            <LogoContainer>
              <LogoImage src={logo3} alt={t("Tribal Museum")} />
              <LogoText>{t("Tribal Museum")}</LogoText>
            </LogoContainer>
          </Link>
        </LogosGroupLeft>

        <NavLinks>
          <NavLink
            as="div"
            style={{ cursor: "pointer" }}
            onClick={scrollToStats}
          >
            {t("About Museum")}
          </NavLink>

          {/* Replace galleries link with dropdown */}
          <DropdownContainer
            ref={dropdownRef}
            onMouseEnter={() => setGalleriesDropdownOpen(true)}
            onMouseLeave={() => setGalleriesDropdownOpen(false)}
          >
            <NavLink as="div" style={{ cursor: "pointer" }}>
              <DropdownTrigger>
                {t("Galleries")}
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </DropdownTrigger>
            </NavLink>

            <AnimatePresence>
              {galleriesDropdownOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownItem
                    as={Link}
                    to="/tribal/gallery"
                    whileHover={{ x: 5 }}
                    onClick={() => setGalleriesDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 12.5L5 12 12 7l7 5-7 3.5z" />
                    </svg>
                    {t("Tribal Heritage")}
                  </DropdownItem>

                  <DropdownItem
                    as={Link}
                    to="/freedom/gallery"
                    whileHover={{ x: 5 }}
                    onClick={() => setGalleriesDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.4 6l-.24-1.2c-.09-.46-.5-.8-.98-.8H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c-.09.47.5.8.98.8H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-4.6z" />
                    </svg>
                    {t("Freedom Fighters")}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>

          {/* Add collection dropdown */}
          <DropdownContainer
            ref={collectionDropdownRef}
            onMouseEnter={() => setCollectionDropdownOpen(true)}
            onMouseLeave={() => setCollectionDropdownOpen(false)}
          >
            <NavLink as="div" style={{ cursor: "pointer" }}>
              <DropdownTrigger>
                {t("Our Collection")}
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </DropdownTrigger>
            </NavLink>

            <AnimatePresence>
              {collectionDropdownOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownItem
                    as={Link}
                    to="/tribal/artifacts"
                    whileHover={{ x: 5 }}
                    onClick={() => setCollectionDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
                    </svg>
                    {t("Tribal Artifacts")}
                  </DropdownItem>

                  <DropdownItem
                    as={Link}
                    to="/freedom/artifacts"
                    whileHover={{ x: 5 }}
                    onClick={() => setCollectionDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                    </svg>
                    {t("Freedom Artifacts")}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>

          <VirtualTourButton
            as={Link}
            to="/virtual-tour"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("virtualTour")}
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

          <MobileMenuButton onClick={toggleMobileMenu}>
            {mobileMenuOpen ? "✕" : "☰"}
          </MobileMenuButton>
        </div>
      </NavContainer>

      {/* Department Names Section - Only appears when not scrolled AND hideDepartmentNames is false */}
      <AnimatePresence>
        {!scrolled && !hideDepartmentNames && (
          <DepartmentNamesContainer
            key={`dept-container-${language}-${version}`} // Force re-render when language or version changes
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Use special component with direct dictionary access instead of t() */}
            <DepartmentNameTranslated translationKey="Department of Tribal" />
            <DepartmentNameTranslated translationKey="Department of Scheduled Caste" />
            <DepartmentNameTranslated translationKey="Department of Backword Classes and minorities" />
          </DepartmentNamesContainer>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClickOutside}
            />
            <MobileMenu
              ref={mobileMenuRef}
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
                as="div"
                onClick={scrollToStats}
                style={{ cursor: "pointer" }}
              >
                {t("About Museum")}
              </MobileNavLink>

              {/* Modified mobile galleries with dropdown */}
              <div>
                <MobileNavLink
                  as="div"
                  onClick={() => setMobileGalleriesOpen(!mobileGalleriesOpen)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{t("Galleries")}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    style={{
                      transform: mobileGalleriesOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </MobileNavLink>

                {mobileGalleriesOpen && (
                  <MobileDropdownMenu>
                    <MobileDropdownItem
                      to="/tribal"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 12.5L5 12 12 7l7 5-7 3.5z" />
                      </svg>
                      {t("Tribal Heritage")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      to="/freedom"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M14.4 6l-.24-1.2c-.09-.46-.5-.8-.98-.8H6c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c-.09.47.5.8.98.8H19c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1h-4.6z" />
                      </svg>
                      {t("Freedom Fighters")}
                    </MobileDropdownItem>
                  </MobileDropdownMenu>
                )}
              </div>

              {/* Add collection dropdown to mobile menu */}
              <div>
                <MobileNavLink
                  as="div"
                  onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{t("Our Collection")}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    style={{
                      transform: mobileCollectionOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </MobileNavLink>

                {mobileCollectionOpen && (
                  <MobileDropdownMenu>
                    <MobileDropdownItem
                      to="/tribal/artifacts"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
                      </svg>
                      {t("Tribal Artifacts")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      to="/freedom/artifacts"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                      </svg>
                      {t("Freedom Artifacts")}
                    </MobileDropdownItem>
                  </MobileDropdownMenu>
                )}
              </div>

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
                {t("virtualTour")}
              </MobileNavLink>

              <LanguageToggle
                onClick={() => {
                  handleLanguageToggle();
                  setMobileMenuOpen(false);
                }}
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
          </>
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
