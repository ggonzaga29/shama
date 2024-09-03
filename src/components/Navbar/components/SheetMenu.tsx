'use client';

import Link from 'next/link';
import { Menu as MenuIcon } from '@carbon/icons-react';

import { Button } from 'src/components/ui/Button';
import Menu from 'src/components/Sidebar/Menu';
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from 'src/components/ui/Sheet';
import { useTheme } from 'next-themes';
import SupabaseImage from 'src/components/SupabaseImage';

export function SheetMenu() {
  const { theme } = useTheme();

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="ghost" size="icon">
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center justify-center pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="relative flex w-full items-center justify-center py-4">
                <div className="absolute">
                  <SupabaseImage
                    src={
                      theme === 'dark'
                        ? 'assets/images/logoDarkWithText.png'
                        : 'assets/images/logoLightWithText.png'
                    }
                    alt="Logo"
                    width={100}
                    height={37}
                    className={`transition-opacity duration-300`}
                  />
                </div>
              </div>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
