import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import logo from "../assets/logo.svg";

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
    props.scrolled || !props.transparent
      ? "rgba(26, 20, 16, 0.95)"
      : "transparent"};
  backdrop-filter: ${(props) =>
    props.scrolled || !props.transparent ? "blur(10px)" : "none"};
`;

const Logo = styled(Link)`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #d3a164;
  text-decoration: none;
  display: flex;
  align-items: center;

  img {
    height: 40px;
    margin-right: 12px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #f5efe7;
  text-decoration: none;
  font-size: 1.1rem;
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

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #f5efe7;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

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
  gap: 30px;
  z-index: 90;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.5rem;
`;

const LanguageToggle = styled.button`
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

  return (
    <>
      <NavContainer
        scrolled={scrolled}
        transparent={transparent}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo to="/">
          <img src={logo} alt="Tribal Museum Logo" />
          <span>
            {t("tribal")} {t("heritage")}
          </span>
        </Logo>

        <NavLinks>
          <NavLink to="/">{t("home")}</NavLink>
          <NavLink to="/exhibits">{t("exhibits")}</NavLink>
          <NavLink to="/timeline">{t("timeline")}</NavLink>
          <NavLink to="/virtual-tour">{t("virtualTour")}</NavLink>
          <NavLink to="/visit">{t("planVisit")}</NavLink>

          <LanguageToggle onClick={toggleLanguage}>
            {language === "en" ? "हिंदी" : "English"}
          </LanguageToggle>
        </NavLinks>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          ☰
        </MobileMenuButton>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <MobileMenuButton onClick={() => setMobileMenuOpen(false)}>
              ✕
            </MobileMenuButton>

            <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
              {t("home")}
            </MobileNavLink>
            <MobileNavLink
              to="/exhibits"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("exhibits")}
            </MobileNavLink>
            <MobileNavLink
              to="/timeline"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("timeline")}
            </MobileNavLink>
            <MobileNavLink
              to="/virtual-tour"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("virtualTour")}
            </MobileNavLink>
            <MobileNavLink to="/visit" onClick={() => setMobileMenuOpen(false)}>
              {t("planVisit")}
            </MobileNavLink>

            <LanguageToggle onClick={toggleLanguage}>
              {language === "en" ? "हिंदी" : "English"}
            </LanguageToggle>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
