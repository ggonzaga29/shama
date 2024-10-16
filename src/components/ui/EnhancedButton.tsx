import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';
import { cn } from 'src/common/utils/cvaUtils';

const enhancedButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        expandIcon:
          'group relative bg-primary text-primary-foreground hover:bg-primary/90',
        ringHover:
          'bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2',
        shine:
          'animate-shine bg-gradient-to-r from-primary via-primary/75 to-primary bg-[length:400%_100%] text-primary-foreground ',
        gooeyRight:
          'relative z-0 overflow-hidden bg-primary from-zinc-400 text-primary-foreground transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:transition-transform before:duration-1000  hover:before:translate-x-0 hover:before:translate-y-0 ',
        gooeyLeft:
          'relative z-0 overflow-hidden bg-primary from-zinc-400 text-primary-foreground transition-all duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:transition-transform after:duration-1000  hover:after:translate-x-0 hover:after:translate-y-0 ',
        linkHover1:
          'relative after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0',
        linkHover2:
          'relative after:absolute after:bottom-2 after:h-px after:w-2/3 after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface IconProps {
  Icon: React.ElementType;
  iconPlacement?: 'left' | 'right';
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export type EnhancedButtonIconProps = IconProps | IconRefProps;

const EnhancedButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & EnhancedButtonIconProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon,
      iconPlacement = 'left',
      loading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(enhancedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        <div
          className={cn(
            'w-0 pl-0 opacity-0 transition-all duration-200',
            iconPlacement === 'left'
              ? `translate-x-[0%] ${loading ? 'translate-x-100 w-5 pr-2 opacity-100' : ''}`
              : `translate-x-[100%] ${
                  loading ? 'w-5 translate-x-0 pl-2 opacity-100' : ''
                }`,
            'group-hover:opacity-0 group-hover:transition-none'
          )}
        >
          <LoaderCircle className="size-4 animate-spin" />
        </div>

        {Icon && iconPlacement === 'left' && (
          <div className="group-hover:translate-x-100 w-0 translate-x-0 pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:pr-2 group-hover:opacity-100">
            {!loading ? (
              <Icon className="size-4" />
            ) : (
              <LoaderCircle className="size-4 animate-spin" />
            )}
          </div>
        )}

        {/* Render Icon on other variants */}
        {Icon && variant !== 'expandIcon' && <Icon className="mr-2 size-4" />}

        {props.children}
        {Icon && iconPlacement === 'right' && (
          <div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            {!loading ? (
              <Icon className="size-4" />
            ) : (
              <LoaderCircle className="size-4 animate-spin" />
            )}
          </div>
        )}
      </Comp>
    );
  }
);
EnhancedButton.displayName = 'Button';

export { EnhancedButton, enhancedButtonVariants };
