"use client";

import { Link } from "next-view-transitions";
import { FC } from "react";
import LogoWithText from "src/assets/LogoWithText";
import { cn } from "src/common/utils/cvaUtils";
import {
  BarChart4,
  BarChartHorizontalBig,
  BookUser,
  CarFront,
  Construction,
  Database,
  Gauge,
  PersonStanding,
} from "lucide-react";
import slugs from "src/common/lib/slugs";
import { comparePathnames } from "src/common/utils/pathnameUtils";
import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { useSidebar } from "src/components/Sidebar/context/DesktopSidebarContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/Tooltip";
import Logo from "src/assets/Logo";

type DesktopSidebarPrimitiveProps = {
  children: React.ReactNode;
  className?: string;
};

const desktopSidebarPrimitiveVariants = cva(
  [
    "grow pt-4 flex flex-col justify-between rounded-none bg-navigation text-navigation-foreground border-none",
    "transition-all duration-300 ease-[cubic-bezier(0.65,0.05,0.36,1)]",
  ],
  {
    variants: {
      open: {
        true: "w-[15rem]",
        false: "w-[5rem]",
      },
    },
    defaultVariants: {
      open: true,
    },
  }
);

const DesktopSidebarPrimitive: FC<DesktopSidebarPrimitiveProps> = ({
  children,
  className,
}) => {
  const { isOpen } = useSidebar();

  return (
    <motion.div
      className={cn(
        "relative select-none",
        desktopSidebarPrimitiveVariants({ open: isOpen }),
        className
      )}
    >
      {children}
      {/* <Button variant="outline" onClick={() => toggleSidebar()} className="absolute top-6 -right-2 h-auto p-1 rounded-lg">
        <ChevronRight className={
          cn(
            "w-4 h-4 transition-transform",
            isOpen ? "transform rotate-180" : "transform rotate-0"
          )
        } />
      </Button> */}
    </motion.div>
  );
};

type DesktopSidebarMenuItemGroupProps = {
  children: React.ReactNode;
  label: string;
};

const DesktopSidebarMenuItemGroup: FC<DesktopSidebarMenuItemGroupProps> = ({
  children,
  label,
}) => {
  const { isOpen } = useSidebar();

  return (
    <div className={cn("", isOpen ? "px-4 my-4 " : "")}>
      {isOpen ? (
        <div
          className={cn(
            "text-navigation-separator-foreground text-xs font-semibold uppercase px-2 py-2",
            !isOpen ? "flex justify-center" : ""
          )}
        >
          {label}
        </div>
      ) : null}
      {children}
    </div>
  );
};

type DesktopSidebarMenuItemProps = {
  children: React.ReactNode;
  Icon?: React.ComponentType<{ className?: string }>;
  href: string;
};

const desktopSidebarMenuItemCls = cva(
  ["transition-colors px-4 py-5 flex items-center text-sm rounded-lg relative"],
  {
    variants: {
      active: {
        true: "bg-navigation-button-active text-navigation-button-active-foreground hover:bg-navigation-button-active-hover hover:text-navigation-button-active-foreground",
        false:
          "text-navigation-button-foreground hover:bg-navigation-button-hover hover:text-navigation-button-active-foreground",
      },
    },
  }
);

const DesktopSidebarMenuItem: FC<DesktopSidebarMenuItemProps> = ({
  children,
  href,
  Icon,
}) => {
  const pathname = usePathname();
  const active = comparePathnames(pathname, href);
  const { isOpen } = useSidebar();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.1}>
        <TooltipTrigger asChild>
          <div>
            <Link
              href={href}
              className={cn(
                desktopSidebarMenuItemCls({ active }),
                isOpen ? "justify-start" : "justify-center rounded-none"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-4 h-4 mr-2",
                    active ? "text-navigation-button-active-foreground" : "",
                    !isOpen ? "w-5 h-5" : "w-4 h-4"
                  )}
                />
              )}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ position: "absolute" }}
                    className="pl-6"
                  >
                    {children}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className={isOpen ? "opacity-0" : "opacity-100"}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

type DesktopSidebarMenuProps = {
  children?: React.ReactNode;
  className?: string;
};

const DesktopSidebarMenu: FC<DesktopSidebarMenuProps> = ({
  className,
  children,
}) => {
  return <nav className={cn("", className)}>{children}</nav>;
};

type DesktopSidebarFooterProps = {
  children: React.ReactNode;
  className?: string;
};

const DesktopSidebarFooter: FC<DesktopSidebarFooterProps> = ({
  children,
  className,
}) => {
  return <footer className={cn("mt-auto", className)}>{children}</footer>;
};

const DesktopSidebar = () => {
  const { isMobile, isOpen } = useSidebar();

  return (
    <DesktopSidebarPrimitive className={isMobile ? "hidden" : "flex"}>
      <div
        className={cn(
          "transition-opacity duration-150",
          isMobile ? "delay-0 opacity-0" : "delay-300 opacity-100"
        )}
      >
        <div className="flex items-center justify-center">
          {isOpen ? (
            <LogoWithText className="max-w-36" />
          ) : (
            <Logo theme="dark" className="max-w-8" />
          )}
        </div>

        <DesktopSidebarMenu className="mt-8">
          <DesktopSidebarMenuItemGroup label="Main">
            <DesktopSidebarMenuItem href={slugs.DASHBOARD} Icon={Gauge}>
              Dashboard
            </DesktopSidebarMenuItem>
          </DesktopSidebarMenuItemGroup>

          <DesktopSidebarMenuItemGroup label="Analytics">
            <DesktopSidebarMenuItem href="/settings" Icon={BarChart4}>
              Financial Reports
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href="/settings" Icon={Database}>
              Power BI
            </DesktopSidebarMenuItem>
          </DesktopSidebarMenuItemGroup>

          <DesktopSidebarMenuItemGroup label="Management">
            <DesktopSidebarMenuItem href={slugs.CARS} Icon={CarFront}>
              Car Catalogue
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem
              href={slugs.CAR_MAINTENANCE}
              Icon={Construction}
            >
              Car Maintenance
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href={slugs.CLIENTS} Icon={BookUser}>
              Clients
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href={slugs.DRIVERS} Icon={PersonStanding}>
              Drivers
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href={slugs.USERS} Icon={PersonStanding}>
              Users
            </DesktopSidebarMenuItem>
          </DesktopSidebarMenuItemGroup>

          <DesktopSidebarMenuItemGroup label="Configuration">
            <DesktopSidebarMenuItem
              href="/settings"
              Icon={BarChartHorizontalBig}
            >
              Booking Chart
            </DesktopSidebarMenuItem>
          </DesktopSidebarMenuItemGroup>
        </DesktopSidebarMenu>
      </div>
    </DesktopSidebarPrimitive>
  );
};

DesktopSidebar.Menu = DesktopSidebarMenu;
DesktopSidebar.Primitive = DesktopSidebarPrimitive;
DesktopSidebar.MenuItem = DesktopSidebarMenuItem;
DesktopSidebar.MenuItemGroup = DesktopSidebarMenuItemGroup;

export default DesktopSidebar;
