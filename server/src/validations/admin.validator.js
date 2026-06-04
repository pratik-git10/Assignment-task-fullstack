import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters long.")
    .max(60, "Name cannot exceed 60 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please provide a valid standard email address."),
  address: z
    .string()
    .min(1, "Address is required.")
    .max(400, "Address cannot exceed 400 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(16, "Password cannot exceed 16 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(
      /[@$!%*?&]/,
      "Password must include at least one special character.",
    ),
  role: z.enum(["USER", "STORE_OWNER", "ADMIN"], {
    errorMap: () => ({
      message: "Please select a valid system authorization role.",
    }),
  }),
});

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters long.")
    .max(60, "Name cannot exceed 60 characters."),
  email: z
    .string()
    .min(1, "Store email is required.")
    .email("Please provide a valid store contact email."),
  address: z
    .string()
    .min(1, "Store address is required.")
    .max(400, "Store address cannot exceed 400 characters."),
  ownerId: z.string().uuid("Please select a valid store owner UUID."),
});
