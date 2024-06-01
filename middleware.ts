import { updateSession } from "src/common/lib/middleware/supabaseMiddleware";
import {
  checkAuth,
  sampleMiddleware,
} from "src/common/lib/middleware/authMiddleware";
import { stackMiddlewares } from "src/common/lib/middleware/stackMiddleware";

export default stackMiddlewares([checkAuth, updateSession, sampleMiddleware]);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
