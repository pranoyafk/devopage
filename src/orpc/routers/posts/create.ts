import {
  insertPostSchema,
  postsTable,
  selectPostSchema,
} from '@/lib/db/schemas/post';
import { protectedProcedure } from '@/orpc/procedures/auth';

export const createPost = protectedProcedure
  .input(insertPostSchema)
  .output(selectPostSchema)
  .handler(async ({ context, input }) => {
    const [post] = await context.db
      .insert(postsTable)
      .values(input)
      .returning();
    return post;
  });
