import React, { createContext, useState, useContext, useEffect } from "react";
import transalationsTemp from "../data/translations.json"; // Assuming translations are in JSON format

const LanguageContext = createContext();

export const translations = transalationsTemp; // Export translations for use in components

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Update document lang attribute for accessibility
    document.documentElement.lang = language;

    // Optional: Add a class to the body for language-specific styling
    document.body.className = language === "en" ? "lang-en" : "lang-hi";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  // Enhanced translation function to handle text not found in translations
  // and handle dynamic text with placeholders
  const t = (key, placeholders = {}) => {
    // Get the translation or fallback to the key itself
    let text = translations[language][key] || key;

    // Replace any placeholders in the format {placeholderName}
    Object.keys(placeholders).forEach((placeholder) => {
      const regex = new RegExp(`{${placeholder}}`, "g");
      text = text.replace(regex, placeholders[placeholder]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
