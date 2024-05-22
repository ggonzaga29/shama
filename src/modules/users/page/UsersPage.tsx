import { getAllUsers } from "src/modules/users/actions";
import UserListViewContainer from "src/modules/users/components/UserListViewContainer";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="h-full">
      <UserListViewContainer />
    </div>
  );
}
