import { googleLogin } from "@/api/auth";
import type { ApiError, GoogleAuthResponse } from "@/config/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data: GoogleAuthResponse) => {
      localStorage.setItem("token", data.access_token);
      navigate("/onboarding");
      toast.success("Google login successful! Welcome to Kidado.");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error("Google login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Google login failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};
