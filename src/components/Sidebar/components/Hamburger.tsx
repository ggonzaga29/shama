'use client';

import { useSidebar } from 'src/components/Sidebar/context/SidebarContext';

const Hamburger = () => {
  const { toggleSidebar } = useSidebar();

  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <div
      className={`hamburger rotate-y group flex cursor-pointer flex-col items-end gap-[7px]`} //  ${isOpen ? "active" : ""}
      onClick={handleClick}
    >
      <span className="duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] block h-[5px] w-[50px] rounded-full bg-navigation-foreground transition-all group-hover:bg-navigation-foreground/90"></span>
      <span className="duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] block h-[5px] w-[40px] rounded-full bg-navigation-foreground transition-all group-hover:bg-navigation-foreground/90"></span>
      <span className="duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)] block h-[5px] w-[30px] rounded-full bg-navigation-foreground transition-all group-hover:bg-navigation-foreground/90"></span>
    </div>
  );
};

export default Hamburger;
