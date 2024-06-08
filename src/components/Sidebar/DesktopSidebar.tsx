'use client';

import { cva } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart4,
  BarChartHorizontalBig,
  BookUser,
  CarFront,
  Construction,
  Database,
  Gauge,
  PersonStanding,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import Logo from 'src/assets/Logo';
import LogoWithText from 'src/assets/LogoWithText';
import slugs from 'src/common/lib/slugs';
import { cn } from 'src/common/utils/cvaUtils';
import { comparePathnames } from 'src/common/utils/pathnameUtils';
import { useSidebar } from 'src/components/Sidebar/context/DesktopSidebarContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';

type DesktopSidebarPrimitiveProps = {
  children: React.ReactNode;
  className?: string;
};

const desktopSidebarPrimitiveVariants = cva(
  [
    'flex grow flex-col justify-between rounded-none border-none bg-navigation pt-4 text-navigation-foreground',
    'ease-[cubic-bezier(0.65,0.05,0.36,1)] transition-all duration-300',
  ],
  {
    variants: {
      open: {
        true: 'w-60',
        false: 'w-20',
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
        'relative select-none',
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
    <div className={cn('', isOpen ? 'my-4 px-4' : '')}>
      {isOpen ? (
        <div
          className={cn(
            'px-2 py-2 text-xs font-semibold uppercase text-navigation-separator-foreground',
            !isOpen ? 'flex justify-center' : ''
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
  ['relative flex items-center rounded-lg px-4 py-5 text-sm transition-colors'],
  {
    variants: {
      active: {
        true: 'bg-navigation-button-active text-navigation-button-active-foreground hover:bg-navigation-button-active-hover hover:text-navigation-button-active-foreground',
        false:
          'text-navigation-button-foreground hover:bg-navigation-button-hover hover:text-navigation-button-active-foreground',
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
                isOpen ? 'justify-start' : 'justify-center rounded-none'
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    'mr-2 h-4 w-4',
                    active ? 'text-navigation-button-active-foreground' : '',
                    !isOpen ? 'h-5 w-5' : 'h-4 w-4'
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
                    style={{ position: 'absolute' }}
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
          className={isOpen ? 'opacity-0' : 'opacity-100'}
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
  return <nav className={cn('', className)}>{children}</nav>;
};

const DesktopSidebar = () => {
  const { isMobile, isOpen } = useSidebar();

  return (
    <DesktopSidebarPrimitive className={isMobile ? 'hidden' : 'flex'}>
      <div
        className={cn(
          'transition-opacity duration-150',
          isMobile ? 'opacity-0 delay-0' : 'opacity-100 delay-300'
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
