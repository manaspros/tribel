import React, { createContext, useState, useContext, useEffect } from "react";
import translationsFromJson from "../data/translations.json"; // Assuming translations are in JSON format

// Before the LanguageContext creation, ensure the translationsFromJson includes GalleriesDescription for English
// This ensures both translation sources have the key
if (translationsFromJson && translationsFromJson.en) {
  // Make sure the GalleriesDescription key exists in English translations
  if (!translationsFromJson.en.GalleriesDescription) {
    translationsFromJson.en.GalleriesDescription =
      "Explore our curated galleries showcasing the rich cultural heritage of indigenous tribal communities. Each gallery offers a unique perspective on traditional art, craftsmanship, spiritual practices, and daily life of tribal peoples across different regions.";
    console.log("Added missing GalleriesDescription translation to English");
  }
}

const translationsData = {
  en: {
    // Navbar items
    home: "Home",
    exhibits: "Exhibits",
    timeline: "Historical Timeline",
    virtualTour: "Virtual Tour",
    planVisit: "Plan Your Visit",
    "About Museum": "About Museum",
    Galleries: "Galleries",
    "Our Collection": "Our Collection",
    "Visiting the Museum": "Visiting the Museum",
    "Book the Ticket": "Book the Ticket",
    "Tribal Museum": "Tribal Museum", // Keep this for the museum card
    "Museum CG": "Museum CG", // Update navbar logo translation
    "Tribal Heritage Museum": "Tribal Heritage Museum",
    "Department of Tribal": "Department of Tribal",
    "Department of Scheduled Caste": "Department of Scheduled Caste",
    "Department of Backword Classes and minorities":
      "Department of Backward Classes and Minorities",

    // Visit information
    "Admission Fees": "Admission Fees",
    Adults: "Adults",
    "Students & Seniors": "Students & Seniors",
    "Children (under 12)": "Children (under 12)",
    Free: "Free",
    Members: "Members",
    "Museum Hours": "Museum Hours",
    "Tuesday - Friday: 10:00 AM - 6:00 PM":
      "Tuesday - Friday: 10:00 AM - 6:00 PM",
    "Saturday - Sunday: 9:00 AM - 7:00 PM":
      "Saturday - Sunday: 9:00 AM - 7:00 PM",
    "Monday: Closed": "Monday: Closed",
    Location: "Location",
    "Click to view directions": "Click to view directions",
    "Tribal Freedom Fighter Museum, Naya Raipur":
      "Tribal Freedom Fighter Museum, Naya Raipur",
    "Visiting Experience": "Visiting Experience",
    "Museum Impact": "Museum Impact",

    // Map and contact info
    "Plan Your Visit": "Plan Your Visit",
    "Step into the captivating world":
      "Step into the captivating world of tribal heritage at our museum. Located in Naya Raipur, the Tribal Freedom Fighter Museum celebrates the rich history, culture, and struggles of India's indigenous communities during the freedom movement.",
    "Open Tuesday through Sunday":
      "Open Tuesday through Sunday, 10:00 AM to 6:00 PM",
    "123 Heritage Avenue":
      "Tribal Freedom Fighter Museum, Sector 24, Naya Raipur, Chhattisgarh 492101",
    "contact@tribalmuseum.org": "info@tribalmuseum.org",
    "+1 (555) 123-4567": "+91 771-2242181",

    // Exhibit and collection descriptions
    "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.":
      "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.",

    "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.":
      "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.",

    "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.":
      "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.",

    // Freedom Museum Page
    "Freedom Fighter Museum": "Tribal Freedom Fighter Museum",

    // Gallery descriptions
    GalleriesDescription:
      "Explore our curated galleries showcasing the rich cultural heritage of indigenous tribal communities. Each gallery offers a unique perspective on traditional art, craftsmanship, spiritual practices, and daily life of tribal peoples across different regions.",

    // Admission terms
    Admission: "Admission",
    Students: "Students",
    Children: "Children",
    seniors: "Seniors",
    price20: "₹20",
    price10: "₹10",
    beginJourney: "Begin Journey",
    tribal: "Tribal",
    heritageMuseum: "Heritage Museum",
    freedom: "Freedom",
    fighterMuseum: "Fighter Museum",
    "Tue-Fri": "Tue-Fri",
    "Sat-Sun": "Sat-Sun",

    // Footer items
    backToHome: "Back to Home",
    aboutMuseum: "About The Museum",
    usefulLinks: "Useful Links",
    visitUs: "Visit Us",
    hours: "Hours",
    copyright: "Tribal Heritage Museum. All rights reserved.",
  },
  hi: {
    // Navbar items
    home: "होम",
    exhibits: "प्रदर्शनियां",
    timeline: "ऐतिहासिक समयरेखा",
    virtualTour: "आभासी दौरा",
    planVisit: "यात्रा की योजना",
    "About Museum": "संग्रहालय के बारे में",
    Galleries: "प्रदर्शनी कक्ष",
    "Our Collection": "हमारा संग्रह",
    "Visiting the Museum": "संग्रहालय भ्रमण",
    "Book the Ticket": "टिकट बुक करें",
    "Tribal Museum": "आदिवासी संग्रहालय", // Keep this for the museum card
    "Museum CG": "संग्रहालय छ.ग.", // Update navbar logo translation
    "Tribal Heritage Museum": "आदिवासी विरासत संग्रहालय",
    "Department of Tribal": "आदिम जाति विभाग",
    "Department of Scheduled Caste": "अनुसूचित जाति विभाग",
    "Department of Backword Classes and minorities":
      "पिछड़ा वर्ग एवं अल्पसंख्यक विकास विभाग",

    // Visit information
    "Admission Fees": "प्रवेश शुल्क",
    Adults: "वयस्क",
    "Students & Seniors": "छात्र और वरिष्ठ नागरिक",
    "Children (under 12)": "बच्चे (12 वर्ष से कम)",
    Free: "नि:शुल्क",
    Members: "सदस्य",
    "Museum Hours": "संग्रहालय का समय",
    "Tuesday - Friday: 10:00 AM - 6:00 PM":
      "मंगलवार - शुक्रवार: सुबह 10:00 बजे - शाम 6:00 बजे",
    "Saturday - Sunday: 9:00 AM - 7:00 PM":
      "शनिवार - रविवार: सुबह 9:00 बजे - शाम 7:00 बजे",
    "Monday: Closed": "सोमवार: बंद",
    Location: "स्थान",
    "Click to view directions": "दिशा-निर्देश देखने के लिए क्लिक करें",
    "Tribal Freedom Fighter Museum, Naya Raipur":
      "आदिवासी स्वतंत्रता सेनानी संग्रहालय, नया रायपुर",
    "Visiting Experience": "भ्रमण अनुभव",
    "Museum Impact": "संग्रहालय प्रभाव",

    // Map and contact info
    "Plan Your Visit": "यात्रा की योजना बनाएं",
    "Step into the captivating world":
      "हमारे संग्रहालय में आदिवासी विरासत की मनमोहक दुनिया में कदम रखें। नया रायपुर में स्थित, आदिवासी स्वतंत्रता सेनानी संग्रहालय स्वतंत्रता आंदोलन के दौरान भारत के स्वदेशी समुदायों के समृद्ध इतिहास, संस्कृति और संघर्षों का जश्न मनाता है।",
    "Open Tuesday through Sunday":
      "मंगलवार से रविवार तक खुला, सुबह 10:00 बजे से शाम 6:00 बजे तक",
    "123 Heritage Avenue":
      "आदिवासी स्वतंत्रता सेनानी संग्रहालय, सेक्टर 24, नया रायपुर, छत्तीसगढ़ 492101",
    "contact@tribalmuseum.org": "info@tribalmuseum.org",
    "+1 (555) 123-4567": "+91 771-2242181",

    // Exhibit and collection descriptions
    "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.":
      "एक ऐसी दुनिया में कदम रखें जहां प्राचीन परंपराएं जीवंत हो उठती हैं। हमारा आदिवासी विरासत संग्रहालय स्वदेशी समुदायों की समृद्ध सांस्कृतिक विरासत का जश्न मनाता है, उनके ज्ञान, कला और कहानियों को भावी पीढ़ियों के लिए संरक्षित करता है। सावधानीपूर्वक तैयार की गई प्रदर्शनियों के माध्यम से, हम आपको आदिवासी समुदायों और उनके प्राकृतिक वातावरण, उनकी आध्यात्मिक मान्यताओं और उनकी अनूठी कलात्मक अभिव्यक्तियों के बीच गहरे संबंध का पता लगाने के लिए आमंत्रित करते हैं।",

    "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.":
      "हमारे संग्रह में 10,000 से अधिक सावधानीपूर्वक संरक्षित कलाकृतियां हैं, जिनमें से प्रत्येक स्वदेशी विरासत की एक अनूठी कहानी बताती है। जटिलता से बनाए गए अनुष्ठानिक मुखौटों और पारंपरिक हथियारों से लेकर चिकित्सीय जड़ी-बूटियों और संगीत वाद्ययंत्रों तक, हर वस्तु आदिवासी समुदायों की प्रतिभा, आध्यात्मिकता और कलात्मक अभिव्यक्ति का प्रतिनिधित्व करती है। विशेष प्रदर्शनियां उन टिकाऊ प्रथाओं पर प्रकाश डालती हैं जिन्होंने इन संस्कृतियों को हजारों वर्षों से प्रकृति के साथ सामंजस्य में फलने-फूलने की अनुमति दी है।",

    "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.":
      "हमारी इंटरैक्टिव प्रदर्शनियों, सांस्कृतिक प्रदर्शनों और शैक्षिक कार्यक्रमों के माध्यम से स्वदेशी लोगों की जीवंत परंपराओं में खुद को डुबोएं। पारंपरिक शिल्प तकनीकों को देखें, कहानी सुनाने के सत्रों में भाग लें, और आदिवासी संगीत की लयबद्ध शक्ति का अनुभव करें। हमारे जानकार गाइड, जिनमें से कई स्वयं आदिवासी समुदायों से हैं, ऐसी अंतर्दृष्टि प्रदान करते हैं जो प्रत्येक कलाकृति और कहानी को जीवंत बनाती है।",

    // Freedom Museum Page
    "Freedom Fighter Museum": "आदिवासी स्वतंत्रता सेनानी संग्रहालय",

    // Gallery descriptions
    GalleriesDescription:
      "हमारी क्यूरेटेड गैलरी देखें जो स्वदेशी आदिवासी समुदायों की समृद्ध सांस्कृतिक विरासत को प्रदर्शित करती है। प्रत्येक गैलरी पारंपरिक कला, शिल्प कौशल, आध्यात्मिक प्रथाओं और विभिन्न क्षेत्रों के आदिवासी लोगों के दैनिक जीवन पर एक अनूठा दृष्टिकोण प्रदान करती है।",

    // Admission terms
    Admission: "प्रवेश",
    Students: "छात्र",
    Children: "बच्चे",
    seniors: "वरिष्ठ नागरिक",
    price20: "₹20",
    price10: "₹10",
    beginJourney: "यात्रा शुरू करें",
    tribal: "आदिवासी",
    heritageMuseum: "विरासत संग्रहालय",
    freedom: "स्वतंत्रता",
    fighterMuseum: "सेनानी संग्रहालय",
    "Tue-Fri": "मंगल-शुक्र",
    "Sat-Sun": "शनि-रवि",

    // Footer items
    backToHome: "वापस होम पेज पर",
    aboutMuseum: "संग्रहालय के बारे में",
    usefulLinks: "उपयोगी लिंक",
    visitUs: "हमसे मिलें",
    hours: "समय",
    copyright: "आदिवासी विरासत संग्रहालय। सर्वाधिकार सुरक्षित।",
  },
};

const LanguageContext = createContext();

// Export translations for use in components
export const translations = translationsFromJson || translationsData;

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
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `Translation missing for key: "${key}" in language: "${language}"`
          );
        }
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
