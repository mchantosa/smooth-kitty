import { z } from "zod";

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
  id: z.string().trim().optional(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  fullName: z.string().trim().optional(),
  pronouns: z.string().trim().optional(),
  avatarUrl: z.string().trim().optional(),
  email: z.string().trim().email(
    "Invalid email",
  ).optional(),
  phoneNumber: z.string().trim().optional(),
  preferredMethod: z.string().trim().optional(),
  preferredMethodHandle: z.string().trim().optional(),
  birthdayDay: z.number().optional(),
  birthdayMonth: z.number().optional(),
  birthdayYear: z.number().optional(),
  connectOnBirthday: z.boolean().optional(),
  period: z.string().trim().optional(),
  nextConnection: z.string().trim().optional(),
  lastConnection: z.string().trim().optional(),
});

export const inputSchema = z.array(contactSchema);

export type InputSchema = z.infer<typeof inputSchema>;
