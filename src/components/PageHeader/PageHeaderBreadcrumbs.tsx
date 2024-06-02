'use client';

import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

const PageHeaderBreadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = pathname.split('/').slice(1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          const capitalizedBreadcrumb =
            breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{capitalizedBreadcrumb}</BreadcrumbPage>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${breadcrumb}`}>
                    {capitalizedBreadcrumb}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageHeaderBreadcrumbs;
