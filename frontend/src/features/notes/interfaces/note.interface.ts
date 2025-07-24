import { z } from 'zod';
import { themeSchema } from '@/features/themes/interfaces/theme.interface.ts';

export const noteSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string().optional().nullable(),
  theme: themeSchema.optional().nullable(),
  content: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
