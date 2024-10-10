/* eslint-disable react/no-unescaped-entities */
'use client';

import { Form } from 'src/components/ui/Form';
import BookingFiles from 'src/modules/bookings/components/BookingFiles';
import ClientDetailsForm from 'src/modules/bookings/components/ClientDetailsForm';
import DateSelection from 'src/modules/bookings/components/DateSelection';
import PricingSummary from 'src/modules/bookings/components/PricingSummary';
import SelectVehicle from 'src/modules/bookings/components/SelectVehicle';
import VehicleList from 'src/modules/bookings/components/VehicleList';
import { useBookingForm } from 'src/modules/bookings/context/BookingFormContext';

const BookingForm = () => {
  const { form, onSubmit } = useBookingForm();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            <div className="h-fit w-full border bg-background p-4">
              <ClientDetailsForm />
            </div>

            <div className="h-fit w-full border bg-background p-4">
              <BookingFiles />
            </div>

            <div className="h-fit w-full border bg-background p-4">
              <SelectVehicle />
              <VehicleList />
            </div>

            <div className="h-fit w-full border bg-background p-4">
              <code className="block bg-neutral-300 p-2">
                TODOS:
                <br />
                - [ ] Only give the option to select a driver if the rental type
                is 'with-driver'
                <br />- [ ] When 'self-drive' is selected, add client to driver
                select options
                <br />
                <p className="max-w-75ch">
                  - [ ] Calculate the total price of the booking based on the
                  selected cars and the number of days they will be rented (per
                  24 hours)
                </p>
                <p>
                  - [ ] Disable all other inputs if pickup and dropoff dates are
                  not set
                </p>
                <p>- [ ] Add option to select personal or business client</p>
                <p>- [ ] Add option to add custom client (personal only)</p>
                <p>
                  - [ ] Once pickup and dropoff dates have been set, use them to
                  filter the car search and driver search, disable the
                  selectItem button if the car is already selected or it
                  overlaps with another booking within the date range
                </p>
              </code>
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <div className="border bg-background p-4">
              <DateSelection />
            </div>
            <div className="border bg-background p-4">
              <PricingSummary />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
