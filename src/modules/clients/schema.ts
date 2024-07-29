import { z } from 'zod';

export const customer_type = z.enum([
  'personal',
  'hotel',
  'travel_agency',
  'other',
]);

export const clientFormSchema = z.object({
  // id: z.string().uuid().optional(),
  // customer_type: customer_type.optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  // business_name: z.string().optional(),
  // notes: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;
