import { createTRPCRouter, publicProcedure } from "./init";

export const appRouter = createTRPCRouter({
  greeting: publicProcedure.query(() => {
    return "hello tRPC v11!";
  }),
});

export type AppRouter = typeof appRouter;
