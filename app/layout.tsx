import type { Metadata } from "next";
import { cn } from "src/common/utils/cvaUtils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "src/components/ui/Toaster";
import "src/theme/globals.css";
import ToastLauncher from "src/components/ToastLauncher/ToastLauncher";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shama Dashboard",
  description:
    "Enhance your car rental operations with the Shama Travel & Tours Staff Management Dashboard. Streamline bookings, driver assignments, and customer management with an intuitive, staff-only web application.",
  keywords: [
    "car rental",
    "staff management",
    "dashboard",
    "car catalog",
    "booking system",
    "calendar interface",
    "driver queuing",
    "emergency handling",
    "customer management",
    "onsite payments",
    "cash payments",
    "card payments",
    "staff confirmation",
    "car rental operations",
    "management tool",
  ],
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logoLight.png",
        type: "image/png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logoDark.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        {children}
        <Toaster />
        <ToastLauncher />
      </body>
    </html>
  );
}
