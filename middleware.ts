import { checkAuth, sampleMiddleware } from 'src/common/lib/middleware/auth';
import { stackMiddlewares } from 'src/common/lib/middleware/stackMiddleware';
import { updateSession } from 'src/common/lib/middleware/supabase';

export default stackMiddlewares([updateSession, checkAuth, sampleMiddleware]);

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
