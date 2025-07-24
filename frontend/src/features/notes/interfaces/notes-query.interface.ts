import { notesFiltersSchema } from '@/features/notes/interfaces/notes-filters.interface.ts';
import { z } from 'zod';
import { paginationQuerySchema } from '@/app/interfaces/pagination-query.interface.ts';

export const notesQuerySchema = z.object({
  filters: notesFiltersSchema,
});

export const paginatedNotesQuerySchema = z.intersection(
  notesQuerySchema,
  z.object({
    pagination: paginationQuerySchema,
  }),
);

export type NotesQuery = z.infer<typeof notesQuerySchema>;

export type PaginatedNotesQuery = z.infer<typeof paginatedNotesQuerySchema>;
