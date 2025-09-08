import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { env } from "./lib/env";
import { appRouter } from "./trpc/router";

const app = new Hono();

app.use(
	"/trpc/*",
	trpcServer({
		router: appRouter,
	}),
);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
