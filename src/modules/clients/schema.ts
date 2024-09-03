import { z } from 'zod';

export const customer_type = z.enum([
  'personal',
  'hotel',
  'travel_agency',
  'other',
]);

export const clientFormSchema = z.object({
  // id: z.string().uuid().optional(),
  customer_type: customer_type,
  name: z.string().trim().min(3, {
    message: 'Name must be at least 3 characters',
  }),
  phone: z.string().trim().max(11, {
    message: 'Phone number must be at most 11 characters',
  }),
  email: z
    .string()
    .min(1, { message: 'This field is required' })
    .email('This is not a valid email.'),
  // business_name: z.string().optional(),
  notes: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;
