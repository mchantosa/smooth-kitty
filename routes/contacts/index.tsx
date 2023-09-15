// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactList from "@/islands/ContactList.tsx";
import type { Contact } from "@/islands/Contact.tsx";

const seedContacts: Contact[] = [
  {
    id: 1,
    full_name: "John Doe",
    first_name: "John",
    last_name: "Doe",
    pronouns: "he/him",
    email: "john@domain.com",
    phone: "123-456-7890",
    preferred_method: "slack",
    preferred_method_handle: "@johndoe",
    period: "Quarterly",
  },
  {
    id: 2,
    full_name: "Jane Doe",
    first_name: "Jane",
    last_name: "Doe",
    pronouns: "she/her",
    email: "jane@domain.com",
    phone: "123-456-7890",
    preferred_method: "messenger",
    preferred_method_handle: "jane doe 123",
    period: "Monthly",
  },
  {
    id: 3,
    full_name: "Mom",
    first_name: "Mom",
    last_name: "",
    pronouns: "",
    email: "",
    phone: "000-246-8013",
    preferred_method: "slack",
    preferred_method_handle: "@johndoe",
    period: "Quarterly",
  },
  {
    id: 4,
    full_name: "Shiva Baby",
    first_name: "Shiva",
    last_name: "Baby",
    pronouns: "puddycat",
    email: "",
    phone: "",
    preferred_method: "fish",
    preferred_method_handle: "@hey_gf",
    period: "Weekly",
  },
  {
    id: 5,
    full_name: "ashley",
    first_name: "ashley",
    last_name: "",
    pronouns: "bad dog",
    email: "",
    phone: "",
    preferred_method: "yelling upstairs",
    preferred_method_handle: "ashley",
    period: "Monthly",
  },
  {
    id: 6,
    full_name: "Haku",
    first_name: "Haku",
    last_name: "",
    pronouns: "stoopid",
    email: "",
    phone: "",
    preferred_method: "ring the doorbell",
    preferred_method_handle: "bad dog",
    period: "Biweekly",
  },
  {
    id: 7,
    full_name: "Momo",
    first_name: "Momo",
    last_name: "",
    pronouns: "angel",
    email: "",
    phone: "",
    preferred_method: "sleep",
    preferred_method_handle: "@oldman",
    period: "Quarterly",
  },
  {
    id: 8,
    full_name: "Noel",
    first_name: "Noel",
    last_name: "",
    pronouns: "old lady",
    email: "",
    phone: "",
    preferred_method: "sleep",
    preferred_method_handle: "mean yellow dog",
    period: "Weekly",
  },
  {
    id: 9,
    full_name: "A Shiva Baby",
    first_name: "A Sshiva",
    last_name: "Baby",
    pronouns: "she/her",
    email: "shiva@domain.com",
    phone: "666-666-6666",
    preferred_method: "massage",
    preferred_method_handle: "@sexyshiva",
    period: "Monthly",
  },
  {
    id: 10,
    full_name: "An Ashley Bad Dog",
    first_name: "An Ashley",
    last_name: "Bad Dog",
    pronouns: "she/her",
    email: "ashley@domain.com",
    phone: "135-790-8642",
    preferred_method: "email",
    preferred_method_handle: "",
    period: "Biweekly",
  },
  {
    id: 11,
    full_name: "Bilbo Baggins",
    first_name: "Bilbo",
    last_name: "Baggins",
    pronouns: "he/him",
    email: "mrunderhill@domain.com",
    phone: "333-333-3333",
    preferred_method: "letter",
    preferred_method_handle: "The green door, The Hill, The Shire",
    period: "Monthly",
  },
  {
    id: 12,
    full_name: "Spock",
    first_name: "",
    last_name: "Spock",
    pronouns: "green blooded hobgoblin",
    email: "spock@enterprise.sf",
    phone: "999-999-9999",
    preferred_method: "telepathy",
    preferred_method_handle: "@spock",
    period: "Weekly",
  },
].sort((a, b) =>
  a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase())
);

export default async function ContactsPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        {/* {error && <ErrorBanner error={error}></ErrorBanner>} */}
        <ContactList contacts={seedContacts}></ContactList>
      </main>
    </>
  );
}
