import DesktopSidebar from "src/components/Sidebar/DesktopSidebar";
import { createClient } from "src/common/lib/supabase/server";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-wrap gap-4 min-h-screen">
      <DesktopSidebar />

      <div className="basis-0 grow-[999] my-6">{children}</div>
    </main>
  );
}

export const dynamic = "force-dynamic";
