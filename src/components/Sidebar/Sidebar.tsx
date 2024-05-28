import React from "react";
import DesktopSidebar from "src/components/Sidebar/DesktopSidebar";
import { SidebarProvider } from "src/components/Sidebar/context/DesktopSidebarContext";

const Sidebar = () => {
  return (
    <SidebarProvider>
      <DesktopSidebar />
    </SidebarProvider>
  );
};

export default Sidebar;
