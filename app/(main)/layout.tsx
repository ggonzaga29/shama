import React from 'react';
import { cn } from 'src/common/utils/cvaUtils';
import { SidebarProvider } from 'src/components/Sidebar/context/SidebarContext';
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

  if (!user) {
    return null;
  }

  return (
    <SessionProvider initialUser={user}>
      <SidebarProvider>
        <div className="flex h-full flex-col overflow-hidden">
          {/* <TopNavigation /> */}

          <div className="flex h-full grow-[999] basis-0">
            {/* <PageHeader /> */}
            <Sidebar />

            <main
              id="main-content"
              className={cn(
                'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900'
              )}
            >
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}

export const dynamic = 'force-dynamic';
