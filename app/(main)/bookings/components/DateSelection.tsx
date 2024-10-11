'use client';

import DateTimeField from 'src/components/Fields/DateTimeField';
import TextField from 'src/components/Fields/TextField';
import { useBookingForm } from 'app/bookings/context/BookingFormContext';

const DateSelection = () => {
  const {
    form: { control },
  } = useBookingForm();

  return (
    <div className="space-y-4">
      <DateTimeField
        control={control}
        name="pickup_datetime"
        label="Pickup Date & Time"
        description="Pickup date and time for the booking"
      />
      <TextField
        control={control}
        name="pickup_location"
        label="Pickup Location"
        description="Pickup location for the booking"
      />
      <DateTimeField
        control={control}
        name="dropoff_datetime"
        label="Dropoff Date & Time"
        description="Dropoff date and time for the booking"
      />
      <TextField
        control={control}
        name="dropoff_location"
        label="Dropoff Location"
        description="Dropoff location for the booking"
      />
    </div>
  );
};

export default DateSelection;
