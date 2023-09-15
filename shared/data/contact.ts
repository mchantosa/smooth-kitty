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
  phoneNumber: string;
  email: string;
  avatarUrl: string;

  createdAt: number;
  updatedAt: number;
}
