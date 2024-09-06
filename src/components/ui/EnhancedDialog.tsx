'use client';

import * as React from 'react';

import { cn } from 'src/common/utils/cvaUtils';
import useMediaQuery from 'src/common/hooks/useMediaQuery';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/Dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from 'src/components/ui/Drawer';

interface BaseProps {
  children: React.ReactNode;
}

interface RootEnhancedDialogProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface EnhancedDialogProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = '(min-width: 768px)';

const EnhancedDialog = ({ children, ...props }: RootEnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? Dialog : Drawer;

  return <Component {...props}>{children}</Component>;
};

const EnhancedDialogTrigger = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogClose = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogClose : DrawerClose;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogContent = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogContent : DrawerContent;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogDescription = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogHeader = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogTitle = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

const EnhancedDialogBody = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  );
};

const EnhancedDialogFooter = ({
  className,
  children,
  ...props
}: EnhancedDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const Component = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

export {
  EnhancedDialog,
  EnhancedDialogBody,
  EnhancedDialogClose,
  EnhancedDialogContent,
  EnhancedDialogDescription,
  EnhancedDialogFooter,
  EnhancedDialogHeader,
  EnhancedDialogTitle,
  EnhancedDialogTrigger,
};
