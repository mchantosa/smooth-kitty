import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";
import ContactForm from "@/components/ContactForm.tsx";
import { SupabaseClient } from "@/utils/supabase-client.ts";

/*
    Fresh framework: 
    - For this file to function as a route, it must export atleast one handler object
    - The default export needs to be a functional component, it is not requires, but this page won't work without it
        - The default export is what provides the content for the page
*/

export const handler: Handlers = {
  async GET(_req, ctx) {
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    return ctx.render({ session: ctx.state.session });
  },
  async POST(_req, ctx) {
    //handle session check
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }

    //handle form submission
    const form = await _req.formData();

    //update database
    const first_name = form.get("first_name")?.toString();
    const last_name = form.get("last_name")?.toString();
    const owner_email = ctx.state.session.user?.email;
    const client: any = ctx.state.supabaseClient;
    const newContact = { first_name, last_name, owner_email };
    console.log(newContact);
    const { error } = await client.from("contacts").insert(newContact);
    console.log(error);
    const added = true;

    //if successful, redirect to /contacts
    if (added) {
      const headers = new Headers();
      headers.set("location", "/home");
      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      //set error message
      const headers = new Headers();
      headers.set("location", "/add_contact");
      return new Response(null, {
        status: 303,
        headers,
      });
    }
  },
};

export default function AddContactPage(props: PageProps<any>) {
  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        <ContactForm></ContactForm>
      </Page>
    </>
  );
}
