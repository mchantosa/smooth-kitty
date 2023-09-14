// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactList from "@/islands/ContactList.tsx";
import type { Contact } from "@/islands/Contact.tsx";

const contacts: Contact[] = [
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
];

export default async function ContactsPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        {/* {error && <ErrorBanner error={error}></ErrorBanner>} */}
        <ContactList contacts={contacts} pagination={null}></ContactList>
      </main>
    </>
  );
}
