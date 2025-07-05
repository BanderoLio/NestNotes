import { z } from 'zod';

export const userLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type UserLogin = z.infer<typeof userLoginSchema>;
