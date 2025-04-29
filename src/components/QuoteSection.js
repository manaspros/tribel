import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";
import tribalPattern from "../assets/tribal-pattern.svg";

gsap.registerPlugin(ScrollTrigger);

const QuoteContainer = styled.section`
  min-height: 60vh;
  width: 100%;
  padding: 120px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(to bottom, #2a231c 0%, #1a1410 100%);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${tribalPattern});
    opacity: 0.05;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const QuoteWrapper = styled.div`
  max-width: 1000px;
  position: relative;
  z-index: 2;
`;

const QuoteSymbol = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 120px;
  color: rgba(211, 161, 100, 0.2);
  position: absolute;
  top: -60px;
  left: -40px;
  z-index: -1;

  @media (max-width: 768px) {
    font-size: 80px;
    top: -40px;
    left: -20px;
  }
`;

const QuoteText = styled(motion.blockquote)`
  font-family: "Playfair Display", serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: #f5efe7;
  margin: 0;
  line-height: 1.5;
  font-style: italic;
  text-align: center;

  &::before,
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 2px;
    background: linear-gradient(
      to right,
      transparent,
      rgba(211, 161, 100, 0.5),
      transparent
    );
    margin: 30px auto;
  }
`;

const QuoteAuthor = styled(motion.div)`
  margin-top: 30px;
  text-align: center;
  color: #d3a164;
  font-size: 1.1rem;
  font-weight: 500;

  span {
    display: block;
    color: rgba(245, 239, 231, 0.7);
    font-size: 0.9rem;
    margin-top: 5px;
    font-style: italic;
  }
`;

const QuoteDecorationLeft = styled.div`
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  border-left: 3px solid rgba(211, 161, 100, 0.3);
  border-top: 3px solid rgba(211, 161, 100, 0.3);
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none;
  }
`;

const QuoteDecorationRight = styled.div`
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 80px;
  border-right: 3px solid rgba(211, 161, 100, 0.3);
  border-bottom: 3px solid rgba(211, 161, 100, 0.3);
  opacity: 0.8;

  @media (max-width: 768px) {
    display: none;
  }
`;

const quotes = {
  en: [
    {
      text: "Corruption is a serious hindrance to the development of the socialist pattern. When there is scope for corruption there cannot be equal opportunity.",
      author: "Shri Gulzari Lal Nanda",
      role: "Indian Politician and Freedom Fighter",
    },
    {
      text: "Sabka Sath, Sabka Vikas < Sabka Vishwas, Sabka Prayas. ",
      author: "Shri Narendra Modi.",
      role: "Prime Minister of India",
    },
    {
      text: "The preservation of freedom is not the task of soldiers alone. The whole nation has to be strong.",
      author: "Shri Lal Bahadur Shastri",
      role: "Former Prime Minister of India",
    },
  ],
  hi: [
    {
      text: "भ्रष्टाचार समाजवादी पैटर्न के विकास में एक गंभीर बाधा है। जब भ्रष्टाचार की गुंजाइश होती है तो समान अवसर नहीं हो सकते।",
      author: "श्री गुलजारी लाल नंदा",
      role: "भारतीय राजनेता और स्वतंत्रता सेनानी",
    },
    {
      text: "सबका साथ, सबका विकास < सबका विश्वास, सबका प्रयास।",
      author: "श्री नरेंद्र मोदी",
      role: "भारत के प्रधानमंत्री",
    },
    {
      text: "स्वतंत्रता का संरक्षण केवल सैनिकों का कार्य नहीं है। पूरे राष्ट्र को मजबूत होना चाहिए।",
      author: "श्री लाल बहादुर शास्त्री",
      role: "भारत के पूर्व प्रधानमंत्री",
    },
  ],
};

const QuoteSection = () => {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  // Select a random quote based on the current language
  const randomIndex = Math.floor(Math.random() * quotes[language].length);
  const quote = quotes[language][randomIndex];

  useEffect(() => {
    if (isInView) {
      gsap.from(".quote-decoration", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [isInView]);

  return (
    <QuoteContainer ref={containerRef}>
      <QuoteDecorationLeft className="quote-decoration" />
      <QuoteWrapper>
        <QuoteSymbol>"</QuoteSymbol>
        <QuoteText
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {quote.text}
        </QuoteText>
        <QuoteAuthor
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {quote.author}
          <span>{quote.role}</span>
        </QuoteAuthor>
      </QuoteWrapper>
      <QuoteDecorationRight className="quote-decoration" />
    </QuoteContainer>
  );
};

export default QuoteSection;
