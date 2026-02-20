import { googleLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useGoogleAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/onboarding");
      toast.success("Logged in with Google successfully!");
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error(
        error instanceof Error ? error.message : "Google login failed",
      );
    },
  });
};
