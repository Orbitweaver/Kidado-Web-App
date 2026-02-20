import { googleLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access_token);
      // redirect user, update auth context, etc.
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
