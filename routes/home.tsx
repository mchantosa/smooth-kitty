import type { Handlers, PageProps } from "$fresh/server.ts";
import { redirect } from "@/utils/http.ts";
import { Page } from "@/components/Page.tsx";

interface HomePageProps {}

export const handler: Handlers<HomePageProps> = {
  async GET(_req, ctx) {
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    return ctx.render();
  },
};

export default function HomePage(props: PageProps<HomePageProps>) {
  return (
    <>
      <Page title={"Connections"}>
        <p class="my-6">Home page requires authentication!</p>
      </Page>
    </>
  );
}
