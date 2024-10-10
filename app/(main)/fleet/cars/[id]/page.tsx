import { InventoryManagement } from '@carbon/icons-react';
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
import { getCarById } from 'src/modules/cars/data';
import CarDetailPage from 'src/modules/cars/page/CarDetailPage';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = createServerClient();
  const queryClient = new QueryClient();
  const queryKey = queryKeys.cars.byId(params.id);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getCarById(supabase, params.id),
  });

  return (
    <ContentLayout
      title={`Edit Car ${params.id}`}
      Icon={<InventoryManagement />}
    >
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbBackButtton />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbEllipsis />
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet/cars">Cars</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border bg-background">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CarDetailPage id={params.id} />
        </HydrationBoundary>
      </div>
    </ContentLayout>
  );
}
