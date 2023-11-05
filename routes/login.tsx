import { HandlerContext, Handlers, RouteContext } from "$fresh/server.ts";
import type {} from "$fresh/server.ts";
import type { State } from "@/middleware/session.ts";
import Head from "@/components/Head.tsx";
import { redirect } from "@/utils/http.ts";
import { Status } from "std/http/http_status.ts";

export const handler: Handlers = {
  async GET(_req: Request, ctx: HandlerContext) {
    // If user is already logged in, redirect to dashboard page
    // To switch OAuth providers, the user must first log out
    if (ctx.state.sessionUser) {
      return redirect("/dashboard", Status.SeeOther);
    }
    const resp = await ctx.render();
    return resp;
  },
};

const LoginButton = (
  { href, logo, provider }: { href: string; logo: string; provider: string },
) => (
  <>
    <a href={href} class="btn btn-wide my-1">
      <img
        class="inline w-5 h-5 mr-2"
        src={logo}
        alt={`${provider} logo`}
      />
      {`Log in with ${provider}`}
    </a>
  </>
);

export default async function LoginPage(
  _req: Request,
  ctx: RouteContext<undefined, State>,
) {
  return (
    <>
      <Head href={ctx.url.href}>
      </Head>
      <main class="flex flex-col flex-1 p-4 items-center justify-center">
        <LoginButton
          href="/google/signin"
          logo="/images/google-logo.png"
          provider="Google"
        />
        {
          /* <LoginButton
          href="/facebook/signin"
          logo="/images/meta.png"
          provider="Facebook"
        /> */
        }
        <LoginButton
          href="/github/signin"
          logo="/images/github-mark/github-mark.png"
          provider="Github"
        />
      </main>
    </>
  );
}
