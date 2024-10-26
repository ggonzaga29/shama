'use client';

import { useBookingForm } from 'app/bookings/context/BookingFormContext';
import { addMinutes, format, setHours, setMinutes } from 'date-fns';
import DateTimeField from 'src/components/Fields/DateTimeField';
import TextField from 'src/components/Fields/TextField';

const generateTimeSlots = (start: string, end: string, interval: number) => {
  const startTime = new Date();
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);

  const slots = [];
  let currentTime = setMinutes(setHours(startTime, startHour), startMinute);

  const endTime = setMinutes(setHours(new Date(), endHour), endMinute);

  while (currentTime <= endTime) {
    slots.push(format(currentTime, 'HH:mm'));
    currentTime = addMinutes(currentTime, interval);
  }

  return slots;
};

const DateSelection = () => {
  const {
    form: { control },
  } = useBookingForm();

  const timeSlots = generateTimeSlots('09:00', '22:00', 30);

  return (
    <div className="space-y-4">
      <DateTimeField
        control={control}
        name="pickup_datetime"
        label="Pickup Date & Time"
        description="Pickup date and time for the booking"
        inputProps={{
          min: format(new Date(), 'yyyy-MM-dd'),
        }}
        timeSlots={timeSlots}
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
        inputProps={{
          min: format(new Date(), 'yyyy-MM-dd'),
        }}
        timeSlots={timeSlots}
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
