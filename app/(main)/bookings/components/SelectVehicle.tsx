'use client';

import { Add } from '@carbon/icons-react';
import { useBookingForm } from 'app/bookings/context/BookingFormContext';
import CarGridCard from 'app/fleet/components/CarGridCard';
import { useState } from 'react';
import { toast } from 'sonner';
import TextField from 'src/components/Fields/TextField';
import { Button } from 'src/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/Dialog';
import { Input } from 'src/components/ui/Input';
import { ScrollArea } from 'src/components/ui/Scrollarea';
import { useSearchSupabaseTable } from 'src/hooks/useSearchSupabaseTable';

export default function SelectVehicle() {
  const {
    form: { control, watch },
    state: { selectedCars },
    dispatch,
  } = useBookingForm();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, search, setSearch } = useSearchSupabaseTable({
    table: 'vehicles',
    columns: ['name', 'model', 'license_plate'],
    initialSearch: '*',
  });

  const pickupDate = watch('pickup_datetime');
  const dropoffDate = watch('dropoff_datetime');
  const pickupLocation = watch('pickup_location');
  const dropoffLocation = watch('dropoff_location');

  const handleContextAdd = (id: string) => {
    const currentVehicle = data?.find((car) => car.id === id);

    if (!currentVehicle) {
      return;
    }

    toast.info(`Attached ${currentVehicle?.name} to booking.`);
    dispatch({ type: 'ADD_CAR', payload: currentVehicle });
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex items-center gap-2">
            {pickupDate && dropoffDate && pickupLocation && dropoffLocation ? (
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Add size={16} />
                Add
              </Button>
            ) : (
              <span className="text-sm text-muted-foreground">
                Please select a pickup and dropoff date to view available
                vehicles for booking.
              </span>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="size-full max-h-[80vh] max-w-[100vh]">
          <div>
            <DialogHeader>
              <DialogTitle>
                Available Vehicles from{' '}
                <span className="font-medium">
                  {pickupDate && pickupDate.toDateString()}{' '}
                </span>
                to{' '}
                <span className="font-medium">
                  {dropoffDate && dropoffDate.toDateString()}
                </span>
              </DialogTitle>
              <DialogDescription>
                Click on a card to add it to the booking.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
              />

              <ScrollArea className="mt-6">
                <div className="grid max-h-[60vh] grid-cols-3 gap-4">
                  {!isLoading ? (
                    data
                      ?.filter(
                        (car) =>
                          !selectedCars.some(
                            (selectedCar) => selectedCar.id === car.id
                          )
                      )
                      .map((car) => (
                        <CarGridCard
                          key={car.id}
                          car={car}
                          showControls={false}
                          className="cursor-pointer transition-[box-shadow,transform] hover:-translate-y-2 hover:shadow-md"
                          onClick={() => handleContextAdd(car.id)}
                        />
                      ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <TextField control={control} type="text" name="selected_cars_json" />
    </div>
  );
}
