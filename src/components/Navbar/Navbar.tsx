import FullScreenToggle from 'src/components/Navbar/components/FullScreenToggle';
import ModeToggle from 'src/components/Navbar/components/ModeToggle';
import NotificationMenu from 'src/components/Navbar/components/NotificationMenu';
import SheetMenu from 'src/components/Navbar/components/SheetMenu';
import UserNav from 'src/components/Navbar/components/UserNav';

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
          <div className="flex items-center justify-center gap-2">
            {Icon}
            <h1 className="font-bold">{title}</h1>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1">
          <FullScreenToggle />
          <ModeToggle />
          <NotificationMenu />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
