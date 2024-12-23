import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { Auth } from "~/components/Auth";
import { loginFn } from "~/server/auth";

export const Route = createFileRoute("/signin")({
  component: Login,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

// TEMPORARY, COPIED FROM TANSTACK START TEMPLATE

export function Login() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: async (ctx) => {
      if (ctx?.error) {
        console.log(ctx.message);
        return;
      }
      await router.invalidate();
      router.navigate({ to: "/" });
      return;
    },
  });

  return (
    <Auth
      actionText="Login"
      status={loginMutation.status}
      onSubmit={(e) => {
        const formData = new FormData(e.target as HTMLFormElement);

        loginMutation.mutate({
          data: {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          },
        });
      }}
      afterSubmit={
        loginMutation.data ? (
          <>
            <div className="text-red-400">{loginMutation.data.message}</div>
          </>
        ) : null
      }
    />
  );
}
