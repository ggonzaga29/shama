"use client";
import React, { createContext, useState, useContext, FC } from "react";
import { useMediaQuery } from "react-responsive";

interface SidebarContextProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextProps>({
  isMobile: false,
  isOpen: true,
  toggleSidebar: () => {},
});

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
