import { ViewTransitions } from 'next-view-transitions';
import React from 'react';
import { SidebarProvider } from 'src/components/Sidebar/context/DesktopSidebarContext';
import Sidebar from 'src/components/Sidebar/Sidebar';
import TopNavigation from 'src/components/TopNavigation/TopNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <ViewTransitions>
      <SidebarProvider>
        <main className="flex h-full flex-wrap">
          <Sidebar />

          <div className="flex h-full grow-[999] basis-0 flex-col">
            {/* <PageHeader /> */}
            <TopNavigation />
            <div className="grow p-6">{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </ViewTransitions>
  );
}
