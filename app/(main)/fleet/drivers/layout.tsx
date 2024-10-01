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
  children,
  driverDetailView,
}: {
  children: React.ReactNode;
  driverDetailView: React.ReactNode;
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

      <div className="flex max-h-[85vh] gap-2 border bg-background">
        {children}
        {driverDetailView}
      </div>
    </ContentLayout>
  );
}
