import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllDrivers } from 'app/drivers/data';
import dynamic from 'next/dynamic';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createServerClient } from 'src/common/lib/supabase/serverClient';

const DriverList = dynamic(() => import('app/drivers/components/DriverList'));

export default async function DriverListPage() {
  const supabase = createServerClient();
  const queryClient = new QueryClient();
  const queryKey = queryKeys.drivers.all;

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getAllDrivers(supabase),
  });

  return (
    <div className="w-full max-w-[350px]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DriverList />
      </HydrationBoundary>
    </div>
  );
}
