import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import tribalPattern from "../assets/tribal-pattern.svg";
import { useLanguage } from "../contexts/LanguageContext";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterContainer = styled.footer`
  background: #1a1410;
  color: #f5efe7;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(211, 161, 100, 0.3);
`;

const FooterPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${tribalPattern});
  opacity: 0.05;
  pointer-events: none;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const FooterSection = styled.div`
  h3 {
    color: #d3a164;
    font-size: 1.2rem;
    margin-bottom: 20px;
    font-family: "Playfair Display", serif;
  }

  p {
    line-height: 1.6;
    opacity: 0.8;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;
  }

  a {
    color: #f5efe7;
    text-decoration: none;
    opacity: 0.8;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
      color: #d3a164;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(211, 161, 100, 0.2);
    color: #d3a164;
    transition: all 0.3s ease;

    &:hover {
      background: #d3a164;
      color: #1a1410;
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  font-size: 0.9rem;
`;

const DesignerCredit = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: #d3a164;
  font-weight: 500;

  a {
    color: #d3a164;
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  const { t } = useLanguage();

  return (
    <FooterContainer>
      <FooterPattern />

      <FooterContent>
        <FooterSection>
          <h3>{t("aboutMuseum")}</h3>
          <p>{t("aboutDesc")}</p>

          <SocialIcons>
            {[
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaYoutube, label: "YouTube" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <h3>{t("usefulLinks")}</h3>
          <FooterLinks>
            {[
              { to: "/about", text: t("aboutUs") },
              { to: "/exhibits", text: t("exhibits") },
              { to: "/support", text: t("supportUs") },
              { to: "/contact", text: t("contact") },
            ].map((link, index) => (
              <li key={index}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            ))}
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>{t("visitUs")}</h3>
          <p>
            {t("addressLine1")}
            <br /> {t("addressLine2")}
            <br /> {t("addressLine3")}
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>{t("hours")}:</strong>
            <br />
            Tuesday-Sunday: 10 AM - 6 PM
            <br />
            <span style={{ color: "#d3a164" }}>Closed on Mondays</span>
          </p>

          <p style={{ marginTop: "15px" }}>
            <strong>{t("contact")}:</strong>
            <br />
            <a href="mailto:info@tribalmuseum.org" style={{ color: "#f5efe7" }}>
              info@tribalmuseum.org
            </a>
            <br />
            <a href="tel:+15551234567" style={{ color: "#f5efe7" }}>
              +1 (555) 123-4567
            </a>
          </p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} {t("copyright")}
      </Copyright>

      <DesignerCredit>
        Designed by{" "}
        <a
          href="https://www.iiitnr.ac.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <u>IIIT Naya Raipur</u>
        </a>
      </DesignerCredit>
    </FooterContainer>
  );
};

export default Footer;
