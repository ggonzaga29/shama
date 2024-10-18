import { getCurrentUserWithProfile } from 'app/users/actions';
import { permanentRedirect } from 'next/navigation';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import { cn } from 'src/common/utils/cvaUtils';
import { SidebarProvider } from 'src/components/Sidebar/context/SidebarContext';
import Sidebar from 'src/components/Sidebar/Sidebar';
import ToastLauncher from 'src/components/ToastLauncher/ToastLauncher';
import { SessionProvider } from 'src/context/SessionContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  console.log('MainLayout');
  const supabase = createServerClient();
  const user = await getCurrentUserWithProfile(supabase);

  if (!user) {
    permanentRedirect('/auth');
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
                'h-screen max-h-screen w-full overflow-y-auto bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900'
              )}
            >
              {children}
            </main>
          </div>
        </div>
        <ToastLauncher />
      </SidebarProvider>
    </SessionProvider>
  );
}

export const dynamic = 'force-dynamic';
