import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Download, Plus } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import useSupabaseServer from 'src/common/lib/supabase/useSupabaseServer';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { EnhancedButton } from 'src/components/ui/EnhancedButton';
import { getAllCars } from 'src/modules/cars/actions';
import CarGrid from 'src/modules/cars/components/CarGrid';

export default async function CarsPage() {
  const queryClient = new QueryClient();
  const cookieStore = cookies();
  const supabase = useSupabaseServer(cookieStore);

  await prefetchQuery(queryClient, getAllCars(supabase));

  return (
    <>
      <PageHeader>
        <PageHeader.Title as="h2">Car Catalogue</PageHeader.Title>

        <PageHeader.Aside>
          <Link href="/cars/form">
            <EnhancedButton variant="gooeyRight" Icon={Plus}>
              Add Car
            </EnhancedButton>
          </Link>
          <EnhancedButton
            variant="gooeyRight"
            Icon={Download}
            iconPlacement="left"
          >
            Export Data
          </EnhancedButton>
        </PageHeader.Aside>
      </PageHeader>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarGrid />
      </HydrationBoundary>
    </>
  );
}
