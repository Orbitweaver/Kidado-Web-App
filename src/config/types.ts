import type z from "zod";
import type { loginSchema, registerSchema } from "./schema";

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
  name: string | null;
  email: string;
  bio: string | null;
  mobile_country_code: string | null;
  mobile_number: string | null;
  role: string;
  institution: string | null;
  country: string | null;
  city: string | null;
  auth_provider: AuthProvider;
  google_id: string | null;
  is_active: boolean;
  is_email_verified: boolean;
  date_joined: string;
  created_at: string;
  updated_at: string;
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
    profile: Omit<
      User,
      | "email"
      | "role"
      | "auth_provider"
      | "google_id"
      | "is_active"
      | "is_email_verified"
      | "date_joined"
    >;
  };
}

export interface LoginResponse extends AuthTokens {
  user: User;
}

export interface GoogleAuthResponse {
  access_token: string;
  refresh_token: string;
  user?: User;
}

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
