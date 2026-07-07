import z from "zod";

export const userValidation = z.object({
  email: z.email().min(1),
  password: z.string().min(6),
});

export type userValidationType = z.infer<typeof userValidation>;
