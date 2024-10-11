'use client';

import { useQuery } from '@tanstack/react-query';
import DriverListCard from 'app/drivers/components/DriverListCard';
import { getAllDrivers } from 'app/drivers/data';
import { useEffect } from 'react';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Input } from 'src/components/ui/Input';

const DriverList = () => {
  const supabase = createBrowserClient();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.drivers.all,
    queryFn: () => getAllDrivers(supabase),
  });

  useEffect(() => {
    console.log('isLoading', isLoading);

    console.log('data', data);
  }, [data, isLoading]);

  return (
    <div className="flex max-h-full flex-col overflow-y-scroll">
      <div className="sticky top-0 z-10 bg-background p-4 shadow-md dark:border-b">
        <Input placeholder="Search drivers" />
      </div>
      {!isLoading &&
        data &&
        data?.map((driver) => (
          <DriverListCard key={driver.id} driver={driver} />
        ))}
    </div>
  );
};

export default DriverList;
