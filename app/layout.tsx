import 'src/theme/globals.css';

import { NextUIProvider } from '@nextui-org/system';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import { cn } from 'src/common/utils/cvaUtils';
import { Toaster } from 'src/components/ui/Toaster';
import { ThemeProvider } from 'src/context/ThemeProvider';
import ConfirmDialogProvider from 'src/providers/ConfirmDialogProvider';
import ReactQueryProvider from 'src/providers/ReactQueryProvider';

const fontSans = localFont({
  src: '/fonts/Mona-Sans.woff2',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Shama Dashboard',
  description:
    'Enhance your car rental operations with the Shama Travel & Tours Staff Management Dashboard. Streamline bookings, driver assignments, and customer management with an intuitive, staff-only web application.',
  keywords: [
    'car rental',
    'staff management',
    'dashboard',
    'car catalog',
    'booking system',
    'calendar interface',
    'driver queuing',
    'emergency handling',
    'customer management',
    'onsite payments',
    'cash payments',
    'card payments',
    'staff confirmation',
    'car rental operations',
    'management tool',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="/logoLight.ico"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/logoDark.ico"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <NextUIProvider>
            <ReactQueryProvider>
              <ConfirmDialogProvider>
                <NextTopLoader showSpinner={false} />
                {children}
                <Toaster richColors />
              </ConfirmDialogProvider>
            </ReactQueryProvider>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
