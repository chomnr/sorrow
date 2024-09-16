import React, { createContext, useContext, useState, ReactNode } from 'react';

export enum Phase {
  Loading,
  Loaded,
  Begun,
  RobotAnnoyed,
  RobotCalming,
  RobotCalmed,
  RobotAngry
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
