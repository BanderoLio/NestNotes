import { z } from 'zod';
import { noteSchema } from '@/features/notes/interfaces/note.interface.ts';
import { paginationMetaSchema } from '@/app/interfaces/pagination-meta.interface.ts';

export const notesResponseSchema = z.object({
  data: z.array(noteSchema),
  meta: paginationMetaSchema,
});

export type NotesResponse = z.infer<typeof notesResponseSchema>;
