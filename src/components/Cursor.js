import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CursorWrapper = styled(motion.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  background-color: #d3a164;
  border-radius: 50%;
  z-index: 9999; /* Increased from 999 to be above modal */
  mix-blend-mode: difference;

  @media (max-width: 768px) {
    display: none; /* Hide on touch devices */
  }
`;

const CursorRing = styled(motion.div)`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(211, 161, 100, 0.5);
  border-radius: 50%;
  z-index: 9998; /* Increased from 998 to be above modal */

  @media (max-width: 768px) {
    display: none; /* Hide on touch devices */
  }
`;

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Check if we're on a touch device
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      setHidden(true);
      return;
    }

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document
        .querySelectorAll(
          "a, button, [role='button'], [type='button'], [type='submit']"
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setLinkHovered(true));
          el.addEventListener("mouseleave", () => setLinkHovered(false));
        });
    };

    addEventListeners();
    handleLinkHoverEvents();

    return () => {
      removeEventListeners();
    };
  }, []);

  // Cursor animation variants
  const variants = {
    default: {
      x: position.x - 6, // Half of cursor width
      y: position.y - 6, // Half of cursor height
      opacity: hidden ? 0 : 1,
      scale: clicked ? 0.5 : linkHovered ? 1.5 : 1,
    },
  };

  // Ring animation variants
  const ringVariants = {
    default: {
      x: position.x - 20, // Half of ring width
      y: position.y - 20, // Half of ring height
      opacity: hidden ? 0 : 1,
      scale: clicked ? 1.3 : linkHovered ? 1.5 : 1,
    },
  };

  // Animation spring options
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  };

  // Ring animation spring options (slightly slower)
  const ringSpring = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  };

  return (
    <>
      <CursorWrapper
        ref={cursorRef}
        variants={variants}
        animate="default"
        transition={spring}
      />
      <CursorRing
        ref={ringRef}
        variants={ringVariants}
        animate="default"
        transition={ringSpring}
      />
    </>
  );
};

export default Cursor;
