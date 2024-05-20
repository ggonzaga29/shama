"use client";

import Link from "next/link";
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

type DesktopSidebarPrimitiveProps = {
  children: React.ReactNode;
  className?: string;
};

const DesktopSidebarPrimitive: FC<DesktopSidebarPrimitiveProps> = ({
  children,
  className,
}) => {
  return (
    <aside className={cn("basis-[15rem] grow bg-card pt-4 flex flex-col justify-between", className)}>
      {children}
    </aside>
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
    <div className="my-4">
      <div className="text-muted-foreground text-xs font-semibold uppercase px-6 py-2">
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

const DesktopSidebarMenuItem: FC<DesktopSidebarMenuItemProps> = ({
  children,
  href,
  Icon,
}) => {
  return (
    <div className="transition-colors hover:bg-card-foreground/5 pl-6 py-4 hover:border-r-4 border-primary flex items-center text-sm">
      {Icon && <Icon className="w-4 h-4  mr-4" />}
      <Link href={href}>{children}</Link>
    </div>
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
  return (
    <DesktopSidebarPrimitive>
      <div>
        <div className="flex items-center justify-center">
          <LogoWithText className="max-w-36" />
        </div>

        <DesktopSidebarMenu className="mt-8">
          <DesktopSidebarMenuItemGroup label="Main">
            <DesktopSidebarMenuItem href="/dashboard" Icon={Gauge}>
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
            <DesktopSidebarMenuItem href="/settings" Icon={CarFront}>
              Car Catalogue
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href="/settings" Icon={Construction}>
              Car Maintenance
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href="/settings" Icon={BookUser}>
              Clients
            </DesktopSidebarMenuItem>
            <DesktopSidebarMenuItem href="/settings" Icon={PersonStanding}>
              Drivers
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

      <DesktopSidebarFooter>user</DesktopSidebarFooter>
    </DesktopSidebarPrimitive>
  );
};

DesktopSidebar.Menu = DesktopSidebarMenu;
DesktopSidebar.Primitive = DesktopSidebarPrimitive;
DesktopSidebar.MenuItem = DesktopSidebarMenuItem;
DesktopSidebar.MenuItemGroup = DesktopSidebarMenuItemGroup;

export default DesktopSidebar;
