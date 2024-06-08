import { z } from 'zod';

export const createCarSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  model: z.string().min(1),
  license_plate: z.string().min(1),
  fuel_type: z.string().min(1),
  fuel_capacity: z.string().min(1),
  transmission: z.string().min(1),
  seating_capacity: z.number().max(30).min(1),
  default_price: z.number().min(1),
});
