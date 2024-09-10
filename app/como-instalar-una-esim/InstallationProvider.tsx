import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type InstallationContextType = {
  selectedDevice: string;
  setSelectedDevice: (device: string) => void;
  installationType: string;
  setInstallationType: (type: string) => void;
  currentInstallationStep: number;
  setCurrentInstallationStep: (step: number) => void;
  currentActivationStep: number;
  setCurrentActivationStep: (step: number) => void;
};

const InstallationContext = createContext<InstallationContextType | undefined>(undefined);

export const InstallationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('iPhone');
  const [installationType, setInstallationType] = useState<string>('QR');
  const [currentInstallationStep, setCurrentInstallationStep] = useState<number>(1);
  const [currentActivationStep, setCurrentActivationStep] = useState<number>(1);

  useEffect(() => {
    setCurrentInstallationStep(1);
    setCurrentActivationStep(1);
  }, [installationType, selectedDevice]);

  return (
    <InstallationContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,
        installationType,
        setInstallationType,
        currentInstallationStep,
        setCurrentInstallationStep,
        currentActivationStep,
        setCurrentActivationStep,
      }}
    >
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => {
  const context = useContext(InstallationContext);
  if (context === undefined) {
    throw new Error('useInstallation must be used within an InstallationProvider');
  }
  return context;
};