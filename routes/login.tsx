import { HandlerContext, Handlers, RouteContext } from "$fresh/server.ts";
import type {} from "$fresh/server.ts";
import type { State } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";
import { redirect } from "@/utils/http.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    // If user is already logged in, redirect to contacts page
    // To switch OAuth providers, the user must first log out
    if (ctx.state.sessionUser) {
      return redirect("/contacts", Status.SeeOther);
    }
    const resp = await ctx.render();
    return resp;
  },
};

export default async function LoginPage(
  _req: Request,
  ctx: RouteContext<undefined, State>,
) {
  return (
    <>
      <Head href={ctx.url.href}>
      </Head>
      <main class="flex-1 p-4">
        <div class="mb-4">
          <a className="btn btn-primary" href="/google/signin">
            Login with Google
          </a>
        </div>
        <div class="mb-4">
          <a className="btn btn-primary" href="/facebook/signin">
            Login with Facebook
          </a>
        </div>
        <div class="mb-4">
          <a className="btn btn-primary" href="/github/signin">
            Login with GitHub
          </a>
        </div>
      </main>
    </>
  );
}
