import React, { useState } from "react";
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

const MapContainer = styled.div`
  width: 100%;
  height: 230px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
  border: 1px solid rgba(211, 161, 100, 0.3);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(211, 161, 100, 0.2);
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const MapOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
  background-color: rgba(211, 161, 100, 0.9);
  color: #1a1410;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  transform: translateY(${(props) => (props.isHovered ? "0" : "100%")});
  transition: transform 0.3s ease;
`;

const Footer = () => {
  const { t } = useLanguage();
  const [mapHovered, setMapHovered] = useState(false);
  
  const handleMapClick = () => {
    window.open("https://www.google.com/maps?q=Tribal+Freedom+Fighter+Museum+Naya+Raipur", "_blank");
  };

  return (
    <FooterContainer>
      <FooterPattern />

      <FooterContent>
        <FooterSection>
          <h3>{t("locationMap")}</h3>
          <MapContainer
            onMouseEnter={() => setMapHovered(true)}
            onMouseLeave={() => setMapHovered(false)}
            onClick={handleMapClick}
          >
            <MapIframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.0687013421286!2d81.63974961536798!3d21.235548085880083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dd8c8d8706c5%3A0x8b52cc5b55c45ce1!2sTribal%20Freedom%20Fighter%20Museum%20Naya%20Raipur!5e0!3m2!1sen!2sin!4v1665486214558!5m2!1sen!2sin" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Museum Location"
              aria-label="Google Maps showing Tribal Freedom Fighter Museum location"
            />
            <MapOverlay isHovered={mapHovered}>
              {t("getDirections")}
            </MapOverlay>
          </MapContainer>
        </FooterSection>

        <FooterSection>
          <h3>{t("usefulLinks")}</h3>
          <FooterLinks>
            {[
              { to: "/about", text: t("aboutUs") },
              { to: "/support", text: t("supportUs") },
              { to: "/contact", text: t("contact") },
              { to: "/nearby-places", text: t("Nearby Places") },
              { to: "/about/important-sites", text: t("Important Sites") },
              { to: "/orders-tender", text: t("Orders/Tender") },
              { to: "/news-media", text: t("News/Media") },
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
