import { updateProfile } from "@/api/profile";
import useUserStore from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const { setUser, accessToken, refreshToken } = useUserStore();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setUser(accessToken, refreshToken, data.data);
      toast.success(data.message || "Profile updated successfully");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });
};
