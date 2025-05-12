import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import backgroundImage from "../assets/RUID75f5bbabcf5843eda2d9fafa639f5b56.jpg";

const PageContainer = styled.div`
  background-image: linear-gradient(rgba(155, 119, 89, 0.85), rgba(169, 130, 99, 0.85)), 
                    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #f5efe7; /* Changed from #fff to a softer off-white for better reading */
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 40vh;
  background-image: url(/assets/forest-bg.jpg);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-top: 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color:rgb(0, 0, 0);
  font-size: 3.5rem;
  margin-bottom: 30px;
  margin-top: 140px;
  text-align: center;
  font-family: "Playfair Display", serif;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  line-height: 1.8;
  margin-bottom: 30px;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 50px;
  text-align: center;
`;

const PlacesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin: 50px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceCard = styled(motion.div)`
  background: rgba(42, 35, 28, 0.5);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  border: 1px solid rgba(211, 161, 100, 0.2);

  &:hover {
    transform: translateY(-10px);
    border-color: rgba(211, 161, 100, 0.5);
  }
`;

const PlaceImage = styled.div`
  height: 200px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, rgba(42, 35, 28, 0.8), transparent);
  }
`;

const PlaceInfo = styled.div`
  padding: 25px;
`;

const PlaceTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-family: "Playfair Display", serif;
`;

const PlaceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const PlaceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const PlaceDistance = styled.span`
  background: rgba(211, 161, 100, 0.2);
  color: #d3a164;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const DirectionsLink = styled.a`
  color: #d3a164;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-left: 5px;
  }
`;

const SectionTitle = styled.h2`
  color: #d3a164;
  font-size: 2rem;
  margin: 50px 0 20px;
  text-align: center;
  font-family: "Playfair Display", serif;
  position: relative;
  
  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: #d3a164;
    margin: 20px auto 0;
  }
`;

const NearbyPlacesPage = () => {
  const { language, t } = useLanguage();
  
  // Nearby places data
  const nearbyPlaces = {
    cultural: [
      {
        id: 1,
        title: language === "en" ? "Purkhauti Muktangan" : "पुरखौती मुक्तांगन",
        description: language === "en" 
          ? "An open-air museum showcasing the cultural heritage of Chhattisgarh with beautiful sculptures and tribal art."
          : "छत्तीसगढ़ की सांस्कृतिक विरासत को सुंदर मूर्तियों और आदिवासी कला के साथ प्रदर्शित करने वाला एक खुला संग्रहालय।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "5 km" : "5 किमी",
        mapLink: "https://maps.google.com/?q=Purkhauti+Muktangan+Raipur"
      },
      {
        id: 2,
        title: language === "en" ? "Central Park" : "सेंट्रल पार्क",
        description: language === "en" 
          ? "A large urban park with lush greenery, walking paths, and a lake. Ideal for picnics and relaxation."
          : "एक बड़ा शहरी पार्क जिसमें हरी-भरी हरियाली, चलने के रास्ते और एक झील है। पिकनिक और विश्राम के लिए आदर्श।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "5 km" : "5 किमी",
        mapLink: "https://maps.google.com/?q=Central+Park+Raipur"
      },
      {
        id: 3,
        title: language === "en" ? "Musical fountain" : "संगीतमय फव्वारा",
        description: language === "en" 
          ? "A mesmerizing fountain show with music and lights, creating a magical atmosphere."
          : "एक मंत्रमुग्ध कर देने वाला फव्वारा शो जिसमें संगीत और रोशनी होती है, जो एक जादुई वातावरण बनाता है।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "7 km" : "7 किमी",
        mapLink: "https://maps.google.com/?q=Musical+Fountain+Raipur"
      }
    ],
    natural: [
      {
        id: 4,
        title: language === "en" ? "Nandan Van Zoo & Jungle Safari " : "नंदन वन चिड़ियाघर और जंगल सफारी",
        description: language === "en" 
          ? "A well-maintained zoo with a variety of animals and birds in natural surroundings. Perfect for families and nature enthusiasts."
          : "प्राकृतिक परिवेश में विभिन्न प्रकार के जानवरों और पक्षियों के साथ एक अच्छी तरह से बनाए रखा गया चिड़ियाघर।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "10 km" : "10 किमी",
        mapLink: "https://maps.google.com/?q=Nandan+Van+Zoo+Raipur"
      },
      {
        id: 5,
        title: language === "en" ? "Ghatarani Waterfall" : "घटारानी जलप्रपात",
        description: language === "en" 
          ? "A beautiful waterfall surrounded by lush forests. Enjoy the natural beauty and take a refreshing dip in the water."
          : "हरे-भरे जंगलों से घिरा एक सुंदर जलप्रपात। प्राकृतिक सौंदर्य का आनंद लें और पानी में ताज़गी भरी डुबकी लगाएं।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "30 km" : "30 किमी",
        mapLink: "https://maps.google.com/?q=Ghatarani+Waterfall"
      }
    ],
    dining: [
      {
        id: 6,
        title: language === "en" ? "Chhattisgarh Haat" : "छत्तीसगढ़ हाट",
        description: language === "en" 
          ? "Experience authentic Chhattisgarhi cuisine and shop for traditional handicrafts and tribal art all in one place."
          : "प्रामाणिक छत्तीसगढ़ी व्यंजनों का अनुभव करें और पारंपरिक हस्तशिल्प और आदिवासी कला की खरीदारी एक ही स्थान पर करें।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "8 km" : "8 किमी",
        mapLink: "https://maps.google.com/?q=Chhattisgarh+Haat+Raipur"
      },
      {
        id: 7,
        title: language === "en" ? "Heritage Inn" : "हेरिटेज इन",
        description: language === "en" 
          ? "A comfortable stay option with traditional décor and modern amenities, conveniently located near the museum."
          : "पारंपरिक सजावट और आधुनिक सुविधाओं के साथ आरामदायक ठहरने का विकल्प, संग्रहालय के पास स्थित है।",
        image: "/assets/forest-bg.jpg", // Placeholder image
        distance: language === "en" ? "2 km" : "2 किमी",
        mapLink: "https://maps.google.com/?q=Heritage+Inn+Raipur"
      }
    ]
  };

  return (
    <PageContainer>
      <Navbar hideDepartmentNames={true} />

      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("nearbyPlacesPageTitle")}
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Description>{t("nearbyPlacesIntro")}</Description>

          <SectionTitle>{t("culturalAttractionsTitle")}</SectionTitle>
          <PlacesGrid>
            {nearbyPlaces.cultural.map((place, index) => (
              <PlaceCard
                key={place.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <PlaceImage image={place.image} />
                <PlaceInfo>
                  <PlaceTitle>{place.title}</PlaceTitle>
                  <PlaceDescription>{place.description}</PlaceDescription>
                  <PlaceDetails>
                    <PlaceDistance>{place.distance}</PlaceDistance>
                    <DirectionsLink 
                      href={place.mapLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("getDirections")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </DirectionsLink>
                  </PlaceDetails>
                </PlaceInfo>
              </PlaceCard>
            ))}
          </PlacesGrid>

          <SectionTitle>{t("naturalWondersTitle")}</SectionTitle>
          <PlacesGrid>
            {nearbyPlaces.natural.map((place, index) => (
              <PlaceCard
                key={place.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <PlaceImage image={place.image} />
                <PlaceInfo>
                  <PlaceTitle>{place.title}</PlaceTitle>
                  <PlaceDescription>{place.description}</PlaceDescription>
                  <PlaceDetails>
                    <PlaceDistance>{place.distance}</PlaceDistance>
                    <DirectionsLink 
                      href={place.mapLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("getDirections")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </DirectionsLink>
                  </PlaceDetails>
                </PlaceInfo>
              </PlaceCard>
            ))}
          </PlacesGrid>

          <SectionTitle>{t("diningAccommodationTitle")}</SectionTitle>
          <PlacesGrid>
            {nearbyPlaces.dining.map((place, index) => (
              <PlaceCard
                key={place.id}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <PlaceImage image={place.image} />
                <PlaceInfo>
                  <PlaceTitle>{place.title}</PlaceTitle>
                  <PlaceDescription>{place.description}</PlaceDescription>
                  <PlaceDetails>
                    <PlaceDistance>{place.distance}</PlaceDistance>
                    <DirectionsLink 
                      href={place.mapLink} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("getDirections")}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                      </svg>
                    </DirectionsLink>
                  </PlaceDetails>
                </PlaceInfo>
              </PlaceCard>
            ))}
          </PlacesGrid>
        </motion.div>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default NearbyPlacesPage;
