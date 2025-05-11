import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import gsap from "gsap";

// Enhanced container with transparent to solid transition
const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px; // Slightly reduced padding
  z-index: 100;
  transition: all 0.4s ease;

  background-color: ${(props) =>
    props.isScrolled || !props.transparent
      ? "rgba(26, 20, 16, 0.95)"
      : "transparent"};
  backdrop-filter: ${(props) =>
    props.isScrolled || !props.transparent ? "blur(10px)" : "none"};
  box-shadow: ${(props) =>
    props.isScrolled || !props.transparent
      ? "0 4px 20px rgba(0, 0, 0, 0.3)"
      : "none"};

  @media (max-width: 768px) {
    padding: 12px 20px;
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
  height: 55px; /* Increased from 45px */
  margin-right: 15px;
  transform: scale(1.25); /* Increased from 1.25 */
  
  /* Enhanced styling for logo4 */
  &[src*="logo4"] {
    transition: all 0.4s ease;
    transform-origin: center center;
  }
`;

// Additional logo styling
const AdditionalLogo = styled.img`
  height: 45px; /* Increased from 35px */
  opacity: 0.85;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 40px; /* Increased from 30px */
  }
`;

// Simple logo text without animations
const LogoText = styled.span`
  font-family: "Playfair Display", serif;
  font-size: 1.4rem; /* Increased from 1.2rem to match larger logos */
  font-weight: bold;
  color: #d3a164;
  text-decoration: none;

  @media (max-width: 580px) {
    font-size: 1.3rem; /* Increased from 1.2rem */
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

// Improved navigation links styling
const NavLink = styled(motion.a)`
  color: #f5efe7;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 5px 3px;
  font-weight: 500;
  letter-spacing: 0.3px;

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

  &:hover {
    color: #d3a164;
  }

  &:hover:after {
    width: 100%;
  }
`;

// Special CTA buttons wrapper for both buttons
const CTAButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// Enhanced CTA button
const BookTicketButton = styled(motion.a)`
  background: linear-gradient(135deg, #d3a164, #b88c56);
  color: #1a1410;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(211, 161, 100, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e4b87f, #d3a164);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(211, 161, 100, 0.4);
  }
`;

// Enhanced Plan Visit button with complementary styling
const PlanVisitButton = styled(motion.a)`
  background: transparent;
  color: #d3a164;
  padding: 8px 18px;
  border-radius: 30px;
  border: 2px solid #d3a164;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(211, 161, 100, 0.15);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(211, 161, 100, 0.2);
  }
`;

// Enhanced language toggle
const LanguageToggle = styled(motion.button)`
  background: none;
  border: 2px solid #d3a164;
  border-radius: 20px;
  color: #f5efe7;
  font-size: 0.9rem;
  padding: 5px 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    background: rgba(211, 161, 100, 0.2);
    transform: translateY(-2px);
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
  z-index: 102;
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
  z-index: 101;
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

// Enhanced dropdown menu styling
const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(26, 20, 16, 0.95);
  backdrop-filter: blur(10px);
  min-width: 240px;
  width: max-content;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  padding: 10px 0;
  margin-top: 12px;
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
  padding: 12px 25px;
  color: #f5efe7;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border-left: 3px solid transparent;

  svg {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    color: #d3a164;
  }

  &:hover {
    background: rgba(211, 161, 100, 0.15);
    color: #d3a164;
    border-left: 3px solid #d3a164;
    padding-left: 28px;
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

// Modified department names container to appear directly below navbar
const DepartmentNamesContainer = styled(motion.div)`
  width: 100%;
  padding: 15px 60px 12px;
  background-color: rgba(26, 20, 16, 0.98);
  text-align: center;
  position: fixed;
  top: 75px; // Adjusted to reduce gap
  left: 0;
  z-index: 99;
  border-bottom: 1px solid rgba(211, 161, 100, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  box-shadow: 0 4px 15px -8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    top: 60px; // Adjusted for smaller navbar height on mobile
    flex-direction: column;
    padding: 12px 20px 10px;
  }
`;

// Enhance department name styling
const CombinedDepartmentHeader = styled(motion.div)`
  color: #d3a164;
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Playfair Display", serif;
  text-align: center;
  padding: 8px 25px;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;

  &:hover {
    background: rgba(211, 161, 100, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 6px 15px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 5px 10px;
  }
`;

// Enhanced running text ticker
const RunningTextTicker = styled(motion.div)`
  position: fixed;
  top: ${(props) =>
    props.hideDepartmentNames ? "75px" : "152px"}; // Adjusted for reduced gap
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: rgba(26, 20, 16, 0.9);
  border-top: 1px solid rgba(211, 161, 100, 0.2);
  padding: 16px 0;
  z-index: 98;
  box-shadow: 0 4px 10px -5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    top: ${(props) => (props.hideDepartmentNames ? "60px" : "135px")};
  }
`;

const RunningTextContent = styled.div`
  white-space: nowrap;
  display: inline-block;
  animation: ticker 30s linear infinite;
  color: #d3a164;
  font-size: 0.9rem;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes ticker {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  span {
    margin: 0 20px;
  }

  strong {
    font-weight: 600;
    color: #f5efe7;
  }
`;

// Create direct, hardcoded translations for department names
const departmentTranslations = {
  en: {
    "Department of Tribal": "Department of Tribal",
    "Department of Scheduled Caste": "Department of Scheduled Caste",
    "Department of Backword Classes and minorities":
      "Department of Backward Classes and Minorities",
    "Combined Department":
      "Department of Tribal, Scheduled Caste, Backward Classes and Minorities",
  },
  hi: {
    "Department of Tribal": "आदिम जाति विभाग",
    "Department of Scheduled Caste": "अनुसूचित जाति विभाग",
    "Department of Backword Classes and minorities":
      "पिछड़ा वर्ग एवं अल्पसंख्यक विकास विभाग",
    "Combined Department":
      "आदिम जाति, अनुसूचित जाति, पिछड़ा वर्ग एवं अल्पसंख्यक विभाग",
  },
};

const Navbar = ({ transparent = false, hideDepartmentNames = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t, version } = useLanguage();
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Add this to track current location
  const isHomePage = location.pathname === '/'; // Check if we're on home page

  // Log when component re-renders due to language change

  // Add state for dropdown menu
  const [galleriesDropdownOpen, setGalleriesDropdownOpen] = useState(false);
  const [mobileGalleriesOpen, setMobileGalleriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Add state for collection dropdown
  const [collectionDropdownOpen, setCollectionDropdownOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const collectionDropdownRef = useRef(null);
  // Add state for about dropdown
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutDropdownRef = useRef(null);
  // Add state for R&D dropdown
  const [rdDropdownOpen, setRdDropdownOpen] = useState(false);
  const [mobileRdOpen, setMobileRdOpen] = useState(false);
  const rdDropdownRef = useRef(null);

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
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setAboutDropdownOpen(false);
      }
      if (
        rdDropdownRef.current &&
        !rdDropdownRef.current.contains(event.target)
      ) {
        setRdDropdownOpen(false);
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

  // Handle about museum navigation - navigate to new page instead of scrolling
  const handleAboutClick = () => {
    navigate("/museum-stats");
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
        <LogosGroupLeft>
          <AdditionalLogo
            src={logo2}
            alt="Partner Logo"
            as={motion.img}
            initial={{ scale: 1.6 }}
            animate={{ scale: 1.4 }}
            whileTap={{ scale: 0.95 }}
          />

          <Link to="/">
            <LogoContainer>
              <LogoImage src={logo3} alt={t("Museum CG")} />
              <LogoText>{t("Museum CG")}</LogoText>
            </LogoContainer>
          </Link>
        </LogosGroupLeft>
        <NavLinks>
          {/* Add Home Link only when not on home page */}
          {!isHomePage && (
            <NavLink 
              as={Link} 
              to="/"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <svg 
                viewBox="0 0 24 24" 
                width="18" 
                height="18" 
                fill="currentColor" 
                style={{ marginRight: '5px', verticalAlign: 'middle' }}
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              {t("Home")}
            </NavLink>
          )}

          {/* Replace direct About Museum link with dropdown */}
          <DropdownContainer
            ref={aboutDropdownRef}
            onMouseEnter={() => setAboutDropdownOpen(true)}
            onMouseLeave={() => setAboutDropdownOpen(false)}
          >
            <NavLink as="div" style={{ cursor: "pointer" }}>
              <DropdownTrigger>
                {t("About Us")}
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
              {aboutDropdownOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownItem
                    as="div"
                    onClick={handleAboutClick}
                    whileHover={{ x: 5 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm-1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    {t("About Museum")}
                  </DropdownItem>

                  <DropdownItem
                    as={Link}
                    to="/about/vision"
                    whileHover={{ x: 5 }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                    {t("Vision")}
                  </DropdownItem>

                  <DropdownItem
                    as={Link}
                    to="/about/director"
                    whileHover={{ x: 5 }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    {t("Director Message")}
                  </DropdownItem>

                  <DropdownItem
                    as="a"
                    href="https://cgtrti.gov.in/index"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    onClick={() => setAboutDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                    </svg>
                    {t("TRTI")}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>

          {/* Add R&D Activities dropdown */}
          <DropdownContainer
            ref={rdDropdownRef}
            onMouseEnter={() => setRdDropdownOpen(true)}
            onMouseLeave={() => setRdDropdownOpen(false)}
          >
            <NavLink as="div" style={{ cursor: "pointer" }}>
              <DropdownTrigger>
                {t("R&D Activities")}
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
              {rdDropdownOpen && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownItem
                    as="a"
                    href="https://cgtrti.gov.in/e_Library"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    onClick={() => setRdDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                    </svg>
                    {t("E-Library")}
                  </DropdownItem>

                  <DropdownItem
                    as="a"
                    href="https://cgtrti.gov.in/study"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    onClick={() => setRdDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                    </svg>
                    {t("Studies")}
                  </DropdownItem>

                  <DropdownItem
                    as="a"
                    href="https://cgtrti.gov.in/exhibition"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    onClick={() => setRdDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                    {t("Exhibition")}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>

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

          {/* Add Collection dropdown back */}
          <DropdownContainer
            ref={collectionDropdownRef}
            onMouseEnter={() => setCollectionDropdownOpen(true)}
            onMouseLeave={() => setCollectionDropdownOpen(false)}
          >
            <NavLink as="div" style={{ cursor: "pointer" }}>
              <DropdownTrigger>
                {t("Collection")}
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
                      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 12.5L5 12 12 7l7 5-7 3.5z" />
                    </svg>
                    {t("Tribal Artifacts")}
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>

          <LanguageToggle
            onClick={handleLanguageToggle}
            whileTap={{ scale: 0.95 }}
            className="language-toggle-btn"
          >
            {language === "en" ? "हिंदी" : "English"}
          </LanguageToggle>

          <CTAButtonsWrapper>
            <PlanVisitButton
              as={Link}
              to="/plan-visit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Plan Your Visit")}
            </PlanVisitButton>

            <BookTicketButton
              as={Link}
              to="/book-now"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("Book Now")}
            </BookTicketButton>
          </CTAButtonsWrapper>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CombinedDepartmentHeader
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {departmentTranslations[language]["Combined Department"]}
            </CombinedDepartmentHeader>
          </DepartmentNamesContainer>
        )}
      </AnimatePresence>

      {/* Running text ticker below department names */}
      <AnimatePresence>
        {!scrolled && (
          <RunningTextTicker
            hideDepartmentNames={hideDepartmentNames}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RunningTextContent>
              <span>
                {t("headerWelcome")}{" "}
                <strong>{t("tribalHeritageMuseum")}</strong> {t("and")}{" "}
                <strong>{t("freedomFighterMuseum")}</strong>
              </span>
              <span>
                {t("headerExplore")} <strong>{t("tribalArtifacts")}</strong>{" "}
                {t("and")} <strong>{t("freedomMovementHistory")}</strong>
              </span>
              <span>
                {t("specialExhibitions")} - <strong>{t("visitToday")}</strong>
              </span>
              <span>
                {t("Open")} <strong>10AM-6PM</strong> {t("Tuesday to Sunday")},{" "}
                <strong>{t("Closed on Monday")}</strong>
              </span>
            </RunningTextContent>
          </RunningTextTicker>
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

              {/* Add Home link only when not on home page */}
              {!isHomePage && (
                <MobileNavLink
                  as={Link}
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    width="18" 
                    height="18" 
                    fill="currentColor" 
                    style={{ marginRight: '10px' }}
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  {t("Home")}
                </MobileNavLink>
              )}

              {/* Add About Us dropdown to mobile menu */}
              <div>
                <MobileNavLink
                  as="div"
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{t("About Us")}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    style={{
                      transform: mobileAboutOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </MobileNavLink>

                {mobileAboutOpen && (
                  <MobileDropdownMenu>
                    <MobileDropdownItem
                      to="/museum-stats"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm-1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                      {t("About Museum")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      to="/about/vision"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                      {t("Vision")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      to="/about/director"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                      {t("Director Message")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      as="a"
                      href="https://cgtrti.gov.in/index"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
                      </svg>
                      {t("TRTI")}
                    </MobileDropdownItem>
                  </MobileDropdownMenu>
                )}
              </div>

              {/* Add R&D Activities dropdown to mobile menu */}
              <div>
                <MobileNavLink
                  as="div"
                  onClick={() => setMobileRdOpen(!mobileRdOpen)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{t("R&D Activities")}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    style={{
                      transform: mobileRdOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </MobileNavLink>

                {mobileRdOpen && (
                  <MobileDropdownMenu>
                    <MobileDropdownItem
                      as="a"
                      href="https://cgtrti.gov.in/e_Library"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                      </svg>
                      {t("E-Library")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      as="a"
                      href="https://cgtrti.gov.in/study"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
                      </svg>
                      {t("Studies")}
                    </MobileDropdownItem>

                    <MobileDropdownItem
                      as="a"
                      href="https://cgtrti.gov.in/exhibition"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="currentColor"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      {t("Exhibition")}
                    </MobileDropdownItem>
                  </MobileDropdownMenu>
                )}
              </div>

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
                      to="/tribal/gallery"
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
                      to="/freedom/gallery"
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

              {/* Add Collection dropdown to mobile menu - matches desktop */}
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
                  <span>{t("Collection")}</span>
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
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 12.5L5 12 12 7l7 5-7 3.5z" />
                      </svg>
                      {t("Tribal Artifacts")}
                    </MobileDropdownItem>
                  </MobileDropdownMenu>
                )}
              </div>

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

              {/* Plan Your Visit - Matches desktop */}
              <MobileBookButton
                as={Link}
                to="/plan-visit"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: "10px", marginBottom: "10px", background: "transparent", color: "#d3a164", border: "2px solid #d3a164" }}
              >
                {t("Plan Your Visit")}
              </MobileBookButton>

              {/* Book Now - Matches desktop */}
              <MobileBookButton
                as={Link}
                to="/book-now"
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("Book Now")}
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
