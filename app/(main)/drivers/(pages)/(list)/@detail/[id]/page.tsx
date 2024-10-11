import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { DriverDetail } from 'app/drivers/components/DriverDetail';
import { getDriverById } from 'app/drivers/data';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createServerClient } from 'src/common/lib/supabase/serverClient';

export default async function DriverDetailPage({
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DriverDetail id={params.id} />
    </HydrationBoundary>
  );
}
