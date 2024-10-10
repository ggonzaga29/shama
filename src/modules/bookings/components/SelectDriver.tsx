'use client';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Car } from 'src/common/types';
import { Card, CardContent } from 'src/components/ui/Card';
import { Input } from 'src/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';
import { useBookingForm } from 'src/modules/bookings/context/BookingFormContext';
import { getDriverBySearch } from 'src/modules/drivers/data';

const SelectDriver = ({ car }: { car: Car }) => {
  const supabase = createBrowserClient();
  const [selectedId, setSelectedId] = useState('');
  const {
    state: { selectedDrivers },
    dispatch,
  } = useBookingForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedDriver = useMemo(() => {
    return selectedDrivers.find((driver) => driver.carId === car.id)?.driver;
  }, [car.id, selectedDrivers]);

  const { data: drivers, isLoading } = useQuery({
    queryKey: queryKeys.drivers.bySearch(
      'first_name,last_name',
      debouncedSearchTerm
    ),
    queryFn: async () => {
      if (!debouncedSearchTerm) return [];

      const data = await getDriverBySearch(
        supabase,
        ['first_name', 'last_name'],
        debouncedSearchTerm
      );
      console.log(data);
      return data;
    },
    enabled: debouncedSearchTerm !== '' && isOpen,
    retry: 1,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, drivers]);

  useEffect(() => {
    if (!selectedId || !drivers) {
      return;
    }

    const selectedDriver = drivers.find((driver) => driver.id === selectedId);

    if (!selectedDriver) {
      return;
    }

    dispatch({
      type: 'SET_DRIVER',
      payload: {
        carId: car.id,
        driver: selectedDriver,
      },
    });
  }, [car.id, dispatch, drivers, selectedId]);

  if (selectedDriver) {
    return (
      <Card className="h-fit w-full max-w-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-[100%]">
              <Image
                src={`driver_avatars/${selectedDriver.avatar_url}`}
                alt={car.name ?? ''}
                width={24}
                height={24}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="size-6 rounded-[100%] object-cover"
              />
            </div>
            <div>
              {selectedDriver.first_name} {selectedDriver.middle_name}{' '}
              {selectedDriver.last_name}
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>
              <span className="font-medium">License Number:</span>{' '}
              {selectedDriver.license_number}
            </span>
            <span className="block">
              <span className="font-medium">Contact Number:</span>{' '}
              {selectedDriver.phone}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Select
      open={isOpen}
      onOpenChange={setIsOpen}
      value={selectedId}
      onValueChange={(value) => setSelectedId(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={`Select a driver for ${car.name}`} />
      </SelectTrigger>
      <SelectContent>
        <div className="w-full border-b">
          <Input
            ref={inputRef}
            placeholder="Search..."
            value={searchTerm}
            className="w-full border-0 focus-visible:ring-0"
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </div>
        {!isLoading ? (
          drivers?.map((driver) => (
            <SelectItem value={driver.id} key={driver.id} className="px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-[100%]">
                  <Image
                    src={`driver_avatars/${driver.avatar_url}`}
                    alt={car.name ?? ''}
                    width={24}
                    height={24}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="size-6 rounded-[100%] object-cover"
                  />
                </div>
                {driver.first_name} {driver.middle_name} {driver.last_name}
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default SelectDriver;
