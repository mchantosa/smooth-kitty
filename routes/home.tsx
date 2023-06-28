import type { Handlers, PageProps } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    return ctx.render({ session: ctx.state.session });
  },
};

export default function HomePage(props: PageProps<any>) {
  return (
    <>
      <Page title={"Connections"} loggedIn={Boolean(props.data.session)}>
        <p class="my-6">Home page requires authentication!</p>
      </Page>
    </>
  );
}
