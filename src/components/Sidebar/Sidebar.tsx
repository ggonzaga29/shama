'use client';

import Image from 'next/image';
import { cn } from 'src/common/utils/cvaUtils';
import SidebarToggle from 'src/components/Sidebar/components/SidebarToggle';
import { useSidebar } from 'src/components/Sidebar/context/SidebarContext';
import Menu from 'src/components/Sidebar/Menu';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full select-none transition-[width] duration-300 ease-in-out lg:translate-x-0',
        !isOpen ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="relative flex h-full flex-col px-3 py-4 shadow-md dark:shadow-zinc-800">
        <div className="relative flex w-full items-center justify-center py-4">
          <div className="absolute">
            <Image
              src="assets/images/logoDarkWithText.png"
              alt="Logo"
              width={100}
              height={37}
              className={`invert transition-opacity duration-300 dark:invert-0 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          <div className="absolute">
            <Image
              src="assets/images/logoDark.png"
              alt="Logo"
              width={20}
              height={37}
              className={`invert transition-opacity duration-300 dark:invert-0 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
