'use client';
import React, { createContext, FC, useContext, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

interface SidebarContextProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const isOpenStoreKey = 'shama:sidebar:isOpen';

const SidebarContext = createContext<SidebarContextProps>({
  isMobile: false,
  isOpen: true,
  toggleSidebar: () => {},
});

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);

    if (typeof window !== 'undefined') {
      localStorage.setItem(isOpenStoreKey, JSON.stringify(!isOpen));
    }
  };

  return (
    <SidebarContext.Provider value={{ isMobile, isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
