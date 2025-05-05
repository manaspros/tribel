import React, { memo } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import OptimizedImage from "./OptimizedImage";

const Card = styled(motion.div)`
  background-color: #241c17;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

const ArtifactImage = styled.div`
  height: 280px;
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

const ArtifactInfo = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ArtifactTitle = styled.h3`
  color: #d3a164;
  margin-bottom: 12px;
  font-size: 1.4rem;
  font-family: "Playfair Display", serif;
`;

const ArtifactDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const ArtifactTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const ArtifactTag = styled.span`
  background-color: rgba(211, 161, 100, 0.15);
  color: #d3a164;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const ArtifactCard = ({
  artifact,
  title,
  description,
  emoji,
  tags,
  onClick,
  translateTag,
  index,
}) => {
  return (
    <Card
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      layout
    >
      <ArtifactImage>{emoji}</ArtifactImage>
      <ArtifactInfo>
        <ArtifactTitle>{title}</ArtifactTitle>
        <ArtifactDescription>{description}</ArtifactDescription>
        <ArtifactTags>
          {tags.map((tag) => (
            <ArtifactTag key={tag}>{translateTag(tag)}</ArtifactTag>
          ))}
        </ArtifactTags>
      </ArtifactInfo>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(ArtifactCard, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.emoji === nextProps.emoji &&
    prevProps.tags === nextProps.tags &&
    prevProps.index === nextProps.index
  );
});
