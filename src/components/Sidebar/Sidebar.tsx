'use client';

import Link from 'next/link';
import { PanelsTopLeft } from 'lucide-react';

import { cn } from 'src/common/utils/cvaUtils';
import { Button } from 'src/components/ui/Button';
import Menu from 'src/components/Sidebar/Menu';
import SidebarToggle from 'src/components/Sidebar/components/SidebarToggle';
import Image from 'next/image';
import { useSidebar } from 'src/components/Sidebar/context/SidebarContext';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'mb-1 transition-transform duration-300 ease-in-out',
            isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
