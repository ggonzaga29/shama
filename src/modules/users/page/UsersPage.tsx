import { Download, Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { EnhancedButton as Button } from 'src/components/ui/EnhancedButton';
import { getAllUsers } from 'src/modules/users/actions';

const UserTable = dynamic(
  () => import('src/modules/users/components/UserTable')
);

export default async function UsersPage() {
  const users = await getAllUsers();

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
        <Suspense fallback={<div>Loading...</div>}>
          <UserTable users={users} />
        </Suspense>
      </div>
    </div>
  );
}
