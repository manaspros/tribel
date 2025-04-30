import React, { memo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import OptimizedImage from "./OptimizedImage";

const Card = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

const IconDisplay = styled.div`
  height: 220px;
  background-color: #2c231c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d3a164;
  font-size: 5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at center,
      rgba(211, 161, 100, 0.2),
      transparent 70%
    );
    pointer-events: none;
  }
`;

const CardInfo = styled.div`
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-family: "Playfair Display", serif;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Tag = styled.span`
  background-color: rgba(211, 161, 100, 0.15);
  color: #d3a164;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const MemoizedCard = memo(
  ({
    item,
    index,
    onClick,
    title,
    description,
    tags,
    emoji,
    image,
    imageAlt = "Artifact image",
  }) => {
    // Determine if we should show an image or an emoji
    const showImage = image && image.length > 0;

    return (
      <Card
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
        onClick={onClick}
        layoutId={`card-${item.id}`}
      >
        {showImage ? (
          <OptimizedImage
            src={image}
            height="220px"
            alt={imageAlt}
            borderRadius="15px 15px 0 0"
          />
        ) : (
          <IconDisplay>{emoji}</IconDisplay>
        )}

        <CardInfo>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>

          {tags && tags.length > 0 && (
            <TagsContainer>
              {tags.map((tag, idx) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </TagsContainer>
          )}
        </CardInfo>
      </Card>
    );
  },
  // Custom comparison function to control when the component should re-render
  (prevProps, nextProps) => {
    // Only re-render if these props change
    return (
      prevProps.title === nextProps.title &&
      prevProps.description === nextProps.description &&
      prevProps.emoji === nextProps.emoji &&
      prevProps.image === nextProps.image &&
      JSON.stringify(prevProps.tags) === JSON.stringify(nextProps.tags)
    );
  }
);

export default MemoizedCard;
