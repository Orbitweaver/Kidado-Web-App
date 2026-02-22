import type z from "zod";
import type { loginSchema, registerSchema } from "./schema";
import type { Role } from "./enums";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export type DrfError = {
  detail?: string;
  non_field_errors?: string[];
} & Record<string, string[] | string | undefined>;

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

type AuthProvider = "EMAIL" | "GOOGLE";

export type User = {
  id: string;
  email: string;
  role: Role;
  auth_provider: AuthProvider;
  google_id: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  date_joined: string;
  profile: {
    id: string;
    name: string | null;
    bio: string | null;
    mobile_country_code: string | null;
    mobile_number: string | null;
    institution: string | null;
    country: string | null;
    city: string | null;
    created_at: string;
    updated_at: string;
  };
};

export interface RegisterResponse {
  message: string;
  data: {
    id: string;
    email: string;
    role: string;
    auth_provider: AuthProvider;
    google_id: string | null;
    is_active: boolean;
    is_email_verified: boolean;
    date_joined: string;
    profile: User["profile"];
  };
}

export interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  user: User;
}

export interface GoogleAuthResponse {
  access_token: string;
  refresh_token: string;
  user?: User;
}

export interface IRoles {
  value: Role;
  label: string;
}

export interface IInstitutions {
  id: string;
  name: string;
  country: string;
  city: string;
}

export interface SelectorOptionResponse {
  roles: IRoles[];
  institutions: IInstitutions[];
}

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
