import dynamic from 'next/dynamic';
import React from 'react';
import Logo from 'src/assets/Logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';

const LoginForm = dynamic(
  () => import('src/modules/auth/components/LoginForm')
);

export default function AuthPage() {
  return (
    <section className="grid h-screen justify-center">
      <div className="mt-10 w-full max-w-sm">
        <div className="flex w-full items-center justify-center">
          <Logo />
        </div>
        <Card className="mt-10 w-full">
          <CardHeader>
            <CardTitle className="text-heading-foregrousnd text-2xl">
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
