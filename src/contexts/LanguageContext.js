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

    // Additional translations
    freedom: "Freedom",
    fighterMuseum: "Fighter Museum",
    tribalJourneyText:
      "Journey through time and experience the vibrant culture and resilient spirit of indigenous communities",
    freedomJourneyText:
      "Discover the inspiring stories and sacrifices of brave freedom fighters who shaped our nation's destiny",
    exploreMuseum: "Explore Museum",
    scrollDown: "Scroll Down",
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

    // Timeline section additional translations
    "Tribal Participation in Quit India Movement":
      "भारत छोड़ो आंदोलन में आदिवासी भागीदारी",
    "Tribal communities joined the nationwide struggle for independence.":
      "आदिवासी समुदायों ने स्वतंत्रता के लिए राष्ट्रव्यापी संघर्ष में भाग लिया।",
    "Freedom flags": "स्वतंत्रता ध्वज",
    "Protest documents": "विरोध दस्तावेज़",
    "Gandhi memorabilia": "गांधी स्मृति चिन्ह",
    "During the Quit India Movement launched by Mahatma Gandhi in 1942, tribal communities across India played a significant but often overlooked role in the struggle for independence. In regions like Jharkhand, Chhattisgarh, and Odisha, tribal groups organized protests, disrupted colonial infrastructure, and provided support to underground freedom fighters. Their participation was motivated not only by nationalist sentiment but also by their ongoing struggles against forest laws, land alienation, and economic exploitation under British rule. The British response was severe, with many tribal villages facing collective punishment, but their contribution added crucial momentum to India's independence movement.":
      "1942 में महात्मा गांधी द्वारा शुरू किए गए भारत छोड़ो आंदोलन के दौरान, भारत भर के आदिवासी समुदायों ने स्वतंत्रता के संघर्ष में महत्वपूर्ण लेकिन अक्सर अनदेखी भूमिका निभाई। झारखंड, छत्तीसगढ़ और ओडिशा जैसे क्षेत्रों में, आदिवासी समूहों ने विरोध प्रदर्शन आयोजित किए, औपनिवेशिक बुनियादी ढांचे को बाधित किया, और भूमिगत स्वतंत्रता सेनानियों को समर्थन प्रदान किया। उनकी भागीदारी न केवल राष्ट्रवादी भावना से प्रेरित थी, बल्कि ब्रिटिश शासन के तहत वन कानूनों, भूमि अलगाव और आर्थिक शोषण के खिलाफ उनके चल रहे संघर्षों से भी प्रेरित थी। ब्रिटिश प्रतिक्रिया कठोर थी, कई आदिवासी गांवों को सामूहिक दंड का सामना करना पड़ा, लेकिन उनके योगदान ने भारत के स्वतंत्रता आंदोलन को महत्वपूर्ण गति प्रदान की।",

    "Jharkhand Movement": "झारखंड आंदोलन",
    "Movement for tribal autonomy and separate statehood in eastern India.":
      "पूर्वी भारत में आदिवासी स्वायत्तता और अलग राज्य के लिए आंदोलन।",
    "Movement banners": "आंदोलन बैनर",
    "Tribal declarations": "आदिवासी घोषणाएँ",
    "Documentary photographs": "वृत्तचित्र फोटोग्राफ",
    "The Jharkhand Movement intensified in the 1970s as a struggle for tribal autonomy, cultural preservation, and separate statehood in what was then part of Bihar. Led by tribal intellectuals and activists like Jaipal Singh Munda, the movement highlighted the marginalization of Adivasi communities and exploitation of tribal-dominated regions rich in mineral resources. The movement combined political activism, cultural renaissance, and grassroots mobilization to demand recognition of tribal rights and aspirations. After decades of persistent struggle, Jharkhand was finally carved out as a separate state in 2000, representing a significant victory for tribal self-determination and identity.":
      "झारखंड आंदोलन 1970 के दशक में आदिवासी स्वायत्तता, सांस्कृतिक संरक्षण और अलग राज्य के लिए संघर्ष के रूप में तेज हो गया, जो तब बिहार का हिस्सा था। जयपाल सिंह मुंडा जैसे आदिवासी बुद्धिजीवियों और कार्यकर्ताओं के नेतृत्व में, आंदोलन ने आदिवासी समुदायों के हाशिए पर होने और खनिज संसाधनों से समृद्ध आदिवासी-प्रधान क्षेत्रों के शोषण पर प्रकाश डाला। आंदोलन ने आदिवासी अधिकारों और आकांक्षाओं की मान्यता की मांग के लिए राजनीतिक सक्रियता, सांस्कृतिक पुनर्जागरण और जमीनी स्तर पर जुटाव को जोड़ा। दशकों के लगातार संघर्ष के बाद, 2000 में झारखंड को अंततः एक अलग राज्य के रूप में बनाया गया, जो आदिवासी आत्मनिर्णय और पहचान के लिए एक महत्वपूर्ण जीत का प्रतिनिधित्व करता है।",

    "Narmada Bachao Andolan": "नर्मदा बचाओ आंदोलन",
    "Resistance against displacement due to dam projects.":
      "बांध परियोजनाओं के कारण विस्थापन के खिलाफ प्रतिरोध।",
    "Protest art": "विरोध कला",
    "Medha Patkar's journals": "मेधा पाटकर की डायरियां",
    "Environmental impact reports": "पर्यावरणीय प्रभाव रिपोर्ट",
    "The Narmada Bachao Andolan (Save Narmada Movement) gained significant momentum around 2000 as a powerful example of tribal communities fighting for their rights against displacement caused by large dam projects. Led by activist Medha Patkar, the movement represented the struggle of Adivasi communities in the Narmada Valley who faced submergence of their ancestral lands due to the Sardar Sarovar Dam and other projects. Beyond opposing displacement, the movement raised fundamental questions about development models, environmental justice, and the rights of indigenous peoples. Despite facing considerable opposition from state authorities, the movement achieved significant victories including better rehabilitation policies and international recognition of the rights of people displaced by development projects.":
      "नर्मदा बचाओ आंदोलन (नर्मदा बचाओ आंदोलन) ने 2000 के आसपास महत्वपूर्ण गति प्राप्त की, जो बड़े बांध परियोजनाओं के कारण विस्थापन के खिलाफ अपने अधिकारों के लिए लड़ने वाले आदिवासी समुदायों के एक शक्तिशाली उदाहरण के रूप में उभरा। कार्यकर्ता मेधा पाटकर के नेतृत्व में, आंदोलन ने नर्मदा घाटी में आदिवासी समुदायों के संघर्ष का प्रतिनिधित्व किया, जिन्हें सरदार सरोवर बांध और अन्य परियोजनाओं के कारण अपनी पैतृक भूमि के डूबने का सामना करना पड़ा। विस्थापन का विरोध करने के अलावा, आंदोलन ने विकास मॉडल, पर्यावरणीय न्याय और स्वदेशी लोगों के अधिकारों के बारे में मौलिक प्रश्न उठाए। राज्य अधिकारियों से काफी विरोध का सामना करने के बावजूद, आंदोलन ने महत्वपूर्ण जीत हासिल की, जिसमें बेहतर पुनर्वास नीतियां और विकास परियोजनाओं से विस्थापित लोगों के अधिकारों की अंतरराष्ट्रीय मान्यता शामिल है।",

    // Additional Timeline UI elements
    "Led by Halba tribes against British colonial rule in Central India.":
      "मध्य भारत में ब्रिटिश औपनिवेशिक शासन के खिलाफ हल्बा जनजातियों के नेतृत्व में।",
    "A major tribal uprising in Bastar region against exploitation.":
      "शोषण के खिलाफ बस्तर क्षेत्र में एक प्रमुख आदिवासी विद्रोह।",
    "Tribal weapons": "आदिवासी हथियार",
    "British records": "ब्रिटिश अभिलेख",
    "Maps of the uprising": "विद्रोह के नक्शे",
    "Traditional drums": "पारंपरिक ढोल",
    "Gond paintings": "गोंड चित्रकला",
    "Revolutionary letters": "क्रांतिकारी पत्र",
    "The Halba Rebellion of 1830 was a significant uprising led by the Halba tribal communities against the oppressive policies of the British East India Company. The rebellion was sparked by excessive taxation, land appropriation, and the erosion of traditional tribal autonomy. Led by tribal chieftain Shambu Singh, the Halbas organized a formidable resistance that lasted several months before being suppressed by British forces. Despite its ultimate defeat, the rebellion marked an important early instance of organized tribal resistance against colonial rule in Central India.":
      "1830 का हल्बा विद्रोह ब्रिटिश ईस्ट इंडिया कंपनी की दमनकारी नीतियों के खिलाफ हल्बा आदिवासी समुदायों के नेतृत्व में एक महत्वपूर्ण विद्रोह था। अत्यधिक कराधान, भूमि अधिग्रहण और पारंपरिक आदिवासी स्वायत्तता के क्षरण के कारण विद्रोह भड़क उठा। आदिवासी मुखिया शंभू सिंह के नेतृत्व में, हल्बाओं ने एक सशक्त प्रतिरोध का आयोजन किया जो ब्रिटिश बलों द्वारा दबाए जाने से पहले कई महीनों तक चला। अंतिम हार के बावजूद, विद्रोह ने मध्य भारत में औपनिवेशिक शासन के खिलाफ संगठित आदिवासी प्रतिरोध के एक महत्वपूर्ण प्रारंभिक उदाहरण को चिह्नित किया।",
    "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, was a major uprising by the indigenous tribal communities of Bastar region against British colonial rule and exploitation by local authorities. The uprising, led by tribal leader Gunda Dhur, was sparked by a series of policies that threatened tribal lands, cultural practices, and autonomy. The revolt witnessed participation from multiple tribal groups including Muria, Maria, and Bhattra communities who united against their oppressors. British authorities responded with brutal force, eventually suppressing the rebellion, but the Bhumkal Revolt remains a powerful symbol of indigenous resistance and is commemorated to this day.":
      "1910 का भूमकाल विद्रोह, जिसे बस्तर विद्रोह के नाम से भी जाना जाता है, बस्तर क्षेत्र के स्वदेशी आदिवासी समुदायों द्वारा ब्रिटिश औपनिवेशिक शासन और स्थानीय अधिकारियों द्वारा शोषण के खिलाफ एक प्रमुख विद्रोह था। आदिवासी नेता गुंडा धुर के नेतृत्व में विद्रोह, नीतियों की एक श्रृंखला से प्रेरित था जिसने आदिवासी भूमि, सांस्कृतिक प्रथाओं और स्वायत्तता को खतरे में डाल दिया था। विद्रोह में मुरिया, मारिया और भत्रा समुदायों सहित कई आदिवासी समूहों की भागीदारी देखी गई, जो अपने अत्याचारियों के खिलाफ एकजुट हुए थे। ब्रिटिश अधिकारियों ने क्रूर बल के साथ जवाब दिया, अंततः विद्रोह को दबा दिया, लेकिन भूमकाल विद्रोह स्वदेशी प्रतिरोध का एक शक्तिशाली प्रतीक बना हुआ है और आज भी इसका स्मरण किया जाता है।",

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

    // Additional translations
    freedom: "स्वतंत्रता",
    fighterMuseum: "सेनानी संग्रहालय",
    tribalJourneyText:
      "समय के माध्यम से यात्रा करें और स्वदेशी समुदायों की जीवंत संस्कृति और लचीले आत्मा का अनुभव करें",
    freedomJourneyText:
      "वीर स्वतंत्रता सेनानियों की प्रेरणादायक कहानियों और बलिदानों की खोज करें जिन्होंने हमारे राष्ट्र के इतिहास को आकार दिया",
    exploreMuseum: "संग्रहालय देखें",
    scrollDown: "नीचे स्क्रॉल करें",

    // Additional translations for Home.js
    "Share Your Experience": "अपना अनुभव साझा करें",
    "We Value Your Feedback": "हम आपकी प्रतिक्रिया का सम्मान करते हैं",
    "Your thoughts about our museums help us improve the experience for everyone. Share what you enjoyed, what moved you, or what you learned during your visit.":
      "हमारे संग्रहालयों के बारे में आपके विचार सभी के लिए अनुभव को बेहतर बनाने में हमारी मदद करते हैं। साझा करें कि आपने क्या आनंद लिया, आपको क्या प्रभावित किया, या आपने अपनी यात्रा के दौरान क्या सीखा।",
    "Write a Review": "समीक्षा लिखें",
    "Begin Journey": "यात्रा शुरू करें",

    // Museum descriptions
    "Explore the rich cultural heritage of indigenous tribal communities through artifacts, art, and stories.":
      "कलाकृतियों, कला और कहानियों के माध्यम से स्वदेशी आदिवासी समुदायों की समृद्ध सांस्कृतिक विरासत का अन्वेषण करें।",
    "Discover the powerful stories of courage and resistance in the struggle for independence.":
      "स्वतंत्रता के संघर्ष में साहस और प्रतिरोध की शक्तिशाली कहानियों का पता लगाएं।",

    // Reviews and testimonials
    "The tribal artifacts exhibition was breathtaking. I gained a new appreciation for indigenous craftsmanship and cultural heritage.":
      "आदिवासी कलाकृति प्रदर्शनी अद्भुत थी। मुझे स्वदेशी कारीगरी और सांस्कृतिक विरासत के लिए एक नई सराहना मिली।",
    "The Freedom Fighters Museum tells such powerful stories. Every Indian should visit to understand our struggle for independence.":
      "स्वतंत्रता सेनानी संग्रहालय ऐसी शक्तिशाली कहानियां बताता है। स्वतंत्रता के हमारे संघर्ष को समझने के लिए हर भारतीय को यहां आना चाहिए।",
    "- Priya S.": "- प्रिया एस.",
    "- Rahul M.": "- राहुल एम.",

    // Statistics Section
    "Discover Our Impact": "हमारे प्रभाव को जानें",
    "Years Preserving Heritage": "वर्षों से विरासत का संरक्षण",
    "Unique Artifacts": "अद्वितीय कलाकृतियां",
    "Annual Visitors": "वार्षिक आगंतुक",
    "Cultural Programs": "सांस्कृतिक कार्यक्रम",
    "Our museum stands as a testament to the resilience and richness of indigenous cultures and freedom movements that have shaped our nation. Each year, we continue to expand our collection and reach, bringing these important stories to wider audiences.":
      "हमारा संग्रहालय स्वदेशी संस्कृतियों की लचीलापन और समृद्धि और स्वतंत्रता आंदोलनों का प्रमाण है जिन्होंने हमारे राष्ट्र को आकार दिया है। प्रत्येक वर्ष, हम अपने संग्रह और पहुंच का विस्तार करते हैं, इन महत्वपूर्ण कहानियों को व्यापक दर्शकों तक पहुंचाते हैं।",

    // CTA section additional text
    Discover: "खोजें",
    Connect: "जुड़ें",
    Preserve: "संरक्षण करें",
    "Our Approach": "हमारा दृष्टिकोण",
    "We believe in creating immersive, educational experiences that honor the legacy of our ancestors while engaging with contemporary issues.":
      "हम ऐसे इमर्सिव, शैक्षिक अनुभव बनाने में विश्वास करते हैं जो हमारे पूर्वजों की विरासत का सम्मान करते हुए समकालीन मुद्दों से जुड़ते हैं।",
    "Join us in preserving and celebrating our shared heritage.":
      "हमारी साझा विरासत के संरक्षण और उत्सव में हमारे साथ जुड़ें।",
    "Learn More": "और जानें",
    "Together, we can ensure these stories live on for generations to come.":
      "साथ मिलकर, हम सुनिश्चित कर सकते हैं कि ये कहानियां आने वाली पीढ़ियों के लिए जीवित रहें।",
    "Get Involved": "शामिल हों",

    // Museum pages translations
    "Museum Hours": "संग्रहालय का समय",
    "Admission Fees": "प्रवेश शुल्क",
    Location: "स्थान",
    Adults: "वयस्क",
    "Students & Seniors": "छात्र और वरिष्ठ नागरिक",
    "Children (under 12)": "बच्चे (12 वर्ष से कम)",
    Members: "सदस्य",
    Free: "निःशुल्क",
    "Tuesday - Friday: 10:00 AM - 6:00 PM":
      "मंगलवार - शुक्रवार: सुबह 10:00 बजे - शाम 6:00 बजे",
    "Saturday - Sunday: 9:00 AM - 7:00 PM":
      "शनिवार - रविवार: सुबह 9:00 बजे - शाम 7:00 बजे",
    "Monday: Closed": "सोमवार: बंद",

    // Tribal Museum Page
    "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.":
      "एक ऐसी दुनिया में कदम रखें जहां प्राचीन परंपराएं जीवंत हो उठती हैं। हमारा आदिवासी विरासत संग्रहालय स्वदेशी समुदायों के समृद्ध सांस्कृतिक ताने-बाने का जश्न मनाता है, उनके ज्ञान, कला और कहानियों को आने वाली पीढ़ियों के लिए संरक्षित करता है। सावधानीपूर्वक क्यूरेट की गई प्रदर्शनियों के माध्यम से, हम आपको आदिवासी लोगों और उनके प्राकृतिक वातावरण, उनकी आध्यात्मिक मान्यताओं और उनकी अनूठी कलात्मक अभिव्यक्तियों के बीच गहरे संबंध की खोज करने के लिए आमंत्रित करते हैं।",

    "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.":
      "हमारे संग्रह में 10,000 से अधिक सावधानीपूर्वक संरक्षित कलाकृतियां हैं, जिनमें से प्रत्येक स्वदेशी विरासत की एक अनूठी कहानी बताती है। जटिल रूप से निर्मित अनुष्ठानिक मुखौटों और पारंपरिक हथियारों से लेकर चिकित्सीय जड़ी-बूटियों और वाद्य यंत्रों तक, हर वस्तु आदिवासी समुदायों की प्रतिभा, आध्यात्मिकता और कलात्मक अभिव्यक्ति का प्रतिनिधित्व करती है। विशेष प्रदर्शनियां टिकाऊ प्रथाओं पर प्रकाश डालती हैं जिन्होंने इन संस्कृतियों को हजारों वर्षों से प्रकृति के साथ सामंजस्य में फलने-फूलने की अनुमति दी है।",

    "Visiting Experience": "आगंतुक अनुभव",

    "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.":
      "हमारी इंटरैक्टिव प्रदर्शनियों, सांस्कृतिक प्रदर्शनों और शैक्षिक कार्यक्रमों के माध्यम से स्वदेशी लोगों की जीवंत परंपराओं में खुद को डुबोएं। पारंपरिक शिल्प तकनीकों को देखें, कहानी सुनाने के सत्रों में भाग लें और आदिवासी संगीत की लयबद्ध शक्ति का अनुभव करें। हमारे जानकार गाइड, जिनमें से कई खुद आदिवासी समुदायों से हैं, ऐसी अंतर्दृष्टि प्रदान करते हैं जो हर कलाकृति और कहानी को जीवंत बनाती है।",

    // Tribal Gallery Page
    Galleries: "गैलरीज़",

    "Our specialized galleries offer immersive experiences into different aspects of tribal life and culture. Each carefully curated space presents artifacts within their cultural context, allowing visitors to gain deeper insights into the significance and stories behind these remarkable objects.":
      "हमारी विशेष गैलरियां आदिवासी जीवन और संस्कृति के विभिन्न पहलुओं में इमर्सिव अनुभव प्रदान करती हैं। प्रत्येक सावधानीपूर्वक क्यूरेट किया गया स्थान कलाकृतियों को उनके सांस्कृतिक संदर्भ में प्रस्तुत करता है, जिससे आगंतुकों को इन उल्लेखनीय वस्तुओं के पीछे के महत्व और कहानियों की गहरी जानकारी प्राप्त करने की अनुमति मिलती है।",

    "Explore Gallery →": "गैलरी का अन्वेषण करें →",

    // Tribal Artifacts Page
    "Our Collection": "हमारा संग्रह",

    "Our curated collection features authentic tribal artifacts that showcase the remarkable craftsmanship, cultural significance, and artistic traditions of indigenous communities. Each piece tells a story of heritage, spiritual beliefs, and the profound connection between tribal peoples and their environment.":
      "हमारा क्यूरेटेड संग्रह प्रामाणिक आदिवासी कलाकृतियों को प्रदर्शित करता है जो स्वदेशी समुदायों की उल्लेखनीय कारीगरी, सांस्कृतिक महत्व और कलात्मक परंपराओं को दर्शाता है। प्रत्येक टुकड़ा विरासत, आध्यात्मिक विश्वासों और आदिवासी लोगों और उनके वातावरण के बीच गहरे संबंध की कहानी बताता है।",

    "All Categories": "सभी श्रेणियां",
    Weapons: "हथियार",
    Origin: "उत्पत्ति",
    Age: "काल",
    Materials: "सामग्री",
    Category: "श्रेणी",
    Significance: "महत्व",

    // Freedom Museum Page
    "Freedom Fighter Museum": "स्वतंत्रता सेनानी संग्रहालय",

    "Honor the courage, sacrifices, and unwavering spirit of those who fought for India's independence. Our Freedom Fighter Museum preserves the powerful stories of tribal communities' contributions to the freedom struggle, from organized uprisings against colonial rule to participation in the nationwide movement for liberation.":
      "उन लोगों के साहस, बलिदान और अटल भावना का सम्मान करें जिन्होंने भारत की आजादी के लिए लड़ाई लड़ी। हमारा स्वतंत्रता सेनानी संग्रहालय आजादी के संघर्ष में आदिवासी समुदायों के योगदान की शक्तिशाली कहानियों को संरक्षित करता है, औपनिवेशिक शासन के खिलाफ संगठित विद्रोहों से लेकर मुक्ति के लिए राष्ट्रव्यापी आंदोलन में भागीदारी तक।",

    "Our exhibits document the lesser-known but crucial role of indigenous peoples in shaping India's journey to independence. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore the remarkable intersection of tribal identity and national resistance movements that ultimately led to freedom.":
      "हमारी प्रदर्शनियां भारत की स्वतंत्रता की यात्रा को आकार देने में स्वदेशी लोगों की कम ज्ञात लेकिन महत्वपूर्ण भूमिका का दस्तावेजीकरण करती हैं। मूल कलाकृतियों, ऐतिहासिक दस्तावेजों, तस्वीरों और इंटरैक्टिव प्रदर्शनों के माध्यम से, आगंतुक आदिवासी पहचान और राष्ट्रीय प्रतिरोध आंदोलनों के उल्लेखनीय प्रतिच्छेदन का पता लगा सकते हैं जो अंततः स्वतंत्रता की ओर ले गए।",

    "Spotlight: The Bhumkal Revolt of 1910":
      "स्पॉटलाइट: 1910 का भूमकाल विद्रोह",

    "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of history's most significant tribal uprisings against British colonial rule in India. Led by the charismatic tribal leader Gunda Dhur, this powerful resistance movement united multiple tribal communities including the Muria, Maria, and Bhattra peoples of the Bastar region.":
      "1910 का भूमकाल विद्रोह, जिसे बस्तर विद्रोह के नाम से भी जाना जाता है, भारत में ब्रिटिश औपनिवेशिक शासन के खिलाफ इतिहास के सबसे महत्वपूर्ण आदिवासी विद्रोहों में से एक के रूप में खड़ा है। करिश्माई आदिवासी नेता गुंडा धुर के नेतृत्व में, इस शक्तिशाली प्रतिरोध आंदोलन ने बस्तर क्षेत्र के मुरिया, मारिया और भत्रा समुदायों सहित कई आदिवासी समुदायों को एकजुट किया।",

    "Sparked by exploitative taxation, forced labor, and restrictions on traditional forest rights, the revolt spread rapidly across Bastar. The tribal warriors, armed primarily with traditional weapons, mounted fierce attacks on colonial outposts and successfully disrupted British control of the region for several months. Though eventually suppressed through brutal military force, the Bhumkal Revolt remains a testament to indigenous resistance and is commemorated annually as a symbol of tribal identity and courage.":
      "शोषणकारी कराधान, जबरन श्रम और पारंपरिक वन अधिकारों पर प्रतिबंधों से प्रेरित होकर, विद्रोह बस्तर में तेजी से फैल गया। मुख्य रूप से पारंपरिक हथियारों से लैस आदिवासी योद्धाओं ने औपनिवेशिक चौकियों पर जबरदस्त हमले किए और कई महीनों तक क्षेत्र पर ब्रिटिश नियंत्रण को सफलतापूर्वक बाधित किया। हालांकि अंततः क्रूर सैन्य बल के माध्यम से दबा दिया गया, भूमकाल विद्रोह स्वदेशी प्रतिरोध का एक प्रमाण बना हुआ है और इसे आदिवासी पहचान और साहस के प्रतीक के रूप में प्रतिवर्ष मनाया जाता है।",

    "The struggle for freedom by indigenous communities spans centuries, with organized resistance movements arising in response to colonial encroachment on tribal lands, cultures, and autonomy. Each uprising represents a crucial chapter in the story of indigenous resilience and self-determination.":
      "स्वदेशी समुदायों द्वारा स्वतंत्रता के लिए संघर्ष सदियों तक फैला है, जिसमें आदिवासी भूमि, संस्कृतियों और स्वायत्तता पर औपनिवेशिक अतिक्रमण के जवाब में संगठित प्रतिरोध आंदोलन उत्पन्न हुए। प्रत्येक विद्रोह स्वदेशी लचीलेपन और आत्मनिर्णय की कहानी में एक महत्वपूर्ण अध्याय का प्रतिनिधित्व करता है।",

    // Museum page navigation
    "Visiting the Museum": "संग्रहालय भ्रमण",
    "Our Freedom Fighter Museum offers an immersive journey through the courageous struggles of tribal communities fighting for sovereignty and dignity. Through artifacts, historical documents, photographs, and first-hand accounts, we honor the sacrifices made in the pursuit of independence.":
      "हमारा स्वतंत्रता सेनानी संग्रहालय संप्रभुता और गरिमा के लिए लड़ने वाले आदिवासी समुदायों के साहसिक संघर्षों के माध्यम से एक इमर्सिव यात्रा प्रदान करता है। कलाकृतियों, ऐतिहासिक दस्तावेजों, तस्वीरों और प्रत्यक्ष विवरणों के माध्यम से, हम स्वतंत्रता की खोज में किए गए बलिदानों का सम्मान करते हैं।",
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
