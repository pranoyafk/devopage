import "dotenv/config";
import z from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}
