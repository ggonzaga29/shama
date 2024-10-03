/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import Image from 'next/image';
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
import LoginForm from 'src/modules/auth/components/LoginForm';

export default function AuthPage() {
  return (
    <section className="flex h-screen">
      <div className="relative hidden h-full basis-1/2 bg-primary md:block">
        {/* Overlay */}
        <div className="absolute z-[2] size-full bg-black/80">
          <Image
            src="assets/images/logoDarkWithText.png"
            alt="Logo"
            width={150}
            height={55}
            className="absolute left-8 top-8"
          />
        </div>

        {/* Cover Photo */}
        <Image
          src="assets/images/car_fleet.avif"
          alt="Cover Photo"
          className="absolute z-[1] object-cover"
          fill
        />
      </div>

      <div className="relative flex size-full basis-full items-center justify-center md:basis-1/2">
        <ModeToggle className="absolute right-4 top-4" />

        <div className="w-full max-w-sm">
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
                Signups are by invitation only. If you don&apos;t have an
                account, please contact Shama Travel & Tours or
                gian@giangonzaga.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
