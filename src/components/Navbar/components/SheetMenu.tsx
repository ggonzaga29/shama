import { Menu as MenuIcon } from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import Menu from 'src/components/Sidebar/Menu';
import { Button } from 'src/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from 'src/components/ui/Sheet';

const SheetMenu = () => {
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
                  <Image
                    src="assets/images/logoDarkWithText.png"
                    alt="Logo"
                    width={100}
                    height={37}
                    className={`invert transition-opacity duration-300 dark:invert-0`}
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
};

export default SheetMenu;
