import { Enum } from 'src/common/types';
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
  send_email: z.boolean().default(false).optional(),
  rental_type: z.custom<Enum<'rental_type'>>(),
  client_type: z.custom<Enum<'client_type'>>(),
  client_id: z.string(),
  notes: z.string().optional(),
  files: multipleFilesSchema.optional(),
  discount: z
    .number()
    .min(0)
    .max(100, {
      message: 'Discount must be between 0 and 100',
    })
    .optional(),
});
