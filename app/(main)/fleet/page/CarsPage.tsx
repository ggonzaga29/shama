import { Car } from '@carbon/icons-react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createServerClient } from 'src/common/lib/supabase/serverClient';
import ContentLayout from 'src/components/ContentLayout';
import {
  Breadcrumb,
  BreadcrumbBackButtton,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import CarGrid from 'app/fleet/components/CarGrid';
import { getAllCars } from 'app/fleet/data';

export default async function CarsPage() {
  const supabase = createServerClient();
  const queryClient = new QueryClient();
  const queryKey = queryKeys.cars.all;

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getAllCars(supabase),
  });

  return (
    <ContentLayout title="Vehicle Inventory" Icon={<Car className="size-6" />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbBackButtton />
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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarGrid />
      </HydrationBoundary>
    </ContentLayout>
  );
}
