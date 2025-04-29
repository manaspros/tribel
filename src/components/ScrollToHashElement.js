import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component can be used inside the router context to handle scroll to hash
const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL
    if (location.hash) {
      // Get the element by ID (remove the # from the hash)
      const element = document.getElementById(location.hash.substring(1));

      if (element) {
        // Give the browser a moment to render and position correctly
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  // This component doesn't render anything
  return null;
};

export default ScrollToHashElement;
