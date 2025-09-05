import { protectedProcedure } from '@/orpc/procedures/auth';
import { and, eq } from 'drizzle-orm';
import z from 'zod';
import { postsTable } from '@/lib/db/schemas';

export const deletePost = protectedProcedure
  .input(
    z.object({
      postId: z.string(),
    })
  )
  .handler(async ({ context, input, errors }) => {
    const whereQuery = and(
      eq(postsTable.authorId, context.session.user.id),
      eq(postsTable.id, input.postId)
    );
    const post = await context.db.query.postsTable.findFirst({
      where: () => whereQuery,
    });

    if (!post)
      throw errors.NOT_FOUND({
        message: 'Post not found or you are not authorized to delete this post',
      });

    await context.db.delete(postsTable).where(whereQuery);

    return {
      success: true,
      message: 'Post deleted successfully',
      deletedPostId: input.postId,
    };
  });
