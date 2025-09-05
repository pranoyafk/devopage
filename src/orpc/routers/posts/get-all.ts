import { publicProcedure } from '../../procedures/public';

export const getAll = publicProcedure.handler(async ({ context }) => {
  // TODO: Later impliment feed algo
  return await context.db.query.postsTable.findMany({
    with: { author: true },
  });
});
