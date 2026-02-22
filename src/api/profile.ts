import instance from "@/config/api.config";
import type { ApiResponse, SelectorOptionResponse, User } from "@/config/types";

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  mobile_country_code?: string;
  mobile_number?: string;
  institution?: string;
  country?: string;
  city?: string;
  interests?: string[];
  profile_image?: string;
}

export type UpdateProfileResponse = ApiResponse<User>;

export const updateProfile = async (
  data: UpdateProfileData,
): Promise<UpdateProfileResponse> => {
  const response = await instance.put<UpdateProfileResponse>(
    "/users/profile",
    data,
  );
  return response.data;
};

export const getSelectorValues = async (): Promise<SelectorOptionResponse> => {
  const response = await instance.get("/users/lookup/");
  return response.data.data;
};
