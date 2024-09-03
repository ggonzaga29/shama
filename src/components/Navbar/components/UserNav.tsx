'use client';

import Link from 'next/link';
import { Dashboard, User, Logout } from '@carbon/icons-react';

import { Button } from 'src/components/ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/Avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from 'src/components/ui/Tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/DropdownMenu';
import { createClient } from 'src/common/lib/supabase/client';
import { useEffect, useState, memo, useMemo } from 'react';
import { User as UserType } from '@supabase/supabase-js';
import { Database } from 'src/common/types/supabase';
import { redirect } from 'next/navigation';

const UserNav = memo(function UserNav() {
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<
    Database['public']['Tables']['profiles']['Row'] | null
  >(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      }

      if (data.session?.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session?.user.id)
          .single();

        if (profileError) {
          console.error(profileError);
        }

        setProfile(profileData);
        setUser(data.session.user);
      }
    };

    void getSession();
  }, [supabase]);

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={profile?.avatar ?? ''}
                    alt={profile?.first_name ?? ''}
                  />
                  <AvatarFallback className="bg-transparent">
                    {profile?.first_name?.charAt(0)}
                    {profile?.last_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.first_name} {profile?.last_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/dashboard" className="flex items-center">
              <Dashboard className="mr-3 h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/account" className="flex items-center">
              <User className="mr-3 h-4 w-4 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="/auth/signout">
          <DropdownMenuItem
            className="hover:cursor-pointer"
           
          >
            <Logout className="mr-3 h-4 w-4 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { UserNav };
