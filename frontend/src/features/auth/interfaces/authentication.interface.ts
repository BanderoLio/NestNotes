import { z } from 'zod';

export const authenticationSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
});

export type Authentication = z.infer<typeof authenticationSchema>;
