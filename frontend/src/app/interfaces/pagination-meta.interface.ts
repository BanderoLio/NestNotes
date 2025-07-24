import { z } from 'zod';

export const paginationMetaSchema = z.object({
  total: z.number().int(),
  limit: z.number().int(),
  skip: z.number().int(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
