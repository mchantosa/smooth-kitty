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
  createdAt: number;
  updatedAt: number;
}
