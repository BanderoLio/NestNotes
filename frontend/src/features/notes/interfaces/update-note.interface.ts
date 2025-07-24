import { z } from 'zod';
import { createNoteSchema } from '@/features/notes/interfaces/create-note.interface.ts';

export const updateNoteSchema = z.object({
  id: z.number().int(),
  body: createNoteSchema.partial(),
});

export type UpdateNote = z.infer<typeof updateNoteSchema>;
