import { Car } from '@carbon/icons-react';
import { Suspense } from 'react';
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
import CarGrid from 'src/modules/cars/components/CarGrid';
import CarGridSkeleton from 'src/modules/cars/components/CarGridSkeleton';

export default async function CarsPage() {
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

      <Suspense fallback={<CarGridSkeleton />}>
        <CarGrid />
      </Suspense>
    </ContentLayout>
  );
}
