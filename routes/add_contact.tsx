import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";
import ContactForm from "@/components/ContactForm.tsx";
import ErrorBanner from "@/components/ErrorBanner.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    ctx.state.session.error = null;
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    return ctx.render({ session: ctx.state.session });
  },
  async POST(_req, ctx) {
    ctx.state.session.error = null;
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }

    const form = await _req.formData();

    //update database
    const first_name = form.get("first_name")?.toString();
    const last_name = form.get("last_name")?.toString();
    //const owner_email = "o.chantosa@boobah.com";
    const owner_email = ctx.state.session.user?.email;
    const newContact = { first_name, last_name, owner_email };

    const client: any = ctx.state.supabaseClient;
    const { error } = await client.from("contacts").insert(newContact);

    //if successful, redirect to /contacts
    if (!error) {
      const headers = new Headers();
      headers.set("location", "/contacts");
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      console.error(`error: ${JSON.stringify(error)}`);
      ctx.state.session.error = "Failed to create a new contact";
      return ctx.render({ session: ctx.state.session });
    }
  },
};

export default function AddContactPage(props: PageProps<any>) {
  const { error } = props.data.session;
  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        {error && <ErrorBanner error={error}></ErrorBanner>}
        <ContactForm action="add_contact" method="post"></ContactForm>
      </Page>
    </>
  );
}
