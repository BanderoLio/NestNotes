import { z } from 'zod';

export const themeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export type Theme = z.infer<typeof themeSchema>;
