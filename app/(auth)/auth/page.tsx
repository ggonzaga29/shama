/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import { LoginForm } from 'app/auth/components';
import Link from 'next/link';
import React from 'react';
import Logo from 'src/assets/Logo';
import ModeToggle from 'src/components/Navbar/components/ModeToggle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'src/components/ui/Card';

export default function AuthPage() {
  return (
    <div className="relative flex size-full basis-full items-center justify-center md:basis-1/2">
      <ModeToggle className="absolute right-4 top-4" />

      <div className="w-full max-w-md md:max-w-sm">
        <div className="flex w-full items-center justify-center">
          <Logo className="scale-[0.75]" />
        </div>
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl text-heading-foreground">
              Login to Shama
            </CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
              <Link href="/forgot" className="hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="mt-2 text-center text-sm">
              Need help?{' '}
              <Link
                href="mailto:gian@giangonzaga.com"
                className="hover:underline"
              >
                Contact the Developer
              </Link>
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Signups are by invitation only. If you don&apos;t have an account,
              please contact Shama Travel & Tours or gian@giangonzaga.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
