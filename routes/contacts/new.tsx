import type { RouteContext } from "$fresh/server.ts";
import Head from "@/components/Head.tsx";
import ContactForm from "@/islands/ContactForm.tsx";

export default async function NewContactPage(_req: Request, ctx: RouteContext) {
  return (
    <>
      <Head title="New Contact" href={ctx.url.href} />
      <main class="p-4 flex-1">
        <ContactForm />
      </main>
    </>
  );
}
