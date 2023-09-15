import { Contact, ContactList } from "@/shared/data/contact.ts";
import { z } from "zod";

export const db = await Deno.openKv();
export const inputSchema = z.array(z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
}));
export type InputSchema = z.infer<typeof inputSchema>;

export async function loadContactList(
  id: string,
  options?: Deno.KvListOptions,
): Promise<ContactList> {
  const contactList: ContactList = {
    contacts: [],
    cursor: "",
  };

  const list = db.list({ prefix: ["list", id] }, options);

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
  listId: string,
  inputs: InputSchema,
): Promise<void> {
  const currentEntries = await db.getMany(
    inputs.map((input: InputSchema) => ["list", listId, input.id]),
  );

  const op = db.atomic();

  inputs.forEach((input: InputSchema, i: number) => {
    if (input.text === null) {
      op.delete(["list", listId, input.id]);
    } else {
      const current = currentEntries[i].value as Contact | null;
      const now = Date.now();
      const createdAt = current?.createdAt ?? now;

      const item: Contact = {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        createdAt,
        updatedAt: now,
      };
      op.set(["list", listId, input.id], item);
    }
  });

  await op.commit();
}
