import type {
  Contact,
  ContactList,
  InputSchema,
} from "@/shared/data/contact.ts";
import { ulid } from "std/ulid/mod.ts";
import { faker } from "faker";
import { kv } from "@/utils/db.ts";
import { MuxAsyncIterator } from "https://deno.land/std@0.203.0/async/mod.ts";
//import { add, format, nextSunday } from "date-fns";
import {
  getNextSundayDateToPretty,
  getRandomDayWithinThePastMonthDBDate,
  getRandomSundayWithinAQuarterDBDate,
} from "@/utils/dates.ts";

export const CONTACTS_KEY = "contacts";
export const CONTACTS_BY_FULL_NAME_KEY = "contacts_by_full_name";
export const DEFAULT_AVATAR_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/1200px-Avatar_icon_green.svg.png";

export async function loadContact(login: string, id: string) {
  const contact = await kv.get([CONTACTS_KEY, login, id]);
  if (!contact) throw new Error("Contact not found");
  return contact;
}

export async function loadContactList(
  login: string,
  options?: Deno.KvListOptions,
): Promise<ContactList> {
  const contactList: ContactList = {
    contacts: [],
    cursor: "",
  };

  const list = kv.list({ prefix: [CONTACTS_BY_FULL_NAME_KEY, login] }, options);

  for await (const item of list) {
    const contact = item.value as Contact;
    contact.id = item.key[item.key.length - 1] as string;
    contact.versionstamp = item.versionstamp!;
    contactList.contacts.push(contact);
  }

  contactList.cursor = list.cursor;

  return contactList;
}

async function createContact(contactKey: string[], contact: Contact) {
  const [_contacts, owner, contactId] = contactKey;
  contact.fullName = `${contact.firstName} ${contact.lastName}`;
  if (!contact.nextConnection) {
    contact.nextConnection = getNextSundayDateToPretty();
  }

  const contactsByFullNameKey = [
    CONTACTS_BY_FULL_NAME_KEY,
    owner,
    contact.fullName.toLowerCase(),
    contactId,
  ];

  const op = kv.atomic();
  op.check({ key: contactKey, versionstamp: null });
  op.check({ key: contactsByFullNameKey, versionstamp: null });
  op.set(contactKey, contact);
  op.set(contactsByFullNameKey, contact);

  const res = await op.commit();

  if (!res.ok) {
    throw new Error(`Failed to create contact ${contactKey}`);
  }
}

async function updateContact(
  contactRecord: Deno.KvEntry<Contact>,
  contact: Contact,
) {
  const contactKey = contactRecord.key;
  const [_contacts, owner, contactId] = contactKey;
  const currentFullName =
    `${contactRecord.value.firstName} ${contactRecord.value.lastName}`
      .toLocaleLowerCase();
  contact.fullName = `${contact.firstName} ${contact.lastName}`;
  const contactsByFullNameKey = [
    CONTACTS_BY_FULL_NAME_KEY,
    owner,
    currentFullName,
    contactId,
  ];

  const op = kv.atomic();
  op.check({ key: contactKey, versionstamp: contactRecord.versionstamp });
  op.set(contactKey, contact);

  if (currentFullName !== contact.fullName.toLowerCase()) {
    // Contact name changed, delete old index
    // and create new secondary index
    await kv.delete(contactsByFullNameKey);
    contactsByFullNameKey[2] = contact.fullName.toLowerCase();
    op.check({
      key: contactsByFullNameKey,
      versionstamp: null,
    });
  } else {
    // Contact name did not change, so just check that
    // the secondary index has not changed
    const contactByFullName = await kv.get<Contact>(contactsByFullNameKey);
    op.check({
      key: contactsByFullNameKey,
      versionstamp: contactByFullName.versionstamp,
    });
  }
  op.set(contactsByFullNameKey, contact);

  const res = await op.commit();

  if (!res.ok) {
    throw new Error(`Failed to update contact ${contactKey}`);
  }
}

export async function writeContact(owner: string, contact: Contact) {
  contact.id = contact.id || ulid();

  const contactKey: string[] = [CONTACTS_KEY, owner, contact.id];
  const contactRecord = await kv.get<Contact>(contactKey);

  if (!contactRecord.value) {
    await createContact(contactKey, contact);
  } else {
    await updateContact(contactRecord, contact);
  }
}

export async function seedContacts(owner: string, count: number) {
  const getMockContact = () => {
    const birthday = faker.date.birthdate({ min: 1, max: 85, mode: "age" });
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = firstName + " " + lastName;

    const lastConnection = getRandomDayWithinThePastMonthDBDate();
    const nextConnection = getRandomSundayWithinAQuarterDBDate();

    const contact = {
      id: ulid(),
      firstName,
      lastName,
      fullName,
      pronouns: faker.helpers.arrayElement(["he/him", "she/her", "they/them"]),
      avatarUrl: `/images/faces/face_${
        Math.floor(Math.random() * 10) + 1
      }.jpeg`,
      email: faker.internet.email(),
      phoneNumber: faker.phone.number("##########"),
      preferredMethod: faker.helpers.arrayElement(["email", "phone"]),
      preferredMethodHandle: faker.helpers.arrayElement(["email", "phone"]),
      birthdayDay: birthday.getDate(),
      birthdayMonth: birthday.getMonth(),
      birthdayYear: birthday.getFullYear(),
      connectOnBirthday: true,
      nextConnection,
      lastConnection,
      period: faker.helpers.arrayElement([
        "Weekly",
        "Biweekly",
        "Monthly",
        "Quarterly",
      ]),
    };

    return contact;
  };

  const contacts: any = [];

  Array.from({ length: count }).forEach(() => {
    contacts.push(getMockContact());
  });

  for (const contact of contacts) {
    await writeContact(owner, contact);
  }
}

export async function resetDb() {
  const mux = new MuxAsyncIterator<Deno.KvEntryMaybe<string>>();
  mux.add(kv.list<string>({ prefix: [CONTACTS_KEY] }));
  mux.add(kv.list<string>({ prefix: [CONTACTS_BY_FULL_NAME_KEY] }));
  const promises = [];
  for await (const res of mux) {
    promises.push(kv.delete(res.key));
  }
  await Promise.all(promises);
}

export async function deleteContact(owner: string, contactId: string) {
  const contactKey = [CONTACTS_KEY, owner, contactId];
  const contact = await kv.get<Contact>(contactKey);

  if (!contact.value) {
    console.warn(`Delete: Contact not found: ${contactKey}`);
    return;
  }

  const contactByFullNameKey = [
    CONTACTS_BY_FULL_NAME_KEY,
    owner,
    contact.value.fullName.toLowerCase(),
    contactId,
  ];

  const contactByFullName = await kv.get(contactByFullNameKey);

  const op = kv.atomic();
  op.check(contact);
  op.check(contactByFullName);
  op.delete(contact.key);
  op.delete(contactByFullName.key);

  const res = await op.commit();
  if (!res.ok) {
    throw new Error(`Failed to delete contact ${contactKey}`);
  }
}
