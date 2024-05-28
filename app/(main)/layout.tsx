import PageHeader from "src/components/PageHeader/PageHeader";
import { createClient } from "src/common/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "src/components/Sidebar/Sidebar";
import slugs from "src/common/lib/slugs";
import { ViewTransitions } from "next-view-transitions";

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
    <ViewTransitions>
      <main className="flex flex-wrap h-full">
        <Sidebar />

        <div className="basis-0 grow-[999] h-full flex flex-col">
          <PageHeader />
          <div className="flex-grow p-6">{children}</div>
        </div>
      </main>
    </ViewTransitions>
  );
}

export const dynamic = "force-dynamic";
