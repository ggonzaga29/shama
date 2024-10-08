'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Input } from 'src/components/ui/Input';
import DriverListCard from 'src/modules/drivers/components/DriverListCard';
import { getAllDrivers } from 'src/modules/drivers/data';

const DriverList = () => {
  const supabase = createBrowserClient();
  const { data } = useQuery({
    queryKey: queryKeys.drivers.all,
    queryFn: () => getAllDrivers(supabase),
  });

  return (
    <div className="flex max-h-full flex-col overflow-y-scroll">
      <div className="sticky top-0 z-10 bg-background p-4 shadow-md dark:border-b">
        <Input placeholder="Search drivers" />
      </div>
      {data?.map((driver) => (
        <DriverListCard key={driver.id} driver={driver} />
      ))}
    </div>
  );
};

export default DriverList;
