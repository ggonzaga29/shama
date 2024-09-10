import { z } from 'zod';

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
