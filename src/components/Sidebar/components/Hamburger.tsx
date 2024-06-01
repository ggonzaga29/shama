"use client";

import { useSidebar } from "src/components/Sidebar/context/DesktopSidebarContext";

const Hamburger = () => {
  const { toggleSidebar } = useSidebar();

  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <div
      className={`group hamburger flex flex-col gap-[7px] items-end cursor-pointer rotate-y`} //  ${isOpen ? "active" : ""}
      onClick={handleClick}
    >
      <span className="block bg-navigation-foreground group-hover:bg-navigation-foreground/90 w-[50px] h-[5px] rounded-full transition-all duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
      <span className="block bg-navigation-foreground group-hover:bg-navigation-foreground/90 w-[40px] h-[5px] rounded-full transition-all duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
      <span className="block bg-navigation-foreground group-hover:bg-navigation-foreground/90 w-[30px] h-[5px] rounded-full transition-all duration-[0.6s] ease-[cubic-bezier(0.22,1,0.36,1)]"></span>
    </div>
  );
};

export default Hamburger;
