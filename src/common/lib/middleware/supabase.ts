import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { NextFetchEvent, type NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from 'src/common/lib/middleware/stackMiddleware';

export const updateSession: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      if (request.nextUrl.pathname !== '/auth') {
        console.log('redirecting');
        return NextResponse.redirect(new URL('/auth', request.nextUrl));
      }
    }

    if (
      sessionData.session?.expires_at &&
      sessionData.session.expires_at >= Math.floor(Date.now() / 1000)
    ) {
      return next(request, _next);
    }

    const { data, error } = await supabase.auth.getUser();

    if (!data.user || error) {
      if (request.nextUrl.pathname !== '/auth') {
        return NextResponse.redirect(new URL('/auth', request.nextUrl));
      }
    }

    return next(request, _next);
  };
};
