import FileDropzoneField from 'src/components/Fields/FileDropzoneField';
import { useBookingForm } from 'app/bookings/context/BookingFormContext';

const BookingFiles = () => {
  const {
    form: { control },
  } = useBookingForm();

  return (
    <div>
      <h3 className="text-xl font-bold">Booking Files</h3>
      <div className="mt-4">
        <FileDropzoneField
          control={control}
          name="files"
          description="Upload files for the booking. e.g. ID, License, Bill of Lading, etc."
          fileInputProps={{
            maxFileCount: 15,
            maxSize: 1024 * 1024 * 5,
          }}
        />
      </div>
    </div>
  );
};

export default BookingFiles;
