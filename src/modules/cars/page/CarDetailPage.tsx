'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { getCarById } from 'src/modules/cars/data';

const CarDetailPage = ({ id }: { id: string }) => {
  const supabase = createBrowserClient();
  const { data } = useQuery({
    queryKey: queryKeys.cars.byId(id),
    queryFn: () => getCarById(supabase, id),
  });

  return <div>{data?.name}</div>;
};

export default CarDetailPage;
