import { z } from 'zod';

export const notesFiltersSettingsSchema = z.object({
  themeIdsWithChildren: z.boolean().optional().default(false),
});

export type NotesFiltersSettings = z.infer<typeof notesFiltersSettingsSchema>;
