'use client';
import React, { createContext, FC, useContext, useState } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const isOpenStoreKey = 'shama:sidebar:isOpen';

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: true,
  setIsOpen: () => {},
  toggleSidebar: () => {},
});

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const mainContentElement = document.getElementById('main-content');

      if (mainContentElement) {
        mainContentElement.classList.toggle('sidebar-active'); 
      }
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(isOpenStoreKey, JSON.stringify(!isOpen));
    }
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
