export const Role = {
  Admin: "admin",
  User: "user",
  Guest: "guest",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
