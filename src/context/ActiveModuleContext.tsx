"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface ActiveModuleContextProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const ActiveModuleContext = createContext<ActiveModuleContextProps | undefined>(undefined);

export const ActiveModuleProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState<string>('NEXUS');

  // Derive module name from path — root '/' maps to NEXUS
  useEffect(() => {
    const segment = pathname?.split('/')?.[1] || '';
    const upperModule = segment.toUpperCase() || 'NEXUS';
    setActiveModule(upperModule);
    // Dispatch custom event for module load
    const event = new CustomEvent('module:load', { detail: { module: upperModule } });
    window.dispatchEvent(event);
  }, [pathname]);

  return (
    <ActiveModuleContext.Provider value={{ activeModule, setActiveModule }}>
      {children}
    </ActiveModuleContext.Provider>
  );
};

export const useActiveModule = () => {
  const context = useContext(ActiveModuleContext);
  if (!context) {
    throw new Error('useActiveModule must be used within an ActiveModuleProvider');
  }
  return context;
};
