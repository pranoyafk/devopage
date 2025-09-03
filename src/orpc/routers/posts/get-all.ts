import { selectPostSchema } from '@/lib/db/schemas';
import { publicProcedure } from '../../procedures/public';
import z from 'zod';

export const getAll = publicProcedure
  .output(z.array(selectPostSchema))
  .handler(async ({ context }) => {
    // TODO: Later impliment feed algo
    return await context.db.query.postsTable.findMany({});
  });
