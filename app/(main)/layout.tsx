import { cn } from 'src/common/utils/cvaUtils';
import { SidebarProvider } from 'src/components/Sidebar/context/SidebarContext';
import Sidebar from 'src/components/Sidebar/Sidebar';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import { SessionProvider } from 'src/context/SessionContext';
import { getCurrentUser } from 'src/modules/users/actions';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const user = await getCurrentUser();
  console.log('user', user);

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

            <ScrollArea
              id="main-content"
              className={cn(
                'min-h-[calc(100vh_-_56px)] w-full bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900'
              )}
            >
              {children}
            </ScrollArea>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}

// export const dynamic = 'force-dynamic';
