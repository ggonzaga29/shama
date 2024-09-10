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
import { UserWithProfile } from 'src/common/types';

type SessionContext = {
  session?: Session | null;
  user?: UserWithProfile | null;
};

type SessionProviderProps = {
  children: React.ReactNode;
  initialUser: UserWithProfile;
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
  const [user, setUser] = useState<UserWithProfile | null>(initialUser);

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

  return (
    <SessionContext.Provider value={{ session, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  return useContext(SessionContext);
};
