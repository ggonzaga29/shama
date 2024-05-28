import React from "react";
import Logo from "src/assets/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/Card";
import LoginForm from "src/modules/auth/components/LoginForm";

export default function AuthPage() {
  return (
    <section className="grid justify-center h-screen">
      <div className="w-full max-w-sm mt-10">
        <div className="w-full flex items-center justify-center">
          <Logo />
        </div>
        <Card className="w-full mt-10">
          <CardHeader>
            <CardTitle className="text-2xl text-heading-foregrousnd">
              Login to Shama
            </CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
