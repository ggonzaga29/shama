"use client";

import React, { FC } from "react";
import { Fullscreen, Bug, Bell } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/Tooltip";

type IconProps = {
  children: React.ReactNode;
  label: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Icon: FC<IconProps> = ({ children, label, onClick }) => (
  <TooltipProvider delayDuration={600}>
    <Tooltip>
      <TooltipTrigger>
        <div
          className="flex items-center justify-center h-full p-2 transition-colors hover:bg-navigation-button-hover rounded-md"
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
    <div className="h-full flex items-center gap-4">
      <Icon label="Toggle Fullscreen" onClick={handleEnableFullscreen}>
        <Fullscreen className="h-5 w-5" />
      </Icon>
      <Icon label="Notifications">
        <Bell className="h-5 w-5" />
      </Icon>
      <Icon label="Report a bug">
        <Bug className="h-5 w-5" />
      </Icon>
    </div>
  );
};

export default TopNavigationIcons;
