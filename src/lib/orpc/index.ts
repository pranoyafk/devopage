import { postsRouter } from './routers/posts';

export const appRouter = {
  posts: postsRouter,
};

export type AppRouter = typeof appRouter;
