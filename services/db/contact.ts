import type { Contact, ContactList } from "@/shared/data/contact.ts";
import { z } from "zod";
import { ulid } from "std/ulid/mod.ts";
import { faker } from "faker";
import { kv } from "@/utils/db.ts";

export const db = await Deno.openKv();
export const inputSchema = z.array(z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  fullName: z.string().nullable(),
  pronouns: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  preferredMethod: z.string().nullable(),
  preferredMethodHandle: z.string().nullable(),
  birthdayDay: z.number().nullable(),
  birthdayMonth: z.number().nullable(),
  birthdayYear: z.number().nullable(),
  connectOnBirthday: z.boolean().nullable(),
  period: z.string().nullable(),
}));
export type InputSchema = z.infer<typeof inputSchema>;

export async function loadContactList(
  login: string,
  options?: Deno.KvListOptions,
): Promise<ContactList> {
  const contactList: ContactList = {
    contacts: [],
    cursor: "",
  };

  const list = db.list({ prefix: ["contacts", login] }, options);

  for await (const item of list) {
    const contact = item.value as Contact;
    contact.id = item.key[item.key.length - 1] as string;
    contact.versionstamp = item.versionstamp!;
    contactList.contacts.push(contact);
  }

  contactList.cursor = list.cursor;

  return contactList;
}

export async function writeContacts(
  owner: string,
  inputs: InputSchema,
): Promise<void> {
  const currentEntries = await db.getMany(
    inputs.map((input: InputSchema) => ["contacts", owner, input.id]),
  );

  const op = db.atomic();

  inputs.forEach((input: InputSchema, i: number) => {
    // TODO: Check for empty record
    if (input.text === null) {
      op.delete(["contacts", owner, input.id]);
    } else {
      const current = currentEntries[i].value as Contact | null;
      const now = Date.now();
      const createdAt = current?.createdAt ?? now;

      const item: Contact = {
        firstName: input.firstName,
        lastName: input.lastName,
        fullName: input.fullName,
        pronouns: input.pronouns,
        avatarUrl: input.avatarUrl,
        email: input.email,
        phoneNumber: input.phoneNumber,
        preferredMethod: input.preferredMethod,
        preferredMethodHandle: input.preferredMethodHandle,
        birthdayDay: input.birthdayDay,
        birthdayMonth: input.birthdayMonth,
        birthdayYear: input.birthdayYear,
        connectOnBirthday: input.connectOnBirthday,
        period: input.period,
        createdAt,
        updatedAt: now,
      };
      op.set(["contacts", owner, input.id], item);
    }
  });

  await op.commit();
}

export async function seedContacts(owner: string, count: number) {
  const getMockContact = () => {
    const birthday = faker.date.birthdate({ min: 1, max: 85, mode: "age" });

    const contact = {
      id: ulid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      pronouns: faker.helpers.arrayElement(["he/him", "she/her", "they/them"]),
      avatarUrl: `/images/faces/face_${
        Math.floor(Math.random() * 10) + 1
      }.jpeg`,
      email: faker.internet.email(),
      phoneNumber: faker.phone.number("##########"),
      preferredMethod: faker.helpers.arrayElement(["email", "phone"]),
      preferredMethodHandle: faker.helpers.arrayElement(["email", "phone"]),
      birthdayDay: birthday.getDay(),
      birthdayMonth: birthday.getMonth(),
      birthdayYear: birthday.getFullYear(),
      connectOnBirthday: faker.datatype.boolean(),
      period: faker.helpers.arrayElement(["day", "week", "month", "year"]),
    };

    return contact;
  };

  const contacts: any = [];

  Array.from({ length: count }).forEach(() => {
    contacts.push(getMockContact());
  });

  for (const contact of contacts) {
    await writeContacts(owner, [contact]);
  }
}

export async function resetContacts(owner: string) {
  const iter = kv.list({ prefix: ["contacts", owner] });
  const promises = [];
  for await (const res of iter) promises.push(kv.delete(res.key));
  await Promise.all(promises);
}
