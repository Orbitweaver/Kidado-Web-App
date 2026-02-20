import { login } from "@/api/auth";
import useUserStore from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.access_token, data.refresh_token, data.user);
      navigate("/");
      toast.success("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    },
  });
};
