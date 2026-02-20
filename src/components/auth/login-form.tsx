import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleAuthBtn from "./google-auth-btn";
import type { LoginValues } from "@/config/types";
import { loginSchema } from "@/config/schema";
import { useLogin } from "@/hooks/auth/useLogin";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { mutateAsync: loginUser, isPending } = useLogin();

  const onSubmit = async (data: LoginValues) => {
    console.log("Login data:", data);
    await loginUser(data);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <Field className="gap-1">
          <FieldLabel htmlFor="email" className="font-medium">
            Email id
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field className="gap-1">
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="font-medium">
              Password
            </FieldLabel>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline text-gray-400"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>
        <Field>
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            Login
          </Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <GoogleAuthBtn disabled={isPending} />
        </Field>
      </FieldGroup>
    </form>
  );
}
