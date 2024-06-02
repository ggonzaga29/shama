import { z } from 'zod';

export const userDetails = z.object({
  id: z.string(),
  user_id: z.string(),
});
