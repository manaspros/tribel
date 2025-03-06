import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background-color: #d3a164;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(211, 161, 100, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  mix-blend-mode: difference;
`;

export const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => setCursorVariant("click");
    const mouseUp = () => setCursorVariant("default");

    const handleLinkHover = () => setCursorVariant("hover");
    const handleLinkLeave = () => setCursorVariant("default");

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
    },
    hover: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      scale: 1.5,
    },
    click: {
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
      scale: 0.8,
    },
  };

  const ringVariants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
    click: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      transition: {
        type: "spring",
        mass: 0.6,
      },
    },
  };

  // Hide cursor on mobile devices
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <CursorDot variants={variants} animate={cursorVariant} />
      <CursorRing variants={ringVariants} animate={cursorVariant} />
    </>
  );
};
