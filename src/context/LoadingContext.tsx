// LoadingContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const defaultContextValue: LoadingContextType = {
  isLoading: true,
  setLoading: () => {} 
};

export const LoadingContext = createContext<LoadingContextType>(defaultContextValue);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);

