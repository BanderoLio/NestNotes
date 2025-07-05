import { z } from 'zod';

export const userRegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserRegister = z.infer<typeof userRegisterSchema>;
