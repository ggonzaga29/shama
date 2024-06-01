import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/Avatar";
import { Card } from "src/components/ui/Card";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "src/components/ui/Checkbox";

const UserCard = () => {
  return (
    <div className="group w-full flex items-center gap-4 py-4 px-4 transition-colors hover:bg-primary rounded-lg border-b">
      {/* Checkbox
      <div>
        <Checkbox className="mr-2" />
      </div> */}

      {/* User Info */}
      <div className="flex items-center gap-4 grow">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">John Doe</span>
          <span className="text-xs text-foreground/60">gian@gmail.com</span>
        </div>
      </div>

      {/* Icon */}
      <div>
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

const UserList = () => {
  return (
    <Card className="basis-[30rem] grow p-6">
      <div className="flex items-center pb-4 px-4 gap-6 border-b">
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
