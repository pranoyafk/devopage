import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
	DATABASE_URL: z.url(),
	BETTER_AUTH_SECRET: z.string().min(32),
	BETTER_AUTH_URL: z.url(),
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	PORT: z.coerce.number(),
	CROSS_ORIGIN: z.url(),
});
export const env = envSchema.parse(process.env);
