import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar';
import { Card } from 'src/components/ui/Card';

const UserCard = () => {
  return (
    <div className="group flex w-full items-center gap-4 rounded-lg border-b p-4 transition-colors hover:bg-primary">
      {/* Checkbox
      <div>
        <Checkbox className="mr-2" />
      </div> */}

      {/* User Info */}
      <div className="flex grow items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">John Doe</span>
          <span className="text-xs text-foreground/60">gian@gmail.com</span>
        </div>
      </div>

      {/* Icon */}
      <div>
        <ChevronRight className="size-6 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

const UserList = () => {
  return (
    <Card className="grow basis-[30rem] p-6">
      <div className="flex items-center gap-6 border-b px-4 pb-4">
        {/* <Checkbox className="mr-2" /> */}

        <div className="text-sm font-medium">Users</div>
      </div>
      <div className="flex flex-col">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </Card>
  );
};

export default UserList;
