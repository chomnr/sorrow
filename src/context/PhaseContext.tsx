import React, { createContext, useContext, useState, ReactNode } from 'react';

enum PhaseFlag {
  EnableBackgroundMusic = 1 << 0,
  EnableSoundEffects = 1 << 1, 
  EnableHints = 1 << 2,
  EnableDebugMode = 1 << 3,
  DisableUserInput = 1 << 4,
  DisableSpamClick = 1 << 5,
}

export enum Phase {
  Loading = PhaseFlag.DisableUserInput | PhaseFlag.DisableSpamClick,
  Loaded = PhaseFlag.DisableSpamClick | PhaseFlag.DisableUserInput,
  Begun
}

interface PhaseContextType {
  phase: Phase;
  setPhase: (phase: Phase) => void;
}

const defaultContextValue: PhaseContextType = {
  phase: Phase.Loading,
  setPhase: () => {}
};

export const PhaseContext = createContext<PhaseContextType>(defaultContextValue);

interface PhaseProviderProps {
  children: ReactNode;
}

export function PhaseProvider({ children }: PhaseProviderProps) {
  const [phase, setPhase] = useState<Phase>(Phase.Loading);

  return (
    <PhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </PhaseContext.Provider>
  );
}

// Custom hook to use the PhaseContext
export const usePhase = () => useContext(PhaseContext);
