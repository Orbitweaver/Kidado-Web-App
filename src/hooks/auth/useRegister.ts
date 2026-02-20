import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      navigate("/otp");
      localStorage.setItem("token", data.access_token);
      toast.success(
        "Registration successful! Please check your email for the OTP.",
      );
      // redirect user, update auth context, etc.
    },
    onError: (error) => {
      console.error("Register failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    },
  });
};
