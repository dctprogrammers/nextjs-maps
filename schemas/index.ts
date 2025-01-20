import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Name must be at least 3 characters",
  }),
  email: z.string().trim().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});
