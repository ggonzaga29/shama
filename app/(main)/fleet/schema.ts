import { fileSchema } from 'src/common/utils/schemaUtils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const carFormSchema = z.object({
  name: z.string().trim().min(3, {
    message: 'Name must be at least 3 characters',
  }),
  transmission: z.string().trim().optional(),
  fuel_type: z.string().trim().optional(),
  seating_capacity: z.coerce.number().optional(),
  model: z.string().trim().optional(),
  type: z.string().trim().optional(),
  displacement: z.string().trim().optional(),
  fuel_capacity: z.string().trim().optional(),
  power_transmission: z.string().trim().optional(),
  tires: z.string().trim().optional(),
  wheels: z.string().trim().optional(),
  license_plate: z.string().trim().min(3, {
    message: 'License plate must be at least 3 characters',
  }),
  default_price: z.coerce
    .number({
      required_error: 'Default price is required',
      invalid_type_error: 'Default price must be a number',
    })
    .positive()
    .min(1, {
      message: 'Default price must be a positive number, and at least 1',
    }),
  image_url: z.string().optional(),
});

export type CarFormSchema = z.infer<typeof carFormSchema>;

export const addCarSchema = zfd.formData({
  name: zfd.text(
    z.string().trim().min(3, {
      message: 'Name must be at least 3 characters',
    })
  ),
  transmission: zfd.text(z.string().trim().optional()),
  fuel_type: zfd.text(z.string().trim().optional()),
  seating_capacity: zfd.text(z.coerce.number().optional()),
  model: zfd.text(z.string().trim()),
  type: zfd.text(z.string().trim().optional()),
  displacement: zfd.text(z.string().trim().optional()),
  fuel_capacity: zfd.text(z.string().trim().optional()),
  power_transmission: zfd.text(z.string().trim().optional()),
  tires: zfd.text(z.string().trim().optional()),
  wheels: zfd.text(z.string().trim().optional()),
  license_plate: zfd.text(
    z.string().trim().min(3, {
      message: 'License plate must be at least 3 characters',
    })
  ),
  default_price: zfd.numeric(
    z.coerce
      .number({
        required_error: 'Default price is required',
        invalid_type_error: 'Default price must be a number',
      })
      .positive()
      .min(1, {
        message: 'Default price must be a positive number, and at least 1',
      })
  ),
  image: fileSchema.optional(),
});
