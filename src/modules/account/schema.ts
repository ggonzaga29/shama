import { z } from 'zod';

export const userDetailsSchema = z.object({
  user_id: z.string(),
  first_name: z.string().trim().min(3, {
    message: 'Name must be at least 3 characters',
  }),
  last_name: z.string().trim().min(3, {
    message: 'Name must be at least 3 characters',
  }),
  // email: z.string().email({
  //   message: 'Invalid email address',
  // }),
  gender: z.enum(['Male', 'Female']).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export type UserDetailsSchema = z.infer<typeof userDetailsSchema>;
