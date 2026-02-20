import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters long" }),
  })
  .superRefine(({ password, email }, ctx) => {
    if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain a number or symbol",
        path: ["password"],
      });
    }
    if (email && password.includes(email.split("@")[0])) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password cannot contain your email address",
        path: ["password"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
