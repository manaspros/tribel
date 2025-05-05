import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import tribalPattern from "../assets/tribal-pattern.svg";
import { useLanguage } from "../contexts/LanguageContext";

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
  position: relative;
  width: 100%;
  height: 200px; /* Increased height for better visibility */
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(211, 161, 100, 0.3);

  &:hover {
    box-shadow: 0 5px 15px rgba(211, 161, 100, 0.3);
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: block; /* Ensure iframe is displayed as block element */
`;

const MapFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(26, 20, 16, 0.8);
  color: #d3a164;
  font-size: 0.9rem;
  padding: 15px;
  text-align: center;
  
  svg {
    font-size: 2rem;
    margin-bottom: 10px;
  }
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

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  transition: all 0.3s ease;
  
  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
  
  &:hover {
    background-color: #d3a164;
    color: #1a1410;
    transform: translateY(-3px);
  }
`;

const FacebookIcon = () => (
  <svg viewBox="0 0 320 512">
    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 512 512">
    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 448 512">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 576 512">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
  </svg>
);

const Footer = () => {
  const { t, language } = useLanguage();
  const [mapHovered, setMapHovered] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Define the museum location coordinates - these are for Naya Raipur, Chhattisgarh
  const museumLat = 21.1702;
  const museumLng = 81.7900;
  const zoomLevel = 14;

  // Create the Google Maps embed URL with proper API formatting
  const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.930516162282!2d${museumLng}!3d${museumLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDEwJzEyLjciTiA4McKwNDcnMjMuOSJF!5e0!3m2!1sen!2sin!4v1623456789012!5m2!1sen!2sin`;
  
  // Create a direct Google Maps navigation URL for the "Get Directions" button
  const getDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${museumLat},${museumLng}`;

  const handleMapError = () => {
    setMapError(true);
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
            onClick={() => window.open(getDirectionsUrl, "_blank")}
          >
            {mapError ? (
              <MapFallback>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {t("Museum CG")}
                <div style={{ fontSize: "0.8rem", marginTop: "5px" }}>
                  {t("addressLine1")}, {t("addressLine2")}, {t("addressLine3")}
                </div>
              </MapFallback>
            ) : (
              <>
                <MapIframe 
                  src={googleMapsUrl}
                  allowFullScreen="" 
                  loading="lazy"
                  onError={handleMapError}
                  title="Museum Location Map"
                />
                <MapOverlay isHovered={mapHovered}>
                  {t("getDirections")}
                </MapOverlay>
              </>
            )}
          </MapContainer>
        </FooterSection>

        <FooterSection>
          <h3>{t("usefulLinks")}</h3>
          <FooterLinks>
            {[
              { to: "/about", text: t("aboutUs") },
              { to: "/support", text: t("supportUs") },
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

          {/* Social Media Links */}
          <SocialMediaContainer>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YouTubeIcon />
            </SocialIcon>
          </SocialMediaContainer>
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
