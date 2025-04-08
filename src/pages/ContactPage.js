import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
`;

const ContactLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: #241c17;
  padding: 30px;
  border-radius: 10px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px 15px;
  border-radius: 5px;
  border: none;
  background-color: #342920;
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #d3a164;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border-radius: 5px;
  border: none;
  background-color: #342920;
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: 2px solid #d3a164;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: #d3a164;
  color: #1a1410;
  border: none;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

const InfoTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const InfoIcon = styled.div`
  font-size: 1.2rem;
  color: #d3a164;
`;

const InfoText = styled.div`
  line-height: 1.5;
`;

const SuccessMessage = styled(motion.div)`
  background-color: #2d4821;
  color: #a7d99c;
  padding: 15px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
`;

const ContactPage = () => {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    setFormSubmitted(true);
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("contact")}
        </PageTitle>

        <ContactLayout>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactInfo>
              <InfoTitle>{t("Contact Information")}</InfoTitle>

              <InfoItem>
                <InfoIcon>📍</InfoIcon>
                <InfoText>{t("123 Heritage Avenue")}</InfoText>
              </InfoItem>

              <InfoItem>
                <InfoIcon>📞</InfoIcon>
                <InfoText>{t("+1 (555) 123-4567")}</InfoText>
              </InfoItem>

              <InfoItem>
                <InfoIcon>✉️</InfoIcon>
                <InfoText>{t("contact@tribalmuseum.org")}</InfoText>
              </InfoItem>

              <InfoItem>
                <InfoIcon>🕒</InfoIcon>
                <InfoText>{t("Open Tuesday through Sunday")}</InfoText>
              </InfoItem>
            </ContactInfo>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ContactForm onSubmit={handleSubmit}>
              <FormField>
                <Label>{t("First Name")}</Label>
                <Input type="text" required />
              </FormField>

              <FormField>
                <Label>{t("Last Name")}</Label>
                <Input type="text" required />
              </FormField>

              <FormField>
                <Label>{t("Email")}</Label>
                <Input type="email" required />
              </FormField>

              <FormField>
                <Label>{t("Message")}</Label>
                <TextArea required></TextArea>
              </FormField>

              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("Send Message")}
              </SubmitButton>

              {formSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {t("Thank You!")} {t("Your message has been sent.")}
                </SuccessMessage>
              )}
            </ContactForm>
          </motion.div>
        </ContactLayout>
      </ContentContainer>
    </PageContainer>
  );
};

export default ContactPage;
