import { getAllUsers } from "src/modules/users/actions";
import PageHeader from "src/components/PageHeader/PageHeader";
import { EnhancedButton as Button } from "src/components/ui/EnhancedButton";
import dynamic from "next/dynamic";
import { Plus, UserRound, Download } from "lucide-react";
import { Suspense } from "react";

const UserTable = dynamic(
  () => import("src/modules/users/components/UserTable")
);

export default async function UsersPage() {
  const { users } = await getAllUsers();

  return (
    <div>
      <PageHeader>
        <PageHeader.Title as="h2" Icon={UserRound}>
          Users
        </PageHeader.Title>

        <PageHeader.Aside>
          <Button variant="gooeyRight" Icon={Plus}>
            Create User
          </Button>

          <Button variant="gooeyRight" Icon={Download} iconPlacement="left">
            Export Users
          </Button>
        </PageHeader.Aside>
      </PageHeader>

      <Suspense fallback={<div>Loading...</div>}>
        <UserTable users={users} />
      </Suspense>
    </div>
  );
}
