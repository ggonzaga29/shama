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
import { Card } from "src/components/ui/Card";
import slugs from "src/common/lib/slugs";
import { comparePathnames } from "src/common/utils/pathnameUtils";
import { cva } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { useSidebar } from "src/components/Sidebar/context/DesktopSidebarContext";

type DesktopSidebarPrimitiveProps = {
  children: React.ReactNode;
  className?: string;
};

const desktopSidebarPrimitiveVariants = cva(
  [
    "grow pt-4 flex flex-col justify-between rounded-none bg-navigation text-navigation-foreground border-none",
    "transition-all duration-500 ease-[cubic-bezier(0.65,0.05,0.36,1)]",
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
    <Card
      className={cn(
        desktopSidebarPrimitiveVariants({ open: isOpen }),
        className
      )}
    >
      {children}
    </Card>
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
  return (
    <div className="my-4 px-4">
      <div className="text-navigation-separator-foreground text-xs font-semibold uppercase px-2 py-2">
        {label}
      </div>
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
  ["transition-colors px-4 py-4 flex items-center text-sm rounded-lg"],
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

  return (
    <Link href={href}>
      <div className={desktopSidebarMenuItemCls({ active })}>
        {Icon && <Icon className="w-4 h-4  mr-4" />}
        {children}
      </div>
    </Link>
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
  const { isMobile } = useSidebar();

  return (
    <DesktopSidebarPrimitive className={isMobile ? "w-0" : ""}>
      <div
        className={cn(
          "transition-opacity duration-150",
          isMobile ? "delay-0 opacity-0" : "delay-300 opacity-100"
        )}
      >
        <div className="flex items-center justify-center">
          <LogoWithText className="max-w-36" />
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
