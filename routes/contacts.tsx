import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";
import ContactForm from "@/components/ContactForm.tsx";
import ErrorBanner from "@/components/ErrorBanner.tsx";
import ContactList from "@/components/ContactList.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    //ctx.state.session.error = null;
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    const client: any = ctx.state.supabaseClient;
    const { error, data } = await client.from("contacts").select("*");
    //console.log(`contacts: ${JSON.stringify(data[0])}`);

    if (error) {
      ctx.state.session.error = "Failed to retrieve contacts";
      console.error(`error: ${JSON.stringify(error)}`);
    }
    ctx.state.session.contacts = data;
    return ctx.render({ session: ctx.state.session });
  },
};

export default function ContactsPage(props: PageProps<any>) {
  const { error, contacts } = props.data.session;

  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        {error && <ErrorBanner error={error}></ErrorBanner>}
        <ContactList contacts={contacts}></ContactList>
      </Page>
    </>
  );
}
