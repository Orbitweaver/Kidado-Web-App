import instance from "@/config/api.config";
import type { LoginValues, RegisterValues } from "@/config/types";

export const googleLogin = async (token: string) => {
  const { data } = await instance.post("/auth/google/", { token });
  return data;
};

export const register = async (data: RegisterValues) => {
  const response = await instance.post("/auth/signup", data);
  return response.data;
};

export const login = async (data: LoginValues) => {
  const response = await instance.post("/auth/login", data);
  return response.data;
};
