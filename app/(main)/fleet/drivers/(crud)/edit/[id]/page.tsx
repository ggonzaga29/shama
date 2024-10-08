import { Identification } from '@carbon/icons-react';
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
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'src/components/ui/Breadcrumb';
import EditDriverForm from 'src/modules/drivers/components/EditDriverForm';
import { getDriverById } from 'src/modules/drivers/data';

export default async function EditDriverPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const queryClient = new QueryClient();
  const queryKey = queryKeys.drivers.byId(params.id);

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getDriverById(supabase, params.id),
  });

  return (
    <ContentLayout title={`Edit Driver`} Icon={<Identification />}>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Fleet</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet/drivers">Drivers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border bg-background p-6">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EditDriverForm id={params.id} />
        </HydrationBoundary>
      </div>
    </ContentLayout>
  );
}
