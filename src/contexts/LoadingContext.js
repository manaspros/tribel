import React, { createContext, useState, useContext, useEffect } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Add isLoaded state to maintain compatibility with components using setLoaded
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simple loading animation with progress
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += 5;
      setProgress(loadingProgress);

      if (loadingProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setLoaded(true); // Also set isLoaded to true
        }, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        progress,
        setProgress,
        isLoaded,
        setLoaded, // Export setLoaded function
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
