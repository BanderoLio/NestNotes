import { z } from 'zod';

export const notesFiltersSchema = z.object({
  themeIds: z.array(z.number().int()).optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});

export type NotesFilters = z.infer<typeof notesFiltersSchema>;
