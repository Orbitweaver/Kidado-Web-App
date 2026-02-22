import type { ApiError, DrfError } from "@/config/types";

export function normalizeDrfError(error: DrfError): ApiError {
  if (error.detail) {
    return {
      message: error.detail,
    };
  }

  const errors = Object.fromEntries(
    Object.entries(error).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : [String(value)],
    ]),
  );

  const message =
    Object.values(errors).flat().join(" ") || "An unexpected error occurred.";

  return {
    message,
    errors,
  };
}
