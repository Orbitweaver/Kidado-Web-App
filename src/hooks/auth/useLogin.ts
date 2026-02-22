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
      setUser(data.access_token, data.refresh_token, data.user);
      navigate("/");
      toast.success("Welcome back! Login successful.");
    },
  });
};
