import { multipleFilesSchema } from 'src/common/utils/schemaUtils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const bookingFormSchema = zfd.formData({
  pickup_datetime: z.date({
    required_error: 'Pickup date and time is required',
  }),
  dropoff_datetime: z.date({
    required_error: 'Dropoff date and time is required',
  }),
  pickup_location: z.string({
    required_error: 'Pickup location is required',
  }),
  dropoff_location: z.string({
    required_error: 'Dropoff location is required',
  }),
  selected_cars_json: z.string(),
  send_email: z.boolean().default(false),
  rental_type: z.enum(['self-drive', 'with-driver']),
  notes: z.string(),
  files: multipleFilesSchema.optional(),
});
