import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FieldError } from "../ui/field";
import { useNavigate } from "react-router";

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type OTPValues = z.infer<typeof otpSchema>;

const OTPForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [timer, setTimer] = useState(20);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  function onSubmit(data: OTPValues) {
    console.log("OTP Submitted:", data);
    navigate("/onboarding");
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Verify your Email</h1>
        <p className="text-muted-foreground text-sm max-w-xs text-center">
          We've sent an email with an activation code to your email{" "}
          <span className="text-foreground">huz*****@hmail.com</span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOTP maxLength={6} {...field}>
              <div className="flex gap-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot
                      index={index}
                      className={cn(
                        "h-12 w-12 rounded-md border text-lg shadow-sm transition-all border-color-primary",
                        !!errors.otp && "bg-red-50 border-red-200"
                      )}
                    />
                  </InputOTPGroup>
                ))}
              </div>
            </InputOTP>
          )}
        />
        <FieldError errors={[errors.otp]} className="text-center" />
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground font-semibold">
          Send code again
        </span>{" "}
        <span className="text-muted-foreground ml-1">{formatTime(timer)}</span>
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer text-white h-11 rounded-md"
      >
        Verify Code
      </Button>
    </form>
  );
};

export default OTPForm;
