import { ViewTransitions } from 'next-view-transitions';
import React from 'react';
import { SidebarProvider } from 'src/components/Sidebar/context/DesktopSidebarContext';
import Sidebar from 'src/components/Sidebar/Sidebar';
import TopNavigation from 'src/components/TopNavigation/TopNavigation';
import { getInitialSessionAndUser } from 'src/modules/auth/actions';
import { SessionProvider } from 'src/modules/auth/context/SessionContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const { session, user } = await getInitialSessionAndUser();

  // This isn't a security check
  // This shouldn't happen btw
  if (!session || !user) {
    return null;
  }

  return (
    <ViewTransitions>
      <SessionProvider initialSession={session} initialUser={user}>
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
      </SessionProvider>
    </ViewTransitions>
  );
}
