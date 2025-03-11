import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const VisitContainer = styled.section`
  padding: 100px 0;
  background: linear-gradient(to bottom, #241c16, #1a1410);
  position: relative;
  overflow: hidden;
  z-index: 1;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 L25 25 L50 50 L75 25 L100 50 L75 75 L50 50 L25 75 Z' fill='none' stroke='%23D3A164' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E");
  opacity: 0.05;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const VisitInfo = styled.div`
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: #d3a164;
  margin-bottom: 20px;
  font-family: "Playfair Display", serif;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 3px;
    background: #d3a164;

    @media (max-width: 992px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #f5efe7;
  margin: 30px 0;
  line-height: 1.8;
  max-width: 90%;

  @media (max-width: 992px) {
    margin: 30px auto;
  }
`;

const DetailsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 30px 0;

  @media (max-width: 992px) {
    width: fit-content;
    margin: 30px auto;
    text-align: left;
  }
`;

const DetailItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  color: #f5efe7;
  font-size: 1.1rem;

  svg {
    color: #d3a164;
    margin-right: 15px;
    min-width: 24px;
    height: 24px;
  }
`;

const BookingForm = styled(motion.div)`
  background: rgba(42, 35, 28, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(211, 161, 100, 0.2);
  z-index: 2;
  max-width: 500px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  color: #d3a164;
  margin-bottom: 25px;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #f5efe7;
  font-size: 0.95rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(245, 239, 231, 0.1);
  border: 1px solid rgba(211, 161, 100, 0.3);
  border-radius: 8px;
  color: #f5efe7;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d3a164;
    background: rgba(245, 239, 231, 0.15);
    box-shadow: 0 0 0 3px rgba(211, 161, 100, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  background: rgba(245, 239, 231, 0.1);
  border: 1px solid rgba(211, 161, 100, 0.3);
  border-radius: 8px;
  color: #f5efe7;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23d3a164' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px top 50%;

  &:focus {
    outline: none;
    border-color: #d3a164;
    background-color: rgba(245, 239, 231, 0.15);
    box-shadow: 0 0 0 3px rgba(211, 161, 100, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: #d3a164;
  color: #1a1410;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;

  &:hover {
    background: #c08b51;
  }
`;

const TicketTypeSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background: rgba(26, 20, 16, 0.3);
  border-radius: 8px;
  padding: 5px;
`;

const TicketTypeButton = styled(motion.button)`
  flex: 1;
  padding: 10px 5px;
  text-align: center;
  font-size: 0.95rem;
  border: none;
  background: ${(props) => (props.active ? "#d3a164" : "transparent")};
  color: ${(props) => (props.active ? "#1a1410" : "#f5efe7")};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${(props) => (props.active ? "600" : "400")};
`;

const SuccessMessage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(42, 35, 28, 0.95);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 30px;

  h3 {
    color: #d3a164;
    font-size: 1.8rem;
    margin-bottom: 15px;
    font-family: "Playfair Display", serif;
  }

  p {
    color: #f5efe7;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const IconContainer = styled(motion.div)`
  width: 70px;
  height: 70px;
  background: #d3a164;
  color: #1a1410;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-bottom: 20px;
`;

const CloseButton = styled(motion.button)`
  background: transparent;
  border: 1px solid #d3a164;
  color: #d3a164;
  padding: 10px 20px;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background: rgba(211, 161, 100, 0.1);
  }
`;

const VisitSection = () => {
  const { t } = useLanguage();
  const [ticketType, setTicketType] = useState("general");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Animation for detail items
  useEffect(() => {
    if (isInView) {
      gsap.from(".detail-item", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".booking-form", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "back.out(1.2)",
      });
    }
  }, [isInView]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd typically handle your form submission
    setFormSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      e.target.reset();
    }, 5000);
  };

  return (
    <VisitContainer ref={sectionRef} id="visit">
      <BackgroundPattern />

      <ContentWrapper>
        <VisitInfo>
          <SectionTitle>{t("Plan Your Visit")}</SectionTitle>
          <Description>
            Step into the captivating world of tribal heritage at our museum.
            Book your tickets in advance to ensure a seamless experience
            exploring our rich collection of artifacts and immersive
            exhibitions.
          </Description>

          <DetailsList>
            <DetailItem className="detail-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              <span>Open Tuesday through Sunday, 10:00 AM to 6:00 PM</span>
            </DetailItem>

            <DetailItem className="detail-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>123 Heritage Avenue, Cultural District, Tribal City</span>
            </DetailItem>

            <DetailItem className="detail-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>contact@tribalmuseum.org</span>
            </DetailItem>

            <DetailItem className="detail-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>+1 (555) 123-4567</span>
            </DetailItem>
          </DetailsList>
        </VisitInfo>

        <BookingForm className="booking-form">
          <FormTitle>Book Your Ticket</FormTitle>

          <TicketTypeSelector>
            <TicketTypeButton
              active={ticketType === "general"}
              onClick={() => setTicketType("general")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              General
            </TicketTypeButton>
            <TicketTypeButton
              active={ticketType === "guided"}
              onClick={() => setTicketType("guided")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Guided Tour
            </TicketTypeButton>
            <TicketTypeButton
              active={ticketType === "special"}
              onClick={() => setTicketType("special")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Special Event
            </TicketTypeButton>
          </TicketTypeSelector>

          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormInput type="text" required />
              </FormGroup>

              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormInput type="text" required />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" required />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <FormLabel>Visit Date</FormLabel>
                <FormInput
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Time Slot</FormLabel>
                <FormSelect required>
                  <option value="">Select...</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </FormSelect>
              </FormGroup>
            </FormRow>

            <FormGroup>
              <FormLabel>Number of Visitors</FormLabel>
              <FormSelect required>
                <option value="">Select...</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </FormSelect>
            </FormGroup>

            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Now
            </SubmitButton>
          </form>

          <AnimatePresence>
            {formSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IconContainer
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  ✓
                </IconContainer>
                <h3>Thank You!</h3>
                <p>
                  Your booking has been confirmed. You will receive a
                  confirmation email shortly.
                </p>
                <CloseButton
                  onClick={() => setFormSubmitted(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </CloseButton>
              </SuccessMessage>
            )}
          </AnimatePresence>
        </BookingForm>
      </ContentWrapper>
    </VisitContainer>
  );
};

export default VisitSection;
