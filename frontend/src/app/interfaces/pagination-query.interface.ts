import { z } from 'zod';

export const paginationQuerySchema = z.object({
  skip: z.number().int(),
  limit: z.number().int(),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
