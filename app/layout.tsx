import 'src/theme/globals.css';

import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Figtree as FontSans } from 'next/font/google';
import { cn } from 'src/common/utils/cvaUtils';
import { Toaster } from 'src/components/ui/Toaster';
import { ReactQueryClientProvider } from 'src/providers/ReactQueryClientProvider';
import { ThemeProvider } from 'src/context/ThemeProvider';

const fontSans = FontSans({
  subsets: ['latin'],
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
    <ReactQueryClientProvider>
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
          className={cn(
            'bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <NextTopLoader />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
