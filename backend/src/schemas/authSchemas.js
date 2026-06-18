import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Password must include an uppercase letter.")
  .regex(/[a-z]/, "Password must include a lowercase letter.")
  .regex(/[0-9]/, "Password must include a number.")
  .regex(/[^A-Za-z0-9]/, "Password must include a special character.");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().trim().toLowerCase().email("Email must be valid."),
  password: passwordSchema,
  profileImageUrl: z.string().trim().url("Profile image URL must be valid.").optional()
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email must be valid."),
  password: z.string().min(1, "Password is required.")
});
