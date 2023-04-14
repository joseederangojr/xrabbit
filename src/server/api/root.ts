import { createTRPCRouter } from "~/server/api/trpc";
import { crypto } from "~/server/api/routers/crypto";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  crypto: crypto
});

// export type definition of API
export type AppRouter = typeof appRouter;
