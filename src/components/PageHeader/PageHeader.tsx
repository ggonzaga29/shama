import { cva } from 'class-variance-authority';
import { FC, forwardRef } from 'react';
import { cn } from 'src/common/utils/cvaUtils';

type PageHeaderTitleProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const pageHeaderTitleVariants = cva('flex items-center gap-2', {
  variants: {
    as: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-bold',
      h4: 'text-xl font-bold',
      h5: 'text-lg font-bold',
      h6: 'text-base font-bold',
    },
  },
  defaultVariants: {
    as: 'h1',
  },
});

const PageHeaderTitle = forwardRef<HTMLHeadingElement, PageHeaderTitleProps>(
  ({ as = 'h1', children, Icon, ...props }, ref) => {
    const Comp = as;

    return (
      <Comp ref={ref} className={pageHeaderTitleVariants({ as })} {...props}>
        {Icon && <Icon className="size-6 text-primary/60" />}

        {children}
      </Comp>
    );
  }
);

PageHeaderTitle.displayName = 'PageHeaderTitle';

const PageHeaderAside = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn('flex items-center gap-4', className)}
      {...props}
    />
  );
});

PageHeaderAside.displayName = 'PageHeaderAside';

type PageHeaderProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PageHeader: FC<PageHeaderProps> & {
  Title: typeof PageHeaderTitle;
  Aside: typeof PageHeaderAside;
} = ({ children, className }) => {
  return (
    <section
      className={cn('mb-12 flex items-center justify-between', className)}
    >
      {children}
    </section>
  );
};

PageHeader.Title = PageHeaderTitle;
PageHeader.Aside = PageHeaderAside;

export default PageHeader;
