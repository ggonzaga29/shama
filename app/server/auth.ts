import { createServerFn } from "@tanstack/start";
import { serverSupabase } from "./supabase";

export const getUser = createServerFn({ method: "GET" }).handler(
  // @ts-expect-error type serialization mismatch
  async () => {
    const { data } = await serverSupabase.auth.getUser();

    if (!data.user?.email) {
      return null;
    }

    return data.user;
  },
);

export const loginFn = createServerFn({ method: "POST" })
  .validator(
    // TODO
    (input: { email: string; password: string }) =>
      input as { email: string; password: string },
  )
  .handler(async ({ data }) => {
    const { error } = await serverSupabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  });
