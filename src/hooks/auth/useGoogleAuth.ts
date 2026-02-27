import { googleLogin } from "@/api/auth";
import type { ApiError, GoogleAuthResponse } from "@/config/types";
import useUserStore from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data: GoogleAuthResponse) => {
      setUser(data.access, data.refresh, data.user);
      toast.success(data.message || "Login successful");

      if (!data.user.profile.name) {
        navigate("/profile/setup");
        return;
      }

      navigate("/");
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
