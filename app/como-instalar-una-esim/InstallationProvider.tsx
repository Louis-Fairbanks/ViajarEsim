import React, { createContext, useContext, useState, ReactNode } from 'react';

type InstallationContextType = {
  selectedDevice: string;
  setSelectedDevice: (device: string) => void;
  installationType: string;
  setInstallationType: (type: string) => void;
};

const InstallationContext = createContext<InstallationContextType | undefined>(undefined);

export const InstallationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('iPhone');
  const [installationType, setInstallationType] = useState<string>('QR');

  return (
    <InstallationContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,
        installationType,
        setInstallationType,
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