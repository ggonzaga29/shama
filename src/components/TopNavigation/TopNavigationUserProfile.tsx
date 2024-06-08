'use client';

import { Link } from 'next-view-transitions';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import { Skeleton } from 'src/components/ui/Skeleton';
import { useSessionContext } from 'src/context/SessionContext';

const TopNavigationUserProfile: FC = () => {
  const { user } = useSessionContext();

  if (!user) {
    return (
      <div className="flex items-center space-x-3 rounded-md px-4 py-2 transition-colors">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  const initials = `${user?.profile?.first_name?.[0]}${user?.profile?.last_name?.[0]}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-3 rounded-md px-4 py-2 transition-colors hover:bg-navigation-button-hover">
          <Avatar className="size-8">
            <AvatarImage src={user?.profile?.avatar ?? 'JD'} />
            <AvatarFallback className="text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-sm font-medium">{`${user?.profile?.first_name ?? 'John'} ${user?.profile?.last_name ?? 'Doe'}`}</div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/api/auth/signout">
          <DropdownMenuItem className="text-sm">Sign out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopNavigationUserProfile;
