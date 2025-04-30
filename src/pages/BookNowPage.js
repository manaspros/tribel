import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Link } from "react-router-dom";
import bookingTranslations from "../data/bookingTranslations.json";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  font-family: "Playfair Display", serif;
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(211, 161, 100, 0.3);
    transform: translateY(-50%);
    z-index: 0;
  }

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 15px;
    justify-content: flex-start;

    &::before {
      top: 40%;
    }

    > * {
      min-width: 80px;
      margin-right: 10px;
    }
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.active
      ? "#d3a164"
      : props.completed
      ? "rgba(211, 161, 100, 0.8)"
      : "rgba(211, 161, 100, 0.3)"};
  color: ${(props) =>
    props.active || props.completed ? "#1a1410" : "#f5efe7"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 10px;
  transition: all 0.3s ease;

  ${(props) =>
    props.completed &&
    `
    &::after {
      content: "✓";
      font-size: 1.2rem;
      font-weight: bold;
    }
  `}
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${(props) =>
    props.active
      ? "#d3a164"
      : props.completed
      ? "rgba(211, 161, 100, 0.8)"
      : "rgba(245, 239, 231, 0.6)"};
  text-align: center;
  max-width: 100px;
`;

const BookingCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  padding: 30px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.h2`
  color: #d3a164;
  font-size: 1.8rem;
  margin-bottom: 25px;
  font-family: "Playfair Display", serif;
`;

const Package = styled.div`
  background: rgba(26, 20, 16, 0.5);
  border-radius: 10px;
  padding: 25px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: rgba(211, 161, 100, 0.5);
  }

  ${(props) =>
    props.selected &&
    `
    border-color: #d3a164;
    box-shadow: 0 10px 20px rgba(211, 161, 100, 0.2);
  `}
`;

const PackageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const PackageTitle = styled.h3`
  color: #d3a164;
  font-size: 1.5rem;
  margin: 0;
`;

const PackagePrice = styled.div`
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  padding: 5px 15px;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const PackageDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const PackageFeatures = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    &::before {
      content: "✓";
      color: #d3a164;
      margin-right: 10px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Button = styled(motion.button)`
  background: ${(props) => (props.primary ? "#d3a164" : "transparent")};
  color: ${(props) => (props.primary ? "#1a1410" : "#d3a164")};
  border: ${(props) => (props.primary ? "none" : "2px solid #d3a164")};
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    margin-left: ${(props) => (props.iconPosition === "right" ? "10px" : "0")};
    margin-right: ${(props) => (props.iconPosition === "left" ? "10px" : "0")};
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const TermsContainer = styled.div`
  background: rgba(26, 20, 16, 0.5);
  border-radius: 10px;
  padding: 25px;
  border: 1px solid rgba(211, 161, 100, 0.2);
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;

  h3 {
    color: #d3a164;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }

  ul {
    padding-left: 20px;
    margin-bottom: 15px;

    li {
      margin-bottom: 8px;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0;

  input {
    margin-top: 5px;
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DayPickerContainer = styled.div`
  background: rgba(26, 20, 16, 0.7);
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  min-width: 300px;

  .rdp {
    --rdp-cell-size: 40px;
    --rdp-accent-color: #d3a164;
    --rdp-background-color: rgba(211, 161, 100, 0.2);
    --rdp-accent-color-dark: #e0b175;
    --rdp-background-color-dark: rgba(211, 161, 100, 0.3);

    margin: 0;
  }

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
    background-color: var(--rdp-accent-color);
    color: #1a1410;
  }
`;

const SelectedDateInfo = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: rgba(211, 161, 100, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(211, 161, 100, 0.2);

  p {
    margin: 5px 0;
  }

  strong {
    color: #d3a164;
  }
`;

const TicketsContainer = styled.div`
  flex: 1;
`;

const TicketTypeCard = styled.div`
  background: rgba(26, 20, 16, 0.7);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  h3 {
    color: #d3a164;
    margin: 0;
  }
`;

const TicketPrice = styled.div`
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
`;

const TicketDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 15px;
  opacity: 0.8;
`;

const TicketSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityButton = styled.button`
  background: ${(props) =>
    props.disabled ? "rgba(211, 161, 100, 0.1)" : "rgba(211, 161, 100, 0.2)"};
  color: ${(props) =>
    props.disabled ? "rgba(211, 161, 100, 0.5)" : "#d3a164"};
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(211, 161, 100, 0.3);
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.1rem;
  min-width: 30px;
  text-align: center;
`;

const MembershipContainer = styled.div`
  margin-top: 10px;

  select {
    width: 100%;
    padding: 10px;
    background: rgba(26, 20, 16, 0.8);
    border: 1px solid rgba(211, 161, 100, 0.3);
    border-radius: 8px;
    color: #f5efe7;
    margin-top: 5px;

    option {
      background: #1a1410;
    }
  }
`;

const OrderSummary = styled.div`
  margin-top: 30px;
  background: rgba(26, 20, 16, 0.7);
  border-radius: 10px;
  padding: 20px;
`;

const SummaryTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(211, 161, 100, 0.2);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  span:last-child {
    font-weight: ${(props) => (props.total ? "bold" : "normal")};
    color: ${(props) => (props.total ? "#d3a164" : "inherit")};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(211, 161, 100, 0.2);
  margin: 15px 0;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #d3a164;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  background: rgba(26, 20, 16, 0.8);
  border: 1px solid rgba(211, 161, 100, 0.3);
  border-radius: 8px;
  color: #f5efe7;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #d3a164;
  }

  &::placeholder {
    color: rgba(245, 239, 231, 0.5);
  }
`;

const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const PaymentMethod = styled.div`
  background: rgba(26, 20, 16, 0.8);
  border: 1px solid
    ${(props) => (props.selected ? "#d3a164" : "rgba(211, 161, 100, 0.3)")};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d3a164;
    transform: translateY(-3px);
  }

  h4 {
    color: ${(props) => (props.selected ? "#d3a164" : "#f5efe7")};
    margin: 10px 0 0;
  }
`;

const PaymentIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const SuccessScreen = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
`;

const SuccessIcon = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: rgba(211, 161, 100, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  font-size: 3rem;
  color: #d3a164;
`;

const BookingReference = styled.div`
  background: rgba(26, 20, 16, 0.7);
  padding: 15px;
  border-radius: 10px;
  margin: 30px auto;
  max-width: 400px;
  border: 1px solid rgba(211, 161, 100, 0.3);

  h3 {
    color: #d3a164;
    margin-bottom: 15px;
  }

  p {
    margin: 10px 0;

    strong {
      color: #d3a164;
      margin-right: 10px;
    }
  }
`;

const disabledDays = [
  { from: new Date(2023, 0, 1), to: new Date() },
  { dayOfWeek: [1] }, // Monday is disabled (0 is Sunday, 1 is Monday, etc.)
];

const BookNowPage = () => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tickets, setTickets] = useState({
    adult: 0,
    child: 0,
    student: 0,
    member: 0,
  });
  const [memberType, setMemberType] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  // Function to get translations from bookingTranslations
  const bt = (key) => {
    const keys = key.split(".");
    let value = bookingTranslations[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        let englishValue = bookingTranslations.en;
        for (const ek of keys) {
          if (englishValue && englishValue[ek]) {
            englishValue = englishValue[ek];
          } else {
            console.warn(
              `Translation missing for key: "${key}" in language: "${language}"`
            );
            return key;
          }
        }
        return englishValue;
      }
    }
    return value;
  };

  const calculateTotal = () => {
    const adultPrice = 20 * tickets.adult;
    const studentPrice = 10 * tickets.student;
    return adultPrice + studentPrice;
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleTicketChange = (type, change) => {
    const newValue = Math.max(0, tickets[type] + change);
    setTickets({ ...tickets, [type]: newValue });
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 1:
        return !selectedPackage;
      case 2:
        return !termsAccepted;
      case 3:
        return (
          !selectedDate ||
          tickets.adult + tickets.child + tickets.student + tickets.member === 0
        );
      case 4:
        return (
          !personalInfo.firstName ||
          !personalInfo.lastName ||
          !personalInfo.email ||
          !personalInfo.phone
        );
      case 5:
        return !paymentMethod;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const reference =
        "BK" +
        Math.floor(Math.random() * 10000000)
          .toString()
          .padStart(7, "0");
      setBookingReference(reference);
      setBookingComplete(true);
      setCurrentStep(6);
    } catch (error) {
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(
      language === "en" ? "en-US" : "hi-IN",
      options
    );
  };

  return (
    <PageContainer>
      <Navbar hideDepartmentNames={true} />

      <ContentContainer>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {bt("pageTitle")}
        </PageTitle>

        <StepperContainer>
          <Step>
            <StepCircle completed={currentStep > 1} active={currentStep === 1}>
              {currentStep > 1 ? "" : "1"}
            </StepCircle>
            <StepLabel completed={currentStep > 1} active={currentStep === 1}>
              {bt("steps.step1")}
            </StepLabel>
          </Step>

          <Step>
            <StepCircle completed={currentStep > 2} active={currentStep === 2}>
              {currentStep > 2 ? "" : "2"}
            </StepCircle>
            <StepLabel completed={currentStep > 2} active={currentStep === 2}>
              {bt("steps.step2")}
            </StepLabel>
          </Step>

          <Step>
            <StepCircle completed={currentStep > 3} active={currentStep === 3}>
              {currentStep > 3 ? "" : "3"}
            </StepCircle>
            <StepLabel completed={currentStep > 3} active={currentStep === 3}>
              {bt("steps.step3")}
            </StepLabel>
          </Step>

          <Step>
            <StepCircle completed={currentStep > 4} active={currentStep === 4}>
              {currentStep > 4 ? "" : "4"}
            </StepCircle>
            <StepLabel completed={currentStep > 4} active={currentStep === 4}>
              {bt("steps.step4")}
            </StepLabel>
          </Step>

          <Step>
            <StepCircle completed={currentStep > 5} active={currentStep === 5}>
              {currentStep > 5 ? "" : "5"}
            </StepCircle>
            <StepLabel completed={currentStep > 5} active={currentStep === 5}>
              {bt("steps.step5")}
            </StepLabel>
          </Step>
        </StepperContainer>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <BookingCard
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle>{bt("packageSection.title")}</CardTitle>

              <Package
                selected={selectedPackage === "standard"}
                onClick={() => setSelectedPackage("standard")}
              >
                <PackageHeader>
                  <PackageTitle>
                    {bt("packageSection.standardTitle")}
                  </PackageTitle>
                  <PackagePrice>{bt("packageSection.priceFrom")}</PackagePrice>
                </PackageHeader>

                <PackageDescription>
                  {bt("packageSection.description")}
                </PackageDescription>

                <PackageFeatures>
                  <li>{bt("packageSection.features.feature1")}</li>
                  <li>{bt("packageSection.features.feature2")}</li>
                  <li>{bt("packageSection.features.feature3")}</li>
                  <li>{bt("packageSection.features.feature4")}</li>
                </PackageFeatures>
              </Package>

              <ButtonContainer>
                <span></span>
                <Button
                  primary
                  iconPosition="right"
                  onClick={handleNextStep}
                  disabled={isNextButtonDisabled()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {bt("buttons.continue")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                </Button>
              </ButtonContainer>
            </BookingCard>
          )}

          {currentStep === 2 && (
            <BookingCard
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle>{bt("termsSection.title")}</CardTitle>

              <TermsContainer>
                <h3>{bt("termsSection.bookingTermsTitle")}</h3>
                <p>{bt("termsSection.bookingTermsText")}</p>

                <h3>{bt("termsSection.cancellationTitle")}</h3>
                <p>{bt("termsSection.cancellationText")}</p>

                <h3>{bt("termsSection.museumRulesTitle")}</h3>
                <ul>
                  <li>{bt("termsSection.museumRules.rule1")}</li>
                  <li>{bt("termsSection.museumRules.rule2")}</li>
                  <li>{bt("termsSection.museumRules.rule3")}</li>
                  <li>{bt("termsSection.museumRules.rule4")}</li>
                </ul>

                <h3>{bt("termsSection.covidTitle")}</h3>
                <p>{bt("termsSection.covidText")}</p>

                <h3>{bt("termsSection.ticketTitle")}</h3>
                <p>{bt("termsSection.ticketText")}</p>
              </TermsContainer>

              <CheckboxContainer>
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="terms-checkbox">
                  {bt("termsSection.acceptTerms")}
                </label>
              </CheckboxContainer>

              <ButtonContainer>
                <Button
                  iconPosition="left"
                  onClick={handlePreviousStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  {bt("buttons.back")}
                </Button>

                <Button
                  primary
                  iconPosition="right"
                  onClick={handleNextStep}
                  disabled={isNextButtonDisabled()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {bt("buttons.continue")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                </Button>
              </ButtonContainer>
            </BookingCard>
          )}

          {currentStep === 3 && (
            <BookingCard
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle>{bt("ticketsSection.title")}</CardTitle>

              <CalendarContainer>
                <DayPickerContainer>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    fromMonth={new Date()}
                    toMonth={
                      new Date(new Date().setMonth(new Date().getMonth() + 3))
                    }
                  />

                  {selectedDate && (
                    <SelectedDateInfo>
                      <p>
                        {bt("ticketsSection.selectedDate")}{" "}
                        <strong>{formatDate(selectedDate)}</strong>
                      </p>
                      <p>
                        {bt("ticketsSection.openingHours")}{" "}
                        <strong>{bt("ticketsSection.openingTime")}</strong>
                      </p>
                      <p>
                        {bt("ticketsSection.lastEntry")}{" "}
                        <strong>{bt("ticketsSection.lastEntryTime")}</strong>
                      </p>
                    </SelectedDateInfo>
                  )}
                </DayPickerContainer>

                <TicketsContainer>
                  <TicketTypeCard>
                    <TicketHeader>
                      <h3>{bt("ticketsSection.adultTitle")}</h3>
                      <TicketPrice>
                        {bt("ticketsSection.adultPrice")}
                      </TicketPrice>
                    </TicketHeader>
                    <TicketDescription>
                      {bt("ticketsSection.adultDescription")}
                    </TicketDescription>
                    <TicketSelector>
                      <span>{bt("ticketsSection.quantity")}</span>
                      <QuantitySelector>
                        <QuantityButton
                          onClick={() => handleTicketChange("adult", -1)}
                          disabled={tickets.adult === 0}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{tickets.adult}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleTicketChange("adult", 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantitySelector>
                    </TicketSelector>
                  </TicketTypeCard>

                  <TicketTypeCard>
                    <TicketHeader>
                      <h3>{bt("ticketsSection.childTitle")}</h3>
                      <TicketPrice>
                        {bt("ticketsSection.childPrice")}
                      </TicketPrice>
                    </TicketHeader>
                    <TicketDescription>
                      {bt("ticketsSection.childDescription")}
                    </TicketDescription>
                    <TicketSelector>
                      <span>{bt("ticketsSection.quantity")}</span>
                      <QuantitySelector>
                        <QuantityButton
                          onClick={() => handleTicketChange("child", -1)}
                          disabled={tickets.child === 0}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{tickets.child}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleTicketChange("child", 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantitySelector>
                    </TicketSelector>
                  </TicketTypeCard>

                  <TicketTypeCard>
                    <TicketHeader>
                      <h3>{bt("ticketsSection.studentTitle")}</h3>
                      <TicketPrice>
                        {bt("ticketsSection.studentPrice")}
                      </TicketPrice>
                    </TicketHeader>
                    <TicketDescription>
                      {bt("ticketsSection.studentDescription")}
                    </TicketDescription>
                    <TicketSelector>
                      <span>{bt("ticketsSection.quantity")}</span>
                      <QuantitySelector>
                        <QuantityButton
                          onClick={() => handleTicketChange("student", -1)}
                          disabled={tickets.student === 0}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{tickets.student}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleTicketChange("student", 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantitySelector>
                    </TicketSelector>
                  </TicketTypeCard>

                  <TicketTypeCard>
                    <TicketHeader>
                      <h3>{bt("ticketsSection.memberTitle")}</h3>
                      <TicketPrice>
                        {bt("ticketsSection.memberPrice")}
                      </TicketPrice>
                    </TicketHeader>
                    <TicketDescription>
                      {bt("ticketsSection.memberDescription")}
                    </TicketDescription>
                    <TicketSelector>
                      <span>{bt("ticketsSection.quantity")}</span>
                      <QuantitySelector>
                        <QuantityButton
                          onClick={() => handleTicketChange("member", -1)}
                          disabled={tickets.member === 0}
                        >
                          -
                        </QuantityButton>
                        <QuantityDisplay>{tickets.member}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleTicketChange("member", 1)}
                        >
                          +
                        </QuantityButton>
                      </QuantitySelector>
                    </TicketSelector>

                    {tickets.member > 0 && (
                      <MembershipContainer>
                        <FormLabel>
                          {bt("ticketsSection.membershipTypeLabel")}
                        </FormLabel>
                        <select
                          value={memberType}
                          onChange={(e) => setMemberType(e.target.value)}
                        >
                          <option value="">
                            {bt("ticketsSection.membershipPlaceholder")}
                          </option>
                          <option value="annual">
                            {bt("ticketsSection.membershipTypes.annual")}
                          </option>
                          <option value="patron">
                            {bt("ticketsSection.membershipTypes.patron")}
                          </option>
                          <option value="vip">
                            {bt("ticketsSection.membershipTypes.vip")}
                          </option>
                          <option value="corporate">
                            {bt("ticketsSection.membershipTypes.corporate")}
                          </option>
                          <option value="staff">
                            {bt("ticketsSection.membershipTypes.staff")}
                          </option>
                        </select>
                      </MembershipContainer>
                    )}
                  </TicketTypeCard>
                </TicketsContainer>
              </CalendarContainer>

              <OrderSummary>
                <SummaryTitle>{bt("ticketsSection.summaryTitle")}</SummaryTitle>
                {tickets.adult > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.adultTitle")} × {tickets.adult}
                    </span>
                    <span>₹{20 * tickets.adult}</span>
                  </SummaryRow>
                )}
                {tickets.child > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.childTitle")} × {tickets.child}
                    </span>
                    <span>{bt("ticketsSection.childPrice")}</span>
                  </SummaryRow>
                )}
                {tickets.student > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.studentTitle")} × {tickets.student}
                    </span>
                    <span>₹{10 * tickets.student}</span>
                  </SummaryRow>
                )}
                {tickets.member > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.memberTitle")} × {tickets.member}
                    </span>
                    <span>{bt("ticketsSection.memberPrice")}</span>
                  </SummaryRow>
                )}

                <Divider />

                <SummaryRow total>
                  <span>{bt("ticketsSection.total")}</span>
                  <span>₹{calculateTotal()}</span>
                </SummaryRow>
              </OrderSummary>

              <ButtonContainer>
                <Button
                  iconPosition="left"
                  onClick={handlePreviousStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  {bt("buttons.back")}
                </Button>

                <Button
                  primary
                  iconPosition="right"
                  onClick={handleNextStep}
                  disabled={isNextButtonDisabled()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {bt("buttons.continue")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                </Button>
              </ButtonContainer>
            </BookingCard>
          )}

          {currentStep === 4 && (
            <BookingCard
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle>{bt("infoSection.title")}</CardTitle>

              <FormGrid>
                <FormGroup>
                  <FormLabel>{bt("infoSection.firstName")}</FormLabel>
                  <FormInput
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalInfoChange}
                    placeholder={bt("infoSection.firstNamePlaceholder")}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>{bt("infoSection.lastName")}</FormLabel>
                  <FormInput
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalInfoChange}
                    placeholder={bt("infoSection.lastNamePlaceholder")}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>{bt("infoSection.email")}</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    placeholder={bt("infoSection.emailPlaceholder")}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>{bt("infoSection.phone")}</FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    placeholder={bt("infoSection.phonePlaceholder")}
                    required
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <FormLabel>{bt("infoSection.address")}</FormLabel>
                <FormInput
                  type="text"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  placeholder={bt("infoSection.addressPlaceholder")}
                />
              </FormGroup>

              <OrderSummary>
                <SummaryTitle>{bt("infoSection.summaryTitle")}</SummaryTitle>
                <SummaryRow>
                  <span>{bt("infoSection.date")}</span>
                  <span>{formatDate(selectedDate)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>{bt("infoSection.package")}</span>
                  <span>{bt("infoSection.standardPackage")}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>{bt("infoSection.tickets")}</span>
                  <span>
                    {tickets.adult +
                      tickets.child +
                      tickets.student +
                      tickets.member}
                  </span>
                </SummaryRow>

                <Divider />

                <SummaryRow total>
                  <span>{bt("ticketsSection.total")}</span>
                  <span>₹{calculateTotal()}</span>
                </SummaryRow>
              </OrderSummary>

              <ButtonContainer>
                <Button
                  iconPosition="left"
                  onClick={handlePreviousStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  {bt("buttons.back")}
                </Button>

                <Button
                  primary
                  iconPosition="right"
                  onClick={handleNextStep}
                  disabled={isNextButtonDisabled()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {bt("buttons.continueToPayment")}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                  </svg>
                </Button>
              </ButtonContainer>
            </BookingCard>
          )}

          {currentStep === 5 && (
            <BookingCard
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle>{bt("paymentSection.title")}</CardTitle>

              <PaymentMethodsContainer>
                <PaymentMethod
                  selected={paymentMethod === "upi"}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <PaymentIcon>💸</PaymentIcon>
                  <h4>{bt("paymentSection.upi")}</h4>
                </PaymentMethod>

                <PaymentMethod
                  selected={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                >
                  <PaymentIcon>💳</PaymentIcon>
                  <h4>{bt("paymentSection.card")}</h4>
                </PaymentMethod>

                <PaymentMethod
                  selected={paymentMethod === "netbanking"}
                  onClick={() => setPaymentMethod("netbanking")}
                >
                  <PaymentIcon>🏦</PaymentIcon>
                  <h4>{bt("paymentSection.netbanking")}</h4>
                </PaymentMethod>

                <PaymentMethod
                  selected={paymentMethod === "wallet"}
                  onClick={() => setPaymentMethod("wallet")}
                >
                  <PaymentIcon>👛</PaymentIcon>
                  <h4>{bt("paymentSection.wallet")}</h4>
                </PaymentMethod>
              </PaymentMethodsContainer>

              <OrderSummary>
                <SummaryTitle>{bt("paymentSection.summaryTitle")}</SummaryTitle>
                <SummaryRow>
                  <span>{bt("paymentSection.date")}</span>
                  <span>{formatDate(selectedDate)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>{bt("paymentSection.visitor")}</span>
                  <span>
                    {personalInfo.firstName} {personalInfo.lastName}
                  </span>
                </SummaryRow>
                {tickets.adult > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.adultTitle")} × {tickets.adult}
                    </span>
                    <span>₹{20 * tickets.adult}</span>
                  </SummaryRow>
                )}
                {tickets.child > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.childTitle")} × {tickets.child}
                    </span>
                    <span>{bt("ticketsSection.childPrice")}</span>
                  </SummaryRow>
                )}
                {tickets.student > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.studentTitle")} × {tickets.student}
                    </span>
                    <span>₹{10 * tickets.student}</span>
                  </SummaryRow>
                )}
                {tickets.member > 0 && (
                  <SummaryRow>
                    <span>
                      {bt("ticketsSection.memberTitle")} × {tickets.member}
                    </span>
                    <span>{bt("ticketsSection.memberPrice")}</span>
                  </SummaryRow>
                )}

                <Divider />

                <SummaryRow total>
                  <span>{bt("paymentSection.totalAmount")}</span>
                  <span>₹{calculateTotal()}</span>
                </SummaryRow>
              </OrderSummary>

              <ButtonContainer>
                <Button
                  iconPosition="left"
                  onClick={handlePreviousStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  {bt("buttons.back")}
                </Button>

                <Button
                  primary
                  onClick={handleSubmit}
                  disabled={isNextButtonDisabled() || isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting
                    ? bt("paymentSection.processing")
                    : bt("paymentSection.completeBooking")}
                </Button>
              </ButtonContainer>
            </BookingCard>
          )}

          {currentStep === 6 && (
            <SuccessScreen
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <SuccessIcon
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.8 }}
              >
                ✓
              </SuccessIcon>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: "#d3a164",
                  fontSize: "2rem",
                  marginBottom: "20px",
                }}
              >
                {bt("successSection.bookingConfirmed")}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  maxWidth: "600px",
                  margin: "0 auto 30px",
                  lineHeight: "1.6",
                }}
              >
                {bt("successSection.thankYouMessage").replace(
                  "your email",
                  personalInfo.email
                )}
              </motion.p>

              <BookingReference>
                <h3>{bt("successSection.bookingDetails")}</h3>
                <p>
                  <strong>{bt("successSection.reference")}</strong>{" "}
                  {bookingReference}
                </p>
                <p>
                  <strong>{bt("successSection.date")}</strong>{" "}
                  {formatDate(selectedDate)}
                </p>
                <p>
                  <strong>{bt("successSection.tickets")}</strong>{" "}
                  {tickets.adult +
                    tickets.child +
                    tickets.student +
                    tickets.member}
                </p>
                <p>
                  <strong>{bt("successSection.amountPaid")}</strong> ₹
                  {calculateTotal()}
                </p>
              </BookingReference>

              <Button
                primary
                as={Link}
                to="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  margin: "0 auto",
                  display: "block",
                  maxWidth: "200px",
                }}
              >
                {bt("successSection.returnHome")}
              </Button>
            </SuccessScreen>
          )}
        </AnimatePresence>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default BookNowPage;
