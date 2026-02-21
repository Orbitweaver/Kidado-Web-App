import { register } from "@/api/auth";
import type { ApiError } from "@/config/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Registration successful! Please login to continue.");
      navigate("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error("Register failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};
