import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LazyLoad from "./LazyLoad";

// Styled components for the image container
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height || "auto"};
  overflow: hidden;
  background-color: #241c17; /* Dark placeholder color */
  border-radius: ${(props) => props.borderRadius || "0"};
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.objectFit || "cover"};
  object-position: ${(props) => props.objectPosition || "center"};
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 1;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(110deg, #241c17 30%, #2a231c 50%, #241c17 70%);
  background-size: 200% 100%;
  animation: ${(props) => (props.isLoaded ? "none" : "shimmer 1.5s infinite")};
  z-index: 0;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Check if browser supports WebP
const supportsWebP = () => {
  // Check if server-side rendering
  if (typeof window === "undefined") return false;

  // Create a canvas element
  const canvas = document.createElement("canvas");
  if (canvas.getContext && canvas.getContext("2d")) {
    // Check if toDataURL method produces a WebP data URL
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }
  return false;
};

// Main component
const OptimizedImage = ({
  src,
  webpSrc,
  alt,
  width,
  height,
  objectFit = "cover",
  objectPosition = "center",
  lazy = true,
  threshold = 0.1,
  lazyMargin = "200px",
  borderRadius = "0",
  onLoad = () => {},
  className = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [usedSrc, setUsedSrc] = useState(null);

  useEffect(() => {
    // Determine best image source
    const canUseWebP = supportsWebP();
    if (webpSrc && canUseWebP) {
      setUsedSrc(webpSrc);
    } else {
      setUsedSrc(src);
    }

    // Reset loaded state when src changes
    setIsLoaded(false);
  }, [src, webpSrc]);

  const handleImageLoad = (e) => {
    setIsLoaded(true);
    onLoad(e);
  };

  const imageElement = (
    <ImageWrapper
      height={height}
      borderRadius={borderRadius}
      className={className}
    >
      <Placeholder isLoaded={isLoaded} />
      {usedSrc && (
        <StyledImage
          src={usedSrc}
          alt={alt || ""}
          width={width}
          height={height}
          isLoaded={isLoaded}
          onLoad={handleImageLoad}
          objectFit={objectFit}
          objectPosition={objectPosition}
          loading="lazy" /* HTML native lazy loading as backup */
          {...props}
        />
      )}
    </ImageWrapper>
  );

  // Wrap with LazyLoad if lazy is true
  return lazy ? (
    <LazyLoad minHeight={height} rootMargin={lazyMargin} threshold={threshold}>
      {imageElement}
    </LazyLoad>
  ) : (
    imageElement
  );
};

export default OptimizedImage;
