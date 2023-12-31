// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactsList from "@/islands/ContactsList.tsx";

export default async function ContactsPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="Contacts" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <div class="pl-4">
          <a href="/contacts/new" class="btn btn-primary mx-2">New contact</a>
        </div>
        <ContactsList endpoint="/api/contacts" />
        <div class="flex flex-row-reverse pr-4 pt-4">
          <div
            class="tooltip tooltip-warning"
            data-tip="This will seed 10 random contacts"
          >
            <a href="/api/contacts/seed" class="btn mx-2">Seed</a>
          </div>
        </div>
      </main>
    </>
  );
}
