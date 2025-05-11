import React, { createContext, useState, useContext, useEffect } from "react";
import translationsFromJson from "../data/translations.json";

const LanguageContext = createContext();

// Export translations for use in components
export const translations = translationsFromJson;

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return savedLanguage || "en";
  });

  // Add state version to force re-renders when language changes
  const [version, setVersion] = useState(0);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
    // Update document lang attribute for accessibility
    document.documentElement.lang = language;

    // Optional: Add a class to the body for language-specific styling
    document.body.className = language === "en" ? "lang-en" : "lang-hi";

    // Force update components by incrementing version
    setVersion((prev) => prev + 1);
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    setLanguage(newLang);
  };

  // Translation function with fallback
  const t = (key, placeholders = {}) => {
    // Get the translation or fallback to the key itself
    let text;
    try {
      // Check if translation exists for this key
      if (translations[language] && translations[language][key]) {
        text = translations[language][key];
      } else {
        // For development: Log missing translations
        text = key; // Fallback to key itself
      }
    } catch (error) {
      console.error("Translation error:", error);
      text = key;
    }

    // Replace any placeholders in the format {placeholderName}
    Object.keys(placeholders).forEach((placeholder) => {
      const regex = new RegExp(`{${placeholder}}`, "g");
      text = text.replace(regex, placeholders[placeholder]);
    });

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, version }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
