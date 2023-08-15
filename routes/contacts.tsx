import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";
import ContactList from "@/components/ContactList.tsx";
import ErrorBanner from "@/components/ErrorBanner.tsx";
import { PAGE_SIZE } from "../islands/Pagination.tsx";
import { getCount } from "@/utils/db.ts";

const getCount = async (supabase) => {
  const { error, count } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });
  return { error, count };
};

const getContacts = async (supabase, start, end) => {
  const { error, data } = await supabase
    .from("contacts")
    .select("*")
    .order("first_name", { ascending: true })
    .order("last_name", { ascending: true })
    .range(start, end);
  return { error, data };
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    //ctx.state.session.error = null;
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }

    const url = new URL(_req.url);
    const activePage = url.searchParams.get("page") || 1;
    ctx.state.session.activePage = activePage;
    const start = (activePage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const client: any = ctx.state.supabaseClient;
    //const { error, data } = await client.from("test").select("*");
    const contacts = await getContacts(client, start, end);

    if (contacts.error) {
      ctx.state.session.error = "Failed to retrieve contacts";
      console.error(`error: ${JSON.stringify(contacts.error)}`);
    }
    ctx.state.session.contacts = contacts.data;

    const contactCount = await getCount(client);

    console.log(`numOfContacts:`, contactCount.count);

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
