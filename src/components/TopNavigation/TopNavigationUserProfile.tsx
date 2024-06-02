'use client';

import { Link } from 'next-view-transitions';
import { FC } from 'react';
import { UserWithProfile } from 'src/common/types';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';

interface TopNavigationUserProfileProps {
  user: UserWithProfile | null;
}

const TopNavigationUserProfile: FC<TopNavigationUserProfileProps> = ({
  user,
}) => {
  if (!user) {
    return null;
  }

  const initials = `${user.profile?.first_name?.[0]}${user.profile?.last_name?.[0]}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-3 rounded-md px-4 py-2 transition-colors hover:bg-navigation-button-hover">
          <Avatar className="size-8">
            <AvatarImage src={user.profile?.avatar ?? ''} />
            <AvatarFallback className="text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="text-sm font-medium">{`${user.profile?.first_name} ${user.profile?.last_name}`}</div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/auth/signout">
          <DropdownMenuItem className="text-sm">Sign out</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopNavigationUserProfile;
