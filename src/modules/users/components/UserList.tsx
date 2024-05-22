import { Avatar, AvatarFallback, AvatarImage } from "src/components/Avatar";
import { Card } from "src/components/Card";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "src/components/Checkbox";

const UserCard = () => {
  return (
    <div className="w-full flex items-center gap-4 py-4 px-4 transition-colors hover:bg-card-foreground/10 rounded-lg border-b">
      {/* Checkbox */}
      <div>
        <Checkbox className="mr-2" />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 grow">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">John Doe</h2>

          <span className="text-xs">gian@gmail.com</span>
        </div>
      </div>

      {/* Icon */}
      <div>
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  );
};

const UserList = () => {
  return (
    <Card className="basis-[30rem] grow p-6">
      <div className="flex items-center pb-4 px-4 gap-6">
        {/* Check All */}
        <Checkbox className="mr-2" />

        <div>
          Name
        </div>
      </div>
      <div className="border-t flex flex-col">
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
