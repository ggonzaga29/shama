import React from "react";
import LoginForm from "src/modules/auth/components/LoginForm";
import { loginAction } from "src/modules/auth/actions";

export default function AuthPage() {
  return (
    <section className="grid justify-center h-screen">
      <LoginForm action={loginAction} />
    </section>
  );
}
