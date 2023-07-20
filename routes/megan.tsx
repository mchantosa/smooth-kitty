import type { Handlers, PageProps } from "$fresh/server.ts"; //Handlers: request context, PageProps render context
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";

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
};

export default function MeganPage(props: PageProps<any>) {
  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        <p class="my-6">Megan's Hello World!</p>
      </Page>
    </>
  );
}
