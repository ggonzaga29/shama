import { NextMiddleware, NextResponse } from 'next/server';

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Stacks an array of middleware functions into a single middleware function.
 *
 * @param {MiddlewareFactory[]} [functions=[]] - An array of middleware factories. Each factory is a function that takes a middleware and returns a new middleware.
 * @param {number} [index=0] - The starting index for the recursion. It's used internally and should not be provided when calling this function.
 *
 * @returns {NextMiddleware} - A single middleware function that represents the stacked middleware functions. When this function is called, it will call the middleware functions in the order they were provided, passing the request to the next middleware function until all middleware functions have been called or one of them returns a response.
 *
 * @example
 * const middleware1 = next => async req => {
 *   console.log('Middleware 1 before next');
 *   const res = await next(req);
 *   console.log('Middleware 1 after next');
 *   return res;
 * };
 *
 * const middleware2 = next => async req => {
 *   console.log('Middleware 2 before next');
 *   const res = await next(req);
 *   console.log('Middleware 2 after next');
 *   return res;
 * };
 *
 * const stacked = stackMiddlewares([middleware1, middleware2]);
 * const res = await stacked(req);
 */
export function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}
