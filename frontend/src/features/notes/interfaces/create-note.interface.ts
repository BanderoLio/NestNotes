import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().optional(),
  themeId: z.number().int().optional(),
  content: z.string(),
});

export type CreateNote = z.infer<typeof createNoteSchema>;
