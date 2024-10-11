import { useBookingForm } from 'app/bookings/context/BookingFormContext';
import RadioGroupField from 'src/components/Fields/RadioGroupField';

const radioOptions = [
  {
    value: 'self-drive',
    label: 'Self Drive',
  },
  {
    value: 'with-driver',
    label: 'With Driver',
  },
];

const ClientDetailsForm = () => {
  const {
    form: { control },
  } = useBookingForm();

  return (
    <div>
      <h3 className="text-xl font-bold">Client Details</h3>

      <div className="mt-4">
        <RadioGroupField
          control={control}
          name="rental_type"
          options={radioOptions}
        />
      </div>
    </div>
  );
};

export default ClientDetailsForm;
