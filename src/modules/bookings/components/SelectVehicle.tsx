'use client';

import { Add } from '@carbon/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { queryKeys } from 'src/common/lib/queryKeys';
import { createBrowserClient } from 'src/common/lib/supabase/browserClient';
import { Car } from 'src/common/types';
import { cn } from 'src/common/utils/cvaUtils';
import TextField from 'src/components/Fields/TextField';
import { Button } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/Select';
import { useBookingForm } from 'src/modules/bookings/context/BookingFormContext';
import { getAllCars } from 'src/modules/cars/data';

export default function SelectVehicle() {
  const supabase = createBrowserClient();
  const {
    state: { selectedCars },
    dispatch,
    form: { control, setValue: setFormValue },
  } = useBookingForm();
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const [currentVehicle, setCurrentVehicle] = useState<Car>();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.cars.all, debouncedSearch],
    queryFn: async () => {
      const data = await getAllCars(supabase, 5, 'name', debouncedSearch);
      return data;
    },
    enabled: debouncedSearch !== '' && isOpen,
    staleTime: 1000 * 60,
    retry: 1,
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, data]);

  useEffect(() => {
    const json = selectedCars.length > 0 ? JSON.stringify(selectedCars) : '';

    if (json) {
      setFormValue('selected_cars_json', json);
    }
  }, [selectedCars, setFormValue]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleContextAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!currentVehicle) {
      return;
    }

    toast.info(`Added ${currentVehicle?.name} to booking.`);
    dispatch({ type: 'ADD_CAR', payload: currentVehicle });
    setCurrentVehicle(undefined);
    setValue('');
    setSearch('');
  };

  const filteredData = useMemo(() => {
    return data?.filter(
      (car) => !selectedCars.some((selectedCar) => selectedCar.id === car.id)
    );
  }, [data, selectedCars]);

  return (
    <div className="flex items-center gap-4 !px-0">
      <Select
        value={value}
        onValueChange={(value) => {
          setValue(value);
          setCurrentVehicle(data?.find((car) => car.id === value));
        }}
        onOpenChange={handleOpenChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a Vehicle" />
        </SelectTrigger>
        <SelectContent>
          <div className="w-full border-b">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={search}
              className="w-full border-0 focus-visible:ring-0"
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          <div className={cn(filteredData?.length === 0 ? 'mt-6' : 'mt-2')}>
            {isLoading ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : (
              filteredData?.map((car) => (
                <SelectItem key={car.id} value={car.id} className="px-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`cars/${car.image_url}`}
                      alt={car.name ?? ''}
                      width={32}
                      height={32}
                      className="size-8 object-contain"
                    />
                    {car.name}{' '}
                    <span className="text-muted-foreground">
                      ({car.license_plate})
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </div>
          {filteredData?.length === 0 && (
            <SelectItem value="no-results" disabled>
              No results found
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      <Button
        type="button"
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleContextAdd}
        disabled={!currentVehicle}
      >
        <Add size={16} />
        Add
      </Button>

      <TextField control={control} type="hidden" name="selected_cars_json" />
    </div>
  );
}
