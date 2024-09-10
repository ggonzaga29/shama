import { cva } from 'class-variance-authority';
import { FC, forwardRef } from 'react';
import { cn } from 'src/common/utils/cvaUtils';
import PageHeaderBreadcrumbs from 'src/components/PageHeader/PageHeaderBreadcrumbs';

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

const PageHeaderDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn(className)} {...props} />;
});

PageHeaderDescription.displayName = 'PageHeaderDescription';

type PageHeaderProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PageHeader: FC<PageHeaderProps> & {
  Title: typeof PageHeaderTitle;
  Aside: typeof PageHeaderAside;
  Description: typeof PageHeaderDescription;
} = ({ children, className }) => {
  return (
    <header className={cn('mb-12 flex flex-col justify-between', className)}>
      <PageHeaderBreadcrumbs />
      <div className="mt-4 flex items-center justify-between">{children}</div>
    </header>
  );
};

PageHeader.Title = PageHeaderTitle;
PageHeader.Aside = PageHeaderAside;
PageHeader.Description = PageHeaderDescription;

export default PageHeader;
