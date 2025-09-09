import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./lib/env";
import { appRouter } from "./trpc/router";

const app = new Hono();

app.use(
	"*",
	cors({
		origin: env.CROSS_ORIGIN,
		allowMethods: ["POST", "GET", "OPTIONS"],
		maxAge: 600,
		credentials: true,
	}),
);

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
