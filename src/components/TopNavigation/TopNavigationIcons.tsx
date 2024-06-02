'use client';

import { Bell, Bug, Fullscreen } from 'lucide-react';
import React, { FC } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/Tooltip';

type IconProps = {
  children: React.ReactNode;
  label: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Icon: FC<IconProps> = ({ children, label, onClick }) => (
  <TooltipProvider delayDuration={600}>
    <Tooltip>
      <TooltipTrigger>
        <div
          className="flex h-full items-center justify-center rounded-md p-2 transition-colors hover:bg-navigation-button-hover"
          onClick={onClick}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent sideOffset={8} className="text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const TopNavigationIcons = () => {
  const handleEnableFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="flex h-full items-center gap-4">
      <Icon label="Toggle Fullscreen" onClick={handleEnableFullscreen}>
        <Fullscreen className="size-5" />
      </Icon>
      <Icon label="Notifications">
        <Bell className="size-5" />
      </Icon>
      <Icon label="Report a bug">
        <Bug className="size-5" />
      </Icon>
    </div>
  );
};

export default TopNavigationIcons;
