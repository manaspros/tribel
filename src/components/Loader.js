import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../contexts/LoadingContext";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import tribalPattern from "../assets/tribal-pattern.svg";
import tribalSymbol from "../assets/tribal-symbol.svg";

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #1a1410;
  color: #f5efe7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderInner = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderTitle = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 0 0 30px;
  color: #d3a164;
`;

const LoaderProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(211, 161, 100, 0.2);
  border-radius: 2px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;
`;

const LoaderProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #d3a164;
  border-radius: 2px;
  width: 0%;
`;

const LoaderTribalPattern = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${tribalPattern});
  opacity: 0.05;
  mix-blend-mode: overlay;
`;

export const Loader = () => {
  const { loading, isLoaded, progress, isInitialLoad } = useLoading();
  const { t } = useLanguage();

  useEffect(() => {
    if (loading && isInitialLoad) {
      // Animate progress bar
      gsap.to(".loader-progress", {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      });

      // Tribal motif animations
      gsap.to(".tribal-pattern", {
        backgroundPosition: "100px 100px",
        duration: 10,
        repeat: -1,
        ease: "linear",
      });
    }
  }, [loading, isInitialLoad]);

  // If not initial load and still loading, show the simpler context loader
  if (!isInitialLoad && loading) {
    return (
      <LoaderContainer
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoaderInner>
          <LoaderTitle>
            {t("tribal")} {t("heritageMuseum")}
          </LoaderTitle>

          <LoaderProgressBar>
            <LoaderProgress style={{ width: `${progress}%` }} />
          </LoaderProgressBar>

          <motion.p>
            {t("preparingExperience")}... {progress}%
          </motion.p>
        </LoaderInner>
      </LoaderContainer>
    );
  }

  return (
    <AnimatePresence>
      {!isLoaded && isInitialLoad && (
        <LoaderContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <LoaderTribalPattern className="tribal-pattern" />

          <LoaderInner>
            <LoaderTitle>
              {t("tribal")} {t("heritageMuseum")}
            </LoaderTitle>
            <motion.img
              src={tribalSymbol}
              alt="Tribal Symbol"
              width="100"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              }}
            />

            <LoaderProgressBar>
              <LoaderProgress className="loader-progress" />
            </LoaderProgressBar>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {t("preparingExperience")}
            </motion.p>
          </LoaderInner>
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
};
