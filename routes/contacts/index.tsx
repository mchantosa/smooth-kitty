// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactsList from "@/islands/ContactsList.tsx";

export default async function ContactsPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <ContactsList endpoint="/api/contacts" />
      </main>
    </>
  );
}
