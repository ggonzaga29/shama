'use client';

import { Add } from '@carbon/icons-react';
import { useQuery } from '@tanstack/react-query';
import CarGridCard from 'app/fleet/components/CarGridCard';
import CarGridSkeleton from 'app/fleet/components/CarGridSkeleton';
import { getAllCars } from 'app/fleet/data';
import Link from 'next/link';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Button } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';

export default function CarGrid() {
  const supabase = createBrowserClient();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.cars.all,
    queryFn: () => getAllCars(supabase),
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Input placeholder="Search for a vehicle" />
        </div>

        <Link href="/fleet/cars/add">
          <Button variant="outline" className="flex items-center gap-2">
            <Add size={16} />
            Add Vehicle
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <CarGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data?.map((car) => <CarGridCard key={car.id} car={car} />)}
        </div>
      )}
    </div>
  );
}
