import React, { createContext, useState, useContext } from "react";

// Dictionary of translations
export const translations = {
  en: {
    // Navbar
    home: "Home",
    exhibits: "Exhibits",
    timeline: "Historical Timeline",
    virtualTour: "Virtual Tour",
    planVisit: "Plan Your Visit",

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

    // Exhibit section
    virtualExhibitGallery: "Virtual Exhibit Gallery",
    tribalWarAxe: "Tribal War Axe",
    tribalWarAxeDesc:
      "An ornate ceremonial war axe used by tribal chieftains in battle.",
    dhokraArt: "Dhokra Art",
    dhokraArtDesc:
      "Traditional lost-wax metal casting technique dating back over 4,000 years.",
    tribalMask: "Tribal Mask",
    tribalMaskDesc:
      "Ceremonial mask used during harvest festivals and spiritual rituals.",

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
    close: "Close",

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

    // Exhibit section
    virtualExhibitGallery: "आभासी प्रदर्शनी गैलरी",
    tribalWarAxe: "आदिवासी युद्ध कुल्हाड़ी",
    tribalWarAxeDesc:
      "एक अलंकृत अनुष्ठानिक युद्ध कुल्हाड़ी जो आदिवासी मुखियाओं द्वारा युद्ध में उपयोग की जाती थी।",
    dhokraArt: "ढोकरा कला",
    dhokraArtDesc:
      "4,000 वर्षों से अधिक पुरानी पारंपरिक लॉस्ट-वैक्स मेटल कास्टिंग तकनीक।",
    tribalMask: "आदिवासी मुखौटा",
    tribalMaskDesc:
      "फसल उत्सवों और आध्यात्मिक अनुष्ठानों के दौरान उपयोग किया जाने वाला अनुष्ठानिक मुखौटा।",

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
    close: "बंद करें",

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
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
