import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const LazyContainer = styled.div`
  min-height: ${(props) => props.minHeight || "auto"};
  width: 100%;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const LazyLoad = ({
  children,
  minHeight = "100px",
  rootMargin = "100px 0px",
  threshold = 0.1,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Skip if already visible or server-side rendering
    if (!container || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          // Disconnect after it's been observed once
          observer.disconnect();
        }
      },
      {
        rootMargin, // Load slightly before it's in view
        threshold, // Percentage of visibility needed to trigger
      }
    );

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [isVisible, rootMargin, threshold]);

  return (
    <LazyContainer
      ref={containerRef}
      visible={isVisible}
      minHeight={minHeight}
      {...props}
    >
      {/* Only render children when visible or if it has been previously loaded */}
      {(isVisible || hasLoaded) && children}
    </LazyContainer>
  );
};

export default LazyLoad;
