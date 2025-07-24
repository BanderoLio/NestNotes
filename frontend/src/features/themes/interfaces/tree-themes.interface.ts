import { z } from 'zod';
import { treeThemeSchema } from '@/features/themes/interfaces/tree-theme.interface.ts';

export const treeThemesSchema = z.object({
  data: z.array(treeThemeSchema),
});

export type TreeThemes = z.infer<typeof treeThemesSchema>;
