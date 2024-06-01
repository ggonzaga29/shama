import Sidebar from "src/components/Sidebar/Sidebar";
import { ViewTransitions } from "next-view-transitions";
import TopNavigation from "src/components/TopNavigation/TopNavigation";
import { SidebarProvider } from "src/components/Sidebar/context/DesktopSidebarContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <ViewTransitions>
      <SidebarProvider>
        <main className="flex flex-wrap h-full">
          <Sidebar />

          <div className="basis-0 grow-[999] h-full flex flex-col">
            {/* <PageHeader /> */}
            <TopNavigation />
            <div className="flex-grow p-6">{children}</div>
          </div>
        </main>

      </SidebarProvider>
    </ViewTransitions>
  );
}

// export const dynamic = "force-dynamic";
