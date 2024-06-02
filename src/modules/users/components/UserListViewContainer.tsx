import UserList from 'src/modules/users/components/UserList';
import UserViewer from 'src/modules/users/components/UserViewer';

export default function UserListViewContainer() {
  return (
    <section className="flex h-full flex-wrap gap-6">
      <UserList />
      <UserViewer />
    </section>
  );
}
