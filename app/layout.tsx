import type { Metadata } from "next";
import { cn } from "src/common/utils/cvaUtils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "src/components/ui/Toaster";
import "src/theme/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shama Dashboard",
  description: "Website description",
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
    <html lang="en" suppressHydrationWarning >
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
