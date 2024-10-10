'use client';

import { useRouter } from 'next/navigation';
import Logo from 'src/assets/LogoWithText';
import { Button } from 'src/components/ui/Button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mb-8 flex w-full items-center justify-center">
          <Logo className="invert dark:invert-0" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Oops! Page not found.
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mt-4"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
