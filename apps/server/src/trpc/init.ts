import { initTRPC } from "@trpc/server";
import SuperJson from "superjson";

const t = initTRPC.create({
  transformer: SuperJson,
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
