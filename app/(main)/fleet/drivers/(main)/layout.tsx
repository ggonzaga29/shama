import { Identification } from '@carbon/icons-react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

export default function DriversLayout({
  detail,
  list,
}: {
  list: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <ContentLayout title="Drivers" Icon={<Identification />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Fleet</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Drivers</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex size-full max-h-[82vh] border bg-background">
        {list}
        {detail}
      </div>
    </ContentLayout>
  );
}

export const dynamic = 'force-dyna  mic';
