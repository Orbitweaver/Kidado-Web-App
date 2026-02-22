import { login } from "@/api/auth";
import type { LoginResponse } from "@/config/types";
import useUserStore from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      setUser(data.access, data.refresh, data.user);
      toast.success(data.message || "Login successful");

      if (!data.user.profile.name) {
        navigate("/profile/setup");
        return;
      }

      navigate("/");
    },
  });
};
