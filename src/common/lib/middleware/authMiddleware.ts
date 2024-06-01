import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "src/common/lib/middleware/stackMiddleware";
import { createClient } from "src/common/lib/supabase/server";

export const checkAuth: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    const supabase = createClient();
    const pathname = request.nextUrl.pathname;

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      if (pathname !== "/auth") {
        return NextResponse.redirect(new URL("/auth", request.nextUrl));
      }
    }

    return next(request, _next);
  };
};

export const sampleMiddleware: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    return next(request, _next);
  };
};
