export const Role = {
  ADMIN: "Admin",
  STUDENT: "Student",
  TEACHER: "Teacher",
  PARENT: "Parent",
  INSTITUTION: "Institution",
} as const;

export type Role = (typeof Role)[keyof typeof Role];
