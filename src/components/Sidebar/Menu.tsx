'use client';

import { Logout, UserSponsor } from '@carbon/icons-react';
import { Ellipsis } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { getMenuList } from 'src/common/lib/menuList';
import { cn } from 'src/common/utils/cvaUtils';
import { CollapseMenuButton } from 'src/components/Sidebar/components/CollapsibleMenuButton';
import { Button } from 'src/components/ui/Button';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';

interface MenuProps {
  isOpen: boolean | undefined;
}

const Menu: FC<MenuProps> = ({ isOpen }) => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <div className="flex h-full flex-col justify-between">
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="mt-4 size-full">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, isAdminGroup, menus }, index) => (
              <li
                className={cn('w-full', groupLabel ? 'pt-5' : '')}
                key={index}
              >
                {(isOpen && groupLabel) || isOpen === undefined ? (
                  <p className="flex max-w-[248px] items-center gap-2 truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                    {groupLabel}{' '}
                    {isAdminGroup && (
                      <UserSponsor className="text-destructive" />
                    )}
                  </p>
                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="flex w-full items-center justify-center">
                          <Ellipsis className="size-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2"></p>
                )}
                {menus.map(
                  ({ href, label, icon: Icon, active, submenus }, index) =>
                    submenus.length === 0 ? (
                      <div className="w-full" key={index}>
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={active ? 'secondary' : 'ghost'}
                                className="mb-1 h-10 w-full justify-start"
                                asChild
                              >
                                <Link href={href}>
                                  <span
                                    className={cn(
                                      isOpen === false ? '' : 'mr-4'
                                    )}
                                  >
                                    <Icon size={18} />
                                  </span>
                                  <p
                                    className={cn(
                                      'max-w-[200px] truncate',
                                      isOpen === false
                                        ? '-translate-x-96 opacity-0'
                                        : 'translate-x-0 opacity-100'
                                    )}
                                  >
                                    {label}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                              <TooltipContent side="right">
                                {label}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      <div className="w-full" key={index}>
                        <CollapseMenuButton
                          icon={Icon}
                          label={label}
                          active={active}
                          submenus={submenus}
                          isOpen={isOpen}
                        />
                      </div>
                    )
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="flex w-full items-end">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <EnhancedButton
                onClick={() => {}}
                // variant="outline"
                className="mb-2 mt-5 h-10 w-full justify-center"
              >
                <span className={cn(isOpen === false ? '' : 'mr-2')}>
                  <Logout size={16} />
                </span>
                <p
                  className={cn(
                    // "whitespace-nowrap",
                    isOpen === false ? 'hidden opacity-0' : 'opacity-100'
                  )}
                >
                  Sign out
                </p>
              </EnhancedButton>
            </TooltipTrigger>
            {isOpen === false && (
              <TooltipContent side="right">Sign out</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Menu;
