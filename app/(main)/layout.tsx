import DesktopSidebar from "src/components/Sidebar/DesktopSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex flex-wrap gap-4 min-h-screen">
      <DesktopSidebar />

      <div className="basis-0 grow-[999] my-6">{children}</div>
    </main>
  );
}

export const dynamic = "force-dynamic";
