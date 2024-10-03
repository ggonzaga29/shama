import { date, z } from 'zod';

export const customer_type = z.enum([
  'personal',
  'hotel',
  'travel_agency',
  'other',
]);

export const clientFormSchema = z.object({
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
  notes: z.string().optional(),
});

export type ClientFormSchema = z.infer<typeof clientFormSchema>;

export const personalClientFormSchema = z.object({
  email: z.string().email('This is not a valid email.'),
  first_name: z.string().trim().min(3, {
    message: 'First name must be at least 3 characters',
  }),
  middle_name: z.string().optional(),
  last_name: z.string().trim().min(3, {
    message: 'Last name must be at least 3 characters',
  }),
  phone: z.string().trim().max(11, {
    message: 'Phone number must be at most 11 characters',
  }),
  date_of_birth: date(),
  gender: z.string().optional(),
  address: z.string(),
  driver_license_number: z.string().trim(),
  zip_code: z.string().trim().optional(),
  emergency_contact_name: z.string().trim().optional(),
  emergency_contact_phone: z.string().trim().optional(),
  emergency_contact_relationship: z.string().trim().optional(),
  emergency_contact_email: z
    .string()
    .email('This is not a valid email.')
    .optional(),
});

export type PersonalClientFormSchema = z.infer<typeof personalClientFormSchema>;
