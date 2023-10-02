import { z } from "zod";
import { isValid } from "date-fns";

export interface ContactList {
  contacts: Contact[];
  cursor: string;
}

export interface Contact {
  // Non-empty in API request and response
  id?: string;

  // Non-empty in API response
  versionstamp?: string;

  firstName: string;
  lastName: string;
  fullName: string;
  pronouns: string;
  avatarUrl: string;
  email: string;
  phoneNumber: string;
  preferredMethod: string;
  preferredMethodHandle: string;
  birthdayDay: number;
  birthdayMonth: number;
  birthdayYear: number;
  connectOnBirthday: boolean;
  period: string;
  nextConnection: string;
  lastConnection: string;
  createdAt: number;
  updatedAt: number;
}

export const contactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().trim().max(25, "25 character limit exceeded")
    .optional(),
  lastName: z.string().trim().max(25, "25 character limit exceeded").optional(),
  fullName: z.string().trim().optional(),
  pronouns: z.string().trim().max(25, "25 character limit exceeded").optional(),
  avatarUrl: z.string().trim().optional(),
  email: z.union([
    z.string().trim().email(
      "Invalid email",
    ),
    z.literal(""),
  ]),
  phoneNumber: z.string().trim().max(25, "25 character limit exceeded")
    .optional(),
  preferredMethod: z.string().trim().max(25, "25 character limit exceeded")
    .optional(),
  preferredMethodHandle: z.string().max(50, "50 character limit exceeded")
    .trim()
    .optional(),
  birthdayDay: z.number().optional(),
  birthdayMonth: z.number().optional(),
  birthdayYear: z.number().optional(),
  connectOnBirthday: z.boolean().optional(),
  period: z.string().trim().min(1, "A period is required").regex(
    /^(Weekly|Biweekly|Monthly|Quarterly)$/,
    "Invalid period",
  ),
  nextConnection: z.string().trim().optional(),//yyyy-mm-dd
  lastConnection: z.string().trim().optional(),
}).refine(
  ({ firstName, lastName }) => {
    return (firstName && firstName.length > 0) ||
      (lastName && lastName.length > 0);
  },
  {
    message: "A first or last name is required",
    path: ["name"],
  },
).refine(
  ({ birthdayDay, birthdayMonth }) => {
    if ((birthdayDay !== 0 && birthdayMonth === -1)||(birthdayDay === 0 && birthdayMonth !== -1)) {
      return false;
    }
    return true;
  },
  {
    message: "Birthday must have a Day and a Month",
    path: ["date"],
  },
).refine(
  ({ birthdayDay, birthdayMonth }) => {
    if (birthdayDay > 29 && birthdayMonth === 1) {
      return false;
    }
    return true;
  },
  {
    message: "Days in February must be less than 30",
    path: ["date"],
  },
).refine(
  ({ birthdayDay, birthdayMonth }) => {
    if (
      birthdayDay > 30 &&
      (birthdayMonth === 3 || birthdayMonth === 5 || birthdayMonth === 8 ||
        birthdayMonth === 10)
    ) {
      return false;
    }
    return true;
  },
  {
    message:
      "Days in April, June, September, and November must be less than 30",
    path: ["date"],
  },
).refine(
  ({ birthdayDay, birthdayMonth, birthdayYear }) => {
    if (birthdayDay > 0 && birthdayMonth > -1 && birthdayYear > 0) {
      const birthday = new Date(birthdayYear, birthdayMonth, birthdayDay);
      const dayMonthYearCheck = birthday.getFullYear() === birthdayYear &&
        birthday.getMonth() === birthdayMonth &&
        birthday.getDate() === birthdayDay;
      return (isValid(birthday) && dayMonthYearCheck);
    }
    return true;
  },
  {
    message: "Invalid date",
    path: ["date"],
  },
).refine(
  ({ birthdayDay, birthdayMonth, connectOnBirthday }) => {
    if (birthdayDay === 0 || birthdayMonth === -1) {
      if (connectOnBirthday) {
        return false;
      }
    }
    return true;
  },
  {
    message: "You must enter a birthday to connect on birthday",
    path: ["connectOnBirthday"],
  },
);

export const inputSchema = z.array(contactSchema);

export type InputSchema = z.infer<typeof inputSchema>;
