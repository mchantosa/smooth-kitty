import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";
import ContactList from "@/islands/ContactList.tsx";
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
    ctx.state.session.error = null;
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }

    const client: any = ctx.state.supabaseClient;
    const contactCount = await getCount(client);
    if (contactCount.error) {
      ctx.state.session.error = "Cannot get contact count";
      console.error(`error: ${JSON.stringify(contactCount.error)}`);
    } else {
      ctx.state.session.pagination = {};
      ctx.state.session.pagination.totalPages = Math.ceil(
        contactCount.count / PAGE_SIZE
      );

      const url = new URL(_req.url);
      const activePage = url.searchParams.get("page") || 1;
      ctx.state.session.pagination.activePage = activePage;
      const start = Math.min(
        Math.max((activePage - 1) * PAGE_SIZE, 0),
        contactCount.count - 1
      );
      const end = start + PAGE_SIZE - 1;

      const contacts = await getContacts(client, start, end);
      //const contacts = await getContacts(client, -1, -5);

      if (contacts.error) {
        ctx.state.session.error = "Failed to retrieve contacts";
        console.error(`error: ${JSON.stringify(contacts.error)}`);
      }
      ctx.state.session.contacts = contacts.data;
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
    const id = form.get("id")?.toString();
    const updatedContact = { first_name, last_name };
    console.log(`updating ${id} ${first_name} ${last_name}...`);

    const client: any = ctx.state.supabaseClient;
    const { error } = await client
      .from("contacts")
      .update(updatedContact)
      .eq("id", id);

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
      ctx.state.session.error = "Failed to update contact";
      return ctx.render({ session: ctx.state.session });
    }
  },
};

export default function ContactsPage(props: PageProps<any>) {
  const { error, contacts, pagination } = props.data.session;

  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        {error && <ErrorBanner error={error}></ErrorBanner>}
        <ContactList contacts={contacts} pagination={pagination}></ContactList>
      </Page>
    </>
  );
}
