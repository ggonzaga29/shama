'use client';

import { cn } from 'src/common/utils/cvaUtils';
import Menu from 'src/components/Sidebar/Menu';
import SidebarToggle from 'src/components/Sidebar/components/SidebarToggle';
import { useSidebar } from 'src/components/Sidebar/context/SidebarContext';
import SupabaseImage from 'src/components/SupabaseImage';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { theme } = useTheme();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full select-none transition-[width] duration-300 ease-in-out lg:translate-x-0',
        isOpen === false ? 'w-[90px]' : 'w-72'
      )}
    >
      <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="relative flex h-full flex-col px-3 py-4 shadow-md dark:shadow-zinc-800">
        <div className="relative flex w-full items-center justify-center py-4">
          <div className="absolute">
            <SupabaseImage
              src="assets/images/logoDarkWithText.png"
              alt="Logo"
              width={100}
              height={37}
              className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} ${theme === 'dark' ? 'invert-0' : 'invert'}`}
            />
          </div>
          <div className="absolute">
            <SupabaseImage
              src={
                theme === 'dark'
                  ? 'assets/images/logoDark.png'
                  : 'assets/images/logoLight.png'
              }
              alt="Logo"
              width={20}
              height={37}
              className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
        </div>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
};

export default Sidebar;
