import { createServerClient } from "@supabase/ssr";
import { parseCookies, setCookie } from "vinxi/http";

export const serverSupabase = createServerClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    cookies: {
      getAll() {
        return Object.entries(parseCookies()).map(([name, value]) => ({
          name,
          value,
        }));
      },
      setAll(cookies) {
        cookies.forEach((cookie) => {
          setCookie(cookie.name, cookie.value, cookie.options);
        });
      },
    },
  },
);
