import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SoundContextType {
    isSoundOn: boolean;
    toggleSound: () => void;
  }
  
  const defaultContextValue: SoundContextType = {
    isSoundOn: false,
    toggleSound: () => {} 
  };
  
  export const SoundContext = createContext<SoundContextType>(defaultContextValue);
  
  interface ToggleableSoundProps {
    children: ReactNode;
  }
  
  export function ToggleableSound({ children }: ToggleableSoundProps) {
    const [isSoundOn, setIsSoundOn] = useState(false);
  
    const toggleSound = () => {
      setIsSoundOn(prevState => !prevState);
    };
  
    return (
      <SoundContext.Provider value={{ isSoundOn, toggleSound }}>
        {children}
      </SoundContext.Provider>
    );
  }
  
  export const useSound = () => useContext(SoundContext);