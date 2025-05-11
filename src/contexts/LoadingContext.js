import React, { createContext, useState, useContext, useEffect } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  // Add a flag to determine if we're in initial loading or navigation loading
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
          setLoaded(true);
          // Mark that initial load is complete
          setIsInitialLoad(false);
        }, 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Function to start navigation loading (for route changes)
  const startNavigationLoading = () => {
    setLoading(true);
    setProgress(0);
    setLoaded(false);
    
    // Set up progress animation for navigation
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += 10; // Faster loading for navigation
      setProgress(loadingProgress);

      if (loadingProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          setLoaded(true);
        }, 300);
      }
    }, 100);

    return () => clearInterval(interval);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        progress,
        setProgress,
        isLoaded,
        setLoaded,
        isInitialLoad,
        startNavigationLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
