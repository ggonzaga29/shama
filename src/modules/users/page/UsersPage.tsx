import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Download, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import useSupabaseServer from 'src/common/lib/supabase/useSupabaseServer';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { EnhancedButton as Button } from 'src/components/ui/EnhancedButton';
import { getAllUsers } from 'src/modules/users/actions';

const UserTable = dynamic(
  () => import('src/modules/users/components/UserTable')
);

export default async function UsersPage() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: async () => getAllUsers(supabase),
  });

  return (
    <div>
      <PageHeader>
        <PageHeader.Title as="h2">Users</PageHeader.Title>
        <PageHeader.Aside>
          <Button variant="gooeyRight" Icon={Plus}>
            Create User
          </Button>

          <Button variant="gooeyRight" Icon={Download} iconPlacement="left">
            Export Users
          </Button>
        </PageHeader.Aside>
      </PageHeader>

      <div className="rounded-lg bg-white p-4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UserTable />
        </HydrationBoundary>
      </div>
    </div>
  );
}
