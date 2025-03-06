import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import tribalPattern from "../assets/tribal-pattern.svg";

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

const NewsletterInput = styled.div`
  display: flex;
  margin-top: 15px;

  input {
    flex-grow: 1;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 4px 0 0 4px;
    color: #f5efe7;

    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  button {
    padding: 10px 15px;
    background: #d3a164;
    border: none;
    border-radius: 0 4px 4px 0;
    color: #1a1410;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #c08b51;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterPattern />

      <FooterContent>
        <FooterSection>
          <h3>About The Museum</h3>
          <p>
            The Tribal Heritage Museum celebrates the rich cultural legacy and
            historical significance of indigenous communities. Our mission is to
            preserve, showcase and educate about tribal heritage.
          </p>

          <SocialIcons>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              FB
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              TW
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              IG
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              YT
            </motion.a>
          </SocialIcons>
        </FooterSection>

        <FooterSection>
          <h3>Useful Links</h3>
          <FooterLinks>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/exhibits">Exhibits</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/education">Educational Resources</Link>
            </li>
            <li>
              <Link to="/support">Support Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Visit Us</h3>
          <p>
            123 Heritage Avenue
            <br />
            Cultural District
            <br />
            Tribal City, TX 75001
          </p>
          <p>
            <strong>Hours:</strong>
            <br />
            Tuesday-Sunday: 10 AM - 6 PM
            <br />
            Closed on Mondays
          </p>
          <p>
            <strong>Contact:</strong>
            <br />
            info@tribalmuseum.org
            <br />
            +1 (555) 123-4567
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>
            Subscribe to our newsletter to receive updates on new exhibits,
            events, and educational programs.
          </p>
          <NewsletterInput>
            <input type="email" placeholder="Your email" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </NewsletterInput>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} Tribal Heritage Museum. All rights
        reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
