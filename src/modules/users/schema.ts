import { z } from 'zod';

export const userDetails = z.object({
  id: z.string(),
  user_id: z.string(),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
