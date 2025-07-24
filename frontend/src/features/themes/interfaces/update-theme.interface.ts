import { z } from 'zod';
import { createThemeSchema } from '@/features/themes/interfaces/create-theme.interface.ts';

export const updateThemeSchema = z.object({
  id: z.number().int(),
  body: createThemeSchema.partial(),
});

export type UpdateTheme = z.infer<typeof updateThemeSchema>;
