import { Car } from '@carbon/icons-react';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';

export default async function CarDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  return (
    <ContentLayout title="Vehicle Inventory" Icon={<Car className="size-6" />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={'/'}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cars</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {params.slug}
    </ContentLayout>
  );
}
