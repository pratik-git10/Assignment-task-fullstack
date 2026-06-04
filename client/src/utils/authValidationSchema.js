import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),

  password: z.string().min(1, "Password required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be greater than 20")
    .max(60, "Name must be less than 60"),

  email: z.string().email("Please provide email address"),

  address: z.string().min(3).max(400),

  password: z
    .string()
    .min(8)
    .max(16)
    .regex(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      "Password must contain uppercase and special character",
    ),
});
