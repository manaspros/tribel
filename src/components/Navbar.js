import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAudio } from "../contexts/AudioContext";
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

const AudioControl = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isMuted ? "#666" : "#F5EFE7")};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const Navbar = ({ transparent = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toggleMute, isMuted } = useAudio();

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
          <span>Tribal Heritage</span>
        </Logo>

        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exhibits">Exhibits</NavLink>
          <NavLink to="/timeline">Historical Timeline</NavLink>
          <NavLink to="/virtual-tour">Virtual Tour</NavLink>
          <NavLink to="/visit">Plan Your Visit</NavLink>

          <AudioControl onClick={toggleMute} isMuted={isMuted}>
            {isMuted ? <span>🔇 Unmute</span> : <span>🔊 Mute</span>}
          </AudioControl>
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
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/exhibits"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exhibits
            </MobileNavLink>
            <MobileNavLink
              to="/timeline"
              onClick={() => setMobileMenuOpen(false)}
            >
              Historical Timeline
            </MobileNavLink>
            <MobileNavLink
              to="/virtual-tour"
              onClick={() => setMobileMenuOpen(false)}
            >
              Virtual Tour
            </MobileNavLink>
            <MobileNavLink to="/visit" onClick={() => setMobileMenuOpen(false)}>
              Plan Your Visit
            </MobileNavLink>

            <AudioControl onClick={toggleMute} isMuted={isMuted}>
              {isMuted ? "🔇 Unmute" : "🔊 Mute"}
            </AudioControl>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
