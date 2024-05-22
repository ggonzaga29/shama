import DesktopSidebar from "src/components/Sidebar/DesktopSidebar";
import PageHeader from "src/components/PageHeader/PageHeader";
import { createClient } from "src/common/lib/supabase/server";
import { redirect } from "next/navigation";
import slugs from "src/common/lib/slugs";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(slugs.AUTH);
  }

  return (
    <main className="flex flex-wrap h-full">
      <DesktopSidebar />

      <div className="basis-0 grow-[999] p-8 h-full flex flex-col">
        <PageHeader />
        <div className="flex-grow">{children}</div>
      </div>
    </main>
  );
}

export const dynamic = "force-dynamic";
