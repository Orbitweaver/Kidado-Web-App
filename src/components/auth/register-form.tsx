import React from "react";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "../ui/field";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";
import GoogleAuthBtn from "./google-auth-btn";

const registerSchema = z
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

type RegisterValues = z.infer<typeof registerSchema>;

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  const navigate = useNavigate();

  const email = watch("email");
  const password = watch("password") || "";

  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const notContainsEmail =
    !email ||
    !password.toLowerCase().includes(email.split("@")[0].toLowerCase());

  const isPasswordWeak =
    !hasMinLength || !hasNumberOrSymbol || !notContainsEmail;

  const onSubmit = (data: RegisterValues) => {
    console.log("Register data:", data);
    navigate("/otp");
    // TODO: integrate with auth store/api
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        {/* <Field >
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" type="text" placeholder="John Doe" required />
        </Field> */}
        <Field className="gap-1" data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email" className="font-medium">
            Email Id
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field className="gap-1" data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password" className="font-medium">
            Password
          </FieldLabel>

          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {password.length > 0 && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    isPasswordWeak ? "text-red-500" : "text-green-500",
                  )}
                >
                  Password Strength : {isPasswordWeak ? "Weak" : "Strong"}
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <div
                className={cn(
                  "flex items-center gap-2 text-sm",
                  notContainsEmail && password.length > 0
                    ? "text-blue-600"
                    : "text-muted-foreground",
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    notContainsEmail && password.length > 0
                      ? "text-blue-600"
                      : "text-muted-foreground/40",
                  )}
                />
                Cannot contain your name or email address
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm",
                  hasMinLength ? "text-blue-600" : "text-muted-foreground",
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    hasMinLength ? "text-blue-600" : "text-muted-foreground/40",
                  )}
                />
                At least 8 characters
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 text-sm",
                  hasNumberOrSymbol ? "text-blue-600" : "text-muted-foreground",
                )}
              >
                <Check
                  className={cn(
                    "h-4 w-4",
                    hasNumberOrSymbol
                      ? "text-blue-600"
                      : "text-muted-foreground/40",
                  )}
                />
                Contains a number or symbol
              </div>
            </div>
          </div>
          <FieldError errors={[errors.password]} />
        </Field>

        {/* <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field> */}
        <Field>
          <Button type="submit" className="cursor-pointer">
            Create Account
          </Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <GoogleAuthBtn />
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
