/**
 * SessionContext.tsx
 *
 * This context provides session and user information.
 *
 * IMPORTANT: This context should NEVER be used for verification.
 * Always verify the user server-side. The client-side session can be manipulated and is not secure.
 */

'use client';

import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { createClient } from 'src/common/lib/supabase/client';
import { Avatar, UserWithProfileAndAvatar } from 'src/common/types';

type SessionContext = {
  session?: Session | null;
  user?: UserWithProfileAndAvatar | null;
};

type SessionProviderProps = {
  children: React.ReactNode;
  initialUser: UserWithProfileAndAvatar;
};

const SessionContext = createContext<SessionContext>({
  session: null,
});

export const SessionProvider: FC<SessionProviderProps> = ({
  children,
  initialUser,
}) => {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithProfileAndAvatar | null>(
    initialUser
  );

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
        } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setSession(session);
        }
      }
    );

    return () => {
      data.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  // Listen for Profile Avatar changes
  useEffect(() => {
    if (!user) return;

    const profileAvatarChanges = supabase
      .channel('table-filter-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // Listen only to INSERTs
          schema: 'public',
          table: 'profile_avatars',
          filter: `user_id=eq.${user.id}`,
        },
        (payload: { new: Avatar }) => {
          setUser((prevUser) => {
            if (!prevUser) return prevUser;

            return {
              ...prevUser,
              avatar: payload.new,
            };
          });
        }
      )
      .subscribe();

    // FIX: Not working
    // const profileChanges = supabase.channel('table-filter-changes').on(
    //   'postgres_changes',
    //   {
    //     event: 'UPDATE',
    //     schema: 'public',
    //     table: 'profiles',
    //     filter: `id=eq.${user.id}`,
    //   },
    //   (payload: { new: UserProfile }) => {
    //     setUser((prevUser) => {
    //       console.log('Profile Changes', payload.new);
    //       if (!prevUser) return prevUser;

    //       return {
    //         ...prevUser,
    //         profile: payload.new,
    //       };
    //     });
    //   }
    // );

    return () => {
      profileAvatarChanges.unsubscribe();
      // profileChanges.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContext.Provider value={{ session, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
