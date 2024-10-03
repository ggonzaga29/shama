import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from 'src/common/lib/middleware/stackMiddleware';
import { createAdminClient } from 'src/common/lib/supabase/server';

export const checkAuth: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    try {
      const supabase = createAdminClient();
      const pathname = request.nextUrl.pathname;

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        if (pathname !== '/auth') {
          return NextResponse.redirect(new URL('/auth', request.nextUrl));
        }
      }

      return next(request, _next);
    } catch (error) {
      console.error('Error in checkAuth middleware', error);
    }
  };
};

export const sampleMiddleware: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    return next(request, _next);
  };
};
