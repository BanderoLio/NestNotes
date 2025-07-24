import { z } from 'zod';

export const createThemeSchema = z.object({
  name: z.string(),
  parentId: z.number().int().optional(),
});

export type CreateTheme = z.infer<typeof createThemeSchema>;
