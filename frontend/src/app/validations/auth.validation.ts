import { z } from "zod";

export const signInValidation = z.object({
  email: z.email({ error: "Invalid Email Format" }),
  password: z.string().nonempty({ error: "Password field is required" }),
});

export const signUpValidation = z
  .object({
    firstName: z.string().nonempty({ error: "First Name is required" }),
    lastName: z.string().nonempty({ error: "Last Name is required" }),
    email: z.email({ error: "Email is invalid" }),
    password: z.string().nonempty({ error: "Password is required" }),
    confirmPassword: z.string().nonempty({ error: "Password is required" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passwords are not matching",
    path: ["confirmPassword"],
  });
