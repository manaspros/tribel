import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoaded, setLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
};
