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
    "Department of Tribal Department": "Department of Tribal Department",
    "Department of Scheduled Caste Department":
      "Department of Scheduled Caste Department",
    "Department of Backword Classes and minorities Development":
      "Department of Backward Classes and Minorities Development",

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
      "Step into the captivating world of tribal heritage at our museum. Located in Naya Raipur, the Tribal Freedom Fighter Museum celebrates the rich history, culture, and struggles of India's indigenous communities during the freedom movement.",
    "Open Tuesday through Sunday":
      "Open Tuesday through Sunday, 10:00 AM to 6:00 PM",
    "123 Heritage Avenue":
      "Tribal Freedom Fighter Museum, Sector 24, Naya Raipur, Chhattisgarh 492101",
    "contact@tribalmuseum.org": "info@tribalmuseum.org",
    "+1 (555) 123-4567": "+91 771-2242181",
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
      "The National Tribal Freedom Fighter Museum in Naya Raipur celebrates the contributions of tribal communities to India's freedom struggle. Inaugurated in 2023, this museum preserves and showcases the heroic stories of tribal freedom fighters who fought against colonial oppression across different regions of India.",
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
    copyright: "Tribal Heritage Museum. All rights reserved.",

    // Additional translations
    freedom: "Freedom",
    fighterMuseum: "Fighter Museum",
    tribalJourneyText:
      "Journey through time and experience the vibrant culture and resilient spirit of indigenous communities",
    freedomJourneyText:
      "Discover the inspiring stories and sacrifices of brave freedom fighters who shaped our nation's destiny",
    exploreMuseum: "Explore Museum",
    scrollDown: "Scroll Down",

    // Freedom Museum Page
    "Freedom Fighter Museum": "Tribal Freedom Fighter Museum",

    "Honor the courage, sacrifices, and unwavering spirit of those who fought for India's independence. Our Freedom Fighter Museum preserves the powerful stories of tribal communities' contributions to the freedom struggle, from organized uprisings against colonial rule to participation in the nationwide movement for liberation.":
      "Honor the courage, sacrifices, and unwavering spirit of tribal freedom fighters who fought for India's independence. The National Tribal Freedom Fighter Museum in Naya Raipur is dedicated to preserving and showcasing the rich history of tribal resistance against colonial oppression and their substantial contributions to India's freedom struggle.",

    "Our exhibits document the lesser-known but crucial role of indigenous peoples in shaping India's journey to independence. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore the remarkable intersection of tribal identity and national resistance movements that ultimately led to freedom.":
      "Our exhibits document the lesser-known but crucial role of tribal communities in shaping India's journey to independence. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore the remarkable contributions of tribal leaders like Birsa Munda, Komaram Bheem, Tantya Bhil, and many others who sacrificed their lives for freedom.",

    "Spotlight: The Bhumkal Revolt of 1910":
      "Spotlight: The Bhumkal Revolt of 1910",

    "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of history's most significant tribal uprisings against British colonial rule in India. Led by the charismatic tribal leader Gunda Dhur, this powerful resistance movement united multiple tribal communities including the Muria, Maria, and Bhattra peoples of the Bastar region.":
      "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of the most significant tribal uprisings in Chhattisgarh's history against British colonial rule. Led by the courageous tribal leader Gunda Dhur from the Muria community, this powerful resistance movement united diverse tribes including Muria, Maria, Dhruva, Dorla and Halba communities across the Bastar region.",

    "Sparked by exploitative taxation, forced labor, and restrictions on traditional forest rights, the revolt spread rapidly across Bastar. The tribal warriors, armed primarily with traditional weapons, mounted fierce attacks on colonial outposts and successfully disrupted British control of the region for several months. Though eventually suppressed through brutal military force, the Bhumkal Revolt remains a testament to indigenous resistance and is commemorated annually as a symbol of tribal identity and courage.":
      "The revolt was sparked by exploitation under colonial forest policies, land alienation, forced labor (begari), excessive taxation, and restrictions on traditional rights. On February 2, 1910, thousands of tribal people armed with traditional weapons like bows, arrows, axes, and spears marched to Jagdalpur to protest. When British forces opened fire, the peaceful protest transformed into armed resistance. Though eventually suppressed, the Bhumkal Revolt symbolizes the indomitable spirit of tribal resistance against colonial oppression and is commemorated annually on February 10 as 'Bhumkal Diwas' in Chhattisgarh.",

    // Additional museum-specific content
    "The National Tribal Freedom Fighter Museum in Naya Raipur honors the significant contributions of India's tribal communities to the freedom struggle. This museum showcases the brave resistance of tribal leaders against colonial oppression through a rich collection of artifacts, photographs, and interactive exhibits that tell their powerful stories of courage and sacrifice.":
      "नया रायपुर में राष्ट्रीय आदिवासी स्वतंत्रता सेनानी संग्रहालय स्वतंत्रता संग्राम में भारत के आदिवासी समुदायों के महत्वपूर्ण योगदान का सम्मान करता है। यह संग्रहालय कलाकृतियों, तस्वीरों और इंटरैक्टिव प्रदर्शनों के समृद्ध संग्रह के माध्यम से औपनिवेशिक उत्पीड़न के खिलाफ आदिवासी नेताओं के साहसिक प्रतिरोध को प्रदर्शित करता है जो उनके साहस और बलिदान की शक्तिशाली कहानियां बताते हैं।",

    // Missing translations
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

    "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.":
      "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.",

    "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.":
      "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.",

    "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.":
      "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.",
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
    "Department of Tribal Department": "आदिम जाति विभाग",
    "Department of Scheduled Caste Department": "अनुसूचित जाति विभाग",
    "Department of Backword Classes and minorities Development":
      "पिछड़ा वर्ग एवं अल्पसंख्यक विकास विभाग",

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

    "Spotlight: The Bhumkal Revolt of 1910": "1910 का भूमकाल विद्रोह",

    "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of history's most significant tribal uprisings against British colonial rule in India. Led by the charismatic tribal leader Gunda Dhur, this powerful resistance movement united multiple tribal communities including the Muria, Maria, and Bhattra peoples of the Bastar region.":
      "1910 का भूमकाल विद्रोह, जिसे बस्तर विद्रोह के नाम से भी जाना जाता है, भारत में ब्रिटिश औपनिवेशिक शासन के खिलाफ इतिहास के सबसे महत्वपूर्ण आदिवासी विद्रोहों में से एक है। मुरिया समुदाय के साहसी आदिवासी नेता गुंडा धुर के नेतृत्व में, इस शक्तिशाली प्रतिरोध आंदोलन ने बस्तर क्षेत्र में मुरिया, मारिया, ध्रुवा, डोरला और हल्बा समुदायों सहित विविध जनजातियों को एकजुट किया।",

    "Sparked by exploitative taxation, forced labor, and restrictions on traditional forest rights, the revolt spread rapidly across Bastar. The tribal warriors, armed primarily with traditional weapons, mounted fierce attacks on colonial outposts and successfully disrupted British control of the region for several months. Though eventually suppressed through brutal military force, the Bhumkal Revolt remains a testament to indigenous resistance and is commemorated annually as a symbol of tribal identity and courage.":
      "विद्रोह औपनिवेशिक वन नीतियों, भूमि अलगाव, जबरन श्रम (बेगारी), अत्यधिक कराधान और पारंपरिक अधिकारों पर प्रतिबंध के तहत शोषण से प्रेरित था। 2 फरवरी, 1910 को, हजारों आदिवासी लोग धनुष, तीर, कुल्हाड़ी और भाले जैसे पारंपरिक हथियारों से लैस होकर विरोध प्रदर्शन करने के लिए जगदलपुर पहुंचे। जब ब्रिटिश बलों ने गोलीबारी की, तो शांतिपूर्ण विरोध सशस्त्र प्रतिरोध में बदल गया। हालांकि अंततः दबा दिया गया, भूमकाल विद्रोह औपनिवेशिक उत्पीड़न के खिलाफ आदिवासी प्रतिरोध की अडिग भावना का प्रतीक है और छत्तीसगढ़ में हर साल 10 फरवरी को 'भूमकाल दिवस' के रूप में मनाया जाता है।",

    // Visit section
    "Plan Your Visit": "यात्रा की योजना बनाएं",
    "Step into the captivating world":
      "हमारे संग्रहालय में आदिवासी विरासत की मनमोहक दुनिया में कदम रखें। नया रायपुर में स्थित, आदिवासी स्वतंत्रता सेनानी संग्रहालय स्वतंत्रता आंदोलन के दौरान भारत के स्वदेशी समुदायों के समृद्ध इतिहास, संस्कृति और संघर्षों का जश्न मनाता है।",
    "Open Tuesday through Sunday":
      "मंगलवार से रविवार तक खुला, सुबह 10:00 बजे से शाम 6:00 बजे तक",
    "123 Heritage Avenue":
      "आदिवासी स्वतंत्रता सेनानी संग्रहालय, सेक्टर 24, नया रायपुर, छत्तीसगढ़ 492101",
    "contact@tribalmuseum.org": "info@tribalmuseum.org",
    "+1 (555) 123-4567": "+91 771-2242181",
    "Book Your Ticket": "अपना टिकट बुक करें",
    General: "सामान्य",
    "Guided Tour": "मार्गदर्शित दौरा",
    "Special Event": "विशेष कार्यक्रम",
    "First Name": "प्रथम नाम",
    "Last Name": "अंतिम नाम",
    Email: "ईमेल",
    "Visit Date": "भ्रमण तिथि",
    "Time Slot": "समय स्लॉट",
    "Select...": "चुनें...",
    "Number of Visitors": "आगंतुकों की संख्या",
    "Book Now": "अभी बुक करें",
    "Thank You!": "धन्यवाद!",
    "Your booking has been confirmed":
      "आपकी बुकिंग की पुष्टि हो गई है। आपको शीघ्र ही एक पुष्टिकरण ईमेल प्राप्त होगा।",
    Close: "बंद करें",

    // Footer
    aboutMuseum: "संग्रहालय के बारे में",
    aboutDesc:
      "नया रायपुर में राष्ट्रीय आदिवासी स्वतंत्रता सेनानी संग्रहालय भारत के स्वतंत्रता संग्राम में आदिवासी समुदायों के योगदान का जश्न मनाता है। 2023 में उद्घाटन किया गया, यह संग्रहालय आदिवासी स्वतंत्रता सेनानियों की वीरगाथाओं को संरक्षित और प्रदर्शित करता है जिन्होंने भारत के विभिन्न क्षेत्रों में औपनिवेशिक उत्पीड़न के खिलाफ लड़ाई लड़ी।",
    usefulLinks: "उपयोगी लिंक",
    aboutUs: "हमारे बारे में",
    events: "कार्यक्रम",
    educationalResources: "शैक्षिक संसाधन",
    supportUs: "हमारा समर्थन करें",
    contact: "संपर्क करें",
    visitUs: "हमसे मिलें",
    hours: "समय",
    newsletter: "न्यूज़लेटर",
    newsletterDesc:
      "हमारे न्यूज़लेटर की सदस्यता लें ताकि आपको नई प्रदर्शनियों, कार्यक्रमों और शैक्षिक कार्यक्रमों पर अपडेट प्राप्त हो सके।",
    subscribe: "सदस्यता लें",
    copyright: "आदिवासी विरासत संग्रहालय। सर्वाधिकार सुरक्षित।",

    // Freedom Museum Page
    "Freedom Fighter Museum": "आदिवासी स्वतंत्रता सेनानी संग्रहालय",

    "Honor the courage, sacrifices, and unwavering spirit of those who fought for India's independence. Our Freedom Fighter Museum preserves the powerful stories of tribal communities' contributions to the freedom struggle, from organized uprisings against colonial rule to participation in the nationwide movement for liberation.":
      "उन आदिवासी स्वतंत्रता सेनानियों के साहस, बलिदान और अटल भावना का सम्मान करें जिन्होंने भारत की आज़ादी के लिए लड़ाई लड़ी। नया रायपुर में राष्ट्रीय आदिवासी स्वतंत्रता सेनानी संग्रहालय औपनिवेशिक उत्पीड़न के खिलाफ आदिवासी प्रतिरोध के समृद्ध इतिहास और भारत के स्वतंत्रता संग्राम में उनके महत्वपूर्ण योगदान को संरक्षित और प्रदर्शित करने के लिए समर्पित है।",

    "Our exhibits document the lesser-known but crucial role of indigenous peoples in shaping India's journey to independence. Through original artifacts, historical documents, photographs, and interactive displays, visitors can explore the remarkable intersection of tribal identity and national resistance movements that ultimately led to freedom.":
      "हमारी प्रदर्शनियां भारत की स्वतंत्रता की यात्रा को आकार देने में आदिवासी समुदायों की कम ज्ञात लेकिन महत्वपूर्ण भूमिका का दस्तावेजीकरण करती हैं। मूल कलाकृतियों, ऐतिहासिक दस्तावेजों, तस्वीरों और इंटरैक्टिव प्रदर्शनों के माध्यम से, आगंतुक बिरसा मुंडा, कोमाराम भीम, टंट्या भील और कई अन्य आदिवासी नेताओं के उल्लेखनीय योगदान का पता लगा सकते हैं जिन्होंने स्वतंत्रता के लिए अपने प्रान न्योछावर किए।",

    // Additional museum-specific content
    "The National Tribal Freedom Fighter Museum in Naya Raipur honors the significant contributions of India's tribal communities to the freedom struggle. This museum showcases the brave resistance of tribal leaders against colonial oppression through a rich collection of artifacts, photographs, and interactive exhibits that tell their powerful stories of courage and sacrifice.":
      "नया रायपुर में राष्ट्रीय आदिवासी स्वतंत्रता सेनानी संग्रहालय स्वतंत्रता संग्राम में भारत के आदिवासी समुदायों के महत्वपूर्ण योगदान का सम्मान करता है। यह संग्रहालय कलाकृतियों, तस्वीरों और इंटरैक्टिव प्रदर्शनों के समृद्ध संग्रह के माध्यम से औपनिवेशिक उत्पीड़न के खिलाफ आदिवासी नेताओं के साहसिक प्रतिरोध को प्रदर्शित करता है जो उनके साहस और बलिदान की शक्तिशाली कहानियां बताते हैं।",

    // Missing translations
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

    "Step into a world where ancient traditions come alive. Our Tribal Heritage Museum celebrates the rich cultural tapestry of indigenous communities, preserving their wisdom, art, and stories for future generations. Through carefully curated exhibits, we invite you to explore the profound connection between tribal peoples and their natural environment, their spiritual beliefs, and their unique artistic expressions.":
      "एक ऐसी दुनिया में कदम रखें जहां प्राचीन परंपराएं जीवंत हो उठती हैं। हमारा आदिवासी विरासत संग्रहालय स्वदेशी समुदायों की समृद्ध सांस्कृतिक विरासत का जश्न मनाता है, उनके ज्ञान, कला और कहानियों को भावी पीढ़ियों के लिए संरक्षित करता है। सावधानीपूर्वक तैयार की गई प्रदर्शनियों के माध्यम से, हम आपको आदिवासी समुदायों और उनके प्राकृतिक वातावरण, उनकी आध्यात्मिक मान्यताओं और उनकी अनूठी कलात्मक अभिव्यक्तियों के बीच गहरे संबंध का पता लगाने के लिए आमंत्रित करते हैं।",

    "Our collection features over 10,000 carefully preserved artifacts, each telling a unique story of indigenous heritage. From intricately crafted ceremonial masks and traditional weapons to healing herbs and musical instruments, every item represents the ingenuity, spirituality, and artistic expression of tribal communities. Special exhibits highlight the sustainable practices that have allowed these cultures to thrive in harmony with nature for thousands of years.":
      "हमारे संग्रह में 10,000 से अधिक सावधानीपूर्वक संरक्षित कलाकृतियां हैं, जिनमें से प्रत्येक स्वदेशी विरासत की एक अनूठी कहानी बताती है। जटिलता से बनाए गए अनुष्ठानिक मुखौटों और पारंपरिक हथियारों से लेकर चिकित्सीय जड़ी-बूटियों और संगीत वाद्ययंत्रों तक, हर वस्तु आदिवासी समुदायों की प्रतिभा, आध्यात्मिकता और कलात्मक अभिव्यक्ति का प्रतिनिधित्व करती है। विशेष प्रदर्शनियां उन टिकाऊ प्रथाओं पर प्रकाश डालती हैं जिन्होंने इन संस्कृतियों को हजारों वर्षों से प्रकृति के साथ सामंजस्य में फलने-फूलने की अनुमति दी है।",

    "Immerse yourself in the vibrant traditions of indigenous peoples through our interactive exhibits, cultural demonstrations, and educational programs. Witness traditional crafting techniques, participate in storytelling sessions, and experience the rhythmic power of tribal music. Our knowledgeable guides, many from tribal communities themselves, offer insights that bring each artifact and story to life.":
      "हमारी इंटरैक्टिव प्रदर्शनियों, सांस्कृतिक प्रदर्शनों और शैक्षिक कार्यक्रमों के माध्यम से स्वदेशी लोगों की जीवंत परंपराओं में खुद को डुबोएं। पारंपरिक शिल्प तकनीकों को देखें, कहानी सुनाने के सत्रों में भाग लें, और आदिवासी संगीत की लयबद्ध शक्ति का अनुभव करें। हमारे जानकार गाइड, जिनमें से कई स्वयं आदिवासी समुदायों से हैं, ऐसी अंतर्दृष्टि प्रदान करते हैं जो प्रत्येक कलाकृति और कहानी को जीवंत बनाती है।",

    // Gallery page translations
    "Our specialized galleries chronicle pivotal moments in tribal resistance history, showcasing the extraordinary courage and determination of indigenous communities in their fight for freedom, dignity, and autonomy. Each carefully curated exhibit combines historical artifacts, documentary evidence, and personal testimonies to reveal these powerful yet often overlooked chapters in the struggle against colonialism.":
      "हमारी विशेष प्रदर्शनियाँ आदिवासी प्रतिरोध इतिहास के महत्वपूर्ण क्षणों का वर्णन करती हैं, स्वतंत्रता, गरिमा और स्वायत्तता के लिए संघर्ष में स्वदेशी समुदायों के असाधारण साहस और दृढ़ता को प्रदर्शित करती हैं। प्रत्येक सावधानीपूर्वक तैयार की गई प्रदर्शनी ऐतिहासिक कलाकृतियों, प्रलेखित साक्ष्य और व्यक्तिगत गवाहियों को जोड़ती है जो औपनिवेशवाद के खिलाफ संघर्ष में इन शक्तिशाली लेकिन अक्सर अनदेखे अध्यायों को उजागर करती हैं।",

    "Explore Gallery": "प्रदर्शनी का अन्वेषण करें",

    // Gallery titles
    "Halba Rebellion (1830)": "हल्बा विद्रोह (1830)",
    "Bhumkal Revolt (1910)": "भूमकाल विद्रोह (1910)",
    "Tribal Participation in Quit India Movement (1942)":
      "भारत छोड़ो आंदोलन में आदिवासी भागीदारी (1942)",
    "Jharkhand Movement (1970s)": "झारखंड आंदोलन (1970 का दशक)",
    "Narmada Bachao Andolan (2000s)": "नर्मदा बचाओ आंदोलन (2000 का दशक)",

    // Gallery locations
    "Central India": "मध्य भारत",
    "Bastar Region": "बस्तर क्षेत्र",
    "Multiple regions": "कई क्षेत्र",
    "Eastern India": "पूर्वी भारत",
    "Narmada Valley": "नर्मदा घाटी",

    // Gallery durations
    "Several months": "कई महीने",
    "Over 6 months": "6 महीने से अधिक",
    "1942-1945": "1942-1945",
    "Over 30 years": "30 वर्षों से अधिक",
    "Ongoing since 1985": "1985 से जारी",

    // Gallery descriptions
    "The Halba Rebellion marked one of the earliest organized tribal resistances against British colonial rule in Central India. Led by tribal chieftain Shambu Singh, the Halba tribes rose up against excessive taxation, land appropriation, and the erosion of traditional tribal autonomy imposed by the British East India Company. This gallery showcases rare artifacts, maps, and accounts from this pivotal uprising that, despite its ultimate defeat, set a powerful precedent for indigenous resistance.":
      "हल्बा विद्रोह मध्य भारत में ब्रिटिश औपनिवेशिक शासन के खिलाफ सबसे पहले संगठित आदिवासी प्रतिरोध में से एक था। आदिवासी मुखिया शंभू सिंह के नेतृत्व में, हल्बा जनजातियां ब्रिटिश ईस्ट इंडिया कंपनी द्वारा लगाए गए अत्यधिक कराधान, भूमि अधिग्रहण, और पारंपरिक आदिवासी स्वायत्तता के क्षरण के खिलाफ उठ खड़ी हुईं। यह गैलरी इस महत्वपूर्ण विद्रोह से दुर्लभ कलाकृतियों, मानचित्रों और वृतांतों को प्रदर्शित करती है, जो अपनी अंतिम हार के बावजूद, स्वदेशी प्रतिरोध के लिए एक शक्तिशाली उदाहरण स्थापित किया।",

    "The Bhumkal Revolt of 1910, also known as the Bastar Rebellion, stands as one of the most significant tribal uprisings in Indian history. Led by tribal leader Gunda Dhur, this powerful movement united the Muria, Maria, and Bhattra communities against British colonial exploitation. Our gallery features original photographs, traditional weapons, and firsthand accounts that bring to life this extraordinary chapter of indigenous resistance that continues to inspire tribal identity and pride.":
      "1910 का भूमकाल विद्रोह, जिसे बस्तर विद्रोह के नाम से भी जाना जाता है, भारतीय इतिहास में सबसे महत्वपूर्ण आदिवासी विद्रोहों में से एक के रूप में खड़ा है। आदिवासी नेता गुंडा धुर के नेतृत्व में, इस शक्तिशाली आंदोलन ने ब्रिटिश औपनिवेशिक शोषण के खिलाफ मुरिया, मारिया और भत्रा समुदायों को एकजुट किया। हमारी गैलरी में मूल तस्वीरें, पारंपरिक हथियार और प्रत्यक्षदर्शी खाते शामिल हैं जो स्वदेशी प्रतिरोध के इस असाधारण अध्याय को जीवंत करते हैं जो आदिवासी पहचान और गौरव को प्रेरित करना जारी रखता है।",

    "During the pivotal Quit India Movement of 1942, tribal communities across India made significant but often overlooked contributions to the independence struggle. This exhibit documents how indigenous groups in Jharkhand, Chhattisgarh, and Odisha organized protests, disrupted colonial infrastructure, and provided crucial support to underground freedom fighters. Displays include protest flags, correspondence between tribal leaders and national movement figures, and oral histories collected from movement participants.":
      "1942 के निर्णायक भारत छोड़ो आंदोलन के दौरान, भारत भर के आदिवासी समुदायों ने स्वतंत्रता संग्राम में महत्वपूर्ण लेकिन अक्सर अनदेखी योगदान दिया। यह प्रदर्शनी दस्तावेज करती है कि कैसे झारखंड, छत्तीसगढ़ और ओडिशा में स्वदेशी समूहों ने विरोध प्रदर्शन आयोजित किए, औपनिवेशिक बुनियादी ढांचे को बाधित किया, और भूमिगत स्वतंत्रता सेनानियों को महत्वपूर्ण समर्थन प्रदान किया। प्रदर्शनों में विरोध ध्वज, आदिवासी नेताओं और राष्ट्रीय आंदोलन के प्रमुखों के बीच पत्राचार, और आंदोलन प्रतिभागियों से एकत्रित मौखिक इतिहास शामिल हैं।",

    "The Jharkhand Movement represents one of the most successful campaigns for tribal autonomy in modern India. This gallery chronicles the decades-long struggle led by tribal intellectuals and activists demanding recognition of Adivasi rights and separate statehood. Through photographs, movement banners, newspaper clippings, and video testimonials, visitors witness the remarkable journey that culminated in the formation of Jharkhand state in 2000, securing a historic victory for tribal self-determination.":
      "झारखंड आंदोलन आधुनिक भारत में आदिवासी स्वायत्तता के लिए सबसे सफल अभियानों में से एक का प्रतिनिधित्व करता है। यह गैलरी आदिवासी अधिकारों और अलग राज्य की मांग के लिए आदिवासी बुद्धिजीवियों और कार्यकर्ताओं के नेतृत्व में दशकों लंबे संघर्ष का इतिहास बताती है। तस्वीरों, आंदोलन बैनरों, अखबारों की कतरनों और वीडियो गवाहियों के माध्यम से, आगंतुक उस उल्लेखनीय यात्रा को देखते हैं जिसका परिणाम 2000 में झारखंड राज्य के गठन के रूप में हुआ, जिससे आदिवासी आत्मनिर्णय के लिए एक ऐतिहासिक जीत सुरक्षित हुई।",

    "The Narmada Bachao Andolan (Save Narmada Movement) represents a powerful modern example of tribal communities fighting against displacement and environmental injustice. This exhibit documents how Adivasi peoples in the Narmada Valley organized to protect their ancestral lands from submergence by large dam projects. Through protest art, activist journals, documentary photographs, and interactive displays, visitors engage with this ongoing struggle that has raised global awareness about indigenous rights and environmental justice.":
      "नर्मदा बचाओ आंदोलन विस्थापन और पर्यावरणीय अन्याय के खिलाफ लड़ने वाले आदिवासी समुदायों का एक शक्तिशाली आधुनिक उदाहरण है। यह प्रदर्शनी दर्शाती है कि कैसे नर्मदा घाटी के आदिवासी लोगों ने बड़े बांध परियोजनाओं द्वारा अपनी पैतृक भूमि को डूबने से बचाने के लिए संगठित किया। विरोध कला, कार्यकर्ता पत्रिकाओं, वृत्तचित्र तस्वीरों और इंटरैक्टिव प्रदर्शनों के माध्यम से, आगंतुक इस चल रहे संघर्ष के साथ जुड़ते हैं जिसने स्वदेशी अधिकारों और पर्यावरणीय न्याय के बारे में वैश्विक जागरूकता बढ़ाई है।",
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
