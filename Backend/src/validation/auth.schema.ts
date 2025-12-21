import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().nonempty({ error: "First Name is a required field" }),
  lastName: z.string().nonempty({ error: "Last Name is a required field" }),
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      error: "Password is not strong",
    }),
  roleId: z.number().positive(),
});

export const signInSchema = z.object({
  email: z.email({ error: "Email is invalid" }),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      error: "Password is not strong",
    }),
});
