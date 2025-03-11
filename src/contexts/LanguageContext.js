import React, { createContext, useState, useContext, useEffect } from "react";

// Dictionary of translations - enhanced with more keys for complete site translation
export const translations = {
  en: {
    // Navbar
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
    "Tribal Museum": "Tribal Museum",

    // Hero section
    tribal: "Tribal",
    heritageMuseum: "Heritage Museum",
    journeyText:
      "Journey through time and experience the vibrant culture and resilient spirit of indigenous communities",
    explore: "Explore",

    // Timeline section
    tribalUprisingsTimeline: "Tribal Uprisings Timeline",
    halbaRebellion: "Halba Rebellion",
    bhumkalRevolt: "Bhumkal Revolt",
    "Related Artifacts": "Related Artifacts",

    // Quote section
    "Museum Impact": "Museum Impact",

    // Visit section
    "Plan Your Visit": "Plan Your Visit",
    "Step into the captivating world":
      "Step into the captivating world of tribal heritage at our museum. Book your tickets in advance to ensure a seamless experience exploring our rich collection of artifacts and immersive exhibitions.",
    "Open Tuesday through Sunday":
      "Open Tuesday through Sunday, 10:00 AM to 6:00 PM",
    "123 Heritage Avenue":
      "123 Heritage Avenue, Cultural District, Tribal City",
    "contact@tribalmuseum.org": "contact@tribalmuseum.org",
    "+1 (555) 123-4567": "+1 (555) 123-4567",
    "Book Your Ticket": "Book Your Ticket",
    General: "General",
    "Guided Tour": "Guided Tour",
    "Special Event": "Special Event",
    "First Name": "First Name",
    "Last Name": "Last Name",
    Email: "Email",
    "Visit Date": "Visit Date",
    "Time Slot": "Time Slot",
    "Select...": "Select...",
    "Number of Visitors": "Number of Visitors",
    "Book Now": "Book Now",
    "Thank You!": "Thank You!",
    "Your booking has been confirmed":
      "Your booking has been confirmed. You will receive a confirmation email shortly.",
    Close: "Close",

    // Exhibit section
    virtualExhibitGallery: "Virtual Exhibit Gallery",
    "Explore our collection":
      "Explore our collection of rare tribal artifacts, each telling a unique story of indigenous heritage, craftsmanship, and cultural significance.",
    tribalWarAxe: "Tribal War Axe",
    tribalWarAxeDesc:
      "An ornate ceremonial war axe used by tribal chieftains in battle.",
    dhokraArt: "Dhokra Art",
    dhokraArtDesc:
      "Traditional lost-wax metal casting technique dating back over 4,000 years.",
    tribalMask: "Tribal Mask",
    tribalMaskDesc:
      "Ceremonial mask used during harvest festivals and spiritual rituals.",
    "Healing Herbs": "Healing Herbs",
    "Collection of medicinal herbs":
      "Collection of medicinal herbs used by tribal healers to treat various ailments, passed down through generations of knowledge.",
    "Tribal Jewelry": "Tribal Jewelry",
    "Ornate jewelry pieces":
      "Ornate jewelry pieces made from natural materials like seeds, bones, and metals, signifying social status and tribal affiliations.",
    "Musical Instruments": "Musical Instruments",
    "Traditional instruments":
      "Traditional instruments used in tribal celebrations, rituals and storytelling sessions, creating unique rhythms and melodies.",
    Weapon: "Weapon",
    Ceremonial: "Ceremonial",
    Crafts: "Crafts",
    Ancient: "Ancient",
    Ritual: "Ritual",
    Spiritual: "Spiritual",
    Medicine: "Medicine",
    Natural: "Natural",
    Adornment: "Adornment",
    Cultural: "Cultural",
    Music: "Music",
    Performance: "Performance",

    // CTA section
    experienceRichHeritage: "Experience Our Rich Heritage",
    stepIntoWorld:
      "Step into a world of ancient traditions, resilient spirits, and cultural wonders. Our guided tours offer an immersive journey through the heart of tribal history.",
    bookGuidedTour: "Book a Guided Tour",

    // Virtual Tour
    museumTour: "Museum Tour",
    navigationInfo:
      "Use the rotation controls to navigate the virtual museum. Click on the highlighted points to learn more about the exhibits.",
    tribalHeritage: "Tribal Heritage",
    culturalLegacy: "Cultural Legacy",
    ancestralWisdom: "Ancestral Wisdom",
    livingTraditions: "Living Traditions",
    loadingVirtualMuseum: "Loading Virtual Museum",
    preparingExperience: "Preparing your immersive experience...",
    backToHome: "Back to Home",

    // Footer
    aboutMuseum: "About The Museum",
    aboutDesc:
      "The Tribal Heritage Museum celebrates the rich cultural legacy and historical significance of indigenous communities. Our mission is to preserve, showcase and educate about tribal heritage.",
    usefulLinks: "Useful Links",
    aboutUs: "About Us",
    events: "Events",
    educationalResources: "Educational Resources",
    supportUs: "Support Us",
    contact: "Contact",
    visitUs: "Visit Us",
    hours: "Hours",
    newsletter: "Newsletter",
    newsletterDesc:
      "Subscribe to our newsletter to receive updates on new exhibits, events, and educational programs.",
    subscribe: "Subscribe",
    copyright: "© 2023 Tribal Heritage Museum. All rights reserved.",
  },
  hi: {
    // Navbar
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
    "Tribal Museum": "आदिवासी संग्रहालय",

    // Hero section
    tribal: "आदिवासी",
    heritageMuseum: "विरासत संग्रहालय",
    journeyText:
      "समय के माध्यम से यात्रा करें और स्वदेशी समुदायों की जीवंत संस्कृति और लचीले आत्मा का अनुभव करें",
    explore: "अन्वेषण करें",

    // Timeline section
    tribalUprisingsTimeline: "आदिवासी विद्रोहों की समयरेखा",
    halbaRebellion: "हल्बा विद्रोह",
    bhumkalRevolt: "भूमकाल विद्रोह",
    "Related Artifacts": "संबंधित कलाकृतियां",

    // Quote section
    "Museum Impact": "संग्रहालय का प्रभाव",

    // Visit section
    "Plan Your Visit": "अपनी यात्रा की योजना बनाएं",
    "Step into the captivating world":
      "हमारे संग्रहालय में आदिवासी विरासत की मनमोहक दुनिया में कदम रखें। हमारे समृद्ध कलाकृति संग्रह और इमर्सिव प्रदर्शनियों का अन्वेषण करने के लिए अपने टिकट पहले से बुक करें।",
    "Open Tuesday through Sunday":
      "मंगलवार से रविवार तक, सुबह 10:00 बजे से शाम 6:00 बजे तक खुला है",
    "123 Heritage Avenue": "123 हेरिटेज एवेन्यू, सांस्कृतिक जिला, आदिवासी नगर",
    "contact@tribalmuseum.org": "contact@tribalmuseum.org",
    "+1 (555) 123-4567": "+1 (555) 123-4567",
    "Book Your Ticket": "अपना टिकट बुक करें",
    General: "सामान्य",
    "Guided Tour": "गाइडेड टूर",
    "Special Event": "विशेष कार्यक्रम",
    "First Name": "पहला नाम",
    "Last Name": "अंतिम नाम",
    Email: "ईमेल",
    "Visit Date": "यात्रा की तिथि",
    "Time Slot": "समय स्लॉट",
    "Select...": "चुनें...",
    "Number of Visitors": "आगंतुकों की संख्या",
    "Book Now": "अभी बुक करें",
    "Thank You!": "धन्यवाद!",
    "Your booking has been confirmed":
      "आपकी बुकिंग की पुष्टि हो गई है। आपको जल्द ही एक पुष्टिकरण ईमेल प्राप्त होगा।",
    Close: "बंद करें",

    // Exhibit section
    virtualExhibitGallery: "आभासी प्रदर्शनी गैलरी",
    "Explore our collection":
      "दुर्लभ आदिवासी कलाकृतियों के हमारे संग्रह का अन्वेषण करें, प्रत्येक स्वदेशी विरासत, कारीगरी और सांस्कृतिक महत्व की अनूठी कहानी बताती है।",
    tribalWarAxe: "आदिवासी युद्ध कुल्हाड़ी",
    tribalWarAxeDesc:
      "एक अलंकृत अनुष्ठानिक युद्ध कुल्हाड़ी जो आदिवासी मुखियाओं द्वारा युद्ध में उपयोग की जाती थी।",
    dhokraArt: "ढोकरा कला",
    dhokraArtDesc:
      "4,000 वर्षों से अधिक पुरानी पारंपरिक लॉस्ट-वैक्स मेटल कास्टिंग तकनीक।",
    tribalMask: "आदिवासी मुखौटा",
    tribalMaskDesc:
      "फसल उत्सवों और आध्यात्मिक अनुष्ठानों के दौरान उपयोग किया जाने वाला अनुष्ठानिक मुखौटा।",
    "Healing Herbs": "औषधीय जड़ी-बूटियां",
    "Collection of medicinal herbs":
      "आदिवासी चिकित्सकों द्वारा विभिन्न बीमारियों के इलाज के लिए प्रयुक्त औषधीय जड़ी-बूटियों का संग्रह, जो पीढ़ियों से ज्ञान के माध्यम से आगे बढ़ता है।",
    "Tribal Jewelry": "आदिवासी आभूषण",
    "Ornate jewelry pieces":
      "बीज, हड्डियों और धातुओं जैसी प्राकृतिक सामग्री से बने अलंकृत आभूषण, जो सामाजिक स्थिति और आदिवासी संबंधों को दर्शाते हैं।",
    "Musical Instruments": "वाद्य यंत्र",
    "Traditional instruments":
      "आदिवासी उत्सवों, अनुष्ठानों और कहानी सुनाने के सत्रों में प्रयुक्त पारंपरिक वाद्य यंत्र, जो अनूठे लय और धुन बनाते हैं।",
    Weapon: "हथियार",
    Ceremonial: "अनुष्ठानिक",
    Crafts: "शिल्प",
    Ancient: "प्राचीन",
    Ritual: "अनुष्ठान",
    Spiritual: "आध्यात्मिक",
    Medicine: "दवा",
    Natural: "प्राकृतिक",
    Adornment: "आभूषण",
    Cultural: "सांस्कृतिक",
    Music: "संगीत",
    Performance: "प्रदर्शन",

    // CTA section
    experienceRichHeritage: "हमारी समृद्ध विरासत का अनुभव करें",
    stepIntoWorld:
      "प्राचीन परंपराओं, लचीले आत्माओं और सांस्कृतिक चमत्कारों की दुनिया में कदम रखें। हमारे गाइडेड टूर आदिवासी इतिहास के हृदय के माध्यम से एक इमरसिव यात्रा प्रदान करते हैं।",
    bookGuidedTour: "गाइडेड टूर बुक करें",

    // Virtual Tour
    museumTour: "संग्रहालय दौरा",
    navigationInfo:
      "आभासी संग्रहालय में नेविगेट करने के लिए रोटेशन नियंत्रण का उपयोग करें। प्रदर्शनियों के बारे में अधिक जानने के लिए हाइलाइट किए गए बिंदुओं पर क्लिक करें।",
    tribalHeritage: "आदिवासी विरासत",
    culturalLegacy: "सांस्कृतिक विरासत",
    ancestralWisdom: "पैतृक ज्ञान",
    livingTraditions: "जीवित परंपराएँ",
    loadingVirtualMuseum: "आभासी संग्रहालय लोड हो रहा है",
    preparingExperience: "आपके इमरसिव अनुभव की तैयारी...",
    backToHome: "होम पर वापस जाएं",

    // Footer
    aboutMuseum: "संग्रहालय के बारे में",
    aboutDesc:
      "आदिवासी विरासत संग्रहालय स्वदेशी समुदायों की समृद्ध सांस्कृतिक विरासत और ऐतिहासिक महत्व का जश्न मनाता है। हमारा मिशन आदिवासी विरासत को संरक्षित, प्रदर्शित और शिक्षित करना है।",
    usefulLinks: "उपयोगी लिंक",
    aboutUs: "हमारे बारे में",
    events: "कार्यक्रम",
    educationalResources: "शैक्षिक संसाधन",
    supportUs: "हमें सहयोग दें",
    contact: "संपर्क",
    visitUs: "हमसे मिलें",
    hours: "समय",
    newsletter: "न्यूज़लेटर",
    newsletterDesc:
      "नई प्रदर्शनियों, कार्यक्रमों और शैक्षिक कार्यक्रमों के अपडेट प्राप्त करने के लिए हमारे न्यूज़लेटर की सदस्यता लें।",
    subscribe: "सदस्यता लें",
    copyright: "© 2023 आदिवासी विरासत संग्रहालय। सर्वाधिकार सुरक्षित।",
  },
};

const LanguageContext = createContext();

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
