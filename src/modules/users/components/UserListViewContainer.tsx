import UserList from "src/modules/users/components/UserList";
import UserViewer from "src/modules/users/components/UserViewer";

export default function UserListViewContainer() {
  return (
    <section className="flex flex-wrap h-full gap-6">
      <UserList />
      <UserViewer />
    </section>
  );
}