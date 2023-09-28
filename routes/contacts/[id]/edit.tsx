// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactForm from "@/islands/ContactForm.tsx";
import type { State } from "@/middleware/session.ts";

export default async function ContactDetailsPage(
  _req: Request,
  ctx: RouteContext<undefined, State>,
) {
  const contactId = ctx.params.id;
  const endpoint = `/api/contacts/${contactId}`;
  return (
    <>
      <Head title={""} href={ctx.url.href}>
        <link
          as="fetch"
          crossOrigin="anonymous"
          href={endpoint}
          rel="preload"
        />
      </Head>
      <main class="flex-1 p-4 space-y-8">
        <ContactForm endpoint={endpoint} id={contactId}></ContactForm>
      </main>
    </>
  );
}
