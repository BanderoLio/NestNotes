import type { Theme } from '@/features/themes/interfaces/theme.interface.ts';
import { themeSchema } from '@/features/themes/interfaces/theme.interface.ts';
import { z } from 'zod';

export type TreeTheme = Theme & {
  children: TreeTheme[];
};

export const treeThemeSchema: z.ZodType<TreeTheme> = z.lazy(() =>
  z.intersection(
    themeSchema,
    z.object({
      children: z.array(treeThemeSchema),
    }),
  ),
);
