import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextFetchEvent, NextResponse, type NextRequest } from 'next/server'
import { MiddlewareFactory } from 'src/common/lib/middleware/stackMiddleware'

export const updateSession: MiddlewareFactory = (next) => {
  return async function (request: NextRequest, _next: NextFetchEvent) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )
  
    await supabase.auth.getUser()
  
    return next(request, _next);
  }
}