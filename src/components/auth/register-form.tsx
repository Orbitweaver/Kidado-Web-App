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

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Must be at least 8 characters long" }),
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

  const email = watch("email");
  const password = watch("password") || "";

  const hasMinLength = password.length >= 8;
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
  const notContainsEmail =
    !email || !password.toLowerCase().includes(email.split("@")[0].toLowerCase());

  const isPasswordWeak = !hasMinLength || !hasNumberOrSymbol || !notContainsEmail;

  const onSubmit = (data: RegisterValues) => {
    console.log("Register data:", data);
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

          <Input id="password" type="password" placeholder="Enter Password" {...register("password")} />

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {password.length > 0 && <span className={cn("text-xs font-medium", isPasswordWeak ? "text-red-500" : "text-green-500")}>
                Password Strength : {isPasswordWeak ? "Weak" : "Strong"}
              </span>}
            </div>

            <div className="space-y-1.5">
              <div className={cn("flex items-center gap-2 text-sm", notContainsEmail && password.length > 0 ? "text-blue-600" : "text-muted-foreground")}>
                <Check className={cn("h-4 w-4", notContainsEmail && password.length > 0 ? "text-blue-600" : "text-muted-foreground/40")} />
                Cannot contain your name or email address
              </div>
              <div className={cn("flex items-center gap-2 text-sm", hasMinLength ? "text-blue-600" : "text-muted-foreground")}>
                <Check className={cn("h-4 w-4", hasMinLength ? "text-blue-600" : "text-muted-foreground/40")} />
                At least 8 characters
              </div>
              <div className={cn("flex items-center gap-2 text-sm", hasNumberOrSymbol ? "text-blue-600" : "text-muted-foreground")}>
                <Check className={cn("h-4 w-4", hasNumberOrSymbol ? "text-blue-600" : "text-muted-foreground/40")} />
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
          <Button variant="outline" type="button" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800px"
              height="800px"
              viewBox="0 0 16 16"
              fill="none"
              className="mr-2 h-4 w-4"
            >
              <path
                fill="#4285F4"
                d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
              />
              <path
                fill="#34A853"
                d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
              />
              <path
                fill="#FBBC04"
                d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
              />
              <path
                fill="#EA4335"
                d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
              />
            </svg>
            Continue with Google
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
