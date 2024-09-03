import { SheetMenu } from 'src/components/Navbar/components/SheetMenu';
import { ModeToggle } from 'src/components/Navbar/components/ModeToggle';
import { UserNav } from 'src/components/Navbar/components/UserNav';
import FullScreenToggle from 'src/components/Navbar/components/FullScreenToggle';

interface NavbarProps {
  title: string;
  Icon?: React.ReactNode;
}

export function Navbar({ title, Icon }: NavbarProps) {

  
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <div className="flex gap-2 items-center justify-center">
            {Icon}
            <h1 className="font-bold">{title}</h1>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <FullScreenToggle/>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
