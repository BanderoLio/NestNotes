import { z } from 'zod';
import { themeSchema } from '@/features/themes/interfaces/theme.interface.ts';

export const themesResponseSchema = z.object({
  data: z.array(themeSchema),
});

export type ThemesResponse = z.infer<typeof themesResponseSchema>;
