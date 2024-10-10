'use client';

import { TrashCan } from '@carbon/icons-react';
import { useConfirm } from '@omit/react-confirm-dialog';
import Image from 'next/image';
import { Car } from 'src/common/types';
import { Button } from 'src/components/ui/Button';
import { Card, CardContent } from 'src/components/ui/Card';
import { Input } from 'src/components/ui/Input';
import SelectDriver from 'src/modules/bookings/components/SelectDriver';
import { useBookingForm } from 'src/modules/bookings/context/BookingFormContext';

const VehicleListItem = ({ car }: { car: Car }) => {
  const confirm = useConfirm();
  const { dispatch } = useBookingForm();

  return (
    <div key={car.id} className="flex h-full flex-col space-y-2">
      <div className="flex space-x-2">
        <Card className="grow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="size-8">
                  <Image
                    src={`cars/${car.image_url}`}
                    alt={car.name ?? ''}
                    width={32}
                    height={32}
                    className="size-8 object-contain"
                  />
                </div>
                <div>
                  <span className="mr-2 font-bold">{car.name}</span>
                  <span className="text-muted-foreground">
                    ({car.license_plate})
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">Php</span>
                <span>
                  <Input
                    type="number"
                    value={car.default_price ?? ''}
                    className="inline"
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_DEFAULT_PRICE',
                        payload: {
                          id: car.id,
                          default_price: Number(e.target.value) ?? 0,
                        },
                      })
                    }
                  />
                </span>
                <p>/ Day</p>
              </div>
            </div>

            <div className="items-top mt-2 flex w-full justify-between">
              <div className="w-full max-w-xs">
                <SelectDriver car={car} />
              </div>

              <div>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="border-destructive text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                  onClick={async () => {
                    const result = await confirm({
                      title: 'Remove Vehicle',
                      description: `Are you sure you want ${car.name} (${car.license_plate}) from the booking?`,
                    });

                    if (result) {
                      dispatch({ type: 'REMOVE_CAR', payload: car });
                    }
                  }}
                >
                  <TrashCan size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* <span className="max-w-[75ch] text-pretty text-sm text-destructive">
    Error: {car.name} overlaps with another booking on the selected
    pickup and return dates. Remove this vehicle from the booking or
    select another date.
  </span> */}
    </div>
  );
};

const VehicleList = () => {
  const {
    state: { selectedCars },
  } = useBookingForm();

  if (selectedCars.length === 0) {
    return <p className="mt-4 text-muted-foreground">No vehicles selected</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {selectedCars.map((car) => (
        <VehicleListItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default VehicleList;
