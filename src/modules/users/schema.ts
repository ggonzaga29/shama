import { z } from "zod";

const userDetails = z.object({
  id: z.string(),
  user_id: z.string(),
})