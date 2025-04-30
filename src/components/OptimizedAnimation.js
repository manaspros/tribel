import React, { useMemo } from "react";
import { motion } from "framer-motion";

// This component optimizes animations by memoizing animation settings
// and reducing re-renders when parent components change
const OptimizedAnimation = ({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 0.3 },
  ...props
}) => {
  // Memoize animation settings to prevent unnecessary re-renders
  const memoizedInitial = useMemo(
    () => initial,
    [
      // Convert object to string for comparison
      // Only update when animation values actually change
      JSON.stringify(initial),
    ]
  );

  const memoizedAnimate = useMemo(() => animate, [JSON.stringify(animate)]);

  const memoizedExit = useMemo(() => exit, [JSON.stringify(exit)]);

  const memoizedTransition = useMemo(
    () => ({
      ...transition,
      // Use GPU acceleration for smoother animations
      // More efficient than default CSS animations
      type: transition.type || "tween",
      // Add layout transition optimizations
      layoutDependency: props.layoutId,
      // Use transform instead of top/left for better performance
      transformTemplate: props.transformTemplate,
    }),
    [JSON.stringify(transition), props.layoutId, props.transformTemplate]
  );

  return (
    <motion.div
      initial={memoizedInitial}
      animate={memoizedAnimate}
      exit={memoizedExit}
      transition={memoizedTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default OptimizedAnimation;
