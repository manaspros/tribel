import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Placeholder images - replace with actual images
import directorImage from "../assets/minister-placeholder.jpg";
import cmImage from "../assets/cm-placeholder.jpg";
import deputyCmImage from "../assets/minister-placeholder.jpg";
import ministerImage from "../assets/minister-placeholder.jpg";

const PageContainer = styled.div`
  background-color: #1a1410;
  color: #fff;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 40vh;
  background-image: linear-gradient(
      rgba(26, 20, 16, 0.8),
      rgba(26, 20, 16, 0.9)
    ),
    url(${directorImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15vh;
    background: linear-gradient(to top, #1a1410, transparent);
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  position: relative;
`;

const PageTitle = styled(motion.h1)`
  color: #d3a164;
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Playfair Display", serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 30px;
  color: #d3a164;
  text-decoration: none;
  font-weight: 500;

  svg {
    margin-right: 8px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const MessageSection = styled.div`
  margin: 60px 0;
  border-radius: 15px;
  overflow: hidden;
  background: rgba(42, 35, 28, 0.5);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
`;

const MessageHeader = styled.div`
  background: rgba(211, 161, 100, 0.2);
  padding: 20px 30px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(211, 161, 100, 0.3);
`;

const MessageTitle = styled.h2`
  color: #d3a164;
  font-size: 1.8rem;
  margin: 0;
  font-family: "Playfair Display", serif;
`;

const MessageContent = styled.div`
  display: flex;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MessageImageContainer = styled.div`
  width: 300px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const MessageImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const MessageText = styled.div`
  padding: 30px;
  flex-grow: 1;

  p {
    line-height: 1.8;
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
`;

const MessageSignature = styled.div`
  font-family: "Playfair Display", serif;
  font-style: italic;
  margin-top: 30px;

  .name {
    font-size: 1.2rem;
    color: #d3a164;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const DirectorMessage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <Navbar />

      <HeroSection>
        <PageTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("Director Message")}
        </PageTitle>
      </HeroSection>

      <ContentContainer>
        <BackLink to="/museum-stats">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#d3a164">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          {t("Back to About Museum")}
        </BackLink>

        {/* Director's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MessageHeader>
            <MessageTitle>Message from the Director</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={directorImage} />
            </MessageImageContainer>
            <MessageText>
              <p>
                Welcome to our museum, a living repository of our rich tribal
                heritage and freedom struggle. Our institution stands as a
                testament to the cultural legacy and resilience of our
                indigenous communities and freedom fighters who shaped the
                destiny of our nation.
              </p>
              <p>
                The Museum embodies our commitment to preserving and celebrating
                the diverse cultural traditions, artistic expressions, and
                historical narratives that have shaped our identity. Through our
                carefully curated exhibitions, educational programs, and
                community engagements, we strive to create a dynamic space for
                learning, reflection, and inspiration.
              </p>
              <p>
                As we navigate the complexities of the modern world, we remain
                steadfast in our mission to bridge the past with the present,
                ensuring that the voices and stories of our ancestors continue
                to resonate with future generations. We invite you to join us on
                this enlightening journey of discovery and connection.
              </p>
              <MessageSignature>
                <div className="name">Dr. Rajesh Kumar Singh</div>
                <div className="title">
                  Director, Tribal & Freedom Fighter Museum
                </div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Chief Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MessageHeader>
            <MessageTitle>Message from the Hon'ble Chief Minister</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={cmImage} />
            </MessageImageContainer>
            <MessageText>
              <p>
                It is with immense pride that I extend my warmest greetings to
                all visitors of our state's prestigious Tribal and Freedom
                Fighter Museum. This institution represents our government's
                unwavering commitment to preserving and promoting the rich
                cultural heritage and historical legacy of our region.
              </p>
              <p>
                The museum serves as a bridge between our past and future,
                offering valuable insights into the traditions, arts, and
                struggles that have shaped our collective identity. By
                showcasing the invaluable contributions of our tribal
                communities and freedom fighters, we aim to instill a sense of
                pride and belonging among our citizens, while also educating
                visitors about the diverse cultural tapestry that defines our
                state.
              </p>
              <p>
                I encourage everyone to explore this treasure trove of history
                and culture, to learn from the wisdom of our ancestors, and to
                draw inspiration from their resilience and creativity. Together,
                let us honor our heritage while building a future that reflects
                the values and aspirations of our people.
              </p>
              <MessageSignature>
                <div className="name">Shri Vishnu Deo Sai</div>
                <div className="title">Chief Minister, Chhattisgarh</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Deputy Chief Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MessageHeader>
            <MessageTitle>Message from the Deputy Chief Minister</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={deputyCmImage} />
            </MessageImageContainer>
            <MessageText>
              <p>
                I am delighted to welcome you to our state's Tribal and Freedom
                Fighter Museum, a cultural landmark that embodies the spirit and
                heritage of our people. This institution stands as a testament
                to our administration's dedication to preserving our rich
                cultural legacy and honoring the sacrifices of those who fought
                for our freedom.
              </p>
              <p>
                Through its thoughtfully curated exhibits and educational
                programs, the museum offers valuable insights into the
                traditions, customs, and historical struggles that have shaped
                our identity. It serves not only as a repository of artifacts
                but also as a vibrant center for learning and cultural exchange.
              </p>
              <p>
                I invite all citizens and visitors to immerse themselves in the
                wealth of knowledge and inspiration that this museum offers. May
                your visit deepen your appreciation for our heritage and
                strengthen your connection to our shared history.
              </p>
              <MessageSignature>
                <div className="name">Shri Arun Sao</div>
                <div className="title">Deputy Chief Minister, Chhattisgarh</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>

        {/* Minister's Message */}
        <MessageSection
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MessageHeader>
            <MessageTitle>Message from the Minister of Culture</MessageTitle>
          </MessageHeader>
          <MessageContent>
            <MessageImageContainer>
              <MessageImage image={ministerImage} />
            </MessageImageContainer>
            <MessageText>
              <p>
                As the Minister responsible for cultural affairs, it gives me
                great pleasure to introduce you to our state's Tribal and
                Freedom Fighter Museum. This institution represents our
                commitment to preserving and celebrating the diverse cultural
                heritage that has enriched our society for generations.
              </p>
              <p>
                The museum serves as a vital platform for promoting
                cross-cultural understanding and appreciation of our indigenous
                communities' contributions to our collective identity. Through
                its extensive collection of artifacts, artworks, and historical
                documents, it offers visitors a unique opportunity to trace the
                evolution of our cultural practices and historical narratives.
              </p>
              <p>
                I encourage you to explore the various exhibitions and programs
                offered by the museum, each designed to provide deeper insights
                into our rich heritage. May your visit inspire you to become
                active participants in our ongoing efforts to preserve and
                promote the cultural diversity that makes our state unique.
              </p>
              <MessageSignature>
                <div className="name">Shri Tankram Verma</div>
                <div className="title">Minister of Culture, Chhattisgarh</div>
              </MessageSignature>
            </MessageText>
          </MessageContent>
        </MessageSection>
      </ContentContainer>

      <Footer />
    </PageContainer>
  );
};

export default DirectorMessage;
