"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "src/components/ui/Card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "src/components/ui/Breadcrumb";
import { usePathname } from "next/navigation";
import { getSlugByPathname } from "src/common/lib/slugs";
import { generateBreadcrumb } from "src/common/utils/pathnameUtils";

interface PageHeaderProps {}

const PageHeader: FC<PageHeaderProps> = () => {
  const pathname = usePathname();
  const slugKey = getSlugByPathname(pathname)?.toLocaleLowerCase();
  const breadcrumb = generateBreadcrumb(pathname);

  return (
    <Card className="flex-shrink-0 rounded-none border-l-0">
      <CardContent className="flex justify-between px-6 py-4">
        <div className="flex gap-4 items-center">
          <CardTitle className="capitalize text-lg">{slugKey}</CardTitle>
          <CardDescription>
            {/* <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.length > 0 && breadcrumb.map((item, index) => (
                  <div key={item.path} className="flex items-center gap-2">
                    <BreadcrumbItem>
                      <BreadcrumbLink href={item.path} className="capitalize">
                        {item.name?.toLowerCase()}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb> */}
          </CardDescription>
        </div>

        <div>
          <p>User Profile</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeader;
