'use client';

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query';
import useSupabaseBrowser from 'src/common/lib/supabase/useSupabaseClient';
import { getAllCars } from 'src/modules/cars/actions';
import CarGridCard from 'src/modules/cars/components/CarGridCard';

const CarGrid = () => {
  const client = useSupabaseBrowser();
  const { data: cars, isLoading } = useQuery(getAllCars(client));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {cars?.map((car) => <CarGridCard key={car.id} car={car} />)}
    </div>
  );
};

export default CarGrid;
