import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import useSupabaseServer from 'src/common/lib/supabase/useSupabaseServer';
import PageHeader from 'src/components/PageHeader/PageHeader';
import { getCarVariantList } from 'src/modules/cars/actions';
import CarForm from 'src/modules/cars/components/CarForm/CarForm';

export default async function CarFormPage() {
  const cookieStore = cookies();
  const client = useSupabaseServer(cookieStore);
  const queryClient = new QueryClient();

  await prefetchQuery(queryClient, getCarVariantList(client));

  return (
    <div>
      <PageHeader>
        <PageHeader.Title as="h2">Car Form</PageHeader.Title>

        <PageHeader.Aside></PageHeader.Aside>
      </PageHeader>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarForm />
      </HydrationBoundary>
    </div>
  );
}
