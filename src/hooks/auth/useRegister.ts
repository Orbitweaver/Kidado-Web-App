import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      // redirect user, update auth context, etc.
    },
    onError: (error) => {
      console.error("Register failed:", error);
    },
  });
};
