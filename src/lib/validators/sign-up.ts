import { z } from 'zod';

export const signUpFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
