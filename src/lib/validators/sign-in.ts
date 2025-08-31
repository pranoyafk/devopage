import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export type SignInFormSchema = z.infer<typeof signInFormSchema>;
