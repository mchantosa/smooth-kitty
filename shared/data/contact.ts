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
  id: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullName: z.string().optional(),
  pronouns: z.string().optional(),
  avatarUrl: z.string().optional(),
  email: z.string().min(1, { message: "Email cannot be empty" }).email(
    "Invalid email",
  ),
  phoneNumber: z.string().optional(),
  preferredMethod: z.string().optional(),
  preferredMethodHandle: z.string().optional(),
  birthdayDay: z.number().optional(),
  birthdayMonth: z.number().optional(),
  birthdayYear: z.number().optional(),
  connectOnBirthday: z.boolean().optional(),
  period: z.string().optional(),
  nextConnection: z.string().optional(),
  lastConnection: z.string().optional(),
});

export const inputSchema = z.array(contactSchema);

export type InputSchema = z.infer<typeof inputSchema>;
