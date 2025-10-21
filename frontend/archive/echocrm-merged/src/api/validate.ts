import { z } from "zod";

export const CreateLead = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
});
export type CreateLead = z.infer<typeof CreateLead>;
