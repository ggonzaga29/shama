import { type NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from 'src/common/lib/middleware/stackMiddleware';
import { createMiddlewareClient } from 'src/common/lib/supabase/middlewareClient';
import { AuthManager } from 'supabase-safesession';

export const updateSession: MiddlewareFactory = () => {
  return async function (request: NextRequest) {
    try {
      const { supabase, response } = createMiddlewareClient(request);
      // Refresh session if expired - required for Server Components
      // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
      await supabase.auth.getSession();

      return response;
    } catch (e) {
      console.error('Error updating session:', e);
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    }
  };
};

export const checkSession: MiddlewareFactory = () => {
  return async function (request: NextRequest) {
    try {
      const { supabase, response } = createMiddlewareClient(request);
      const supabaseServerAuth = () =>
        new AuthManager(supabase, process.env.SUPABASE_JWT_SECRET!);

      const session = await supabaseServerAuth().getSafeSession();

      if (session.status === 'error') {
        return NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
      }

      return response;
    } catch (e) {
      console.error('Error updating session:', e);
      return NextResponse.next({
        request: {
          headers: request.headers,
        },
      });
    }
  };
};
