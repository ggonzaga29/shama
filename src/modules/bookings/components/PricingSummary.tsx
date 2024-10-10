'use client';

import { useState } from 'react';
import CheckboxField from 'src/components/FIelds/CheckboxField';
import { Button } from 'src/components/ui/Button';
import { Input } from 'src/components/ui/Input';
import { useBookingForm } from 'src/modules/bookings/context/BookingFormContext';

const PricingSummary = () => {
  const [discount, setDiscount] = useState<number | null>(null);
  const {
    form: { control },
    state: { selectedCars },
    totalPrice,
  } = useBookingForm();

  return (
    <div className="pricing-summary">
      <h3 className="text-xl font-bold">Pricing Summary</h3>

      <div className="my-4">
        <div>
          <ul className="flex flex-col gap-2">
            {selectedCars.map((car) => {
              return (
                <li key={car.id} className="flex justify-between">
                  <span className="text-muted-foreground">
                    {car.name} ({car.license_plate})
                  </span>
                  <span>Php {car.default_price}</span>
                </li>
              );
            })}
            <li className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">Php {totalPrice}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span className="flex items-center gap-2 font-bold text-muted-foreground">
                <Input
                  type="number"
                  value={discount ?? 0}
                  max={100}
                  min={0}
                  step={1}
                  onChange={(e) => setDiscount(+e.target.value)}
                  className="h-8 w-16 px-2 !text-right"
                />
                %
              </span>
            </li>
          </ul>
          <div></div>
        </div>
        <div className="mb-4 mt-6 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-medium">Total</span>
            <span className="font-bold">
              Php{' '}
              {Math.round(totalPrice - (totalPrice * (discount ?? 0)) / 100)}
            </span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Confirm Booking
      </Button>

      <CheckboxField
        control={control}
        name="send_email"
        className="mt-6"
        label="Send email receipt to client"
        description="An email receipt will be sent to gian@giangonzaga.com once the booking is confirmed."
      />
    </div>
  );
};

export default PricingSummary;
