import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { redirect } from "../utils/http.ts";

interface APageProps {}

export const handler: Handlers<APageProps> = {
  async GET(_req, ctx) {
    if (!ctx.state.session) {
      /** @todo Figure out `redirect_to` query */
      return redirect("/login");
    }
    return ctx.render();
  },
};

export default function NeedAuth(props: PageProps<APageProps>) {
  return (
    <>
      <Head>
        <title>Need Auth!</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">This page requires authentication!</p>
      </div>
    </>
  );
}
