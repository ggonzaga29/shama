import { getAllUsers } from "src/modules/users/actions";
import UserTable from "src/modules/users/components/UserTable";
import PageHeader from "src/components/PageHeader/PageHeader";
import { EnhancedButton as Button } from "src/components/ui/EnhancedButton";
import { Plus, UserRound, Download } from "lucide-react";

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

      <UserTable users={users} />
    </div>
  );
}
