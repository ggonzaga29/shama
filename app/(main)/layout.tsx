import React from 'react';
import { SidebarProvider } from 'src/components/Sidebar/context/DesktopSidebarContext';
import Sidebar from 'src/components/Sidebar/Sidebar';
import TopNavigation from 'src/components/TopNavigation/TopNavigation';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import { SessionProvider } from 'src/context/SessionContext';
import { getCurrentUser } from 'src/modules/users/actions';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getCurrentUser();

  // This isn't a security check
  // This shouldn't happen btw
  if (!user) {
    return null;
  }

  return (
    <SessionProvider initialUser={user}>
      <SidebarProvider>
        <main className="flex h-full flex-col overflow-hidden">
          <TopNavigation />

          <div className="flex h-full grow-[999] basis-0">
            {/* <PageHeader /> */}
            <Sidebar />

            <ScrollArea className="grow overflow-auto">
              <div className="mb-24 p-6">{children}</div>
            </ScrollArea>
          </div>
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}

export const dynamic = 'force-dynamic';
